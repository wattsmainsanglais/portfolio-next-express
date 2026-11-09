import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, formatDate } from '@/lib/blog'
import { getTranslations } from 'next-intl/server'
import { href } from '@/lib/routes'

export async function generateMetadata({ params }) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)
  if (!post) return {}

  const baseUrl = 'https://www.awattsdev.eu'

  // Untranslated posts fall back to English, so their canonical stays on /en
  const canonicalLocale = post.locales.includes(locale) ? locale : 'en'
  const canonical = `${baseUrl}/${canonicalLocale}/blog/${post.slug}`
  const languages = Object.fromEntries(
    post.locales.map(l => [l, `${baseUrl}/${l}/blog/${post.slug}`])
  )
  languages['x-default'] = `${baseUrl}/en/blog/${post.slug}`

  return {
    title: `${post.title} | awattsdev`,
    description: post.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: 'article',
      publishedTime: post.date,
      siteName: 'awattsdev',
      images: [{ url: '/images/awattsdev.png', width: 3163, height: 792, alt: 'awattsdev' }],
    },
  }
}

export default async function BlogPost({ params }) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)

  if (!post) notFound()

  const t = await getTranslations({ locale, namespace: 'Blog' })
  const n = await getTranslations({ locale, namespace: 'Nav' })
  const c = await getTranslations({ locale, namespace: 'Common' })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-brand-50 to-white">

      {/* Article */}
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Post meta */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>{formatDate(post.date, locale)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Post content */}
        <div
          className="prose prose-xl prose-slate prose-headings:font-semibold prose-a:text-brand-600 prose-strong:text-slate-900 prose-hr:border-slate-300 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Services: every post links to the service pages */}
        <aside className="mt-16 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white">
          <p className="text-2xl font-light mb-5">{c('ctaHeading')}</p>
          <ul className="flex flex-wrap gap-3">
            {['websites', 'itSupport', 'webApps', 'discoveryCall'].map(key => (
              <li key={key}>
                <Link href={href(locale, key)} className="inline-flex px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-lg transition-colors">
                  {key === 'discoveryCall' ? n(key) : n(`${key}Long`)} →
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link
            href={`/${locale}/blog`}
            className="text-sm text-brand-600 hover:underline"
          >
            {t('backToAllPosts')}
          </Link>
        </div>
      </main>

    </div>
  )
}
