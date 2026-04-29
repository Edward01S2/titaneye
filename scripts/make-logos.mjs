// Generates Titan Eye Care logo variations.
// Inspired by the user's reference: circular dotty mark + two-tone wordmark.
// Outputs: public/logos/<name>.svg, public/logos/<name>.png (2x), and
//          public/logos/index.html for side-by-side preview on light + dark.
//
// Run: node scripts/make-logos.mjs

import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'logos')

// Palette (echoes the reference's navy + teal feel, but uses Titan Eye's accent
// blue as a third option so each variant works against the rest of the site).
const NAVY = '#0A2342'
const NAVY_INK = '#1A2538' // matches globals.css --color-ink
const TEAL = '#04B0C6'     // legacy site primary
const TEAL_DEEP = '#067E8C'
const BLUE = '#1F6FEB'     // current accent
const SOFT = '#E7F0FE'

// Wordmark font directions — all mixed-case 700 (matching the picked B style),
// only the typeface changes. Family fallbacks chosen so PNG rendering via
// sharp/librsvg degrades gracefully when a face isn't installed locally; the
// browser preview loads the real fonts via Google Fonts in index.html.
const FONTS = {
  inter:    "Inter, system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
  manrope:  "Manrope, Inter, system-ui, sans-serif",
  jakarta:  "'Plus Jakarta Sans', Inter, system-ui, sans-serif",
  dmsans:   "'DM Sans', Inter, system-ui, sans-serif",
  outfit:   "Outfit, Inter, system-ui, sans-serif",
  sora:     "Sora, Inter, system-ui, sans-serif",
}
// Tracking adjusted per face — geometric faces feel right slightly tighter,
// rounded faces (Outfit, DM Sans) need a touch less negative tracking.
const TRACKING = {
  inter: -2.5,
  manrope: -2.2,
  jakarta: -2.0,
  dmsans: -1.4,
  outfit: -1.6,
  sora: -2.0,
}

// --- Themes (pulled from src/app/globals.css) -------------------------------
// LIGHT: white background, ink text, brand blue accent.
// DARK : navy background, white text — using the SAME blue as light so brand
//        identity stays consistent. Only the dot-ring color and text color
//        flip; the inner eye is locked (see EYE constants below) so the
//        composition reads identically in both modes.
const LIGHT = {
  name: 'light',
  bg: '#FFFFFF',
  ink: '#1A2538',           // --color-ink
  ink2: '#455062',          // --color-ink2
  muted: '#6B7588',         // --color-muted
  accent: '#1F6FEB',        // --color-accent
  ringDark: '#1A2538',      // 4 of the 8 surrounding dots
  ringLight: '#1F6FEB',     // the other 4 surrounding dots
}
const DARK = {
  name: 'dark',
  bg: '#0F1828',            // a hair deeper than ink for the canvas
  ink: '#FFFFFF',
  ink2: '#C7D3E3',          // --color-line-strong
  muted: '#8A95A8',
  accent: '#1F6FEB',        // SAME blue as light — consistent brand
  ringDark: '#FFFFFF',      // dots that were ink in light → white in dark
  ringLight: '#1F6FEB',     // accent dots stay accent
}

// The inner eye is theme-independent: locked to the brand blue iris with a
// dark pupil and a white catchlight. This is what the user asked for — the
// inner eye should look the same in both modes (no double-white pupil).
const EYE_IRIS = '#1F6FEB'
const EYE_STROKE = '#1A2538'
const EYE_PUPIL = '#1A2538'
const EYE_CATCHLIGHT = '#FFFFFF'

// --- Mark builders -----------------------------------------------------------
// All marks are drawn on a 64x64 viewBox so they can be scaled freely.

// 1. Direct homage to the reference: a big dark circle whose iris is two
//    bright dots, plus a smaller satellite circle to the lower-right.
const markDots = (dark, light) => `
  <circle cx="26" cy="32" r="22" fill="${dark}"/>
  <circle cx="20" cy="26" r="5"  fill="${light}"/>
  <circle cx="32" cy="36" r="3"  fill="${light}"/>
  <circle cx="52" cy="44" r="9"  fill="${light}"/>`

// 2. Iris cluster: five overlapping circles, two-tone, looks like an abstract
//    pupil-and-highlight composition.
const markCluster = (dark, light) => `
  <circle cx="22" cy="22" r="14" fill="${dark}"/>
  <circle cx="40" cy="28" r="10" fill="${light}"/>
  <circle cx="30" cy="44" r="12" fill="${dark}" fill-opacity=".85"/>
  <circle cx="48" cy="48" r="6"  fill="${light}"/>
  <circle cx="14" cy="42" r="4"  fill="${light}" fill-opacity=".7"/>`

