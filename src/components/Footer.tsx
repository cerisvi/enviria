import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import Mark from './Mark'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Mark size={28} />
          <div>
            <strong>ENVIRIA S.C.A.R.L.</strong>
            <p className="footer__tagline">
              Infrastruttura di ricerca per la gestione intelligente dei dati ambientali —
              Progetto G.R.E.E.N – E.R.I.
            </p>
          </div>
        </div>

        <div className="footer__col">
          <h4>Il progetto</h4>
          <Link to="/progetto">Il Progetto Green ERI</Link>
          <Link to="/ai-data-center">AI Data Center</Link>
          <Link to="/filiera-del-dato">Filiera del Dato</Link>
          <Link to="/chi-siamo">Chi siamo &amp; Network</Link>
        </div>

        <div className="footer__col">
          <h4>Contatti</h4>
          <a href="mailto:direzione@enviriahub.it">
            <Mail size={14} /> direzione@enviriahub.it
          </a>
          <Link to="/hub">Accedi al Hub</Link>
        </div>

        <div className="footer__col">
          <h4>Sede legale</h4>
          <p className="footer__legal">
            <MapPin size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
            Corso Italia 172
            <br />
            95128 Catania (CT)
            <br />
            PEC: enviria@legalmail.it
            <br />
            C.F. / P.IVA: 06297800879
          </p>
        </div>
      </div>

      <div className="footer__funding">
        <div className="container">
          <p>
            Progetto G.R.E.E.N – E.R.I. · PR FESR Sicilia 2021-2027 · Azione 1.1.4 · Unione
            Europea · Repubblica Italiana · Regione Siciliana
          </p>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>&copy; {new Date().getFullYear()} Enviria S.C.A.R.L. Tutti i diritti riservati.</span>
        <span>enviriahub.it</span>
      </div>
    </footer>
  )
}
