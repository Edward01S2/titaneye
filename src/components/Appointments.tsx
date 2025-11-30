import Image from 'next/image'

interface AppointmentsProps {
  appointment?: {
    image?: string | null
    patient?: string | null
  } | null
  phone?: string | null
  bookingUrl?: string | null
}

export default function Appointments({ appointment, phone, bookingUrl }: AppointmentsProps) {
  if (!appointment) return null

  return (
    <section id="appts" className="bg-white">
      <div className="container mx-auto md:mt-8">
        <div className="flex flex-col p-8 py-24 md:py-16 md:items-center lg:flex-row">
          <div className="md:w-1/2 md:p-8 md:pt-0">
            {appointment.image && (
              <Image
                src={appointment.image}
                alt="Appointments"
                width={600}
                height={600}
                className="w-full h-full"
              />
            )}
          </div>
          <div className="pt-16 md:w-1/2 md:pt-0">
            <div className="text-center">
              <h2 className="pb-8 text-2xl font-semibold tracking-widest text-center uppercase md:mt-8">
                Appointments
              </h2>
              <p className="pb-8 text-lg leading-relaxed text-gray-700">
                Ready to make your appointment? Download the{' '}
                {appointment.patient && (
                  <a
                    href={appointment.patient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    new patient form
                  </a>
                )}{' '}
                and bring it with you. You can call us at{' '}
                <a href={`tel:${phone}`} className="text-primary hover:underline">
                  {phone && formatPhone(phone)}
                </a>{' '}
                or book an appointment online below.
              </p>
              {bookingUrl && (
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  <button className="px-6 py-4 text-lg font-bold tracking-wider text-white uppercase rounded shadow-lg bg-primary hover:bg-opacity-90">
                    Book Appointment
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function formatPhone(num: string) {
  const cleaned = num.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return num
}

