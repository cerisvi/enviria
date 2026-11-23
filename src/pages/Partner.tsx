import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import earthSpace from '../assets/photos/earth-space.webp'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { partnerCategories as fallbackPartnerCategories, type PartnerCategory } from '../data/partners'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'
import './Partner.css'

const content = {
  it: {
    seoTitle: 'Partner e Rete',
    seoDescription:
      "La rete di partner di ENVIRIA: enti di ricerca, istituzioni, università e imprese che collaborano all'infrastruttura di ricerca ambientale Green ERI in Sicilia.",
    kicker: 'Network',
    title: 'I partner di ENVIRIA',
    lead: 'L’infrastruttura di ricerca Green ERI nasce dalla collaborazione tra enti interni, istituzioni, università, centri di ricerca e imprese del territorio siciliano e nazionale.',
    visitSite: 'Visita il sito',
    ctaTitle: 'Vuoi diventare partner di ENVIRIA?',
    ctaText:
      'Enti di ricerca, istituzioni e imprese possono proporre collaborazioni scientifiche e progetti congiunti sull’infrastruttura Green ERI.',
    ctaContact: 'Contattaci',
  },
  en: {
    seoTitle: 'Partners and Network',
    seoDescription:
      'The ENVIRIA partner network: research bodies, institutions, universities and companies collaborating on the Green ERI environmental research infrastructure in Sicily.',
    kicker: 'Network',
    title: 'ENVIRIA’s partners',
    lead: 'The Green ERI research infrastructure was born from the collaboration between internal bodies, institutions, universities, research centres and companies across Sicily and Italy.',
    visitSite: 'Visit the website',
    ctaTitle: 'Want to become an ENVIRIA partner?',
    ctaText:
      'Research bodies, institutions and companies can propose scientific collaborations and joint projects on the Green ERI infrastructure.',
    ctaContact: 'Contact us',
  },
}

export default function Partner() {
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/partner')
  const chiSiamoPath = useLocalizedPath('/chi-siamo')
  // Contenuto di base (incluso nell'ultima build): mai vuoto per i crawler o
  // se il database del pannello di gestione non è ancora configurato.
  const [partnerCategories, setPartnerCategories] = useState<PartnerCategory[]>(
    fallbackPartnerCategories,
  )

  useEffect(() => {
    fetch('/api/partners.php')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: PartnerCategory[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setPartnerCategories(data)
        }
      })
      .catch(() => {
        // Database non ancora configurato o non raggiungibile: resta il
        // contenuto di base già mostrato.
      })
  }, [])

  return (
    <div className="inner-page">
      <Seo title={t.seoTitle} description={t.seoDescription} path={path} />
      <section className="inner-hero" style={{ backgroundImage: `url(${earthSpace})` }}>
        <Reveal className="container inner-hero__inner">
          <span className="kicker">{t.kicker}</span>
          <h1>{t.title}</h1>
          <p className="inner-hero__lead">{t.lead}</p>
        </Reveal>
      </section>

      {partnerCategories.map((category, categoryIndex) => (
        <section
          key={category.title}
          className={`section ${categoryIndex % 2 === 1 ? 'section--tint' : ''}`}
        >
          <div className="container">
            <Reveal className="section-head">
              <h2>{category.title}</h2>
            </Reveal>
            <div className="partner-grid">
              {category.partners.map((partner, index) => (
                <Reveal key={partner.name} delay={index * 0.04}>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card partner-card"
                  >
                    <span className="partner-card__logo">
                      <img src={partner.logo} alt={partner.name} loading="lazy" />
                    </span>
                    <span className="partner-card__name">{partner.name}</span>
                    <span className="partner-card__link">
                      {t.visitSite} <ArrowUpRight size={14} />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

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
