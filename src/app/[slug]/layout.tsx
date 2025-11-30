import PageNavbar from '@/components/PageNavbar'
import Footer from '@/components/Footer'
import client from '@/tina/__generated__/client'

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get settings for footer
  const { data: settingsData } = await client.queries.settings({ relativePath: 'site.md' })
  const settings = settingsData.settings.settings

  return (
    <>
      <PageNavbar />
      {children}
      <Footer settings={settings} />
    </>
  )
}

