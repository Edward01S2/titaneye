import Image from 'next/image'

interface ServicesProps {
  services?: {
    item1?: string | null
    text1?: string | null
    item2?: string | null
    text2?: string | null
    item3?: string | null
    text3?: string | null
    image?: string | null
  } | null
}

export default function Services({ services }: ServicesProps) {
  if (!services) return null

  return (
    <section id="services" className="-mt-12 text-center md:mx-8 xl:bg-transparent xl:mt-0 relative z-20">
      <div className="container mx-auto px-4">
        <div className="md:-mt-24">
          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Service 1 - Eye Checkups */}
            <div className="flex flex-col bg-white rounded-lg shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <svg
                    className="w-16 h-16 fill-current text-primary"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="50" cy="50" r="50" />
                  </svg>
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white stroke-current"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {services.item1}
              </h3>
              <p className="leading-relaxed text-gray-700">
                {services.text1}
              </p>
            </div>

            {/* Service 2 - Contact Fittings */}
            <div className="flex flex-col bg-white rounded-lg shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <svg
                    className="w-16 h-16 fill-current text-primary"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="50" cy="50" r="50" />
                  </svg>
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white stroke-current"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {services.item2}
              </h3>
              <p className="leading-relaxed text-gray-700">
                {services.text2}
              </p>
            </div>

            {/* Service 3 - Other Services */}
            <div className="flex flex-col bg-white rounded-lg shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <svg
                    className="w-16 h-16 fill-current text-primary"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="50" cy="50" r="50" />
                  </svg>
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white stroke-current"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {services.item3}
              </h3>
              <p className="leading-relaxed text-gray-700">
                {services.text3}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

