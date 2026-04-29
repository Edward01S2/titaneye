import { Icon } from '../icons'
import { ABtn, Btn, SectHead } from './Shared'
import type { AnyObj } from './Types'

export function HoursLocation({
  section,
  settings,
  onBook,
  phoneRaw,
}: {
  section?: AnyObj
  settings: AnyObj
  onBook: () => void
  phoneRaw: string
}) {
  if (!section) return null
  const today = new Date().getDay()
  const rows = [
    { d: 'Monday', day: 1, h: settings?.monday },
    { d: 'Tuesday', day: 2, h: settings?.tuesday },
    { d: 'Wednesday', day: 3, h: settings?.wednesday },
    { d: 'Thursday', day: 4, h: settings?.thursday },
    { d: 'Friday', day: 5, h: settings?.friday },
    { d: 'Saturday', day: 6, h: settings?.saturday },
    { d: 'Sunday', day: 0, h: settings?.sunday },
  ]
  const mapQuery = encodeURIComponent(
    [section.placeName, settings?.addressLine2].filter(Boolean).join(' ')
  )
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`

  return (
    <section id="hours" className="py-20 bg-bg2">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectHead eyebrow={section.eyebrow} title={section.title} sub={section.description} />
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="border border-line rounded-cardLg overflow-hidden bg-white flex flex-col reveal">
            <div className="aspect-16/10 relative overflow-hidden bg-bg3">
              <iframe
                title={`${section.mapPinLabel || settings?.brandName || 'Location'} map`}
                src={mapSrc}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="p-5 px-6">
              <div className="font-semibold text-sm">{section.placeName}</div>
              <div className="text-muted text-xs mt-0.5">{settings?.addressLine2}</div>
              <div className="flex gap-2 mt-3.5 items-center">
                {section.directionsUrl ? (
                  <a href={section.directionsUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-accent py-1.5 inline-flex items-center gap-1.5">
                    Get directions <Icon name="external" size={12} />
                  </a>
                ) : null}
                <span className="text-line-strong">·</span>
                <a href={`tel:${phoneRaw}`} className="text-xs font-semibold text-accent py-1.5">
                  Call store
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white border border-line rounded-cardLg p-7 reveal">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="m-0 text-base font-semibold">Hours</h3>
            </div>
            {rows.map((r) => {
              const closed = !r.h || /closed/i.test(r.h)
              const isToday = r.day === today
              return (
                <div
                  key={r.d}
                  className={`flex justify-between items-center py-3.5 ${
                    isToday ? 'bg-accent-soft -mx-4 px-4 rounded-lg' : 'border-b border-line last:border-b-0'
                  }`}
                >
                  <span className={`text-sm ${isToday ? 'text-accent-deep font-semibold' : 'font-medium'}`}>
                    {r.d}
                  </span>
                  <span className={`text-sm ${isToday ? 'text-accent-deep font-semibold' : closed ? 'text-muted' : 'text-ink2'}`}>
                    {r.h || '—'}
                  </span>
                </div>
              )
            })}
            <div className="mt-5 flex gap-2">
              <Btn className="flex-1" onClick={onBook}>
                Book online
              </Btn>
              <ABtn href={`tel:${phoneRaw}`} variant="outline">
                <Icon name="phone" size={14} />
              </ABtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
