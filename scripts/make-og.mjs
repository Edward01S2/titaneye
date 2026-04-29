// Generate public/og-image.svg and render it to public/og-image.png (1200x630).
// Run: node scripts/make-og.mjs
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import * as fontkit from 'fontkit'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const W = 1200
const H = 630

// Brand palette (from src/app/globals.css)
const ACCENT = '#1F6FEB'
const ACCENT_DEEP = '#1858C4'
const ACCENT_SOFT = '#E7F0FE'
const INK = '#1A2538'
const INK_2 = '#455062'
const BG_2 = '#F4F7FB'

const soraBoldPath = path.join(root, 'public', 'fonts', 'Sora-Bold.woff2')
const soraBold = fontkit.create(await readFile(soraBoldPath))

const pathText = (runs, x, y, size, letterSpacing = 0) => {
  const scale = size / soraBold.unitsPerEm
  let cursor = x

  return runs.map(({ text, fill }) => {
    const laidOut = soraBold.layout(text)
    const glyphs = laidOut.glyphs.map((glyph, i) => {
      const pos = laidOut.positions[i]
      const tx = cursor + pos.xOffset * scale
      const ty = y - pos.yOffset * scale
      cursor += pos.xAdvance * scale + letterSpacing
      return `<path d="${glyph.path.toSVG()}" fill="${fill}" transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(5)} -${scale.toFixed(5)})"/>`
    })
    return glyphs.join('\n  ')
  }).join('\n  ')
}

// V5 logo mark: 8-dot aperture (orbit 18, dot r 4.5) + locked inner eye.
// `dotInk` colors the four primary dots — pass white when rendering on
// dark backgrounds.
const logo = (x, y, size, dotInk = INK) => {
  const cx = 32, cy = 32, orbit = 18, r = 4.5, count = 8, pupil = 8
  const dots = []
  for (let i = 0; i < count; i++) {
    const a = ((i * (360 / count)) - 90) * (Math.PI / 180)
    const dx = cx + Math.cos(a) * orbit
    const dy = cy + Math.sin(a) * orbit
    const fill = i % 2 === 0 ? dotInk : ACCENT
    dots.push(`<circle cx="${dx.toFixed(2)}" cy="${dy.toFixed(2)}" r="${r}" fill="${fill}"/>`)
  }
  return `
  <g transform="translate(${x} ${y}) scale(${size / 64})">
    ${dots.join('\n    ')}
    <circle cx="${cx}" cy="${cy}" r="${pupil}" fill="${ACCENT}" stroke="${INK}" stroke-width="0.9"/>
    <circle cx="${cx}" cy="${cy}" r="${pupil * 0.5}" fill="${INK}"/>
    <circle cx="${(cx + pupil * 0.35).toFixed(2)}" cy="${(cy - pupil * 0.3).toFixed(2)}" r="${(pupil * 0.18).toFixed(2)}" fill="white"/>
  </g>`
}

// 24-px stroke icons (currentColor); rendered inside a service pill.
const ICONS = {
  eye: `
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
  glasses: `
    <circle cx="6" cy="14" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="18" cy="14" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/>
    <path d="M10 14h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M2 11l3-5h2M22 11l-3-5h-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  contact: `
    <ellipse cx="12" cy="12" rx="9" ry="9" fill="none" stroke="currentColor" stroke-width="1.8"/>
    <ellipse cx="12" cy="12" rx="4.5" ry="4.5" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/>`,
  pin: `
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
}

// One service pill: card with icon + label.
const pill = (x, y, w, h, icon, label) => `
  <g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="${w}" height="${h}" rx="${h / 2}" ry="${h / 2}"
          fill="white" stroke="${ACCENT_SOFT}" stroke-width="1.5"/>
    <g transform="translate(28 ${(h - 28) / 2}) scale(${28 / 24})" color="${ACCENT}">${ICONS[icon]}</g>
    <text x="72" y="${h / 2 + 7}" font-family="Inter, system-ui, sans-serif"
          font-size="22" font-weight="600" fill="${INK}">${label}</text>
  </g>`

// Compose
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="${BG_2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.2" r="0.6">
      <stop offset="0" stop-color="${ACCENT_SOFT}" stop-opacity="1"/>
      <stop offset="1" stop-color="${ACCENT_SOFT}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="${ACCENT}" fill-opacity=".18"/>
    </pattern>
  </defs>

  <!-- background layers -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- decorative dot field, top-right -->
  <rect x="780" y="60" width="380" height="180" fill="url(#dots)" opacity=".9"/>

  <!-- decorative outline rings, bottom-right (echoes the logo iris) -->
  <g transform="translate(990 470)" opacity=".55">
    <circle r="180" fill="none" stroke="${ACCENT}" stroke-width="1.5" stroke-opacity=".25"/>
    <circle r="120" fill="none" stroke="${ACCENT}" stroke-width="1.5" stroke-opacity=".35"/>
    <circle r="60"  fill="none" stroke="${ACCENT}" stroke-width="2"   stroke-opacity=".55"/>
    <circle r="22"  fill="${ACCENT}" fill-opacity=".18"/>
  </g>

  <!-- top-left brand row -->
  ${logo(72, 50, 82)}
  ${pathText([{ text: 'Titan ', fill: INK }, { text: 'Eye', fill: ACCENT }], 164, 96, 38, -1.2)}
  <text x="164" y="126" font-family="Inter, system-ui, sans-serif"
        font-size="14" font-weight="700" fill="${INK_2}" letter-spacing="2.4">EYE CARE · ARLINGTON, TX</text>

  <!-- main headline -->
  <text x="72" y="270" font-family="Inter, system-ui, sans-serif"
        font-size="76" font-weight="800" fill="${INK}" letter-spacing="-2">Friendly eye care</text>
  <text x="72" y="354" font-family="Inter, system-ui, sans-serif"
        font-size="76" font-weight="800" fill="${INK}" letter-spacing="-2">for the
    <tspan fill="${ACCENT}"> whole family.</tspan>
  </text>

  <!-- service pills -->
  ${pill(72,  430, 280, 64, 'eye', 'Eye exams')}
  ${pill(372, 430, 270, 64, 'glasses', 'Glasses')}
  ${pill(662, 430, 270, 64, 'contact', 'Contact lenses')}

  <!-- location chip -->
  <g transform="translate(72 532)">
    <rect width="430" height="44" rx="22" fill="${INK}"/>
    <g transform="translate(16 10) scale(${24 / 24})" color="#FFC220">${ICONS.pin}</g>
    <text x="50" y="29" font-family="Inter, system-ui, sans-serif"
          font-size="16" font-weight="500" fill="white">Inside Walmart Supercenter · 4800 US Hwy 287</text>
  </g>

  <!-- accent stripe along the bottom -->
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${ACCENT}"/>
</svg>`

const svgPath = path.join(root, 'public', 'og-image.svg')
const pngPath = path.join(root, 'public', 'og-image.png')

await writeFile(svgPath, svg, 'utf8')
console.log('wrote', svgPath)

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(pngPath)

const meta = await sharp(pngPath).metadata()
console.log('wrote', pngPath, `${meta.width}x${meta.height}`)
