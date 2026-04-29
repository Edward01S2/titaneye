import { Icon } from '../icons'
import { Brand, Btn } from './Shared'
import type { AnyObj } from './Types'

const NAV_LINKS = [
  ['#services', 'Services'],
  ['#hours', 'Hours & Location'],
  ['#contact', 'Contact'],
  ['#about', 'About'],
]

const withPrefix = (href: string, prefix = '') => `${prefix}${href}`

export function Announcement({ a, phone }: { a?: AnyObj; phone: string }) {
  if (!a?.enabled) return null
  return (
    <div className="bg-ink text-white text-xs py-2 px-4 flex items-center justify-center gap-3 flex-wrap">
      {(a.badge || a.left) ? (
        <span>
          {a.badge ? <strong className="text-yellow">{a.badge}</strong> : null}
          {a.badge && a.left ? ' ' : null}
          {a.left}
        </span>
      ) : null}
      {a.middle ? <><span className="opacity-35">·</span><span>{a.middle}</span></> : null}
      {a.callPhone ? (
        <>
          <span className="opacity-35">·</span>
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center rounded-full px-2 py-0.5 font-semibold underline underline-offset-4 decoration-white/55 transition-colors hover:bg-yellow hover:text-ink hover:no-underline focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            {a.callPhone}
          </a>
        </>
      ) : null}
    </div>
  )
}

export function Nav({
  settings,
  onBook,
  onMenu,
  anchorPrefix = '',
}: {
  settings: AnyObj
  onBook: () => void
  onMenu: () => void
  anchorPrefix?: string
}) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1 lg:flex-none">
          <Brand settings={settings} href={withPrefix('#top', anchorPrefix)} />
        </div>
        <nav className="hidden lg:flex gap-7 items-center">
          {NAV_LINKS.map(([h, l]) => (
            <a key={h} href={withPrefix(h, anchorPrefix)} className="text-sm font-medium text-ink2 hover:text-accent transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex flex-none gap-3 items-center sm:gap-2.5 lg:gap-5">
          <a
            className="font-semibold text-sm text-ink inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 transition-colors hover:bg-accent-soft hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            href={`tel:${settings?.phone}`}
          >
            <Icon name="phone" size={16} className="text-accent" />
            <span className="hidden md:inline">{settings?.phoneDisplay || settings?.phone}</span>
          </a>
          <Btn size="sm" className="hidden! sm:inline-flex! sm:py-3 sm:px-6 sm:text-sm" onClick={onBook}>
            Book Exam
          </Btn>
          <button
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 flex-none border border-line rounded-lg bg-white"
            onClick={onMenu}
            aria-label="Menu"
          >
            <Icon name="burger" />
          </button>
        </div>
      </div>
    </header>
  )
}

export function Drawer({
  open,
  onClose,
  onBook,
  settings,
  anchorPrefix = '',
}: {
  open: boolean
  onClose: () => void
  onBook: () => void
  settings: AnyObj
  anchorPrefix?: string
}) {
  return (
    <div
      className={`fixed inset-0 z-60 bg-white px-5 sm:px-8 lg:px-12 py-4 flex flex-col transition-transform duration-300 ease-in-out ${
        open ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between pb-6 border-b border-line">
        <Brand settings={settings} href={withPrefix('#top', anchorPrefix)} />
        <button
          className="px-3 py-2 rounded-full border-2 border-line-strong bg-white"
          onClick={onClose}
          aria-label="Close menu"
        >
          <Icon name="close" size={16} />
        </button>
      </div>
      <div className="flex flex-col py-4 gap-1">
        {NAV_LINKS.map(([h, l]) => (
          <a
            key={h}
            href={withPrefix(h, anchorPrefix)}
            onClick={onClose}
            className="py-3.5 text-lg font-medium border-b border-line"
          >
            {l}
          </a>
        ))}
      </div>
      <Btn
        size="lg"
        onClick={() => {
          onClose()
          onBook()
        }}
      >
        Book Exam
      </Btn>
    </div>
  )
}
