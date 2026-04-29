import { useState } from 'react'
import { Icon, type IconKey } from '../icons'
import { Btn, SectHead } from './Shared'
import type { AnyObj } from './Types'

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-3.5">
      <label htmlFor={id} className="block text-xs font-medium mb-1.5 text-ink2">{label}</label>
      {children}
      {error ? <div className="text-xs text-danger mt-1">{error}</div> : null}
    </div>
  )
}

function ContactForm() {
  const [vals, setVals] = useState({ name: '', email: '', phone: '', message: '' })
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [startedAt] = useState(() => Date.now())
  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setVals({ ...vals, [k]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ne: Record<string, string> = {}
    if (!vals.name.trim()) ne.name = 'Please enter your name'
    if (!vals.email.trim()) ne.email = 'Please enter your email'
    else if (!/^\S+@\S+\.\S+$/.test(vals.email)) ne.email = 'Looks like that email is invalid'
    if (!vals.message.trim()) ne.message = 'Please enter a message'
    setErrs(ne)
    setFormError('')
    if (Object.keys(ne).length === 0) {
      setSubmitting(true)
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...vals, honeypot: '', _formTime: Math.floor((Date.now() - startedAt) / 1000) }),
        })
        const result = await response.json().catch(() => ({}))
        if (!response.ok) {
          setFormError(result.error || 'Something went wrong. Please call us or try again.')
          return
        }
        setSent(true)
      } catch {
        setFormError('Something went wrong. Please call us or try again.')
      } finally {
        setSubmitting(false)
      }
    }
  }

  if (sent) {
    return (
      <div className="text-center py-12 px-6 bg-success-soft border border-success rounded-card">
        <div className="w-14 h-14 rounded-full bg-success text-white inline-flex items-center justify-center mb-3.5">
          <Icon name="check" size={28} />
        </div>
        <h3 className="m-0 mb-1.5 text-2xl font-bold">Got it{vals.name ? `, ${vals.name.split(' ')[0]}` : ''}!</h3>
        <p className="m-0 text-ink2">We&apos;ll get back to you within one business day.</p>
      </div>
    )
  }

  const inputCls = 'w-full px-3.5 py-3 bg-white border-2 border-line rounded-lg text-sm text-ink outline-none transition-all focus:border-accent focus:ring-4 focus:ring-accent-soft'

  return (
    <form onSubmit={submit} noValidate>
      <Field id="contact-name" label="Your name" error={errs.name}>
        <input id="contact-name" className={`${inputCls} ${errs.name ? 'border-danger!' : ''}`} value={vals.name} onChange={upd('name')} placeholder="Jane Doe" />
      </Field>
      <Field id="contact-email" label="Email" error={errs.email}>
        <input id="contact-email" type="email" className={`${inputCls} ${errs.email ? 'border-danger!' : ''}`} value={vals.email} onChange={upd('email')} placeholder="jane@example.com" />
      </Field>
      <Field id="contact-phone" label="Phone (optional)">
        <input id="contact-phone" className={inputCls} value={vals.phone} onChange={upd('phone')} placeholder="(817) 555-0100" />
      </Field>
      <Field id="contact-message" label="How can we help?" error={errs.message}>
        <textarea
          id="contact-message"
          rows={4}
          className={`${inputCls} resize-y ${errs.message ? 'border-danger!' : ''}`}
          value={vals.message}
          onChange={upd('message')}
          placeholder="Question, appointment request, etc."
        />
      </Field>
      {formError ? <div className="text-sm text-danger mb-3" role="alert">{formError}</div> : null}
      <Btn type="submit" size="lg" className="w-full mt-2" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send message'} <Icon name="arrow" size={16} />
      </Btn>
    </form>
  )
}

function InfoRow({ icon, label, children }: { icon: IconKey; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3.5 items-start py-4 border-b border-line last:border-b-0">
      <div className="w-9 h-9 flex-none rounded-lg bg-accent-soft text-accent flex items-center justify-center">
        <Icon name={icon} size={18} />
      </div>
      <div>
        <div className="text-xs text-muted mb-0.5">{label}</div>
        <div className="text-sm font-medium">{children}</div>
      </div>
    </div>
  )
}

export function Contact({ contact, settings }: { contact?: AnyObj; settings: AnyObj }) {
  if (!contact) return null
  return (
    <section id="contact" className="py-20 bg-bg2">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectHead eyebrow={contact.eyebrow} title={contact.title} sub={contact.description} />
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="reveal bg-white border border-line rounded-cardLg p-7">
            <InfoRow icon="pin" label="Visit us">
              {settings?.addressLine1}
              <br />
              {settings?.addressLine2}
            </InfoRow>
            <InfoRow icon="phone" label="Call">
              <a href={`tel:${settings?.phone}`} className="text-sm font-medium text-accent">
                {settings?.phoneDisplay || settings?.phone}
              </a>
              {contact.tollFreePhone ? (
                <div>
                  <a href={`tel:${settings?.fax}`} className="text-muted text-sm hover:text-accent">
                    {contact.tollFreePhone}
                  </a>
                </div>
              ) : null}
            </InfoRow>
            <InfoRow icon="mail" label="Email">
              <a href={`mailto:${settings?.email}`} className="text-accent">
                {settings?.email}
              </a>
            </InfoRow>
            {contact.patientForm ? (
              <InfoRow icon="doc" label="New patient?">
                <a href={contact.patientForm} className="text-accent">
                  Download intake form ↓
                </a>
              </InfoRow>
            ) : null}
          </div>
          <div className="reveal bg-white border border-line rounded-cardLg p-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
