import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Database, GraduationCap, Radar } from 'lucide-react'
import './InnerPage.css'

const services = [
  {
    icon: Radar,
    title: 'Monitoraggio ambientale ed energetico',
    text: 'Installazione e gestione di reti di sensori per la raccolta continua di dati su qualità dell\'aria, temperatura, umidità e consumi energetici.',
    points: ['Reti di sensori IoT', 'Raccolta dati continua', 'Allarmi e soglie personalizzabili'],
  },
  {
    icon: Database,
    title: 'Piattaforma dati Enviria Hub',
    text: "Un unico punto di accesso per visualizzare, esportare e analizzare i dati ambientali raccolti nell'ambito del progetto Green ERI.",
    points: ['Dashboard in tempo reale', 'Storico ed export dati', 'Accesso riservato per partner ed enti'],
  },
  {
    icon: BarChart3,
    title: 'Analisi e reportistica sulla sostenibilità',
    text: 'Trasformiamo i dati raccolti in indicatori e report utili a orientare scelte di efficientamento energetico e sostenibilità.',
    points: ['Indicatori di sostenibilità', 'Report periodici', 'Supporto a decisioni tecniche'],
  },
  {
    icon: GraduationCap,
    title: 'Ricerca e collaborazioni',
    text: "Affianchiamo enti di ricerca e istituzioni nello sviluppo di nuovi studi a partire dall'infrastruttura Green ERI.",
    points: ['Collaborazioni scientifiche', 'Condivisione dataset', 'Progetti pilota'],
  },
]

export default function Services() {
  return (
    <div className="inner-page">
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow">Servizi</span>
          <h1>Dal dato ambientale alla decisione sostenibile</h1>
          <p className="inner-hero__lead">
            I servizi di Enviria mettono a disposizione di enti di ricerca, gestori di edifici
            e istituzioni gli strumenti sviluppati nell'ambito del progetto Green ERI.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {services.map(({ icon: Icon, title, text, points }) => (
              <article className="card service-card" key={title}>
                <span className="service-card__icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <ul>
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container cta__inner card">
          <div className="cta__copy">
            <h2>Parliamo del tuo progetto</h2>
            <p>Raccontaci le tue esigenze di monitoraggio o ricerca: ti aiutiamo a capire come Enviria può supportarti.</p>
          </div>
          <div className="cta__actions">
            <Link to="/contatti" className="btn btn-primary">
              Contattaci <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
