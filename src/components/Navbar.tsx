'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface NavbarProps {
  bookingUrl?: string | null
}

export default function Navbar({ bookingUrl }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false) // Close menu after clicking
  }

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <nav ref={menuRef} className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center cursor-pointer">
            <Image
              src="/img/titan_logo.svg"
              alt="Titan Eye Care"
              width={150}
              height={50}
              priority
              className="w-auto h-10"
            />
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-primary transition"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-primary transition"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="text-gray-700 hover:text-primary transition"
            >
              Our Team
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-primary transition"
            >
              Contact
            </button>
            {bookingUrl && (
              <a 
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-4 font-semibold py-2 rounded hover:bg-primary/90 hover:scale-105 hover:shadow-lg transition-all duration-200"
              >
                Book Now
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-primary transition focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <div className="flex flex-col space-y-4 px-4 py-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-primary transition text-left py-2"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-primary transition text-left py-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-gray-700 hover:text-primary transition text-left py-2"
              >
                Our Team
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-primary transition text-left py-2"
              >
                Contact
              </button>
              {bookingUrl && (
                <a 
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white font-semibold px-4 py-3 rounded hover:bg-primary/90 hover:scale-105 hover:shadow-lg transition-all duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

