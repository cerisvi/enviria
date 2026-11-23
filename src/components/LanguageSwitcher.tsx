import { Link, useLocation } from 'react-router-dom'
import { otherLangPath, useLang } from '../i18n/useLang'

export default function LanguageSwitcher({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()
  const lang = useLang()
  const other = otherLangPath(pathname)

  return (
    <Link
      to={other.path}
      onClick={onNavigate}
      className="lang-switcher"
      aria-label={lang === 'it' ? 'Switch to English' : 'Passa all’italiano'}
    >
      {lang === 'it' ? 'EN' : 'IT'}
    </Link>
  )
}
