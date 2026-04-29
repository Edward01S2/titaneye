'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { BookingModal } from '@/components/site/BookingModal'
import { Footer } from '@/components/site/Footer'
import { Announcement, Drawer, Nav } from '@/components/site/Header'
import type { AnyObj } from '@/components/site/Types'

export function NotFoundPage({ announcement, settings }: { announcement?: AnyObj; settings: AnyObj }) {
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const onBook = useCallback(() => setModal(true), [])
  const closeModal = useCallback(() => setModal(false), [])

  const phoneRaw = settings?.phone || ''
  const phoneDisplay = settings?.phoneDisplay || phoneRaw
  const bookingUrl = settings?.bookingUrl || '#'

  return (
    <>
      <Announcement a={announcement} phone={phoneRaw} />
      <Nav settings={settings} onBook={onBook} onMenu={() => setDrawer(true)} anchorPrefix="/" />
      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        onBook={onBook}
        settings={settings}
        anchorPrefix="/"
      />
      <main className="min-h-[70vh] bg-linear-to-b from-bg2 to-white flex items-center">
        <section className="max-w-3xl mx-auto px-5 sm:px-8 py-20 text-center">
          <div className="mx-auto mb-6 size-16 rounded-full bg-accent-soft text-accent inline-flex items-center justify-center">
            <Icon name="eye" size={30} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">404</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
            This page is out of sight.
          </h1>
          <p className="text-lg leading-relaxed text-ink2 max-w-xl mx-auto mb-8">
            The page you were looking for may have moved. Head back home or call Titan Eye Care and we&apos;ll help you find what you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight border-2 transition-all whitespace-nowrap py-4 px-7 text-base bg-accent text-white! border-accent hover:bg-accent-deep hover:border-accent-deep hover:-translate-y-px"
            >
              Back home <Icon name="arrow" size={16} />
            </Link>
            <a
              href={`tel:${phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight border-2 transition-all whitespace-nowrap py-4 px-7 text-base bg-white text-ink border-line-strong hover:border-ink hover:bg-bg2"
            >
              <Icon name="phone" size={16} /> Call us
            </a>
          </div>
        </section>
      </main>
      <Footer settings={settings} onBook={onBook} anchorPrefix="/" />
      <BookingModal
        open={modal}
        onClose={closeModal}
        bookingUrl={bookingUrl}
        phoneRaw={phoneRaw}
        phoneDisplay={phoneDisplay}
      />
    </>
  )
}
