import Link from 'next/link'
import client from '@/tina/__generated__/client'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export async function generateStaticParams() {
  const { data } = await client.queries.pagesConnection()
  const pages = data.pagesConnection.edges || []
  
  return pages.map((page) => ({
    slug: page?.node?._sys.filename,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data } = await client.queries.pages({ relativePath: `${slug}.md` })
  
  return {
    title: `${data.pages.title} - Titan Eye Care`,
    description: data.pages.title,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data } = await client.queries.pages({ relativePath: `${slug}.md` })
  const page = data.pages

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-16">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:underline mb-8"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-primary mb-8">{page.title}</h1>
          
          <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-strong:text-gray-900">
            <TinaMarkdown content={page.body} />
          </div>
        </div>
      </div>
    </main>
  )
}

