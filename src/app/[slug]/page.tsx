import Link from 'next/link'
import { notFound } from 'next/navigation'
import client from '@/tina/__generated__/client'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

const PAGE_DESCRIPTIONS: Record<string, string> = {
  privacy: 'Read the Titan Eye Care privacy policy for website visitors and patients in Arlington, TX.',
}

const RESERVED_SLUGS = new Set(['404', 'favicon.ico', 'robots.txt', 'sitemap.xml'])
const isReservedSlug = (slug: string) => slug.includes('.') || RESERVED_SLUGS.has(slug)

export async function generateStaticParams() {
  const { data } = await client.queries.pagesConnection()
  const pages = data.pagesConnection.edges || []
  return pages.map((page) => ({ slug: page?.node?._sys.filename }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (isReservedSlug(slug)) return {}
  try {
    const { data } = await client.queries.pages({ relativePath: `${slug}.md` })
    const title = `${data.pages.title} - Titan Eye Care`
    const description = PAGE_DESCRIPTIONS[slug] || `Read ${data.pages.title} from Titan Eye Care.`
    return {
      title,
      description,
      alternates: {
        canonical: `/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `/${slug}`,
        images: ['/og-image.png'],
      },
      twitter: {
        title,
        description,
        images: ['/og-image.png'],
      },
    }
  } catch {
    return {}
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (isReservedSlug(slug)) notFound()

  try {
    const { data } = await client.queries.pages({ relativePath: `${slug}.md` })
    const page = data.pages
    return (
      <main className="min-h-screen bg-bg2">
        <div className="max-w-[900px] mx-auto px-6 py-16">
          <div className="bg-white rounded-cardLg border border-line p-8 md:p-14">
            <Link
              href="/"
              className="inline-flex items-center text-accent hover:underline mb-6 text-sm font-semibold"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold tracking-tight mb-8">{page.title}</h1>
            <div className="prose prose-gray max-w-none">
              <TinaMarkdown content={page.body} />
            </div>
          </div>
        </div>
      </main>
    )
  } catch {
    notFound()
  }
}
