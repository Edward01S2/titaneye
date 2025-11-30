'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface FooterProps {
  settings?: {
    phone?: string | null
    fax?: string | null
    email?: string | null
    monday?: string | null
    tuesday?: string | null
    wednesday?: string | null
    thursday?: string | null
    friday?: string | null
    saturday?: string | null
    sunday?: string | null
    bookingUrl?: string | null
  } | null
}

function formatPhone(num?: string | null) {
  if (!num) return ''
  const cleaned = ('' + num).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return null
}

export default function Footer({ settings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <footer>
      <div className="p-8 text-white bg-secondary md:p-8 lg:p-8 xl:px-0 xl:py-16">
        <div className="container mx-auto">
          <div className="flex flex-wrap md:justify-between">
            {/* Logo Section */}
            <div className="flex flex-col w-full md:w-1/5 md:items-center lg:items-start">
              <button onClick={scrollToTop} className="focus:outline-none">
                <Image
                  src="/img/titan_logo_white.svg"
                  alt="Titan Eye Care"
                  width={150}
                  height={60}
                  className="w-auto h-10 xl:h-20"
                />
              </button>
              <div className="hidden md:block md:pt-3">
                <ul className="text-sm list-reset">
                  <li className="pb-1 text-white">©{new Date().getFullYear()} Titan Eye Care</li>
                  <li>
                    <a href="/privacy" className="text-white hover:text-primary transition">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Company Links */}
            <div className="flex flex-col w-1/2 md:w-auto md:items-center">
              <ul className="p-0 m-0 list-none list-outside">
                <li className="pt-4 pb-3 md:pt-0">
                  <h4 className="text-base font-bold tracking-widest uppercase">Company</h4>
                </li>
                <li className="pb-3">
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-white hover:text-primary transition"
                  >
                    Services
                  </button>
                </li>
                <li className="pb-3">
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-white hover:text-primary transition"
                  >
                    About
                  </button>
                </li>
                <li className="pb-3">
                  <button
                    onClick={() => scrollToSection('team')}
                    className="text-white hover:text-primary transition"
                  >
                    Team
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="flex flex-col w-1/2 md:w-auto md:items-center">
              <ul className="p-0 m-0 list-none list-outside">
                <li className="pt-4 pb-3 md:pt-0">
                  <h4 className="text-base font-bold tracking-widest uppercase">Resources</h4>
                </li>
                {settings?.bookingUrl && (
                  <li className="pb-3">
                    <a
                      href={settings.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition"
                    >
                      Book Now
                    </a>
                  </li>
                )}
                <li className="pb-3">
                  <a
                    href="/img/paperwork-2019.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition"
                  >
                    New Patient Form
                  </a>
                </li>
                <li className="pb-8">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-white hover:text-primary transition"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info with Icons */}
            <div className="flex flex-col md:w-auto md:items-center">
              <ul className="p-0 m-0 list-none list-outside">
                <li className="flex items-center content-center mb-3">
                  <div className="relative mr-2">
                    <svg className="w-8 h-8 fill-current text-primary" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="50" />
                    </svg>
                    <svg
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white stroke-current"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <a className="text-white hover:text-primary" href={`tel:${settings?.phone}`}>
                    {formatPhone(settings?.phone)}
                  </a>
                </li>
                <li className="flex items-center content-center mb-3">
                  <div className="relative mr-2">
                    <svg className="w-8 h-8 fill-current text-primary" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="50" />
                    </svg>
                    <svg
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white stroke-current"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <a className="text-white hover:text-primary" href={`tel:${settings?.fax}`}>
                    {formatPhone(settings?.fax)}
                  </a>
                </li>
                <li className="flex items-center content-center mb-3">
                  <div className="relative mr-2">
                    <svg className="w-8 h-8 fill-current text-primary" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="50" />
                    </svg>
                    <svg
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white stroke-current"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <a className="text-white hover:text-primary" href={`mailto:${settings?.email}`}>
                    {settings?.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours Section */}
            <div className="hidden xl:block xl:w-1/5">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="font-semibold">Mon:</span> <span>{settings?.monday}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Tue:</span> <span>{settings?.tuesday}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Wed:</span> <span>{settings?.wednesday}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Thu:</span> <span>{settings?.thursday}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Fri:</span> <span>{settings?.friday}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Sat:</span> <span>{settings?.saturday}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Sun:</span> <span>{settings?.sunday}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

