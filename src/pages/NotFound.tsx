import { Link } from 'react-router-dom'
import './InnerPage.css'

export default function NotFound() {
  return (
    <div className="inner-page">
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="eyebrow">404</span>
          <h1>Pagina non trovata</h1>
          <p style={{ color: 'var(--color-ink-soft)', marginBottom: 24 }}>
            La pagina che cerchi non esiste o è stata spostata.
          </p>
          <Link to="/" className="btn btn-primary">
            Torna alla home
          </Link>
        </div>
      </section>
    </div>
  )
}
