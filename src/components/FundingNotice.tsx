import logoBar from '../assets/brand/fascia-loghi-fesr.png'
import { useLang } from '../i18n/useLang'
import './FundingNotice.css'

const copy = {
  it: {
    kicker: 'Progetto cofinanziato',
    alt: 'Coesione Italia 21-27 Sicilia · Cofinanziato dall’Unione Europea · Repubblica Italiana · Regione Siciliana',
    cup: 'CUP',
    misuraLabel: 'Misura',
    misura: 'Azione 1.1.4 "Sostegno alle infrastrutture di ricerca"',
    programmaLabel: 'Programma',
    programma: 'PR FESR Sicilia 2021-2027',
  },
  en: {
    kicker: 'Co-funded project',
    alt: 'Cohesion Italy 21-27 Sicily · Co-funded by the European Union · Italian Republic · Sicilian Region',
    cup: 'CUP (project code)',
    misuraLabel: 'Measure',
    misura: 'Action 1.1.4 "Support for research infrastructures" (PR FESR Sicilia)',
    programmaLabel: 'Programme',
    programma: 'PR FESR Sicilia 2021-2027 (Sicily ERDF Regional Programme)',
  },
}

export default function FundingNotice() {
  const t = copy[useLang()]

  return (
    <section className="section section--tight funding-notice">
      <div className="container funding-notice__inner">
        <span className="kicker">{t.kicker}</span>

        <img src={logoBar} alt={t.alt} className="funding-notice__logos" />

        <h3 className="funding-notice__title">
          G.R.E.E.N – E.R.I. (Green&amp;Geo, Renewable, Efficiency, Environmental, Node –
          Environmental Research Infrastructure)
        </h3>

        <dl className="funding-notice__details">
          <div>
            <dt>{t.cup}</dt>
            <dd>G61E25000170007</dd>
          </div>
          <div>
            <dt>{t.misuraLabel}</dt>
            <dd>{t.misura}</dd>
          </div>
          <div>
            <dt>{t.programmaLabel}</dt>
            <dd>{t.programma}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
