'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function PageNavbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-20">
          <Link href="/" className="flex items-center cursor-pointer">
            <Image
              src="/img/taeye_logo.svg"
              alt="Titan Eye Care"
              width={150}
              height={50}
              priority
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}

