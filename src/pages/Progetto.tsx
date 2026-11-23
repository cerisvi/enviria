import { Link } from 'react-router-dom'
import { ArrowRight, BrainCircuit, Database, Map, SlidersHorizontal } from 'lucide-react'
import Reveal from '../components/Reveal'
import PhotoBand from '../components/PhotoBand'
import Seo from '../components/Seo'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import riverCanyon from '../assets/photos/river-canyon.webp'
import etnaAerial from '../assets/photos/etna-aerial.webp'
import digitalTwin from '../assets/photos/digital-twin.webp'
import lightTrails from '../assets/photos/light-trails.webp'
import leafDroplets from '../assets/photos/leaf-droplets.webp'
import './InnerPage.css'
import './Progetto.css'

const content = {
  it: {
    seoTitle: 'Il Progetto — Infrastruttura di Ricerca Ambientale',
    seoDescription:
      "Il progetto G.R.E.E.N – E.R.I.: la prima infrastruttura di ricerca sull'ambiente nel Mediterraneo. Un progetto di ricerca su ambiente e sostenibilità ambientale con AI Data Center, supercalcolo ed edge computing, finanziato dal PR FESR Sicilia 2021-2027.",
    heroKicker: 'Il Progetto · G.R.E.E.N – E.R.I.',
    heroTitle: 'Un’infrastruttura di ricerca per rispondere al cambiamento climatico',
    heroLead:
      'Il progetto Green ERI risponde alle sfide del cambiamento climatico attraverso la digitalizzazione: una nuova infrastruttura di ricerca che unisce supercalcolo, intelligenza artificiale, edge computing e sensoristica distribuita per la gestione intelligente dei dati ambientali, realizzata nell’ambito del PR FESR Sicilia 2021-2027.',
    obiettiviKicker: 'Obiettivi realizzativi',
    obiettiviTitle: 'Dalla costruzione dell’infrastruttura alla disseminazione dei risultati',
    etnaAlt: 'Vista aerea dell’Etna e del territorio siciliano',
    obiettivi: [
      {
        code: 'OR1',
        title: 'Realizzazione dell’infrastruttura di ricerca',
        text: 'Costruzione di una nuova infrastruttura ad alte prestazioni e basso impatto ambientale per la gestione intelligente dei dati ambientali, attraverso supercalcolo, intelligenza artificiale, edge computing e sensoristica distribuita: il Green Data Center, quattro laboratori tematici e l’integrazione con piattaforme di ricerca regionali, nazionali ed europee.',
      },
      {
        code: 'OR2',
        title: 'Ecosistema dell’innovazione territoriale',
        text: 'Sviluppo di dimostratori su agricoltura, salute e sicurezza ambientale in co-design con le imprese, e rafforzamento dell’ecosistema locale attraverso startup, percorsi di ricerca applicata e iniziative di open innovation.',
      },
      {
        code: 'OR3',
        title: 'Sistema di monitoraggio territoriale',
        text: 'Realizzazione di una rete evoluta di monitoraggio basata su flotta di droni, box sensori IoT e una piattaforma dati condivisa, per la costruzione di un gemello digitale (digital twin) del territorio.',
      },
      {
        code: 'OR4',
        title: 'Integrazione e collaudo',
        text: 'Integrazione dei sottosistemi dell’infrastruttura di ricerca e collaudo complessivo, a garanzia dell’affidabilità, interoperabilità e scalabilità del sistema.',
      },
      {
        code: 'OR5',
        title: 'Gestione e disseminazione',
        text: 'Coordinamento del progetto e condivisione dei risultati con la comunità scientifica, le istituzioni e il territorio, in continuità con i principi della scienza aperta.',
      },
    ],
    labsKicker: 'L’infrastruttura',
    labsTitle: 'Quattro laboratori tematici',
    labsLead:
      'Il cuore scientifico dell’infrastruttura: quattro laboratori dedicati all’intero ciclo del dato ambientale, dalla raccolta sul campo al supporto alle decisioni.',
    digitalTwinAlt: 'Visualizzazione astratta di un modello digitale del territorio (digital twin)',
    laboratori: [
      {
        icon: Database,
        name: 'GeoSense Lab',
        subtitle: 'Acquisizione e Memorizzazione dei Dati Ambientali',
        text: 'Raccolta e archiviazione strutturata dei dati provenienti da sensori distribuiti, droni e stazioni di monitoraggio sul territorio.',
      },
      {
        icon: BrainCircuit,
        name: 'GeoAI Lab',
        subtitle: 'Intelligenza Artificiale applicata all’ambiente',
        text: 'Modelli di intelligenza artificiale per l’analisi dei dati ambientali e il riconoscimento di pattern climatici, agricoli e di rischio territoriale.',
      },
      {
        icon: Map,
        name: 'GeoTwin Lab',
        subtitle: 'Digital Twin del territorio',
        text: 'Ricostruzione digitale del territorio per simulazioni, scenari predittivi e analisi dell’impatto ambientale degli interventi.',
      },
      {
        icon: SlidersHorizontal,
        name: 'GeoDSS Lab',
        subtitle: 'Sistemi di Supporto alle Decisioni Ambientali',
        text: 'Strumenti decisionali basati su dati e modelli predittivi, a supporto di istituzioni e decisori pubblici nella gestione del territorio.',
      },
    ],
    territoryKicker: 'Il territorio al centro',
    territoryTitle: 'Dove innovazione e ambiente si incontrano',
    lightTrailsAlt: 'Flussi di luce astratti su un edificio, metafora della rete di dati',
    leafAlt: 'Dettaglio macro di una foglia con gocce d’acqua',
    ctaTitle: 'Scopri l’AI Data Center e la Filiera del Dato',
    ctaText:
      'Approfondisci la tecnologia di calcolo sostenibile e il percorso che trasforma il dato ambientale in conoscenza condivisa.',
    ctaAiDataCenter: 'AI Data Center',
    ctaFiliera: 'Filiera del Dato',
    ctaContact: 'Contattaci',
  },
  en: {
    seoTitle: 'The Project — Environmental Research Infrastructure',
    seoDescription:
      'The G.R.E.E.N – E.R.I. project: the first environmental research infrastructure in the Mediterranean. A research project on the environment and environmental sustainability featuring an AI Data Center, HPC and edge computing, funded by the PR FESR Sicilia 2021-2027 programme.',
    heroKicker: 'The Project · G.R.E.E.N – E.R.I.',
    heroTitle: 'A research infrastructure to respond to climate change',
    heroLead:
      'The Green ERI project responds to the challenges of climate change through digitalisation: a new research infrastructure combining HPC, artificial intelligence, edge computing and distributed sensing for the smart management of environmental data, developed under the PR FESR Sicilia 2021-2027 programme.',
    obiettiviKicker: 'Implementation objectives',
    obiettiviTitle: 'From building the infrastructure to disseminating the results',
    etnaAlt: 'Aerial view of Mount Etna and the Sicilian territory',
    obiettivi: [
      {
        code: 'OR1',
        title: 'Building the research infrastructure',
        text: 'Construction of a new high-performance, low-environmental-impact infrastructure for smart environmental data management, through HPC, artificial intelligence, edge computing and distributed sensing: the Green Data Center, four thematic laboratories and integration with regional, national and European research platforms.',
      },
      {
        code: 'OR2',
        title: 'Territorial innovation ecosystem',
        text: 'Development of demonstrators in agriculture, health and environmental safety, co-designed with businesses, and strengthening of the local ecosystem through startups, applied research pathways and open innovation initiatives.',
      },
      {
        code: 'OR3',
        title: 'Territorial monitoring system',
        text: 'Development of an advanced monitoring network based on a drone fleet, IoT sensor boxes and a shared data platform, to build a digital twin of the territory.',
      },
      {
        code: 'OR4',
        title: 'Integration and testing',
        text: 'Integration of the research infrastructure’s subsystems and overall testing, ensuring the system’s reliability, interoperability and scalability.',
      },
      {
        code: 'OR5',
        title: 'Management and dissemination',
        text: 'Project coordination and sharing of results with the scientific community, institutions and the territory, in line with open science principles.',
      },
    ],
    labsKicker: 'The infrastructure',
    labsTitle: 'Four thematic laboratories',
    labsLead:
      'The scientific core of the infrastructure: four laboratories dedicated to the entire environmental data lifecycle, from field collection to decision support.',
    digitalTwinAlt: 'Abstract visualisation of a digital model of the territory (digital twin)',
    laboratori: [
      {
        icon: Database,
        name: 'GeoSense Lab',
        subtitle: 'Environmental Data Acquisition and Storage',
        text: 'Structured collection and archiving of data from distributed sensors, drones and monitoring stations across the territory.',
      },
      {
        icon: BrainCircuit,
        name: 'GeoAI Lab',
        subtitle: 'Artificial Intelligence applied to the environment',
        text: 'Artificial intelligence models for analysing environmental data and recognising climate, agricultural and territorial risk patterns.',
      },
      {
        icon: Map,
        name: 'GeoTwin Lab',
        subtitle: 'Digital Twin of the territory',
        text: 'Digital reconstruction of the territory for simulations, predictive scenarios and environmental impact analysis of interventions.',
      },
      {
        icon: SlidersHorizontal,
        name: 'GeoDSS Lab',
        subtitle: 'Environmental Decision Support Systems',
        text: 'Decision-making tools based on data and predictive models, supporting institutions and public decision-makers in territorial management.',
      },
    ],
    territoryKicker: 'The territory at the centre',
    territoryTitle: 'Where innovation and the environment meet',
    lightTrailsAlt: 'Abstract light trails on a building, a metaphor for the data network',
    leafAlt: 'Macro detail of a leaf with water droplets',
    ctaTitle: 'Discover the AI Data Center and the Data Pipeline',
    ctaText:
      'Learn more about the sustainable computing technology and the pipeline that turns environmental data into shared knowledge.',
    ctaAiDataCenter: 'AI Data Center',
    ctaFiliera: 'Data Pipeline',
    ctaContact: 'Contact us',
  },
}

