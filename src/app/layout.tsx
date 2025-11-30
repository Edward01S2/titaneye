import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Titan Eye Care',
  description: 'For all your vision needs. We are not only able to provide you with a prescription best fitting for your vision but we also provide specialized care to help manage ocular diseases.',
  icons: {
    icon: '/img/ta_favicon.png',
    apple: '/img/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

