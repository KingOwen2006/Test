import { useState, useEffect } from 'react'

export interface WPPost {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  link: string
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
    author?: Array<{ name: string }>
  }
}

export function useWordPressPosts(site: string, perPage: number = 7) {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = `https://public-api.wordpress.com/wp/v2/sites/${site}/posts?per_page=${perPage}&_embed=1&orderby=date&order=desc`
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        setPosts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error(`WordPress fetch error for ${site}:`, err)
        setError(err.message)
        setLoading(false)
      })
  }, [site, perPage])

  return { posts, loading, error }
}
