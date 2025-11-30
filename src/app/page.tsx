import client from '@/tina/__generated__/client'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Appointments from '@/components/Appointments'
import Insurance from '@/components/Insurance'
import About from '@/components/About'
import Team from '@/components/Team'
import Staff from '@/components/Staff'
import Contact from '@/components/Contact'
import BottomBanner from '@/components/BottomBanner'
import Footer from '@/components/Footer'

export default async function Home() {
  const { data } = await client.queries.home({ relativePath: 'home.md' })
  const page = data.home
  
  // Get settings for contact info
  const { data: settingsData } = await client.queries.settings({ relativePath: 'site.md' })
  const settings = settingsData.settings.settings
  
  // Get staff data
  const { data: staffData } = await client.queries.staff({ relativePath: 'staff.md' })
  const staff = staffData.staff
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero hero={page.hero} />
        <Services services={page.services} />
        <Appointments appointment={page.appointment} phone={settings?.phone} />
        <Insurance insurance={page.insurance} />
        <About settings={settings} />
        <Team doctors={staff.doctors} />
        <Staff staff={staff.staff} />
        <Contact phone={settings?.phone} />
        <BottomBanner image={page.image2} />
      </main>
      <Footer settings={settings} />
    </>
  )
}

