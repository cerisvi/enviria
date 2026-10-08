import { Link } from 'react-router-dom'
import { ArrowRight, Boxes, Cpu, Droplets, MonitorCog, SunMedium } from 'lucide-react'
import solarPanels from '../assets/photos/solar-panels.webp'
import serverRoom from '../assets/photos/server-room.webp'
import dataTerminal from '../assets/photos/data-terminal.webp'
import dataCorridor from '../assets/photos/data-corridor.webp'
import solarAerial from '../assets/photos/solar-aerial.webp'
import PhotoBand from '../components/PhotoBand'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
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
    text: 'Monitoraggio e gestione operativa dell’infrastruttura di calcolo, a presidio di continuità, sicurezza e affidabilità del sistema.',
  },
]

const green = [
  {
    icon: Boxes,
    title: 'Sistema Modulare',
    text: 'L’infrastruttura HPC è ospitata in una struttura modulare e scalabile, distribuita su due nodi: Catania – Palermo.',
  },
  {
    icon: SunMedium,
    title: 'Alimentazione fotovoltaica',
    text: 'Un sistema fotovoltaico dedicato contribuisce all’alimentazione energetica del data center, in coerenza con i principi del Green Computing.',
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
      <Seo
        title="AI Data Center — Green Data Center in Sicilia"
        description="L'AI Data Center di ENVIRIA: un Green Data Center distribuito su due nodi datacenter (Catania e Palermo), alimentato da fonti rinnovabili, per il supercalcolo (HPC) al servizio della ricerca ambientale in Sicilia."
        path="/ai-data-center"
      />
      <section className="inner-hero" style={{ backgroundImage: `url(${solarPanels})` }}>
        <Reveal className="container inner-hero__inner">
          <span className="kicker">La Tecnologia</span>
          <h1>AI Data Center: supercalcolo al servizio della ricerca ecologica</h1>
          <p className="inner-hero__lead">
            Il Green Data Center di ENVIRIA mette a disposizione della ricerca ambientale potenza
            di calcolo ad alte prestazioni (HPC), progettata fin dall’origine per minimizzare
            l’impatto energetico e ambientale dell’infrastruttura stessa.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="kicker">Calcolo ad Alte Prestazioni</span>
            <h2>La potenza computazionale della ricerca</h2>
          </Reveal>

          <div className="split-layout">
            <div className="grid grid-2">
              {hpc.map(({ icon: Icon, title, text }, index) => (
                <Reveal key={title} delay={index * 0.08}>
                  <article className="card spec-card spec-card--blue">
                    <span className="spec-card__icon">
                      <Icon size={22} />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15} className="split-layout__media">
              <div className="split-layout__sticky">
                <PhotoBand src={dataTerminal} alt="Flusso di dati elaborati su un terminale di calcolo" />
              </div>
            </Reveal>
          </div>

          <div className="architecture">
            <div className="architecture__step">
              <span className="architecture__icon">
                <SunMedium size={24} />
              </span>
              <span>Energia rinnovabile</span>
            </div>
            <div className="architecture__arrow" aria-hidden="true" />
            <div className="architecture__step">
              <span className="architecture__icon">
                <Cpu size={24} />
              </span>
              <span>Server GPU / CPU</span>
            </div>
            <div className="architecture__arrow" aria-hidden="true" />
            <div className="architecture__step">
              <span className="architecture__icon">
                <Droplets size={24} />
              </span>
              <span>Raffreddamento a liquido</span>
            </div>
            <div className="architecture__arrow" aria-hidden="true" />
            <div className="architecture__step">
              <span className="architecture__icon">
                <MonitorCog size={24} />
              </span>
              <span>Sala controllo</span>
            </div>
          </div>

          <Reveal>
            <PhotoBand src={dataCorridor} alt="Corridoio di un data center con flusso di dati proiettato sulle pareti" />
          </Reveal>
          <Reveal delay={0.1}>
            <PhotoBand src={serverRoom} alt="Fila di rack server in un data center" />
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="kicker">Sostenibilità Digitale</span>
            <h2>Green Computing: calcolare senza pesare sul pianeta</h2>
            <p className="section-head__lead">
              Un data center alimentato da fonti rinnovabili e raffreddato con tecnologie a basso
              impatto, perché la ricerca sull’ambiente non può prescindere dalla sostenibilità
              dei propri strumenti.
            </p>
          </Reveal>

          <div className="split-layout split-layout--reverse">
            <Reveal delay={0.1} className="split-layout__media">
              <div className="split-layout__sticky">
                <PhotoBand src={solarAerial} alt="Vista aerea di un campo fotovoltaico" />
              </div>
            </Reveal>
            <div className="grid grid-3">
              {green.map(({ icon: Icon, title, text }, index) => (
                <Reveal key={title} delay={index * 0.08}>
                  <article className="card spec-card spec-card--feature">
                    <span className="spec-card__icon spec-card__icon--lg">
                      <Icon size={28} />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="container cta-banner card">
            <div className="cta-banner__copy">
              <h2>Dal calcolo alla conoscenza condivisa</h2>
              <p>Scopri come i dati elaborati dal Data Center diventano scienza aperta.</p>
            </div>
            <div className="cta-banner__actions">
              <Link to="/filiera-del-dato" className="btn btn-primary">
                La Filiera del Dato <ArrowRight size={16} />
              </Link>
              <Link to="/chi-siamo" className="btn btn-outline">
                Contattaci
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
