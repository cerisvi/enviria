import logoBar from '../assets/brand/fascia-loghi-fesr.png'
import './FundingNotice.css'

export default function FundingNotice() {
  return (
    <section className="section section--tight funding-notice">
      <div className="container">
        <span className="kicker">Progetto cofinanziato</span>

        <img
          src={logoBar}
          alt="Coesione Italia 21-27 Sicilia · Cofinanziato dall'Unione Europea · Repubblica Italiana · Regione Siciliana"
          className="funding-notice__logos"
        />

        <h3 className="funding-notice__title">
          Green&amp;Geo, Renewable, Efficiency and Innovation (GREEN-ERI)
        </h3>

        <dl className="funding-notice__details">
          <div>
            <dt>CUP</dt>
            <dd>G61E25000170007</dd>
          </div>
          <div>
            <dt>Misura</dt>
            <dd>Azione 1.1.4 "Sostegno alle infrastrutture di ricerca"</dd>
          </div>
          <div>
            <dt>Programma</dt>
            <dd>PR FESR Sicilia 2021-2027</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
