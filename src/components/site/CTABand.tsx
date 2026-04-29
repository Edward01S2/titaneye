import { Icon } from '../icons'
import { ABtn, Btn } from './Shared'
import type { AnyObj } from './Types'

export function CTABand({ cta, onBook, phone, phoneDisplay }: { cta?: AnyObj; onBook: () => void; phone: string; phoneDisplay: string }) {
  if (!cta) return null
  return (
    <section className="py-14 text-white bg-accent">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-8 flex-wrap">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight m-0 max-w-2xl">
            {cta.titleLine1}
            <br />
            {cta.titleLine2}
          </h2>
          <div className="flex gap-3 flex-wrap">
            <Btn variant="yellow" size="lg" onClick={onBook}>
              {cta.primaryLabel || 'Book online'} <Icon name="arrow" size={16} />
            </Btn>
            <ABtn href={`tel:${phone}`} variant="on-blue" size="lg">
              <Icon name="phone" size={16} /> {phoneDisplay}
            </ABtn>
          </div>
        </div>
      </div>
    </section>
  )
}
