import Link from 'next/link'
import { Logo } from '../icons'
import type { AnyObj } from './Types'

const FOOTER_LINK_CLASS = 'inline-flex w-fit rounded-md -mx-2 px-2 py-1 text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink'
const withPrefix = (href: string, prefix = '') => `${prefix}${href}`

export function Footer({ settings, onBook, anchorPrefix = '' }: { settings: AnyObj; onBook: () => void; anchorPrefix?: string }) {
  return (
    <footer className="bg-ink text-white/85 pt-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-10">
          <div className="lg:col-span-2">
            <a
              href={withPrefix('#top', anchorPrefix)}
              className="flex w-fit max-w-full gap-3 items-center mb-4 rounded-lg -mx-2 px-2 py-1 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {/* On the dark footer the four ringDark dots flip to white via currentColor */}
              <Logo className="size-16 text-white shrink-0" />
              <FooterWordmark
                name={settings?.brandName || 'Titan Eye Care'}
                tagline={settings?.brandTagline}
              />
            </a>
            <p className="text-white/65 max-w-xs text-sm leading-relaxed m-0">{settings?.footerBlurb}</p>
          </div>
          <FootCol title="Practice">
            {[
              ['#services', 'Services'],
              ['#hours', 'Hours & Location'],
              ['#contact', 'Contact'],
              ['#about', 'About'],
            ].map(([h, l]) => (
              <li key={h}>
                <a href={withPrefix(h, anchorPrefix)} className={FOOTER_LINK_CLASS}>
                  {l}
                </a>
              </li>
            ))}
          </FootCol>
          <FootCol title="Patients">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onBook()
                }}
                className={FOOTER_LINK_CLASS}
              >
                Book Now
              </a>
            </li>
            <li>
              <a href="/img/paperwork-2019.docx" className={FOOTER_LINK_CLASS}>
                New Patient Form
              </a>
            </li>
            <li>
              <a href={withPrefix('#insurance', anchorPrefix)} className={FOOTER_LINK_CLASS}>
                Insurance
              </a>
            </li>
            <li>
              <a href={withPrefix('#contact', anchorPrefix)} className={FOOTER_LINK_CLASS}>
                Contact
              </a>
            </li>
          </FootCol>
          <FootCol title="Reach us">
            <li>
              <a href={`tel:${settings?.phone}`} className={FOOTER_LINK_CLASS}>
                Phone: {settings?.phoneDisplay || settings?.phone}
              </a>
            </li>
            {settings?.fax ? (
              <li>
                <a href={`tel:${settings?.fax}`} className={FOOTER_LINK_CLASS}>
                  Fax: {settings?.faxDisplay || settings?.fax}
                </a>
              </li>
            ) : null}
            <li>
              <a href={`mailto:${settings?.email}`} className={FOOTER_LINK_CLASS}>
                Email: {settings?.email}
              </a>
            </li>
          </FootCol>
        </div>
        {settings?.footerDisclaimer ? (
          <div className="text-xs text-white/45 max-w-3xl leading-normal pt-4">{settings.footerDisclaimer}</div>
        ) : null}
        <div className="border-t border-white/10 py-5 mt-4 flex justify-between items-center gap-4 flex-wrap text-xs text-white/55">
          <span>© {new Date().getFullYear()} {settings?.brandName}</span>
          <span>{settings?.addressLine2}</span>
          <Link href="/privacy" className={FOOTER_LINK_CLASS}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

function FootCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-white m-0 mb-3.5 uppercase tracking-wider">{title}</h4>
      <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-sm">{children}</ul>
    </div>
  )
}

// Footer mirror of Shared.tsx Wordmark — same two-tone main line + tracked
// uppercase sub-line, but tinted for the dark surface.
function FooterWordmark({ name, tagline }: { name: string; tagline?: string }) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0] || ''
  const second = parts[1] || ''
  // Sub-line is the tagline only; "Care" stays in the legal brandName but
  // doesn't visually clutter the wordmark.
  const sub = tagline || ''
  return (
    <div className="min-w-0">
      <div className="font-display text-3xl font-bold tracking-[-0.02em] leading-none text-white truncate">
        {first}
        {second ? (
          <>
            {' '}
            <span className="text-accent">{second}</span>
          </>
        ) : null}
      </div>
      {sub ? (
        <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] leading-none text-white/55 truncate">
          {sub}
        </div>
      ) : null}
    </div>
  )
}