// 3. Concentric ring + offset pupil — closest to the favicon already shipping,
//    re-colored so it reads against the wordmark.
const markRings = (dark, light) => `
  <circle cx="32" cy="32" r="28" fill="${light}" fill-opacity=".25"/>
  <circle cx="32" cy="32" r="28" fill="none" stroke="${dark}" stroke-width="3"/>
  <circle cx="32" cy="32" r="14" fill="${dark}"/>
  <circle cx="38" cy="26" r="4"  fill="${light}"/>`

// 4. Aperture iris — N circles arranged on a circular orbit around a center.
//    `ringDark`/`ringLight` color the 8 surrounding dots (theme-driven).
//    The center 'eye' composition uses fixed brand colors so it reads the
//    same in both light and dark mode.
const markAperture = (
  ringDark,
  ringLight,
  { orbit = 18, r = 4.5, count = 8, pupil = 8, center = 'eye' } = {}
) => {
  const cx = 32, cy = 32
  const dots = []
  for (let i = 0; i < count; i++) {
    const a = ((i * (360 / count)) - 90) * (Math.PI / 180)
    const x = cx + Math.cos(a) * orbit
    const y = cy + Math.sin(a) * orbit
    const fill = i % 2 === 0 ? ringDark : ringLight
    dots.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r}" fill="${fill}"/>`)
  }

  let middle
  if (center === 'eye') {
    // Iris (brand blue) → pupil (ink) → catchlight (white). Theme-independent.
    const iris = pupil
    const pup = pupil * 0.5
    const cl = pupil * 0.18
    middle = `
    <circle cx="${cx}" cy="${cy}" r="${iris}"   fill="${EYE_IRIS}" stroke="${EYE_STROKE}" stroke-width="0.9"/>
    <circle cx="${cx}" cy="${cy}" r="${pup.toFixed(2)}" fill="${EYE_PUPIL}"/>
    <circle cx="${(cx + iris * 0.35).toFixed(2)}" cy="${(cy - iris * 0.3).toFixed(2)}" r="${cl.toFixed(2)}" fill="${EYE_CATCHLIGHT}"/>`
  } else {
    middle = `<circle cx="${cx}" cy="${cy}" r="${pupil}" fill="${ringDark}"/>`
  }

  return `
    ${dots.join('\n    ')}${middle}`
}

// 5. Minimal monoline: thin ring + tiny dot. Pairs well with a thick wordmark.
const markMono = (dark, light) => `
  <circle cx="32" cy="32" r="26" fill="none" stroke="${dark}" stroke-width="2"/>
  <circle cx="32" cy="32" r="14" fill="none" stroke="${dark}" stroke-width="2"/>
  <circle cx="38" cy="26" r="5"  fill="${light}"/>`

// --- Wordmark templates ------------------------------------------------------
// W (canvas width) ~ 760; H ~ 200. Mark sits at left, text at right.
const W = 760
const H = 200
const MARK_SIZE = 132
const MARK_X = 18
const MARK_Y = (H - MARK_SIZE) / 2

// Embedded @import of all six Google Fonts so the SVG renders correctly when
// opened directly (browser preview, design tools, embeds). librsvg ignores
// external @import for PNG generation and falls back to the system family.
const FONT_IMPORT = `
    <style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700&amp;family=Manrope:wght@500;700&amp;family=Plus+Jakarta+Sans:wght@500;700&amp;family=DM+Sans:wght@500;700&amp;family=Outfit:wght@500;700&amp;family=Sora:wght@500;700&amp;display=swap');</style>`

// `frame` paints the canvas background (so dark-mode SVGs are dark-by-default
// when used standalone) and lays out mark + wordmark.
const frame = (markSvg, wordmark, label, theme) => `<?xml version="1.0" encoding="UTF-8"?>
<!-- ${label} -->
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${FONT_IMPORT}</defs>
  <rect width="${W}" height="${H}" fill="${theme.bg}"/>
  <g transform="translate(${MARK_X} ${MARK_Y}) scale(${MARK_SIZE / 64})">
    ${markSvg}
  </g>
  ${wordmark}
</svg>`

// All wordmarks use the same B-style mixed-case 700 layout — only the
// typeface changes. The "Eye" gap on the second word is computed from a
// per-face nudge so the visual gap stays consistent even as widths differ.
const x0 = 180
const TITAN_GAP = {
  inter: 198, manrope: 200, jakarta: 204, dmsans: 196, outfit: 200, sora: 198,
}

const wordMixed700 = (fontKey) => (t) => {
  const family = FONTS[fontKey]
  const tracking = TRACKING[fontKey]
  const gap = TITAN_GAP[fontKey]
  return `
    <text x="${x0}" y="118" font-family="${family}"
          font-size="80" font-weight="700" letter-spacing="${tracking}" fill="${t.ink}">Titan</text>
    <text x="${x0 + gap}" y="118" font-family="${family}"
          font-size="80" font-weight="700" letter-spacing="${tracking}" fill="${t.accent}">Eye</text>
    <text x="${x0}" y="156" font-family="${family}"
          font-size="18" font-weight="500" letter-spacing="5" fill="${t.muted}">EYE CARE · ARLINGTON · TX</text>`
}