export default function Progetto() {
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/progetto')
  const aiDataCenterPath = useLocalizedPath('/ai-data-center')
  const filieraPath = useLocalizedPath('/filiera-del-dato')
  const chiSiamoPath = useLocalizedPath('/chi-siamo')

  return (
    <div className="inner-page">
      <Seo title={t.seoTitle} description={t.seoDescription} path={path} />
      <section className="inner-hero" style={{ backgroundImage: `url(${riverCanyon})` }}>
        <Reveal className="container inner-hero__inner">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p className="inner-hero__lead">{t.heroLead}</p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="kicker">{t.obiettiviKicker}</span>
            <h2>{t.obiettiviTitle}</h2>
          </Reveal>

          <div className="split-layout">
            <div className="timeline">
              {t.obiettivi.map((o, index) => (
                <Reveal key={o.code} delay={index * 0.06}>
                  <div className="timeline__item">
                    <div className="timeline__index">{o.code}</div>
                    <div>
                      <h3>{o.title}</h3>
                      <p>{o.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15} className="split-layout__media">
              <div className="split-layout__sticky">
                <PhotoBand src={etnaAerial} alt={t.etnaAlt} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="section-head">
            <span className="kicker">{t.labsKicker}</span>
            <h2>{t.labsTitle}</h2>
            <p className="section-head__lead">{t.labsLead}</p>
          </Reveal>

          <div className="split-layout split-layout--reverse">
            <Reveal delay={0.1} className="split-layout__media">
              <div className="split-layout__sticky">
                <PhotoBand src={digitalTwin} alt={t.digitalTwinAlt} />
              </div>
            </Reveal>
            <div className="grid grid-2">
              {t.laboratori.map(({ icon: Icon, name, subtitle, text }, index) => (
                <Reveal key={name} delay={index * 0.08}>
                  <article className="card spec-card">
                    <span className="spec-card__icon">
                      <Icon size={22} />
                    </span>
                    <h3>{name}</h3>
                    <p className="lab-card__subtitle">{subtitle}</p>
                    <p>{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="kicker">{t.territoryKicker}</span>
            <h2>{t.territoryTitle}</h2>
          </Reveal>
          <div className="grid grid-2">
            <Reveal>
              <PhotoBand src={lightTrails} alt={t.lightTrailsAlt} />
            </Reveal>
            <Reveal delay={0.08}>
              <PhotoBand src={leafDroplets} alt={t.leafAlt} />
            </Reveal>
          </div>
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
              <Link to={aiDataCenterPath} className="btn btn-primary">
                {t.ctaAiDataCenter} <ArrowRight size={16} />
              </Link>
              <Link to={filieraPath} className="btn btn-outline">
                {t.ctaFiliera}
              </Link>
              <Link to={chiSiamoPath} className="btn btn-outline">
                {t.ctaContact}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
