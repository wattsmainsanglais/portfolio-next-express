import { getAllPosts } from '@/lib/blog'
import { ROUTES, absUrl, BASE_URL } from '@/lib/routes'

// Priority per page: the two local service pages matter most after the homepage
const PRIORITY = {
  home: 1,
  websites: 0.9,
  itSupport: 0.9,
  webApps: 0.8,
  aiWorkshop: 0.7,
  work: 0.7,
  about: 0.6,
  contact: 0.7,
  blog: 0.8,
  discoveryCall: 0.8,
}

export default function sitemap() {
  const baseUrl = BASE_URL

  const posts = getAllPosts()
  // One entry per language a post is written in, each listing its alternates
  const blogUrls = posts.flatMap(post => {
    const languages = Object.fromEntries(
      post.locales.map(l => [l, `${baseUrl}/${l}/blog/${post.slug}`])
    )
    return post.locales.map(l => ({
      url: `${baseUrl}/${l}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages },
    }))
  })

  // Every page in both languages (FR first), each listing its alternates
  const pageUrls = Object.keys(ROUTES).flatMap(key => {
    const languages = { fr: absUrl('fr', key), en: absUrl('en', key), 'x-default': absUrl('fr', key) }
    return ['fr', 'en'].map(locale => ({
      url: absUrl(locale, key),
      lastModified: new Date(),
      changeFrequency: key === 'home' || key === 'blog' ? 'weekly' : 'monthly',
      priority: PRIORITY[key],
      alternates: { languages },
    }))
  })

  return [...pageUrls, ...blogUrls]
}
