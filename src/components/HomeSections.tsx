'use client'

import { useCallback, useEffect, useState } from 'react'
import { About } from './site/About'
import { BookingModal } from './site/BookingModal'
import { Contact } from './site/Contact'
import { CTABand } from './site/CTABand'
import { FAQ } from './site/FAQ'
import { Footer } from './site/Footer'
import { Announcement, Drawer, Nav } from './site/Header'
import { Hero } from './site/Hero'
import { HoursLocation } from './site/HoursLocation'
import { Insurance } from './site/Insurance'
import { Services } from './site/Services'
import type { AnyObj } from './site/Types'
import { ValueStrip } from './site/ValueStrip'

type Props = {
  data: AnyObj
  settings: AnyObj
}

export default function HomeSections({ data, settings }: Props) {
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const onBook = useCallback(() => setModal(true), [])
  const closeModal = useCallback(() => setModal(false), [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const phoneRaw = settings?.phone || ''
  const phoneDisplay = settings?.phoneDisplay || phoneRaw
  const bookingUrl = settings?.bookingUrl || '#'

  return (
    <>
      <Announcement a={data?.announcement} phone={phoneRaw} />
      <Nav settings={settings} onBook={onBook} onMenu={() => setDrawer(true)} />
      <Drawer open={drawer} onClose={() => setDrawer(false)} onBook={onBook} settings={settings} />
      <Hero hero={data?.hero} onBook={onBook} phone={phoneRaw} settings={settings} />
      <ValueStrip items={data?.valueProps || []} />
      <Services s={data?.servicesSection} />
      <HoursLocation
        section={data?.hoursSection}
        settings={settings}
        onBook={onBook}
        phoneRaw={phoneRaw}
      />
      <Insurance ins={data?.insurance} phone={phoneRaw} />
      <FAQ faq={data?.faq} />
      <Contact contact={data?.contact} settings={settings} />
      <About about={data?.about} />
      <CTABand cta={data?.cta} onBook={onBook} phone={phoneRaw} phoneDisplay={phoneDisplay} />
      <Footer settings={settings} onBook={onBook} />
      <BookingModal open={modal} onClose={closeModal} bookingUrl={bookingUrl} phoneRaw={phoneRaw} phoneDisplay={phoneDisplay} />
    </>
  )
}
