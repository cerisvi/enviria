import { Link } from 'react-router-dom'
import { ArrowRight, BrainCircuit, Database, Map, SlidersHorizontal } from 'lucide-react'
import './InnerPage.css'
import './Progetto.css'

const obiettivi = [
  {
    code: 'OR1',
    title: 'Realizzazione dell\'infrastruttura di ricerca',
    text: 'Costruzione di una nuova infrastruttura ad alte prestazioni e basso impatto ambientale per la gestione intelligente dei dati ambientali, attraverso supercalcolo, intelligenza artificiale, edge computing e sensoristica distribuita: il Green Data Center, quattro laboratori tematici e l\'integrazione con piattaforme di ricerca regionali, nazionali ed europee.',
  },
  {
    code: 'OR2',
    title: 'Ecosistema dell\'innovazione territoriale',
    text: 'Sviluppo di dimostratori su agricoltura, salute e sicurezza ambientale in co-design con le imprese, e rafforzamento dell\'ecosistema locale attraverso startup, percorsi di ricerca applicata e iniziative di open innovation.',
  },
  {
    code: 'OR3',
    title: 'Sistema di monitoraggio territoriale',
    text: 'Realizzazione di una rete evoluta di monitoraggio basata su flotta di droni, box sensori IoT e una piattaforma dati condivisa, per la costruzione di un gemello digitale (digital twin) del territorio.',
  },
  {
    code: 'OR4',
    title: 'Integrazione e collaudo',
    text: 'Integrazione dei sottosistemi dell\'infrastruttura di ricerca e collaudo complessivo, a garanzia dell\'affidabilità, interoperabilità e scalabilità del sistema.',
  },
  {
    code: 'OR5',
    title: 'Gestione e disseminazione',
    text: 'Coordinamento del progetto e condivisione dei risultati con la comunità scientifica, le istituzioni e il territorio, in continuità con i principi della scienza aperta.',
  },
]

const laboratori = [
  {
    icon: Database,
    name: 'GeoSense Lab',
    subtitle: 'Acquisizione e Memorizzazione dei Dati Ambientali',
    text: 'Raccolta e archiviazione strutturata dei dati provenienti da sensori distribuiti, droni e stazioni di monitoraggio sul territorio.',
  },
  {
    icon: BrainCircuit,
    name: 'GeoAI Lab',
    subtitle: 'Intelligenza Artificiale applicata all\'ambiente',
    text: 'Modelli di intelligenza artificiale per l\'analisi dei dati ambientali e il riconoscimento di pattern climatici, agricoli e di rischio territoriale.',
  },
  {
    icon: Map,
    name: 'GeoTwin Lab',
    subtitle: 'Digital Twin del territorio',
    text: 'Ricostruzione digitale del territorio per simulazioni, scenari predittivi e analisi dell\'impatto ambientale degli interventi.',
  },
  {
    icon: SlidersHorizontal,
    name: 'GeoDSS Lab',
    subtitle: 'Sistemi di Supporto alle Decisioni Ambientali',
    text: 'Strumenti decisionali basati su dati e modelli predittivi, a supporto di istituzioni e decisori pubblici nella gestione del territorio.',
  },
]

export default function Progetto() {
  return (
    <div className="inner-page">
      <section className="inner-hero">
        <div className="container inner-hero__inner">
          <span className="kicker">Il Progetto · G.R.E.E.N – E.R.I.</span>
          <h1>Un'infrastruttura di ricerca per rispondere al cambiamento climatico</h1>
          <p className="inner-hero__lead">
            Il progetto Green ERI risponde alle sfide del cambiamento climatico attraverso la
            digitalizzazione: una nuova infrastruttura di ricerca che unisce supercalcolo,
            intelligenza artificiale, edge computing e sensoristica distribuita per la gestione
            intelligente dei dati ambientali, realizzata nell'ambito del PR FESR Sicilia
            2021-2027.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Obiettivi realizzativi</span>
            <h2>Dalla costruzione dell'infrastruttura alla disseminazione dei risultati</h2>
          </div>

          <div className="timeline">
            {obiettivi.map((o) => (
              <div className="timeline__item" key={o.code}>
                <div className="timeline__index">{o.code}</div>
                <div>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <span className="kicker">L'infrastruttura</span>
            <h2>Quattro laboratori tematici</h2>
            <p className="section-head__lead">
              Il cuore scientifico dell'infrastruttura: quattro laboratori dedicati all'intero
              ciclo del dato ambientale, dalla raccolta sul campo al supporto alle decisioni.
            </p>
          </div>

          <div className="grid grid-2">
            {laboratori.map(({ icon: Icon, name, subtitle, text }) => (
              <article className="card spec-card" key={name}>
                <span className="spec-card__icon">
                  <Icon size={22} />
                </span>
                <h3>{name}</h3>
                <p className="lab-card__subtitle">{subtitle}</p>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-banner card">
          <div className="cta-banner__copy">
            <h2>Scopri l'AI Data Center e la Filiera del Dato</h2>
            <p>
              Approfondisci la tecnologia di calcolo sostenibile e il percorso che trasforma il
              dato ambientale in conoscenza condivisa.
            </p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/ai-data-center" className="btn btn-primary">
              AI Data Center <ArrowRight size={16} />
            </Link>
            <Link to="/filiera-del-dato" className="btn btn-outline">
              Filiera del Dato
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
