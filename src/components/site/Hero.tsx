import Image from 'next/image'
import { Icon } from '../icons'
import { ABtn, Btn } from './Shared'
import type { AnyObj } from './Types'
import { getNextAvailableLabel, getTodayStatus } from './Utils'

export function Hero({ hero, onBook, phone, settings }: { hero?: AnyObj; onBook: () => void; phone: string; settings?: AnyObj }) {
  const status = getTodayStatus(settings)
  const nextAvailable = getNextAvailableLabel(settings)
  if (!hero) return null
  return (
    <section
      id="top"
      className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-b from-bg2 to-white"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            {(hero.locationCallout || hero.locationCalloutEmphasis) ? (
              <div className="inline-flex items-center gap-2.5 bg-yellow-soft text-yellow-text px-4 py-2.5 rounded-full text-sm font-medium border border-yellow">
                <Icon name="pin" size={16} className="text-yellow" />
                {hero.locationCallout}{' '}
                <strong className="text-ink font-semibold">{hero.locationCalloutEmphasis}</strong>
              </div>
            ) : null}
            <h1 className="text-5xl md:text-6xl font-bold leading-none tracking-tight my-5">
              {hero.title} 
              <span className="text-accent">{' '}{hero.titleHighlight}</span>
            </h1>
            <p className="text-lg leading-relaxed text-ink2 max-w-xl mb-7">{hero.description}</p>
            <div className="flex gap-3 flex-wrap mb-8">
              <Btn size="lg" onClick={onBook}>
                {hero.primaryCta || 'Book an exam'} <Icon name="arrow" size={16} />
              </Btn>
              <ABtn href={`tel:${phone}`} size="lg" variant="outline">
                <Icon name="phone" size={16} /> {hero.secondaryCta || 'Call us'}
              </ABtn>
            </div>
          </div>
          <div className="bg-white border border-line rounded-cardLg p-6 shadow-xl">
            <div className="aspect-5/4 rounded-card overflow-hidden bg-bg3 mb-5 relative">
              {hero.image ? (
                <Image src={hero.image} alt="Eye exam" fill sizes="(max-width: 768px) 100vw, 480px" className="object-cover" />
              ) : null}
            </div>
            <CardRow label="Status">
              {status.open ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-success-soft text-success">
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse-ring" />
                  {status.closeLabel ? `Open now · Until ${status.closeLabel}` : hero.cardOpenLabel || 'Open now'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-soft text-yellow-text">
                  {hero.cardClosedLabel || 'Closed today'}
                </span>
              )}
            </CardRow>
            {!status.open && nextAvailable ? <CardRow label="Next open"><span className="text-sm font-semibold">{nextAvailable}</span></CardRow> : null}
            {hero.cardWalkIns ? <CardRow label="Walk-ins"><span className="text-sm font-semibold">{hero.cardWalkIns}</span></CardRow> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function CardRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-t border-line first:border-t-0 first:pt-1">
      <span className="text-xs text-muted">{label}</span>
      <span>{children}</span>
    </div>
  )
}
