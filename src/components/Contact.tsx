'use client'

import { useState, FormEvent } from 'react'

interface ContactProps {
  phone?: string | null
}

function formatPhone(num?: string | null) {
  if (!num) return '(817) 516-5084'
  const cleaned = ('' + num).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return num
}

export default function Contact({ phone = '(817) 516-5084' }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage('Thank you! We will get back to you soon.')
        setFormData({ name: '', phone: '', email: '', message: '' })
      } else {
        setSubmitMessage('Something went wrong. Please try again or call us directly.')
      }
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="contact" className="relative">
      <section className="py-16 bg-gray-50 relative z-10 pb-0 md:pb-8 lg:pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-16 border border-gray-200">
          <h2 className="text-center text-3xl font-bold text-primary mb-4 md:text-4xl">
            Get in Touch
          </h2>
          <p className="text-center pb-8 text-gray-700">
            Leave us a message or call us at{' '}
            <a href={`tel:${phone?.replace(/\D/g, '')}`} className="text-primary hover:underline">
              {formatPhone(phone)}
            </a>
          </p>

          <form
            onSubmit={handleSubmit}
          >
            <div hidden>
              <label>
                Don't fill this out: <input name="bot-field" onChange={handleChange} />
              </label>
            </div>

            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                minLength={2}
                required
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9\s\-\(\)\+]{10,}"
                title="Please enter a valid phone number (at least 10 digits)"
                required
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="(817) 516-5084"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {submitMessage && (
              <div
                className={`mb-6 p-4 rounded ${
                  submitMessage.includes('Thank you')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {submitMessage}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-opacity-90 text-white text-lg font-bold py-3 px-8 rounded transition disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </div>
  )
}

