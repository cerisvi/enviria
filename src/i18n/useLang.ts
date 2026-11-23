import { useLocation } from 'react-router-dom'

export type Lang = 'it' | 'en'

export function langFromPathname(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'it'
}

/** Lingua corrente, derivata dal prefisso /en nell'URL (nessuno stato separato da sincronizzare). */
export function useLang(): Lang {
  const { pathname } = useLocation()
  return langFromPathname(pathname)
}

/** Rimuove il prefisso /en da un pathname, restituendo il percorso "base" in italiano. */
export function stripLangPrefix(pathname: string): string {
  if (pathname === '/en') return '/'
  if (pathname.startsWith('/en/')) return pathname.slice(3)
  return pathname
}

/** Costruisce il percorso localizzato per un dato basePath (in italiano) e lingua. */
export function localizePath(basePath: string, lang: Lang): string {
  if (lang === 'it') return basePath
  return basePath === '/' ? '/en' : `/en${basePath}`
}

/** Hook di comodo: dato un basePath italiano, restituisce il percorso nella lingua corrente. */
export function useLocalizedPath(basePath: string): string {
  return localizePath(basePath, useLang())
}

/** Percorso equivalente nell'altra lingua, per il selettore lingua. */
export function otherLangPath(pathname: string): { lang: Lang; path: string } {
  const current = langFromPathname(pathname)
  if (current === 'it') {
    return { lang: 'en', path: pathname === '/' ? '/en' : `/en${pathname}` }
  }
  return { lang: 'it', path: stripLangPrefix(pathname) }
}
