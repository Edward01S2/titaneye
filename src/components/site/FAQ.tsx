import { useState } from 'react'
import { Icon } from '../icons'
import { SectHead } from './Shared'
import type { AnyObj } from './Types'

export function FAQ({ faq }: { faq?: AnyObj }) {
  const [open, setOpen] = useState(0)
  if (!faq?.items?.length) return null
  return (
    <section className="py-20 bg-bg2">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectHead eyebrow={faq.eyebrow} title={faq.title} center />
        <div className="max-w-3xl mx-auto">
          {faq.items.map((f: AnyObj, i: number) => {
            const isOpen = open === i
            const buttonId = `faq-button-${i}`
            const panelId = `faq-panel-${i}`
            return (
              <div key={i} className="border-b border-line py-5">
                <button
                  id={buttonId}
                  className="bg-transparent border-0 p-0 w-full flex justify-between items-center gap-4 text-left text-base font-semibold text-ink leading-snug"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  {f.question}
                  <span
                    className={`w-7 h-7 flex-none rounded-full bg-accent-soft text-accent flex items-center justify-center transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <Icon name="plus" size={14} />
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="overflow-hidden transition-all duration-300 text-ink2 text-sm leading-relaxed"
                  style={{ maxHeight: isOpen ? 320 : 0, paddingTop: isOpen ? 12 : 0 }}
                >
                  {f.answer}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
