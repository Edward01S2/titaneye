import Image from 'next/image'

interface HeroProps {
  hero?: {
    title?: string | null
    description?: string | null
    image?: string | null
  } | null
  bookingUrl?: string | null
}

export default function Hero({ hero, bookingUrl }: HeroProps) {
  if (!hero) return null

  return (
    <section className="relative z-0 h-[calc(100vh-10rem)] md:h-[calc(100vh-5rem)] flex items-center justify-center text-white">
      {hero.image && (
        <>
          <Image
            src={hero.image}
            alt="Hero background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/50 z-1" />
        </>
      )}
      <div className="relative z-10 text-center p-4 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold font-optician leading-none">
          {hero.title}
        </h1>
        {hero.description && (
          <p className="mt-6 text-xl md:text-2xl lg:text-3xl font-light tracking-wide">
            {hero.description}
          </p>
        )}
        {bookingUrl && (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 px-8 py-4 bg-primary text-white text-lg md:text-xl font-semibold rounded hover:bg-primary/90 hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            Book Now
          </a>
        )}
      </div>
    </section>
  )
}

