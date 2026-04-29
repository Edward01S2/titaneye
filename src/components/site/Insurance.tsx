import Image from 'next/image'
import { Icon } from '../icons'
import { ABtn } from './Shared'
import type { AnyObj } from './Types'

export function Insurance({ ins, phone }: { ins?: AnyObj; phone: string }) {
  if (!ins?.logos?.length) return null
  return (
    <section id="insurance" className="py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="reveal flex justify-between items-end flex-wrap gap-6 mb-10">
          <div>
            {ins.eyebrow ? <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">{ins.eyebrow}</div> : null}
            {ins.title ? (
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight m-0 mb-3.5">
                {ins.title}
              </h2>
            ) : null}
            {ins.description ? <p className="text-base text-ink2 m-0 max-w-2xl">{ins.description}</p> : null}
          </div>
          {ins.verifyCta ? (
            <ABtn href={`tel:${phone}`} variant="outline">
              <Icon name="phone" size={14} /> {ins.verifyCta}
            </ABtn>
          ) : null}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {ins.logos.map((l: AnyObj) => (
            <div
              key={l.name}
              title={l.name}
              className="reveal aspect-video bg-white border border-line rounded-card flex items-center justify-center p-5 transition-all hover:border-accent hover:-translate-y-0.5 hover:shadow-md relative"
            >
              {l.image ? (
                <Image
                  src={l.image}
                  alt={l.name}
                  width={140}
                  height={50}
                  className="object-contain max-h-12 w-auto"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
