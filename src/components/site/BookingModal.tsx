import { useEffect } from 'react'
import { Icon } from '../icons'
import { ABtn } from './Shared'

export function BookingModal({
  open,
  onClose,
  bookingUrl,
  phoneRaw,
  phoneDisplay,
}: {
  open: boolean
  onClose: () => void
  bookingUrl: string
  phoneRaw: string
  phoneDisplay: string
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className={`fixed inset-0 z-100 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-5 transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className={`bg-white text-ink rounded-cardLg max-w-lg w-full p-9 px-8 text-center relative transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-5'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full border border-line bg-white inline-flex items-center justify-center"
        >
          <Icon name="close" size={14} />
        </button>
        <div className="w-14 h-14 rounded-full bg-accent-soft text-accent inline-flex items-center justify-center mb-4">
          <Icon name="calendar" size={26} />
        </div>
        <h3 id="booking-modal-title" className="text-2xl font-bold m-0 mb-2.5 tracking-tight leading-tight">Book your eye exam</h3>
        <p className="text-ink2 m-0 mb-6 text-sm">
          Choose your preferred provider, date, and time. You&apos;ll be redirected to our secure scheduling partner.
        </p>
        <div className="flex flex-col gap-2.5">
          <ABtn href={bookingUrl} target="_blank" rel="noreferrer" variant="primary" size="lg">
            Schedule Online <Icon name="external" size={14} />
          </ABtn>
          <ABtn href={`tel:${phoneRaw}`} variant="outline" size="lg">
            <Icon name="phone" size={14} /> Call {phoneDisplay}
          </ABtn>
        </div>
      </div>
    </div>
  )
}
