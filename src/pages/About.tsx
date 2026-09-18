import { FlaskConical, Handshake, Target, Users } from 'lucide-react'
import './InnerPage.css'

const timeline = [
  {
    title: 'Il progetto Green ERI',
    text: "Green ERI nasce come infrastruttura di ricerca dedicata allo studio e al monitoraggio ambientale, con l'obiettivo di generare dati affidabili su qualità dell'aria, energia e sostenibilità degli spazi costruiti.",
  },
  {
    title: 'La nascita di Enviria',
    text: "Dall'esperienza e dai risultati del progetto Green ERI nasce Enviria: il punto di accesso che rende quel lavoro di ricerca utilizzabile ogni giorno, tramite l'Hub dati e servizi rivolti a enti di ricerca, gestori di edifici e territori.",
  },
  {
    title: 'Oggi',
    text: 'Enviria continua a collaborare con il mondo della ricerca per estendere le reti di monitoraggio e rendere disponibili nuovi indicatori di sostenibilità.',
  },
]

const values = [
  {
    icon: FlaskConical,
    title: 'Rigore scientifico',
    text: 'Metodi e dati coerenti con gli standard adottati nel progetto di ricerca Green ERI.',
  },
  {
    icon: Target,
    title: 'Impatto misurabile',
    text: "Indicatori chiari, pensati per orientare decisioni reali su energia e sostenibilità.",
  },
  {
    icon: Handshake,
    title: 'Collaborazione',
    text: 'Lavoriamo con enti di ricerca, istituzioni e partner tecnici per ampliare la rete Enviria.',
  },
  {
    icon: Users,
    title: 'Accessibilità',
    text: "Dati e strumenti pensati per essere compresi e usati anche da chi non è un ricercatore.",
  },
]

export default function About() {
  return (
    <div className="inner-page">
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow">Chi siamo</span>
          <h1>Un hub nato dalla ricerca, al servizio della sostenibilità</h1>
          <p className="inner-hero__lead">
            Enviria è il punto di accesso pubblico all'infrastruttura di ricerca Green ERI:
            portiamo il monitoraggio ambientale e i dati energetici della ricerca fuori dal
            laboratorio, dentro gli edifici e i territori che li usano ogni giorno.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Il nostro percorso</span>
            <h2>Da Green ERI a Enviria Hub</h2>
          </div>

          <div className="timeline">
            {timeline.map((step, index) => (
              <div className="timeline__item" key={step.title}>
                <div className="timeline__index">{index + 1}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">I nostri valori</span>
            <h2>Cosa guida il nostro lavoro</h2>
          </div>

          <div className="grid grid-4">
            {values.map(({ icon: Icon, title, text }) => (
              <article className="card value-card" key={title}>
                <span className="value-card__icon">
                  <Icon size={20} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
