import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Cpu, Leaf, Radar, Satellite, Server, Share2 } from 'lucide-react'
import NetworkCanvas from '../components/NetworkCanvas'
import VideoEmbed from '../components/VideoEmbed'
import FundingNotice from '../components/FundingNotice'
import Reveal from '../components/Reveal'
import PhotoBand from '../components/PhotoBand'
import Seo from '../components/Seo'
import { localizePath, useLang, useLocalizedPath } from '../i18n/useLang'
import forestAerial from '../assets/photos/forest-aerial.webp'
import etnaAerial from '../assets/photos/etna-aerial.webp'
import coastlineAerial from '../assets/photos/coastline-aerial.webp'
import earthSpace from '../assets/photos/earth-space.webp'
import aiNetworkHand from '../assets/photos/ai-network-hand.webp'
import './Home.css'

const heroImages = [forestAerial, etnaAerial, coastlineAerial]

const content = {
  it: {
    seoTitle: 'ENVIRIA — Infrastruttura di Ricerca e AI Data Center in Sicilia',
    seoDescription:
      "ENVIRIA è l'Organismo di Ricerca che gestisce la prima e unica infrastruttura di ricerca sull'ambiente nel Mediterraneo: Green AI Data Center, nodi datacenter a Catania e Palermo, laboratori tematici per la sostenibilità ambientale in Sicilia.",
    heroTitle:
      'L’infrastruttura di ricerca GREEN ERI: un Green AI Data Center per la valorizzazione della filiera del dato ambientale',
    heroLead:
      'ENVIRIA costruisce un’infrastruttura di ricerca ad alte prestazioni e basso impatto ambientale: supercalcolo, intelligenza artificiale, edge computing e sensoristica distribuita al servizio della gestione intelligente dei dati ambientali.',
    ctaProject: 'Scopri il Progetto',
    ctaFiliera: 'Esplora la Filiera del Dato',
    network: [
      { icon: Satellite, label: 'Sensori e satelliti' },
      { icon: Server, label: 'Supercalcolo & AI' },
      { icon: Share2, label: 'Open Science' },
    ],
    pillarsKicker: 'I tre pilastri',
    pillarsTitle: 'Un’unica infrastruttura, tre missioni',
    pillarsLead:
      'Ricerca, calcolo e sostenibilità convergono in un solo ecosistema: l’infrastruttura Green ERI, la prima e unica infrastruttura di ricerca sull’ambiente nel Mediterraneo, come hub per i cambiamenti climatici.',
    pillars: [
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
    ],
    pillarLink: 'Approfondisci',
    aiKicker: 'Intelligenza artificiale',
    aiTitle: 'L’AI al servizio della ricerca ambientale',
    aiLead:
      'Modelli di intelligenza artificiale analizzano i dati raccolti sul territorio per riconoscere pattern climatici, ambientali e di rischio, trasformando l’osservazione in conoscenza utile a istituzioni e comunità scientifica.',
    aiAlt: 'Mano robotica che interagisce con una rete di dati',
    videoKicker: 'Guarda il progetto',
    videoTitle: 'La biodiversità in Sicilia in un video',
    videoLabel: 'Video',
    videoCaption: '«Sicilia: un universo in un’isola»',
    videoSourceLabel: 'Fonte istituzionale',
    videoSource: 'Regione Siciliana – Assessorato del Territorio e dell’Ambiente',
    videoTitleAttr: 'La biodiversità in Sicilia',
    stats: [
      { value: '4', label: 'Laboratori tematici: GeoSense, GeoAI, GeoTwin, GeoDSS' },
      { value: 'HPC', label: 'Green Data Center a basso impatto ambientale' },
      { value: 'IoT', label: 'Flotta droni e box sensori per il monitoraggio territoriale' },
      { value: 'Open', label: 'Dati condivisi con comunità scientifica e decisori' },
    ],
    ctaBannerTitle: 'Costruiamo insieme l’infrastruttura di ricerca dedicata all’ambiente in Sicilia',
    ctaBannerText:
      'Enti di ricerca, istituzioni e imprese possono proporre collaborazioni scientifiche o richiedere l’accesso all’Hub dati e open innovation di ENVIRIA.',
    ctaContact: 'Contatta ENVIRIA',
    ctaHub: 'Accedi al Hub',
  },
  en: {
    seoTitle: 'ENVIRIA — Research Infrastructure and AI Data Center in Sicily',
    seoDescription:
      'ENVIRIA is the Research Body managing the first and only environmental research infrastructure in the Mediterranean: a Green AI Data Center, datacenter nodes in Catania and Palermo, and thematic laboratories for environmental sustainability in Sicily.',
    heroTitle:
      'The GREEN ERI research infrastructure: a Green AI Data Center unlocking the value of the environmental data pipeline',
    heroLead:
      'ENVIRIA is building a high-performance, low-environmental-impact research infrastructure: supercomputing, artificial intelligence, edge computing and distributed sensing in the service of smart environmental data management.',
    ctaProject: 'Discover the Project',
    ctaFiliera: 'Explore the Data Pipeline',
    network: [
      { icon: Satellite, label: 'Sensors & satellites' },
      { icon: Server, label: 'HPC & AI' },
      { icon: Share2, label: 'Open Science' },
    ],
    pillarsKicker: 'Three pillars',
    pillarsTitle: 'One infrastructure, three missions',
    pillarsLead:
      'Research, computing and sustainability converge in a single ecosystem: the Green ERI infrastructure, the first and only environmental research infrastructure in the Mediterranean, acting as a hub for climate change.',
    pillars: [
      {
        icon: Radar,
        title: 'Research Infrastructure',
        text: 'A new high-performance, low-environmental-impact infrastructure: a Green Data Center, four thematic laboratories and a network of sensors across the territory.',
        to: '/progetto',
      },
      {
        icon: Cpu,
        title: 'AI Data Center',
        text: 'High-performance computing (HPC) for ecological research, powered by renewable sources and cooled with advanced, low-impact systems.',
        to: '/ai-data-center',
      },
      {
        icon: Leaf,
        title: 'Environmental Sustainability',
        text: 'From raw data to open science: a pipeline that turns territorial observation into shared knowledge on climate, biodiversity and risk.',
        to: '/filiera-del-dato',
      },
    ],
    pillarLink: 'Learn more',
    aiKicker: 'Artificial intelligence',
    aiTitle: 'AI in the service of environmental research',
    aiLead:
      'Artificial intelligence models analyse data collected across the territory to recognise climate, environmental and risk patterns, turning observation into knowledge useful to institutions and the scientific community.',
    aiAlt: 'Robotic hand interacting with a data network',
    videoKicker: 'Watch the project',
    videoTitle: 'Biodiversity in Sicily, in a video',
    videoLabel: 'Video',
    videoCaption: '"Sicily: a universe in an island"',
    videoSourceLabel: 'Institutional source',
    videoSource: 'Regione Siciliana – Department for Territory and Environment',
    videoTitleAttr: 'Biodiversity in Sicily',
    stats: [
      { value: '4', label: 'Thematic laboratories: GeoSense, GeoAI, GeoTwin, GeoDSS' },
      { value: 'HPC', label: 'Low-environmental-impact Green Data Center' },
      { value: 'IoT', label: 'Drone fleet and sensor boxes for territorial monitoring' },
      { value: 'Open', label: 'Data shared with the scientific community and decision-makers' },
    ],
    ctaBannerTitle: 'Let’s build the environmental research infrastructure for Sicily together',
    ctaBannerText:
      'Research bodies, institutions and companies can propose scientific collaborations or request access to the ENVIRIA data and open innovation Hub.',
    ctaContact: 'Contact ENVIRIA',
    ctaHub: 'Access the Hub',
  },
}

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
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/')
  const progettoPath = useLocalizedPath('/progetto')
  const filieraPath = useLocalizedPath('/filiera-del-dato')
  const chiSiamoPath = useLocalizedPath('/chi-siamo')

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length)
    }, 7000)
    return () => clearInterval(id)
  }, [reduceMotion])

  return (
    <>
      <Seo title={t.seoTitle} description={t.seoDescription} path={path} />
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
            {t.heroTitle}
          </motion.h1>
          <motion.p
            className="hero__lead"
            initial="hidden"
            animate="show"
            custom={0.1}
            variants={heroText}
          >
            {t.heroLead}
          </motion.p>
          <motion.div
            className="hero__actions"
            initial="hidden"
            animate="show"
            custom={0.2}
            variants={heroText}
          >
            <Link to={progettoPath} className="btn btn-primary">
              {t.ctaProject} <ArrowRight size={16} />
            </Link>
            <Link to={filieraPath} className="btn btn-outline">
              {t.ctaFiliera}
            </Link>
          </motion.div>

          <motion.div
            className="hero__network"
            initial="hidden"
            animate="show"
            custom={0.3}
            variants={heroText}
          >
            {t.network.map(({ icon: Icon, label }) => (
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
            <span className="kicker">{t.pillarsKicker}</span>
            <h2>{t.pillarsTitle}</h2>
            <p className="section-head__lead">{t.pillarsLead}</p>
          </Reveal>

          <div className="bento">
            {t.pillars.map(({ icon: Icon, title, text, to }, index) => (
              <Reveal
                key={title}
                className="bento-span-2"
                delay={index * 0.1}
              >
                <Link to={localizePath(to, lang)} className="pillar-card card">
                  <span className="pillar-card__icon">
                    <Icon size={24} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="pillar-card__link">
                    {t.pillarLink} <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <Reveal>
            <span className="kicker">{t.aiKicker}</span>
            <h2>{t.aiTitle}</h2>
            <p className="section-head__lead">{t.aiLead}</p>
          </Reveal>
          <Reveal delay={0.1} className="split-layout__media">
            <div className="split-layout__sticky">
              <PhotoBand src={aiNetworkHand} alt={t.aiAlt} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="kicker">{t.videoKicker}</span>
            <h2>{t.videoTitle}</h2>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="video-caption">
              <div>
                <dt>{t.videoLabel}</dt>
                <dd>{t.videoCaption}</dd>
              </div>
              <div className="video-caption__divider" aria-hidden="true" />
              <div>
                <dt>{t.videoSourceLabel}</dt>
                <dd>{t.videoSource}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.16}>
            <VideoEmbed youtubeId="WYK8xGyu4HA" title={t.videoTitleAttr} />
          </Reveal>
        </div>
      </section>

      <section className="stat-strip">
        <div className="container stat-strip__inner">
          {t.stats.map((stat) => (
            <div className="stat-strip__item" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div
            className="container cta-banner cta-banner--planet"
            style={{ backgroundImage: `url(${earthSpace})` }}
          >
            <div className="cta-banner__copy">
              <h2>{t.ctaBannerTitle}</h2>
              <p>{t.ctaBannerText}</p>
            </div>
            <div className="cta-banner__actions">
              <Link to={chiSiamoPath} className="btn btn-primary">
                {t.ctaContact}
              </Link>
              <Link to="/hub" className="btn btn-outline">
                {t.ctaHub}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <FundingNotice />
    </>
  )
}
