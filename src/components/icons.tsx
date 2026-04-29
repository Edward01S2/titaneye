import * as React from 'react'

type IconKey =
  | 'arrow' | 'check' | 'phone' | 'pin' | 'clock' | 'mail' | 'calendar'
  | 'eye' | 'contact' | 'shield' | 'drop' | 'baby' | 'star' | 'card'
  | 'family' | 'plus' | 'close' | 'doc' | 'burger' | 'external'

const PATHS: Record<IconKey, React.ReactNode> = {
  arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
  check: <path d="M5 12l5 5L20 7" />,
  phone: <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 012.07 4.18 2 2 0 014.06 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72a2 2 0 011.72 2z" />,
  pin: (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>),
  clock: (<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  mail: (<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6L12 13 2 6" /></>),
  calendar: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  eye: (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></>),
  contact: <circle cx="12" cy="12" r="9" />,
  shield: <path d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z" />,
  drop: <path d="M12 2.5l5.5 7.5a7 7 0 11-11 0L12 2.5z" />,
  baby: (<><circle cx="12" cy="12" r="9" /><path d="M9 10h.01M15 10h.01M9 16c1 1 2 1.5 3 1.5s2-.5 3-1.5" /></>),
  star: <path d="M12 2l2.6 6.9 7.4.6-5.6 4.9 1.7 7.2-6.1-3.9-6.1 3.9 1.7-7.2L2 9.5l7.4-.6L12 2z" />,
  card: (<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>),
  family: (<><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2" /><path d="M3 20c0-3 3-5 6-5s6 2 6 5M14 20c0-2 2-3.5 4-3.5s4 1.5 4 3.5" /></>),
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  doc: (<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></>),
  burger: <path d="M3 6h18M3 12h18M3 18h18" />,
  external: (<><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><path d="M15 3h6v6M10 14L21 3" /></>),
}

export function Icon({ name, size = 20, className = '' }: { name: IconKey; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name] || null}
    </svg>
  )
}

// V5 logo mark: 8-dot aperture (orbit 18, r 4.5) + locked inner eye
// (brand blue iris, ink pupil, white catchlight). The four "ringDark"
// dots use currentColor so the logo flips automatically on dark
// backgrounds — set `text-ink` on the parent for light contexts and
// `text-white` for dark contexts (e.g. footer).
export function Logo({
  className = 'size-9 text-ink',
}: {
  className?: string
}) {
  const cx = 32
  const cy = 32
  const orbit = 18
  const r = 4.5
  const count = 8
  const pupil = 8 // iris radius

  const dots: React.ReactElement[] = []
  for (let i = 0; i < count; i++) {
    const a = ((i * (360 / count)) - 90) * (Math.PI / 180)
    const x = cx + Math.cos(a) * orbit
    const y = cy + Math.sin(a) * orbit
    const fill = i % 2 === 0 ? 'currentColor' : '#1F6FEB'
    dots.push(<circle key={i} cx={x} cy={y} r={r} fill={fill} />)
  }

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {dots}
      {/* Inner eye — fixed brand colors so it reads identically in either theme */}
      <circle cx={cx} cy={cy} r={pupil} fill="#1F6FEB" stroke="#1A2538" strokeWidth={0.9} />
      <circle cx={cx} cy={cy} r={pupil * 0.5} fill="#1A2538" />
      <circle cx={cx + pupil * 0.35} cy={cy - pupil * 0.3} r={pupil * 0.18} fill="#FFFFFF" />
    </svg>
  )
}

export type { IconKey }
