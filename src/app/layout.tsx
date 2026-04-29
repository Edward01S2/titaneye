import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'

// Body font — neutral geometric sans for everything except the wordmark.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

// Display font — used only for the brand wordmark in <Brand>.
const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-sora',
  display: 'swap',
})

const SITE_URL = 'https://www.titaneye.care'
const SITE_TITLE = 'Titan Eye Care — Eye exams in Arlington, TX'
const SITE_DESCRIPTION =
  'Comprehensive eye care from licensed optometrists inside the Walmart Supercenter in Arlington, TX. Walk-ins welcome, most insurance accepted.'
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Optician',
  name: 'Titan Eye Care',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  telephone: '+18175165084',
  faxNumber: '+18336054084',
  email: 'office@titaneye.care',
  priceRange: '$$',
  description: SITE_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4800 US Hwy 287',
    addressLocality: 'Arlington',
    addressRegion: 'TX',
    postalCode: '76017',
    addressCountry: 'US',
  },
  openingHours: [
    'Tu 09:30-17:30',
    'We 09:30-17:30',
    'Fr 09:30-17:30',
    'Sa 09:00-16:00',
  ],
  areaServed: ['Arlington TX', 'Mansfield TX', 'Fort Worth TX'],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/img/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Titan Eye Care',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Titan Eye Care — eye exams, glasses, and contact lenses in Arlington, TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
      </body>
    </html>
  )
}
