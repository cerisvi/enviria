import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Database, Plane, Radio, Satellite, Share2 } from 'lucide-react'
import etnaAerial from '../assets/photos/etna-aerial.webp'
import networkCables from '../assets/photos/network-cables.webp'
import droneFlight from '../assets/photos/drone-flight.webp'
import dataDashboard from '../assets/photos/data-dashboard.webp'
import PhotoBand from '../components/PhotoBand'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'

const content = {
  it: {
    seoTitle: 'Filiera del Dato Ambientale — ENVIRIA Sicilia',
    seoDescription:
      "Dal rilievo sul campo alla scienza aperta: flotta droni, rete IoT, geo-database territoriale e piattaforma di interoperabilità dell'infrastruttura di ricerca ambientale ENVIRIA in Sicilia.",
    heroKicker: 'Il Valore Scientifico',
    heroTitle: 'La Filiera del Dato Ambientale',
    heroLead:
      'Dal rilievo sul campo alla scienza aperta: il percorso che trasforma l’osservazione del territorio in conoscenza condivisa, a supporto della ricerca e delle decisioni pubbliche.',
    droneAlt: 'Drone in volo per il rilievo aereo del territorio',
    steps: [
      {
        title: 'Raccolta',
        text: 'Sensori distribuiti, box IoT, una flotta di droni per il rilievo aereo e stazioni di monitoraggio raccolgono dati ambientali direttamente sul territorio.',
      },
      {
        title: 'Elaborazione',
        text: 'I dati grezzi confluiscono in un sistema integrato che li organizza in un geo-database territoriale, pronto per l’analisi su larga scala.',
      },
      {
        title: 'Analisi & AI',
        text: 'Modelli di intelligenza artificiale e il gemello digitale del territorio (digital twin) generano scenari predittivi su clima, biodiversità e rischi ambientali.',
      },
      {
        title: 'Open Science',
        text: 'I risultati vengono condivisi con la comunità scientifica e i decisori pubblici, a supporto di politiche ambientali basate sui dati.',
      },
    ],
    cycleKicker: 'Il Ciclo del Dato',
    cycleTitle: 'L’infrastruttura di monitoraggio territoriale',
    cycleLead:
      'Gli strumenti alla base della filiera: una rete fisica e digitale che osserva, raccoglie e interconnette i dati ambientali del territorio.',
    infrastructure: [
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
    ],
    networkCablesAlt: 'Dettaglio di un pannello di permutazione con cavi di rete',
    predictiveTitle: 'Modelli predittivi',
    predictiveText:
      'L’analisi incrociata dei dati raccolti alimenta modelli predittivi su clima, biodiversità e sicurezza del territorio, sviluppati nei laboratori GeoAI, GeoTwin e GeoDSS.',
    interopTitle: 'Interoperabilità europea',
    interopText:
      'L’infrastruttura dialoga con piattaforme di ricerca di livello regionale, nazionale ed europeo, in un’ottica di collaborazione scientifica aperta.',
    dashboardAlt: 'Interfaccia di visualizzazione dati con punti colorati, simbolo della rete di interoperabilità',
    ctaTitle: 'Vuoi accedere ai dati o proporre una collaborazione?',
    ctaText:
      'Enti di ricerca, istituzioni e imprese possono richiedere l’accesso alla filiera del dato ambientale e proporre progetti congiunti.',
    ctaContact: 'Contattaci',
  },
  en: {
    seoTitle: 'Environmental Data Pipeline — ENVIRIA Sicily',
    seoDescription:
      'From field surveys to open science: drone fleet, IoT network, territorial geo-database and interoperability platform of the ENVIRIA environmental research infrastructure in Sicily.',
    heroKicker: 'Scientific Value',
    heroTitle: 'The Environmental Data Pipeline',
    heroLead:
      'From field surveys to open science: the pathway that turns territorial observation into shared knowledge, supporting research and public decision-making.',
    droneAlt: 'Drone flying for an aerial survey of the territory',
    steps: [
      {
        title: 'Collection',
        text: 'Distributed sensors, IoT boxes, a drone fleet for aerial surveying and monitoring stations collect environmental data directly across the territory.',
      },
      {
        title: 'Processing',
        text: 'Raw data flows into an integrated system that organises it into a territorial geo-database, ready for large-scale analysis.',
      },
      {
        title: 'Analysis & AI',
        text: 'Artificial intelligence models and the digital twin of the territory generate predictive scenarios on climate, biodiversity and environmental risk.',
      },
      {
        title: 'Open Science',
        text: 'Results are shared with the scientific community and public decision-makers, supporting data-driven environmental policies.',
      },
    ],
    cycleKicker: 'The Data Cycle',
    cycleTitle: 'The territorial monitoring infrastructure',
    cycleLead:
      'The tools underpinning the pipeline: a physical and digital network that observes, collects and interconnects environmental data across the territory.',
    infrastructure: [
      {
        icon: Plane,
        title: 'Drone fleet',
        text: 'Automated flight plans for mapping and periodic monitoring of the territory.',
      },
      {
        icon: Radio,
        title: 'IoT network and sensor boxes',
        text: 'An integrated system of distributed sensors forming an advanced environmental monitoring network.',
      },
      {
        icon: Database,
        title: 'Territorial GeoDB',
        text: 'A shared geo-database underpinning the digital twin of the territory.',
      },
      {
        icon: Share2,
        title: 'Interoperability platform',
        text: 'Interfaces and protocols for exchanging data with regional, national and European platforms.',
      },
    ],
    networkCablesAlt: 'Detail of a patch panel with network cables',
    predictiveTitle: 'Predictive models',
    predictiveText:
      'Cross-analysis of the collected data feeds predictive models on climate, biodiversity and territorial safety, developed in the GeoAI, GeoTwin and GeoDSS laboratories.',
    interopTitle: 'European interoperability',
    interopText:
      'The infrastructure interacts with regional, national and European research platforms, in a spirit of open scientific collaboration.',
    dashboardAlt: 'Data visualisation interface with coloured points, symbolising the interoperability network',
    ctaTitle: 'Want to access the data or propose a collaboration?',
    ctaText:
      'Research bodies, institutions and companies can request access to the environmental data pipeline and propose joint projects.',
    ctaContact: 'Contact us',
  },
}

