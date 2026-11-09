import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'
import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Blog' })
  const baseUrl = 'https://www.awattsdev.eu'

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    // Override the layout's homepage canonical
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        'en': `${baseUrl}/en/blog`,
        'fr': `${baseUrl}/fr/blog`,
        'x-default': `${baseUrl}/en/blog`,
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${baseUrl}/${locale}/blog`,
      siteName: 'awattsdev',
      images: [{ url: '/images/awattsdev.png', width: 3163, height: 792, alt: 'awattsdev' }],
    },
  }
}

export default async function BlogIndex({ params }) {
  const { locale } = await params
  const posts = getAllPosts(locale)
  const t = await getTranslations({ locale, namespace: 'Blog' })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-brand-50 to-white">

      {/* Blog index */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          Blog
        </h1>
        <p className="text-slate-600 mb-12 text-lg">
          {t('intro')}
        </p>

        <div className="flex flex-col gap-8">
          {posts.map(post => (
            <article key={post.slug}>
              <Link href={`/${locale}/blog/${post.slug}`}>
                <div className="group p-6 rounded-xl border border-slate-200 bg-white/60 hover:border-brand-400 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span>{formatDate(post.date, locale)}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all mt-1 shrink-0"
                    />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

    </div>
  )
}
