import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

// Matches locale-suffixed files like designer-vs-developer.fr.md
const localeFileSuffix = /\.[a-z]{2}\.md$/

export function getAllPosts(locale = 'en') {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter(name => name.endsWith('.md') && !localeFileSuffix.test(name))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      const slug = data.slug || fileName.replace(/\.md$/, '')

      if (locale !== 'en') {
        const baseName = fileName.replace(/\.md$/, '')
        const localePath = path.join(postsDirectory, `${baseName}.${locale}.md`)
        if (fs.existsSync(localePath)) {
          const { data: localeData } = matter(fs.readFileSync(localePath, 'utf8'))
          return {
            slug,
            title: localeData.title || data.title,
            description: localeData.description || data.description,
            date: data.date,
            readTime: localeData.readTime || data.readTime,
          }
        }
      }

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        readTime: data.readTime,
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  return posts
}

export function getPostBySlug(slug, locale = 'en') {
  const fileNames = fs.readdirSync(postsDirectory)
  const baseFileNames = fileNames.filter(name => !localeFileSuffix.test(name))

  const baseFileName = baseFileNames.find(name => {
    const { data } = matter(fs.readFileSync(path.join(postsDirectory, name), 'utf8'))
    return (data.slug || name.replace(/\.md$/, '')) === slug
  })

  if (!baseFileName) return null

  const baseContents = fs.readFileSync(path.join(postsDirectory, baseFileName), 'utf8')
  const { data: baseData } = matter(baseContents)

  if (locale !== 'en') {
    const baseName = baseFileName.replace(/\.md$/, '')
    const localePath = path.join(postsDirectory, `${baseName}.${locale}.md`)
    if (fs.existsSync(localePath)) {
      const { data: localeData, content } = matter(fs.readFileSync(localePath, 'utf8'))
      return {
        slug,
        title: localeData.title || baseData.title,
        description: localeData.description || baseData.description,
        date: baseData.date,
        readTime: localeData.readTime || baseData.readTime,
        content: marked(content),
      }
    }
  }

  const { content } = matter(baseContents)
  return {
    slug,
    title: baseData.title,
    description: baseData.description,
    date: baseData.date,
    readTime: baseData.readTime,
    content: marked(content),
  }
}

export function formatDate(date, locale = 'en') {
  return new Date(date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
