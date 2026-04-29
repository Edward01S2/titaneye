import { Icon } from '../icons'
import type { AnyObj } from './Types'
import { ICON_KEY } from './Utils'

export function ValueStrip({ items }: { items: AnyObj[] }) {
  if (!items?.length) return null
  return (
    <section className="border-y border-line bg-white py-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {items.map((it, i) => (
            <div className="flex gap-3 items-start reveal" key={i}>
              <div className="w-10 h-10 flex-none rounded-lg bg-accent-soft text-accent flex items-center justify-center">
                <Icon name={ICON_KEY(it.icon)} />
              </div>
              <div>
                <h4 className="m-0 mb-0.5 text-sm font-semibold">{it.title}</h4>
                <p className="m-0 text-xs text-muted leading-normal">{it.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
