import Image from 'next/image'
import type { AnyObj } from './Types'

export function About({ about }: { about?: AnyObj }) {
  if (!about) return null
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="aspect-4/3 rounded-cardLg overflow-hidden bg-bg3 reveal relative">
            {about.image ? (
              <Image src={about.image} alt="Inside the practice" fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px" className="object-cover" />
            ) : null}
          </div>
          <div className="reveal">
            {about.eyebrow ? <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">{about.eyebrow}</div> : null}
            {about.title ? (
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight m-0 mb-3.5">
                {about.title}
              </h2>
            ) : null}
            {(about.paragraphs || []).map((p: string, i: number) => (
              <p key={i} className="text-base leading-relaxed text-ink2 mb-4">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
