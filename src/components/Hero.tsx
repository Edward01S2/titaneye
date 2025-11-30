import Image from 'next/image'

interface HeroProps {
  hero?: {
    title?: string | null
    image?: string | null
  } | null
}

export default function Hero({ hero }: HeroProps) {
  if (!hero) return null

  return (
    <section className="relative z-0 h-[calc(100vh-10rem)] md:h-[calc(100vh-5rem)] flex items-center justify-center text-white">
      {hero.image && (
        <Image
          src={hero.image}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="relative z-10 text-center p-4">
        <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-bold font-optician tracking-widest leading-none">
          {hero.title}
        </h1>
      </div>
    </section>
  )
}

