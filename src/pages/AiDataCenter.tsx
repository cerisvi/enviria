import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Droplets, MonitorCog, SunMedium, TreePine } from 'lucide-react'
import solarPanels from '../assets/photos/solar-panels.webp'
import serverRoom from '../assets/photos/server-room.webp'
import PhotoBand from '../components/PhotoBand'
import './InnerPage.css'
import './AiDataCenter.css'

const hpc = [
  {
    icon: Cpu,
    title: 'Server GPU/CPU dedicati',
    text: 'Nodi di calcolo ad alte prestazioni orientati ai carichi di lavoro della ricerca ambientale: modelli climatici, analisi di grandi volumi di dati ed elaborazione di intelligenza artificiale.',
  },
  {
    icon: MonitorCog,
    title: 'Sala controllo',
    text: 'Monitoraggio e gestione operativa dell\'infrastruttura di calcolo, a presidio di continuità, sicurezza e affidabilità del sistema.',
  },
]

const green = [
  {
    icon: TreePine,
    title: 'Prefabbricato in legno',
    text: 'L\'infrastruttura HPC è ospitata in una struttura prefabbricata in legno, scelta per ridurre l\'impronta ambientale della costruzione.',
  },
  {
    icon: SunMedium,
    title: 'Alimentazione fotovoltaica',
    text: 'Un sistema fotovoltaico dedicato contribuisce all\'alimentazione energetica del data center, in coerenza con i principi del Green Computing.',
  },
  {
    icon: Droplets,
    title: 'Raffreddamento a basso impatto',
    text: 'Raffreddamento ad aria e a liquido per immersione diretta (fluido 3M Novec), una tecnologia che riduce in modo significativo il consumo energetico del raffreddamento rispetto ai sistemi tradizionali.',
  },
]

export default function AiDataCenter() {
  return (
    <div className="inner-page">
      <section className="inner-hero" style={{ backgroundImage: `url(${solarPanels})` }}>
        <div className="container inner-hero__inner">
          <span className="kicker">La Tecnologia</span>
          <h1>AI Data Center: supercalcolo al servizio della ricerca ecologica</h1>
          <p className="inner-hero__lead">
            Il Green Data Center di ENVIRIA mette a disposizione della ricerca ambientale potenza
            di calcolo ad alte prestazioni (HPC), progettata fin dall'origine per minimizzare
            l'impatto energetico e ambientale dell'infrastruttura stessa.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Calcolo ad Alte Prestazioni</span>
            <h2>La potenza computazionale della ricerca</h2>
          </div>

          <div className="grid grid-2">
            {hpc.map(({ icon: Icon, title, text }) => (
              <article className="card spec-card spec-card--blue" key={title}>
                <span className="spec-card__icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="architecture">
            <div className="architecture__step">
              <SunMedium size={20} />
              <span>Energia rinnovabile</span>
            </div>
            <div className="architecture__arrow" aria-hidden="true" />
            <div className="architecture__step">
              <Cpu size={20} />
              <span>Server GPU / CPU</span>
            </div>
            <div className="architecture__arrow" aria-hidden="true" />
            <div className="architecture__step">
              <Droplets size={20} />
              <span>Raffreddamento a liquido</span>
            </div>
            <div className="architecture__arrow" aria-hidden="true" />
            <div className="architecture__step">
              <MonitorCog size={20} />
              <span>Sala controllo</span>
            </div>
          </div>

          <PhotoBand src={serverRoom} alt="Fila di rack server in un data center" />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Sostenibilità Digitale</span>
            <h2>Green Computing: calcolare senza pesare sul pianeta</h2>
            <p className="section-head__lead">
              Un data center alimentato da fonti rinnovabili e raffreddato con tecnologie a basso
              impatto, perché la ricerca sull'ambiente non può prescindere dalla sostenibilità
              dei propri strumenti.
            </p>
          </div>

          <div className="grid grid-3">
            {green.map(({ icon: Icon, title, text }) => (
              <article className="card spec-card" key={title}>
                <span className="spec-card__icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-banner card">
          <div className="cta-banner__copy">
            <h2>Dal calcolo alla conoscenza condivisa</h2>
            <p>Scopri come i dati elaborati dal Data Center diventano scienza aperta.</p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/filiera-del-dato" className="btn btn-primary">
              La Filiera del Dato <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
