import { Link } from 'react-router-dom'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'

const content = {
  it: {
    title: 'Pagina non trovata',
    text: 'La pagina che cerchi non esiste o è stata spostata.',
    cta: 'Torna alla home',
  },
  en: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has been moved.',
    cta: 'Back to home',
  },
}

export default function NotFound() {
  const lang = useLang()
  const t = content[lang]
  const homePath = useLocalizedPath('/')

  return (
    <div className="inner-page">
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="kicker" style={{ justifyContent: 'center' }}>404</span>
          <h1>{t.title}</h1>
          <p style={{ color: 'var(--color-ink-soft)', marginBottom: 24 }}>{t.text}</p>
          <Link to={homePath} className="btn btn-primary">
            {t.cta}
          </Link>
        </div>
      </section>
    </div>
  )
}
