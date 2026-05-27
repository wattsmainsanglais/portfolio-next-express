import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, formatDate } from '@/lib/blog'
import awattsdevImg from '../../../../public/images/nologo.svg'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Blog | awattsdev — Web Development Insights',
  description: 'Practical articles on web development, working with developers vs designers, and building a professional online presence for your business.',
}

export default function BlogIndex({ params }) {
  const posts = getAllPosts()

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
            href="/"
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      {/* Blog index */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Blog
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-12 text-lg">
          Practical writing on web development, working online, and building a professional presence for your business.
        </p>

        <div className="flex flex-col gap-8">
          {posts.map(post => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <div className="group p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-500">
                        <span>{formatDate(post.date)}</span>
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

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-12 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-500">
        <p>© {new Date().getFullYear()} awattsdev — Andrew Watts, Nouvelle-Aquitaine, France</p>
      </footer>
    </div>
  )
}
