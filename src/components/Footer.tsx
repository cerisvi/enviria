import { Link } from 'react-router-dom'
import { Leaf, Mail, MapPin } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__brand-icon">
            <Leaf size={18} />
          </span>
          <div>
            <strong>Enviria Hub</strong>
            <p className="footer__tagline">
              Infrastruttura di ricerca green nata dal progetto Green ERI.
            </p>
          </div>
        </div>

        <div className="footer__col">
          <h4>Sito</h4>
          <Link to="/">Home</Link>
          <Link to="/chi-siamo">Chi siamo</Link>
          <Link to="/servizi">Servizi</Link>
          <Link to="/contatti">Contatti</Link>
        </div>

        <div className="footer__col">
          <h4>Hub</h4>
          <Link to="/hub">Accedi</Link>
          <a href="mailto:info@enviriahub.it">
            <Mail size={14} /> info@enviriahub.it
          </a>
          <span className="footer__address">
            <MapPin size={14} /> Italia
          </span>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>&copy; {new Date().getFullYear()} Enviria Hub. Tutti i diritti riservati.</span>
        <span>enviriahub.it</span>
      </div>
    </footer>
  )
}
