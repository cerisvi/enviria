import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Leaf, Radar, Satellite, Server, Share2 } from 'lucide-react'
import NetworkCanvas from '../components/NetworkCanvas'
import './Home.css'

const pillars = [
  {
    icon: Radar,
    title: 'Infrastruttura di Ricerca',
    text: 'Una nuova infrastruttura ad alte prestazioni e basso impatto ambientale: Green Data Center, quattro laboratori tematici e una rete di sensori sul territorio.',
    to: '/progetto',
  },
  {
    icon: Cpu,
    title: 'AI Data Center',
    text: 'Calcolo ad alte prestazioni (HPC) per la ricerca ecologica, alimentato da fonti rinnovabili e raffreddato con sistemi avanzati a basso impatto.',
    to: '/ai-data-center',
  },
  {
    icon: Leaf,
    title: 'Sostenibilità Ambientale',
    text: 'Dal dato grezzo alla scienza aperta: una filiera che trasforma l\'osservazione del territorio in conoscenza condivisa su clima, biodiversità e rischi.',
    to: '/filiera-del-dato',
  },
]

const network = [
  { icon: Satellite, label: 'Sensori e satelliti' },
  { icon: Server, label: 'Supercalcolo & AI' },
  { icon: Share2, label: 'Open Science' },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <NetworkCanvas />
        <div className="container hero__inner">
          <span className="kicker">Progetto G.R.E.E.N – E.R.I. · PR FESR Sicilia 2021-2027</span>
          <h1>L'infrastruttura di ricerca per il futuro del pianeta</h1>
          <p className="hero__lead">
            ENVIRIA costruisce un'infrastruttura di ricerca ad alte prestazioni e basso impatto
            ambientale: supercalcolo, intelligenza artificiale, edge computing e sensoristica
            distribuita al servizio della gestione intelligente dei dati ambientali.
          </p>
          <div className="hero__actions">
            <Link to="/progetto" className="btn btn-primary">
              Scopri il Progetto <ArrowRight size={16} />
            </Link>
            <Link to="/filiera-del-dato" className="btn btn-outline">
              Esplora la Filiera del Dato
            </Link>
          </div>

          <div className="hero__network">
            {network.map(({ icon: Icon, label }) => (
              <div className="hero__network-item" key={label}>
                <Icon size={16} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">I tre pilastri</span>
            <h2>Un'unica infrastruttura, tre missioni</h2>
            <p className="section-head__lead">
              Ricerca, calcolo e sostenibilità convergono in un solo ecosistema: l'infrastruttura
              Green ERI messa a disposizione del territorio attraverso ENVIRIA.
            </p>
          </div>

          <div className="bento">
            {pillars.map(({ icon: Icon, title, text, to }) => (
              <Link to={to} className="bento-span-2 pillar-card card" key={title}>
                <span className="pillar-card__icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="pillar-card__link">
                  Approfondisci <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="stat-strip">
        <div className="container stat-strip__inner">
          <div className="stat-strip__item">
            <strong>4</strong>
            <span>Laboratori tematici: GeoSense, GeoAI, GeoTwin, GeoDSS</span>
          </div>
          <div className="stat-strip__item">
            <strong>HPC</strong>
            <span>Green Data Center a basso impatto ambientale</span>
          </div>
          <div className="stat-strip__item">
            <strong>IoT</strong>
            <span>Flotta droni e box sensori per il monitoraggio territoriale</span>
          </div>
          <div className="stat-strip__item">
            <strong>Open</strong>
            <span>Dati condivisi con comunità scientifica e decisori</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-banner card">
          <div className="cta-banner__copy">
            <h2>Costruiamo insieme l'infrastruttura di ricerca del territorio</h2>
            <p>
              Enti di ricerca, istituzioni e imprese possono proporre collaborazioni scientifiche
              o richiedere l'accesso all'Hub dati di ENVIRIA.
            </p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/chi-siamo" className="btn btn-primary">
              Contatta ENVIRIA
            </Link>
            <Link to="/hub" className="btn btn-outline">
              Accedi al Hub
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
