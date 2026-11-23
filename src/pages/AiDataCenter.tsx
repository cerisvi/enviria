import { Fragment } from 'react'
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
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'
import './AiDataCenter.css'

const content = {
  it: {
    seoTitle: 'AI Data Center — Green Data Center in Sicilia',
    seoDescription:
      "L'AI Data Center di ENVIRIA: un Green Data Center distribuito su due nodi datacenter (Catania e Palermo), alimentato da fonti rinnovabili, per il supercalcolo (HPC) al servizio della ricerca ambientale in Sicilia.",
    heroKicker: 'La Tecnologia',
    heroTitle: 'AI Data Center: supercalcolo al servizio della ricerca ecologica',
    heroLead:
      'Il Green Data Center di ENVIRIA mette a disposizione della ricerca ambientale potenza di calcolo ad alte prestazioni (HPC), progettata fin dall’origine per minimizzare l’impatto energetico e ambientale dell’infrastruttura stessa.',
    hpcKicker: 'Calcolo ad Alte Prestazioni',
    hpcTitle: 'La potenza computazionale della ricerca',
    dataTerminalAlt: 'Flusso di dati elaborati su un terminale di calcolo',
    hpc: [
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
    ],
    archSteps: ['Energia rinnovabile', 'Server GPU / CPU', 'Raffreddamento a liquido', 'Sala controllo'],
    dataCorridorAlt: 'Corridoio di un data center con flusso di dati proiettato sulle pareti',
    serverRoomAlt: 'Fila di rack server in un data center',
    greenKicker: 'Sostenibilità Digitale',
    greenTitle: 'Green Computing: calcolare senza pesare sul pianeta',
    greenLead:
      'Un data center alimentato da fonti rinnovabili e raffreddato con tecnologie a basso impatto, perché la ricerca sull’ambiente non può prescindere dalla sostenibilità dei propri strumenti.',
    solarAlt: 'Vista aerea di un campo fotovoltaico',
    green: [
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
    ],
    ctaTitle: 'Dal calcolo alla conoscenza condivisa',
    ctaText: 'Scopri come i dati elaborati dal Data Center diventano scienza aperta.',
    ctaFiliera: 'La Filiera del Dato',
    ctaContact: 'Contattaci',
  },
  en: {
    seoTitle: 'AI Data Center — Green Data Center in Sicily',
    seoDescription:
      'The ENVIRIA AI Data Center: a Green Data Center distributed across two datacenter nodes (Catania and Palermo), powered by renewable sources, for high-performance computing (HPC) in the service of environmental research in Sicily.',
    heroKicker: 'The Technology',
    heroTitle: 'AI Data Center: supercomputing in the service of ecological research',
    heroLead:
      'The ENVIRIA Green Data Center provides environmental research with high-performance computing (HPC) power, designed from the outset to minimise the energy and environmental impact of the infrastructure itself.',
    hpcKicker: 'High-Performance Computing',
    hpcTitle: 'The computational power of research',
    dataTerminalAlt: 'Data flow being processed on a computing terminal',
    hpc: [
      {
        icon: Cpu,
        title: 'Dedicated GPU/CPU servers',
        text: 'High-performance compute nodes oriented towards environmental research workloads: climate models, large-scale data analysis and artificial intelligence processing.',
      },
      {
        icon: MonitorCog,
        title: 'Control room',
        text: 'Monitoring and operational management of the computing infrastructure, safeguarding continuity, security and system reliability.',
      },
    ],
    archSteps: ['Renewable energy', 'GPU / CPU servers', 'Liquid cooling', 'Control room'],
    dataCorridorAlt: 'Data center corridor with a data flow projected on the walls',
    serverRoomAlt: 'Row of server racks in a data center',
    greenKicker: 'Digital Sustainability',
    greenTitle: 'Green Computing: computing without weighing on the planet',
    greenLead:
      'A data center powered by renewable sources and cooled with low-impact technologies, because environmental research cannot disregard the sustainability of its own tools.',
    solarAlt: 'Aerial view of a photovoltaic field',
    green: [
      {
        icon: Boxes,
        title: 'Modular System',
        text: 'The HPC infrastructure is hosted in a modular, scalable facility, distributed across two nodes: Catania – Palermo.',
      },
      {
        icon: SunMedium,
        title: 'Photovoltaic power supply',
        text: 'A dedicated photovoltaic system contributes to the data center’s energy supply, in line with Green Computing principles.',
      },
      {
        icon: Droplets,
        title: 'Low-impact cooling',
        text: 'Air cooling and direct-immersion liquid cooling (3M Novec fluid), a technology that significantly reduces cooling energy consumption compared to traditional systems.',
      },
    ],
    ctaTitle: 'From computing to shared knowledge',
    ctaText: 'Discover how the data processed by the Data Center becomes open science.',
    ctaFiliera: 'The Data Pipeline',
    ctaContact: 'Contact us',
  },
}

export default function AiDataCenter() {
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/ai-data-center')
  const filieraPath = useLocalizedPath('/filiera-del-dato')
  const chiSiamoPath = useLocalizedPath('/chi-siamo')
  const archIcons = [SunMedium, Cpu, Droplets, MonitorCog]

  return (
    <div className="inner-page">
      <Seo title={t.seoTitle} description={t.seoDescription} path={path} />
      <section className="inner-hero" style={{ backgroundImage: `url(${solarPanels})` }}>
        <Reveal className="container inner-hero__inner">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p className="inner-hero__lead">{t.heroLead}</p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="kicker">{t.hpcKicker}</span>
            <h2>{t.hpcTitle}</h2>
          </Reveal>

          <div className="split-layout">
            <div className="grid grid-2">
              {t.hpc.map(({ icon: Icon, title, text }, index) => (
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
                <PhotoBand src={dataTerminal} alt={t.dataTerminalAlt} />
              </div>
            </Reveal>
          </div>

          <div className="architecture">
            {t.archSteps.map((label, index) => {
              const Icon = archIcons[index]
              return (
                <Fragment key={label}>
                  <div className="architecture__step">
                    <span className="architecture__icon">
                      <Icon size={24} />
                    </span>
                    <span>{label}</span>
                  </div>
                  {index < t.archSteps.length - 1 && (
                    <div className="architecture__arrow" aria-hidden="true" />
                  )}
                </Fragment>
              )
            })}
          </div>

          <Reveal>
            <PhotoBand src={dataCorridor} alt={t.dataCorridorAlt} />
          </Reveal>
          <Reveal delay={0.1}>
            <PhotoBand src={serverRoom} alt={t.serverRoomAlt} />
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="kicker">{t.greenKicker}</span>
            <h2>{t.greenTitle}</h2>
            <p className="section-head__lead">{t.greenLead}</p>
          </Reveal>

          <div className="split-layout split-layout--reverse">
            <Reveal delay={0.1} className="split-layout__media">
              <div className="split-layout__sticky">
                <PhotoBand src={solarAerial} alt={t.solarAlt} />
              </div>
            </Reveal>
            <div className="grid grid-3">
              {t.green.map(({ icon: Icon, title, text }, index) => (
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
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>
            </div>
            <div className="cta-banner__actions">
              <Link to={filieraPath} className="btn btn-primary">
                {t.ctaFiliera} <ArrowRight size={16} />
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