export default function FilieraDelDato() {
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/filiera-del-dato')
  const chiSiamoPath = useLocalizedPath('/chi-siamo')

  return (
    <div className="inner-page">
      <Seo title={t.seoTitle} description={t.seoDescription} path={path} />
      <section className="inner-hero" style={{ backgroundImage: `url(${etnaAerial})` }}>
        <Reveal className="container inner-hero__inner">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p className="inner-hero__lead">{t.heroLead}</p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-layout split-layout--reverse">
            <Reveal className="split-layout__media">
              <div className="split-layout__sticky">
                <PhotoBand src={droneFlight} alt={t.droneAlt} />
              </div>
            </Reveal>
            <div className="step-flow">
              {t.steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.08}>
                  <div className="step-flow__item">
                    <div className="step-flow__index">{index + 1}</div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="section-head">
            <span className="kicker">{t.cycleKicker}</span>
            <h2>{t.cycleTitle}</h2>
            <p className="section-head__lead">{t.cycleLead}</p>
          </Reveal>

          <div className="grid grid-4">
            {t.infrastructure.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.06}>
                <article className="card spec-card">
                  <span className="spec-card__icon">
                    <Icon size={20} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <PhotoBand src={networkCables} alt={t.networkCablesAlt} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <Reveal>
              <div className="card spec-card spec-card--blue">
                <span className="spec-card__icon">
                  <BarChart3 size={22} />
                </span>
                <h3>{t.predictiveTitle}</h3>
                <p>{t.predictiveText}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="card spec-card spec-card--blue">
                <span className="spec-card__icon">
                  <Satellite size={22} />
                </span>
                <h3>{t.interopTitle}</h3>
                <p>{t.interopText}</p>
              </div>
            </Reveal>
          </div>

          <PhotoBand src={dataDashboard} alt={t.dashboardAlt} />
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="container cta-banner card">
            <div className="cta-banner__copy">
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>
            </div>
            <div className="cta-banner__actions">
              <Link to={chiSiamoPath} className="btn btn-primary">
                {t.ctaContact} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
