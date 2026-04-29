import * as React from 'react'
import { Logo } from '../icons'
import type { AnyObj } from './Types'

// V5 wordmark — exactly the locked-in pick from the logo explorations:
//   "Titan" (ink) + "Eye" (accent) on the primary line, with a small
//   uppercase tracked sub-line below. Only the first two words of the
//   brand name are used as the wordmark; any remaining words flow into
//   the sub-line so brand info isn't lost.
function Wordmark({
  name,
  tagline,
}: {
  name: string
  tagline?: string
}) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0] || ''
  const second = parts[1] || ''
  // The wordmark only shows the first two words (e.g. "Titan Eye"). Anything
  // after that lives in the tagline so the sub-line stays in the editor's
  // control — set brandTagline to "Eye Care · Arlington · TX" to match the
  // picked logo exactly.
  const sub = tagline || ''

  return (
    <div className="min-w-0">
      <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-none truncate text-ink">
        {first}
        {second ? (
          <>
            {' '}
            <span className="text-accent">{second}</span>
          </>
        ) : null}
      </div>
      {sub ? <div className="mt-1 lg:mt-2 text-xs font-semibold uppercase tracking-widest leading-none text-muted truncate">{sub}</div> : null}
    </div>
  )
}

export function Brand({ settings, href = '#top' }: { settings: AnyObj; href?: string }) {
  const name = settings?.brandName || 'Titan Eye Care'
  return (
    <a href={href} className="flex min-w-0 max-w-full items-center gap-2 overflow-hidden">
      <Logo className="size-12 lg:size-16 text-ink shrink-0" />
      <Wordmark
        name={name}
        tagline={settings?.brandTagline}
      />
    </a>
  )
}

export function Btn({
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'yellow' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}) {
  const v: Record<string, string> = {
    primary:
      'bg-accent text-white border-accent hover:bg-accent-deep hover:border-accent-deep hover:-translate-y-px',
    yellow:
      'bg-yellow text-ink border-yellow hover:bg-yellow hover:border-yellow hover:-translate-y-px',
    outline:
      'bg-white text-ink border-line-strong hover:border-ink hover:bg-bg2',
    ghost: 'bg-transparent text-ink border-transparent hover:bg-bg2',
  }
  const s = size === 'lg' ? 'py-4 px-7 text-base' : size === 'sm' ? 'py-2.5 px-4 text-sm' : 'py-3 px-6 text-sm'
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight border-2 transition-all whitespace-nowrap ${s} ${v[variant]} ${className}`}
      {...rest}
    />
  )
}

export function ABtn({
  href,
  variant = 'outline',
  size = 'md',
  className = '',
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'yellow' | 'outline' | 'ghost' | 'on-blue'
  size?: 'md' | 'lg'
}) {
  const v: Record<string, string> = {
    primary:
      'bg-accent text-white! border-accent hover:bg-accent-deep hover:border-accent-deep hover:-translate-y-px',
    yellow:
      'bg-yellow text-ink border-yellow hover:bg-yellow hover:border-yellow hover:-translate-y-px',
    outline:
      'bg-white text-ink border-line-strong hover:border-ink hover:bg-bg2',
    ghost: 'bg-transparent text-ink border-transparent hover:bg-bg2',
    'on-blue':
      'bg-white/10 text-white border-white/30 hover:bg-white/20',
  }
  const s = size === 'lg' ? 'py-4 px-7 text-base' : 'py-3 px-6 text-sm'
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight border-2 transition-all whitespace-nowrap ${s} ${v[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

export function SectHead({
  eyebrow,
  title,
  sub,
  center = false,
  className = '',
}: {
  eyebrow?: string
  title?: string
  sub?: string
  center?: boolean
  className?: string
}) {
  return (
    <div className={`max-w-3xl mb-10 reveal ${center ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow ? <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">{eyebrow}</div> : null}
      {title ? (
        <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight m-0 mb-3.5">
          {title}
        </h2>
      ) : null}
      {sub ? <p className="text-base text-ink2 m-0 max-w-2xl">{sub}</p> : null}
    </div>
  )
}
