import { useEffect } from 'react'
import { langFromPathname, localizePath, stripLangPrefix } from '../i18n/useLang'

const SITE_NAME = 'ENVIRIA'
const SITE_URL = 'https://enviriahub.it'
const DEFAULT_IMAGE = `${SITE_URL}/social-preview.jpg`

interface SeoProps {
  title: string
  description: string
  /** Percorso localizzato corrente (es. "/chi-siamo" oppure "/en/chi-siamo"). */
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

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({ title, description, path, image }: SeoProps) {
  useEffect(() => {
    const lang = langFromPathname(path)
    const fullTitle = path === '/' || path === '/en' ? title : `${title} — ${SITE_NAME}`
    const url = `${SITE_URL}${path}`
    const ogImage = image ?? DEFAULT_IMAGE
    const basePath = stripLangPrefix(path)

    document.documentElement.lang = lang
    document.title = fullTitle
    setMeta('name', 'description', description)
    setLink('canonical', url)
    setLink('alternate', `${SITE_URL}${localizePath(basePath, 'it')}`, 'it')
    setLink('alternate', `${SITE_URL}${localizePath(basePath, 'en')}`, 'en')
    setLink('alternate', `${SITE_URL}${localizePath(basePath, 'it')}`, 'x-default')

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'it_IT')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)
  }, [title, description, path, image])

  return null
}
