import Image from 'next/image'

interface BottomBannerProps {
  image?: string | null
}

export default function BottomBanner({ image }: BottomBannerProps) {
  if (!image) return null

  return (
    <section className="relative h-64 z-0 bg-gray-50  xl:h-96">
      <Image
        src={image}
        alt="Bottom banner"
        fill
        className="object-cover"
      />
    </section>
  )
}

