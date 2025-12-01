import Image from 'next/image'

interface TeamProps {
  doctors?: Array<{
    name?: string | null
    title?: string | null
    image?: string | null
    bio?: string | null
  } | null> | null
}

export default function Team({ doctors }: TeamProps) {
  if (!doctors) return null

  return (
    <section id="team" className="pt-16 xl:pt-24">
      <div className="container mx-auto text-center xl:pb-8">
        <h2 className="pb-12 text-4xl font-semibold tracking-widest text-center uppercase lg:pb-8">
          Our Team
        </h2>
        {doctors.filter(doc => doc !== null).map((doc, idx) => (
          <div key={idx} className="flex flex-col items-center pb-8 lg:flex-row lg:pl-8">
            <div
              className="flex-none w-64 h-64 overflow-hidden rounded-full shadow-inner relative"
            >
              {doc.image && (
                <Image
                  src={doc.image}
                  alt={doc.name || ''}
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-shrink p-8 text-left md:px-16">
              <h4 className="inline-block mb-4 text-2xl font-bold border-b-4 border-primary">
                {doc.name} <span className="text-base font-normal">{doc.title}</span>
              </h4>
              <p className="pb-2 text-gray-700 whitespace-pre-line">{doc.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

