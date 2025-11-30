interface AboutProps {
  settings?: {
    phone?: string | null
    fax?: string | null
    email?: string | null
    address?: string | null
    monday?: string | null
    tuesday?: string | null
    wednesday?: string | null
    thursday?: string | null
    friday?: string | null
    saturday?: string | null
    sunday?: string | null
  } | null
}

export default function About({ settings }: AboutProps) {
  if (!settings) return null

  return (
    <section id="about" className="bg-gray-100">
      <div className="container flex flex-col mx-auto md:py-16 lg:px-8 xl:flex-row xl:px-0 xl:py-24">
        <div className="z-10 order-1 mx-4 mb-24 md:mx-8 md:shadow-lg md:mb-0 md:px-0 lg:mx-0 lg:px-0 xl:w-1/2">
          <div className="w-full h-64 lg:h-72 xl:h-full">
            <iframe
              title="google-map"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=4800+US+Highway+287,Arlington,TX+76017"
              width="100%"
              height="100%"
              style={{ border: 0 }}
            />
          </div>
        </div>
        <div className="flex flex-col content-center justify-center mx-4 mt-16 text-gray-800 bg-white rounded-t-lg shadow-lg order-0 md:mx-8 md:my-0 lg:mx-0 xl:w-1/2">
          <div className="z-0 p-8 pb-12 md:px-8 md:pt-12 md:pb-8">
            <h2 className="pb-8 text-4xl font-semibold tracking-widest text-center text-black uppercase">
              Titan Eye Care
            </h2>
            <div className="flex flex-col content-center justify-center md:flex-row">
              <div className="pb-4 lg:w-1/3 xl:w-1/2">
                <ul>
                  <li className="flex items-center content-center mb-6">
                    <div className="relative mr-2">
                      <svg className="w-8 h-8 fill-current text-primary" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50" />
                      </svg>
                      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <a href={`tel:${settings?.phone}`}>{settings?.phone && `(${settings.phone.slice(0, 3)}) ${settings.phone.slice(3, 6)}-${settings.phone.slice(6, 10)}`}</a>
                  </li>
                  <li className="flex items-center content-center mb-6">
                    <div className="relative mr-2">
                      <svg className="w-8 h-8 fill-current text-primary" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50" />
                      </svg>
                      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>{settings?.fax && `(${settings.fax.slice(0, 3)}) ${settings.fax.slice(3, 6)}-${settings.fax.slice(6, 10)}`}</span>
                  </li>
                  <li className="flex items-center content-center mb-6">
                    <div className="relative mr-2">
                      <svg className="w-8 h-8 fill-current text-primary" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50" />
                      </svg>
                      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <a href={`mailto:${settings?.email}`}>{settings?.email}</a>
                  </li>
                </ul>
                <p className="leading-loose whitespace-pre-line">{settings?.address}</p>
              </div>
              <div className="md:w-1/2 md:pl-12 lg:w-1/3 lg:p-0 xl:w-1/2">
                <h3 className="pb-2 font-semibold text-left text-black">Hours</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="font-semibold">Monday:</span> <span>{settings?.monday}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Tuesday:</span> <span>{settings?.tuesday}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Wednesday:</span> <span>{settings?.wednesday}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Thursday:</span> <span>{settings?.thursday}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Friday:</span> <span>{settings?.friday}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Saturday:</span> <span>{settings?.saturday}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Sunday:</span> <span>{settings?.sunday}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

