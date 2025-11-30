import Image from 'next/image'

interface StaffProps {
  staff?: Array<{
    name?: string | null
    title?: string | null
    image?: string | null
  } | null> | null
}

export default function Staff({ staff }: StaffProps) {
  if (!staff) return null

  return (
    <section className="pt-16 pb-8 text-blue-100 bg-primary">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center md:content-center md:px-16">
          {staff.filter(member => member !== null).map((member, idx) => (
            <div key={idx} className="flex items-center pb-8 pl-8 md:w-1/2 md:px-2 xl:w-1/3">
              <div className="flex-none w-24 h-24 overflow-hidden rounded-full shadow-inner relative">
                {member.image && (
                  <Image
                    src={member.image}
                    alt={member.name || ''}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-shrink pl-8 text-left">
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p>{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

