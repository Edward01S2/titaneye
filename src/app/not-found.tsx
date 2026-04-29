import { NotFoundPage } from '@/components/NotFoundPage'
import client from '@/tina/__generated__/client'

export default async function NotFound() {
  const { data } = await client.queries.home({ relativePath: 'home.md' })
  const { data: settingsData } = await client.queries.settings({ relativePath: 'site.md' })

  return (
    <NotFoundPage
      announcement={(data.home as any).announcement}
      settings={(settingsData.settings as any).settings}
    />
  )
}
