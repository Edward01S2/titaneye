import { Icon } from '../icons'
import { SectHead } from './Shared'
import type { AnyObj } from './Types'
import { ICON_KEY } from './Utils'

export function Services({ s }: { s?: AnyObj }) {
  if (!s) return null
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectHead eyebrow={s.eyebrow} title={s.title} sub={s.description} />
        <div className="grid md:grid-cols-3 gap-5">
          {(s.items || []).map((it: AnyObj, i: number) => (
            <div
              key={i}
              className="reveal bg-bg2 border border-line rounded-cardLg p-7 transition-all flex flex-col group hover:bg-white hover:border-accent hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-card bg-white text-accent flex items-center justify-center mb-5 border border-line transition-all group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                <Icon name={ICON_KEY(it.icon)} size={22} />
              </div>
              <h3 className="text-lg font-semibold m-0 mb-2 tracking-tight">{it.title}</h3>
              <p className="text-sm text-ink2 m-0 leading-relaxed">{it.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
