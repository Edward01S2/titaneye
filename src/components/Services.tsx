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
      <div className="container mx-auto bg-white rounded-lg md:-mt-24 md:shadow-lg md:border md:border-gray-100">
        <div className="flex px-8 py-8 md:py-8 lg:p-8 xl:px-16 xl:py-10">
          {/* Services List */}
          <div className="flex flex-col lg:w-1/2 lg:pr-16">
            <h2 className="text-3xl font-semibold tracking-widest text-center uppercase md:pb-0 xl:pb-4 xl:text-4xl">
              Services
            </h2>

            {/* Service 1 - Eye Checkups */}
            <div className="py-4 border-b-2 border-gray-200 lg:py-4">
              <div className="flex items-center content-center mb-4 lg:mb-4">
                <div className="relative mr-4 flex-shrink-0">
                  <svg
                    className="w-10 h-10 fill-current text-primary"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="50" cy="50" r="50" />
                  </svg>
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white stroke-current"
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
                <h3 className="text-lg font-medium text-gray-800">
                  {services.item1}
                </h3>
              </div>
              <p className="leading-relaxed text-left text-gray-700 lg:text-sm xl:text-base">
                {services.text1}
              </p>
            </div>

            {/* Service 2 - Contact Fittings */}
            <div className="py-8 border-b-2 border-gray-200">
              <div className="flex items-center content-center mb-4">
                <div className="relative mr-4 flex-shrink-0">
                  <svg
                    className="w-10 h-10 fill-current text-primary"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="50" cy="50" r="50" />
                  </svg>
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white stroke-current"
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
                <h3 className="text-lg font-medium text-gray-800">
                  {services.item2}
                </h3>
              </div>
              <p className="leading-relaxed text-left text-gray-700 lg:text-sm xl:text-base">
                {services.text2}
              </p>
            </div>

            {/* Service 3 - Other Services */}
            <div className="py-8">
              <div className="flex items-center content-center mb-4">
                <div className="relative mr-4 flex-shrink-0">
                  <svg
                    className="w-10 h-10 fill-current text-primary"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="50" cy="50" r="50" />
                  </svg>
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white stroke-current"
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
                <h3 className="text-lg font-medium text-gray-800">
                  {services.item3}
                </h3>
              </div>
              <p className="leading-relaxed text-left text-gray-700 lg:text-sm xl:text-base">
                {services.text3}
              </p>
            </div>
          </div>

          {/* Side Image */}
          {services.image && (
            <div className="hidden lg:w-1/2 lg:block">
              <div className="relative w-full h-full min-h-[400px]">
                <Image
                  src={services.image}
                  alt="Medical services"
                  fill
                  className="object-contain rounded"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

