import Image from 'next/image'

interface InsuranceProps {
  insurance?: {
    images?: (string | null)[] | null
  } | null
}

export default function Insurance({ insurance }: InsuranceProps) {
  if (!insurance?.images) return null

  return (
    <section className="bg-primary">
      <div className="container px-12 pt-16 pb-8 mx-auto text-white md:py-16 md:px-8">
        <h2 className="pb-8 text-2xl font-semibold tracking-widest text-center lg:text-3xl">
          Insurances Accepted
        </h2>
        <div className="flex flex-wrap justify-center">
          {insurance.images.filter(image => image !== null).map((image, idx: number) => (
            <div
              key={idx}
              className="flex items-center w-full px-8 py-6 mb-8 bg-white rounded-lg shadow-md md:w-1/3 md:mx-2 lg:w-1/4 xl:w-1/5"
            >
              <Image
                src={image}
                alt={`Insurance provider ${idx + 1}`}
                width={200}
                height={100}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

