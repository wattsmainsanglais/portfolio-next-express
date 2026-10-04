import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostBySlug, formatDate } from '@/lib/blog'
import awattsdevImg from '../../../../../public/images/nologo.svg'
import { getTranslations } from 'next-intl/server'
import LanguageSwitcher from '../../_components/language/LanguageSwitcher'

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
    },
  }
}

export default async function BlogPost({ params }) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)

  if (!post) notFound()

  const t = await getTranslations({ locale, namespace: 'Blog' })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-brand-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              alt="Awattsdev Logo"
              src={awattsdevImg}
              className="w-48 h-auto"
              sizes="200px"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/blog`}
              className="text-sm text-slate-600 hover:text-brand-600 transition-colors"
            >
              {t('allPosts')}
            </Link>
            <LanguageSwitcher locale={locale} textClassName="text-slate-700" />
          </div>
        </div>
      </header>

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

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-8 border-t border-slate-200 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} awattsdev — Andrew Watts, Nouvelle-Aquitaine, France</p>
      </footer>
    </div>
  )
}
