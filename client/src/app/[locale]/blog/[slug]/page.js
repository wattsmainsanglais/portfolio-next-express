import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/blog'
import awattsdevImg from '../../../../../public/images/nologo.svg'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const baseUrl = 'https://www.awattsdev.eu'

  return {
    title: `${post.title} | awattsdev`,
    description: post.description,
    alternates: {
      canonical: `${baseUrl}/en/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/en/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default async function BlogPost({ params }) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-brand-50 to-white dark:from-slate-900 dark:via-brand-900 dark:to-slate-900">
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
          <Link
            href={`/${locale}/blog`}
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            ← All posts
          </Link>
        </div>
      </header>

      {/* Article */}
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Post meta */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Post content */}
        <div
          className="prose prose-slate dark:prose-invert prose-headings:font-semibold prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-strong:text-slate-900 dark:prose-strong:text-white prose-hr:border-slate-300 dark:prose-hr:border-slate-700 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <Link
            href={`/${locale}/blog`}
            className="text-sm text-brand-600 dark:text-brand-400 hover:underline"
          >
            ← Back to all posts
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-500">
        <p>© {new Date().getFullYear()} awattsdev — Andrew Watts, Nouvelle-Aquitaine, France</p>
      </footer>
    </div>
  )
}
