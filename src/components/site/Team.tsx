import { useState } from 'react'
import Image from 'next/image'
import { Icon } from '../icons'
import { SectHead } from './Shared'
import type { AnyObj } from './Types'

function Doctor({ doc, showBio = false }: { doc: AnyObj; showBio?: boolean }) {
  const [open, setOpen] = useState(false)
  const bioOpen = showBio || open
  return (
    <div className={`reveal bg-white border border-line rounded-cardLg overflow-hidden transition-all hover:shadow-lg`}>
      <div className="grid sm:grid-cols-3 sm:items-stretch">
        <div className="aspect-square sm:aspect-auto sm:h-full lg:aspect-square lg:h-auto relative">
          {doc.image ? <Image src={doc.image} alt={doc.name} fill sizes="200px" className="object-cover" /> : null}
        </div>
        <div className="p-6 flex flex-col justify-center sm:col-span-2">
          {doc.role ? <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-1.5">{doc.role}</div> : null}
          <h3 className="text-xl font-bold m-0 mb-2 tracking-tight">{doc.name}</h3>
          {doc.creds ? <div className="text-xs text-muted mb-3">{doc.creds}</div> : null}
          {showBio ? (
            <p className="text-sm text-ink2 m-0 leading-relaxed pt-3.5 border-t border-line">{doc.bio}</p>
          ) : (
            <button
              onClick={() => setOpen((o) => !o)}
              className="bg-transparent border-0 p-0 text-accent text-xs font-semibold inline-flex items-center gap-1 self-start"
            >
              {open ? 'Show less' : 'Read bio'} <Icon name="arrow" size={12} />
            </button>
          )}
        </div>
      </div>
      {!showBio ? (
        <div
          className="px-6 overflow-hidden transition-all duration-500"
          style={{ maxHeight: open ? 500 : 0, paddingBottom: bioOpen ? 24 : 0 }}
        >
          <p className="text-sm text-ink2 m-0 leading-relaxed pt-3.5 border-t border-line">{doc.bio}</p>
        </div>
      ) : null}
    </div>
  )
}

export function Team({ team, doctors, staff }: { team?: AnyObj; doctors: AnyObj[]; staff: AnyObj[] }) {
  const hasSingleDoctor = doctors.length === 1

  return (
    <section id="team" className="py-20 bg-bg2">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectHead eyebrow={team?.eyebrow} title={team?.title} />
        <div className={`grid gap-6 ${hasSingleDoctor ? '' : 'md:grid-cols-2'}`}>
          {doctors.map((d) => (
            <Doctor key={d.name} doc={d} showBio={hasSingleDoctor} />
          ))}
        </div>
        <div className="mt-7 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {staff.map((s) => (
            <div key={s.name} className="reveal flex items-center gap-3.5 p-3.5 bg-white border border-line rounded-card">
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-none">
                {s.image ? <Image src={s.image} alt={s.name} fill sizes="56px" className="object-cover" /> : null}
              </div>
              <div>
                <div className="text-xs text-muted">{s.title}</div>
                <div className="text-sm font-semibold">{s.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
