import { BarChart3, Database, Plane, Radio, Satellite, Share2 } from 'lucide-react'
import './InnerPage.css'

const steps = [
  {
    title: 'Raccolta',
    text: 'Sensori distribuiti, box IoT, una flotta di droni per il rilievo aereo e stazioni di monitoraggio raccolgono dati ambientali direttamente sul territorio.',
  },
  {
    title: 'Elaborazione',
    text: 'I dati grezzi confluiscono in un sistema integrato che li organizza in un geo-database territoriale, pronto per l\'analisi su larga scala.',
  },
  {
    title: 'Analisi & AI',
    text: 'Modelli di intelligenza artificiale e il gemello digitale del territorio (digital twin) generano scenari predittivi su clima, biodiversità e rischi ambientali.',
  },
  {
    title: 'Open Science',
    text: 'I risultati vengono condivisi con la comunità scientifica e i decisori pubblici, a supporto di politiche ambientali basate sui dati.',
  },
]

const infrastructure = [
  {
    icon: Plane,
    title: 'Flotta droni',
    text: 'Piani di volo automatizzati per la mappatura e il monitoraggio periodico del territorio.',
  },
  {
    icon: Radio,
    title: 'Rete IoT e box sensori',
    text: 'Un sistema integrato di sensori distribuiti per una rete di monitoraggio ambientale evoluta.',
  },
  {
    icon: Database,
    title: 'GeoDB territoriale',
    text: 'Un geo-database condiviso alla base del gemello digitale (digital twin) del territorio.',
  },
  {
    icon: Share2,
    title: 'Piattaforma di interoperabilità',
    text: 'Interfacce e protocolli per lo scambio dei dati con piattaforme regionali, nazionali ed europee.',
  },
]

export default function FilieraDelDato() {
  return (
    <div className="inner-page">
      <section className="inner-hero">
        <div className="container inner-hero__inner">
          <span className="kicker">Il Valore Scientifico</span>
          <h1>La Filiera del Dato Ambientale</h1>
          <p className="inner-hero__lead">
            Dal rilievo sul campo alla scienza aperta: il percorso che trasforma l'osservazione
            del territorio in conoscenza condivisa, a supporto della ricerca e delle decisioni
            pubbliche.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="step-flow">
            {steps.map((step, index) => (
              <div className="step-flow__item" key={step.title}>
                <div className="step-flow__index">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Il Ciclo del Dato</span>
            <h2>L'infrastruttura di monitoraggio territoriale</h2>
            <p className="section-head__lead">
              Gli strumenti alla base della filiera: una rete fisica e digitale che osserva,
              raccoglie e interconnette i dati ambientali del territorio.
            </p>
          </div>

          <div className="grid grid-4">
            {infrastructure.map(({ icon: Icon, title, text }) => (
              <article className="card spec-card" key={title}>
                <span className="spec-card__icon">
                  <Icon size={20} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card spec-card spec-card--blue">
              <span className="spec-card__icon">
                <BarChart3 size={22} />
              </span>
              <h3>Modelli predittivi</h3>
              <p>
                L'analisi incrociata dei dati raccolti alimenta modelli predittivi su clima,
                biodiversità e sicurezza del territorio, sviluppati nei laboratori GeoAI, GeoTwin
                e GeoDSS.
              </p>
            </div>
            <div className="card spec-card spec-card--blue">
              <span className="spec-card__icon">
                <Satellite size={22} />
              </span>
              <h3>Interoperabilità europea</h3>
              <p>
                L'infrastruttura dialoga con piattaforme di ricerca di livello regionale,
                nazionale ed europeo, in un'ottica di collaborazione scientifica aperta.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
