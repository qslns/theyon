'use client'

import { useState } from 'react'

const inquiryTypes = [
  { value: '', label: 'Select type' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'press', label: 'Press' },
  { value: 'exhibition', label: 'Exhibition' },
  { value: 'general', label: 'General' },
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
    website: '', // Honeypot field for bot protection
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', type: '', message: '', website: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative z-30 h-full flex items-center px-8 md:px-16 lg:px-24 py-16">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div style={{ transform: 'rotate(-1deg)' }}>
          <span
            className="block font-mono uppercase tracking-[0.4em] text-yon-grey/40"
            style={{ fontSize: '0.55rem' }}
          >
            Contact
          </span>

          <h1
            className="font-serif text-yon-black mt-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Get in Touch
          </h1>

          <p
            className="font-sans text-yon-grey/50 mt-5 max-w-sm"
            style={{ fontSize: '0.85rem', lineHeight: 1.7 }}
          >
            For collaborations, press inquiries, or general questions.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-16 space-y-10">
          {/* Name */}
          <div style={{ transform: 'rotate(0.3deg)' }}>
            <label
              htmlFor="name"
              className="block font-mono uppercase tracking-[0.2em] text-yon-grey/50 mb-3"
              style={{ fontSize: '0.55rem' }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-0 py-3 font-mono text-yon-black bg-transparent border-b border-yon-grey/20 focus:border-yon-black focus:outline-none transition-colors"
              style={{ fontSize: '0.9rem' }}
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div style={{ transform: 'rotate(-0.2deg)' }}>
            <label
              htmlFor="email"
              className="block font-mono uppercase tracking-[0.2em] text-yon-grey/50 mb-3"
              style={{ fontSize: '0.55rem' }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-0 py-3 font-mono text-yon-black bg-transparent border-b border-yon-grey/20 focus:border-yon-black focus:outline-none transition-colors"
              style={{ fontSize: '0.9rem' }}
              placeholder="your@email.com"
            />
          </div>

          {/* Type */}
          <div style={{ transform: 'rotate(0.2deg)' }}>
            <label
              htmlFor="type"
              className="block font-mono uppercase tracking-[0.2em] text-yon-grey/50 mb-3"
              style={{ fontSize: '0.55rem' }}
            >
              Inquiry Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-0 py-3 font-mono text-yon-black bg-transparent border-b border-yon-grey/20 focus:border-yon-black focus:outline-none transition-colors cursor-pointer"
              style={{ fontSize: '0.9rem' }}
            >
              {inquiryTypes.map((option) => (
                <option key={option.value} value={option.value} disabled={option.value === ''}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div style={{ transform: 'rotate(-0.3deg)' }}>
            <label
              htmlFor="message"
              className="block font-mono uppercase tracking-[0.2em] text-yon-grey/50 mb-3"
              style={{ fontSize: '0.55rem' }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-0 py-3 font-mono text-yon-black bg-transparent border-b border-yon-grey/20 focus:border-yon-black focus:outline-none transition-colors resize-none"
              style={{ fontSize: '0.9rem' }}
              placeholder="Your message..."
            />
          </div>

          {/* Honeypot field - hidden from real users */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Submit */}
          <div className="pt-6" style={{ transform: 'rotate(0.5deg)' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-mono uppercase tracking-[0.2em] text-yon-black hover:text-yon-accent disabled:text-yon-grey/40 transition-colors border-b border-yon-black hover:border-yon-accent disabled:border-yon-grey/20 pb-1"
              style={{ fontSize: '0.65rem' }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} →
            </button>
          </div>

          {/* Status Messages */}
          <div aria-live="polite" aria-atomic="true" className="min-h-[2rem]">
            {submitStatus === 'success' && (
              <p
                className="font-mono text-yon-accent"
                style={{ fontSize: '0.75rem' }}
                role="status"
              >
                Message sent. We&apos;ll be in touch.
              </p>
            )}
            {submitStatus === 'error' && (
              <p
                className="font-mono text-red-600"
                style={{ fontSize: '0.75rem' }}
                role="alert"
              >
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>

        {/* Direct contact - minimal */}
        <div className="mt-20" style={{ transform: 'rotate(-0.5deg)' }}>
          <span
            className="block font-mono uppercase tracking-[0.2em] text-yon-grey/30"
            style={{ fontSize: '0.5rem' }}
          >
            Or directly
          </span>

          <div className="mt-5 flex flex-col gap-4">
            <a
              href="mailto:hello@theyon.com"
              className="font-mono text-yon-grey/50 hover:text-yon-black transition-colors"
              style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
            >
              hello@theyon.com
            </a>

            <a
              href="https://instagram.com/theyon_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-yon-grey/40 hover:text-yon-black transition-colors"
              style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
            >
              @theyon_studio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