const WORDMARKS = [
  { id: 'inter',   label: 'Inter — geometric neutral (current pick)',  fn: wordMixed700('inter') },
  { id: 'manrope', label: 'Manrope — humanist geometric, slightly warmer', fn: wordMixed700('manrope') },
  { id: 'jakarta', label: 'Plus Jakarta Sans — friendly modern',       fn: wordMixed700('jakarta') },
  { id: 'dmsans',  label: 'DM Sans — soft & approachable',             fn: wordMixed700('dmsans') },
  { id: 'outfit',  label: 'Outfit — rounded, clinic-friendly',         fn: wordMixed700('outfit') },
  { id: 'sora',    label: 'Sora — clean tech-medical',                 fn: wordMixed700('sora') },
]

// --- Variations --------------------------------------------------------------
// V5 mark, locked to the user's chosen geometry: 8-dot aperture, with the
// orbit pulled in so the dots sit closer to the iris (was 24 → now 18), and
// the layered eye center.
//
// Mark colors come from the theme: dark = theme.ink (the ring of dots), and
// light = theme.iris (the iris fill). On light theme that's ink + blue;
// on dark theme that's white + brightened blue.
const v5Mark = (t) =>
  markAperture(t.ringDark, t.ringLight, { orbit: 18, r: 4.5, count: 8, pupil: 8, center: 'eye' })

await mkdir(outDir, { recursive: true })

const THEMES = [LIGHT, DARK]
const RENDERED = []

for (const w of WORDMARKS) {
  for (const t of THEMES) {
    const name = `v5-${w.id}-${t.name}`
    const label = `${w.label} · ${t.name}`
    const svg = frame(v5Mark(t), w.fn(t), `V5 ${w.id} ${t.name}`, t)
    const svgPath = path.join(outDir, `${name}.svg`)
    const pngPath = path.join(outDir, `${name}.png`)
    await writeFile(svgPath, svg, 'utf8')
    await sharp(Buffer.from(svg))
      .resize({ width: W * 2 })
      .png({ compressionLevel: 9 })
      .toFile(pngPath)
    RENDERED.push({ name, label, theme: t.name })
    console.log('wrote', name)
  }
}

// --- Preview HTML ------------------------------------------------------------
// Pair each font with its light + dark version side by side.
const rows = WORDMARKS.map((w) => {
  const light = `v5-${w.id}-light`
  const dark = `v5-${w.id}-dark`
  return `
  <section class="row">
    <header><h2>${w.label}</h2>
      <code>${light}.svg / ${dark}.svg</code>
    </header>
    <div class="swatch light" title="light"><object type="image/svg+xml" data="${light}.svg"></object></div>
    <div class="swatch dark"  title="dark"><object type="image/svg+xml" data="${dark}.svg"></object></div>
  </section>`
}).join('')

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Titan Eye Care — V5 wordmark + theme variations</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=Manrope:wght@500;700&family=Plus+Jakarta+Sans:wght@500;700&family=DM+Sans:wght@500;700&family=Outfit:wght@500;700&family=Sora:wght@500;700&display=swap"/>
<style>
  :root { --line:#DFE6F0; --ink:#1A2538; --muted:#6B7588; }
  body { font: 14px/1.5 -apple-system, system-ui, sans-serif; color: var(--ink); margin: 32px; background:#fafbfc; }
  h1 { font-size: 22px; margin: 0 0 6px; }
  p.lead { color: var(--muted); margin: 0 0 28px; max-width: 820px; }
  .row { background: white; border:1px solid var(--line); border-radius: 14px; padding: 18px; margin: 0 0 18px;
         display: grid; grid-template-columns: 280px 1fr 1fr; gap: 18px; align-items: center; }
  .row header h2 { margin: 0 0 4px; font-size: 15px; }
  .row header code { color: var(--muted); font-size: 11px; word-break: break-all; }
  .swatch { border-radius: 10px; padding: 0; display:flex; align-items:stretch; justify-content:center;
            overflow: hidden; min-height: 180px; }
  .swatch.light { border: 1px solid var(--line); }
  .swatch img, .swatch object { width: 100%; height: auto; display: block; }
  @media (max-width: 900px) { .row { grid-template-columns: 1fr; } }
</style>
</head>
<body>
  <h1>Titan Eye Care — V5, mixed-case 700, six fonts</h1>
  <p class="lead">Inner eye is locked: brand blue iris (#1F6FEB) with ink pupil and white catchlight in both modes. Surrounding ring flips: ink + blue on light, white + same blue on dark. SVGs are embedded with &lt;object&gt; so the chosen webfont actually renders in the preview.</p>
  ${rows}
</body>
</html>`

await writeFile(path.join(outDir, 'index.html'), html, 'utf8')
console.log('\npreview: public/logos/index.html')
