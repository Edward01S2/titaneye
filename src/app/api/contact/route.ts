import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiting (resets on server restart)
const submissionTracker = new Map<string, number[]>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const submissions = submissionTracker.get(ip) || []
  
  // Remove submissions older than 1 hour
  const recentSubmissions = submissions.filter(time => now - time < 3600000)
  
  // Allow max 3 submissions per hour per IP
  if (recentSubmissions.length >= 3) {
    return false
  }
  
  recentSubmissions.push(now)
  submissionTracker.set(ip, recentSubmissions)
  return true
}

function validateContent(text: string): boolean {
  // Check for excessive links (common in spam)
  const linkCount = (text.match(/https?:\/\//gi) || []).length
  if (linkCount > 2) return false
  
  // Check for common spam keywords
  const spamKeywords = ['viagra', 'casino', 'lottery', 'prince', 'inheritance', 'bitcoin', 'crypto investment']
  const lowerText = text.toLowerCase()
  if (spamKeywords.some(keyword => lowerText.includes(keyword))) return false
  
  return true
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    const name = asString(formData.name)
    const email = asString(formData.email)
    const phone = asString(formData.phone)
    const message = asString(formData.message)
    
    // 1. Check honeypot field
    if (formData.honeypot && formData.honeypot.length > 0) {
      console.log('Spam detected: honeypot filled')
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }
    
    // 2. Check time-based validation (form filled too quickly - likely a bot)
    if (formData._formTime && formData._formTime < 3) {
      console.log('Spam detected: form filled too quickly')
      return NextResponse.json(
        { error: 'Please take your time filling out the form' },
        { status: 400 }
      )
    }
    
    // 3. Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }
    
    // 4. Check message length
    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 1000 characters' },
        { status: 400 }
      )
    }
    
    // 5. Validate content for spam
    if (!validateContent(message)) {
      console.log('Spam detected: suspicious content')
      return NextResponse.json(
        { error: 'Your message contains suspicious content' },
        { status: 400 }
      )
    }
    
    // 6. Rate limiting (get IP from headers)
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    if (!checkRateLimit(ip)) {
      console.log('Spam detected: rate limit exceeded')
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }
    
    // Log the submission (you can see this in Vercel logs)
    console.log('Contact form submission:', { name, email })
    
    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Titan Eye Care <form@titaneye.care>',
      to: 'office@titaneye.care',
      replyTo: email,
      subject: 'New Form Submission from Titan Eye Care',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1F6FEB;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : 'Not provided'}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          </div>
          <div style="margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This email was sent from the contact form at titaneye.care
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', data)
    
    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}

