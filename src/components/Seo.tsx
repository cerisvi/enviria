import { useEffect } from 'react'

const SITE_NAME = 'ENVIRIA'
const SITE_URL = 'https://enviriahub.it'
const DEFAULT_IMAGE = `${SITE_URL}/social-preview.jpg`

interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({ title, description, path, image }: SeoProps) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} — ${SITE_NAME}`
    const url = `${SITE_URL}${path}`
    const ogImage = image ?? DEFAULT_IMAGE

    document.title = fullTitle
    setMeta('name', 'description', description)
    setCanonical(url)

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'it_IT')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)
  }, [title, description, path, image])

  return null
}
