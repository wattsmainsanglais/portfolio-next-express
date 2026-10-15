import { getAllPosts } from '@/lib/blog'

export default function sitemap() {
  const baseUrl = 'https://www.awattsdev.eu'

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

  const blogIndexLanguages = {
    'en': `${baseUrl}/en/blog`,
    'fr': `${baseUrl}/fr/blog`,
  }

  const discoveryCallLanguages = {
    'en': `${baseUrl}/en/discovery-call`,
    'fr': `${baseUrl}/fr/discovery-call`,
  }

  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: blogIndexLanguages },
    },
    {
      url: `${baseUrl}/fr/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: blogIndexLanguages },
    },
    {
      url: `${baseUrl}/en/discovery-call`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: discoveryCallLanguages },
    },
    {
      url: `${baseUrl}/fr/discovery-call`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: discoveryCallLanguages },
    },
    ...blogUrls,
  ]
}
