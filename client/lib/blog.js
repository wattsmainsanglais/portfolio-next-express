import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter(name => name.endsWith('.md'))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return {
        slug: data.slug || fileName.replace(/\.md$/, ''),
        title: data.title,
        description: data.description,
        date: data.date,
        readTime: data.readTime,
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  return posts
}

export function getPostBySlug(slug) {
  const fileNames = fs.readdirSync(postsDirectory)

  const fileName = fileNames.find(name => {
    const fullPath = path.join(postsDirectory, name)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return (data.slug || name.replace(/\.md$/, '')) === slug
  })

  if (!fileName) return null

  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: data.slug || fileName.replace(/\.md$/, ''),
    title: data.title,
    description: data.description,
    date: data.date,
    readTime: data.readTime,
    content: marked(content),
  }
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
