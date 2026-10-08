import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Cpu, Leaf, Radar, Satellite, Server, Share2 } from 'lucide-react'
import NetworkCanvas from '../components/NetworkCanvas'
import VideoEmbed from '../components/VideoEmbed'
import FundingNotice from '../components/FundingNotice'
import Reveal from '../components/Reveal'
import forestAerial from '../assets/photos/forest-aerial.webp'
import etnaAerial from '../assets/photos/etna-aerial.webp'
import coastlineAerial from '../assets/photos/coastline-aerial.webp'
import earthSpace from '../assets/photos/earth-space.webp'
import './Home.css'

const heroImages = [forestAerial, etnaAerial, coastlineAerial]

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
    text: 'Dal dato grezzo alla scienza aperta: una filiera che trasforma l’osservazione del territorio in conoscenza condivisa su clima, biodiversità e rischi.',
    to: '/filiera-del-dato',
  },
]

const network = [
  { icon: Satellite, label: 'Sensori e satelliti' },
  { icon: Server, label: 'Supercalcolo & AI' },
  { icon: Share2, label: 'Open Science' },
]

const heroText = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Home() {
  const reduceMotion = useReducedMotion()
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length)
    }, 7000)
    return () => clearInterval(id)
  }, [reduceMotion])

  return (
    <>
      <section className="hero">
        <div className="hero__bg">
          <AnimatePresence mode="sync">
            <motion.div
              key={heroIndex}
              className="hero__bg-image"
              style={{ backgroundImage: `url(${heroImages[heroIndex]})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>
        <div className="hero__scrim" />
        <NetworkCanvas />
        <div className="container hero__inner">
          <motion.h1 initial="hidden" animate="show" custom={0} variants={heroText}>
            L’infrastruttura di ricerca GREEN ERI: un Green AI Data Center per la valorizzazione
            della filiera del dato ambientale
          </motion.h1>
          <motion.p
            className="hero__lead"
            initial="hidden"
            animate="show"
            custom={0.1}
            variants={heroText}
          >
            ENVIRIA costruisce un’infrastruttura di ricerca ad alte prestazioni e basso impatto
            ambientale: supercalcolo, intelligenza artificiale, edge computing e sensoristica
            distribuita al servizio della gestione intelligente dei dati ambientali.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial="hidden"
            animate="show"
            custom={0.2}
            variants={heroText}
          >
            <Link to="/progetto" className="btn btn-primary">
              Scopri il Progetto <ArrowRight size={16} />
            </Link>
            <Link to="/filiera-del-dato" className="btn btn-outline">
              Esplora la Filiera del Dato
            </Link>
          </motion.div>

          <motion.div
            className="hero__network"
            initial="hidden"
            animate="show"
            custom={0.3}
            variants={heroText}
          >
            {network.map(({ icon: Icon, label }) => (
              <div className="hero__network-item" key={label}>
                <Icon size={16} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="kicker">I tre pilastri</span>
            <h2>Un’unica infrastruttura, tre missioni</h2>
            <p className="section-head__lead">
              Ricerca, calcolo e sostenibilità convergono in un solo ecosistema: l’infrastruttura
              Green ERI come hub del mediterraneo per i cambiamenti climatici.
            </p>
          </Reveal>

          <div className="bento">
            {pillars.map(({ icon: Icon, title, text, to }, index) => (
              <Reveal
                key={title}
                className="bento-span-2"
                delay={index * 0.1}
              >
                <Link to={to} className="pillar-card card">
                  <span className="pillar-card__icon">
                    <Icon size={24} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="pillar-card__link">
                    Approfondisci <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="kicker">Guarda il progetto</span>
            <h2>La biodiversità in Sicilia in un video</h2>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="video-caption">
              <div>
                <dt>Video</dt>
                <dd>«Sicilia: un universo in un’isola»</dd>
              </div>
              <div className="video-caption__divider" aria-hidden="true" />
              <div>
                <dt>Fonte istituzionale</dt>
                <dd>Regione Siciliana – Assessorato del Territorio e dell’Ambiente</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.16}>
            <VideoEmbed youtubeId="WYK8xGyu4HA" title="La biodiversità in Sicilia" />
          </Reveal>
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
        <Reveal>
          <div
            className="container cta-banner cta-banner--planet"
            style={{ backgroundImage: `url(${earthSpace})` }}
          >
            <div className="cta-banner__copy">
              <h2>Costruiamo insieme l’infrastruttura di ricerca dedicata all’ambiente in Sicilia</h2>
              <p>
                Enti di ricerca, istituzioni e imprese possono proporre collaborazioni scientifiche
                o richiedere l’accesso all’Hub dati e open innovation di ENVIRIA.
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
        </Reveal>
      </section>

      <FundingNotice />
    </>
  )
}
