import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import earthSpace from '../assets/photos/earth-space.webp'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { partnerCategories } from '../data/partners'
import './InnerPage.css'
import './Partner.css'

export default function Partner() {
  return (
    <div className="inner-page">
      <Seo
        title="Partner e Rete"
        description="La rete di partner di ENVIRIA: enti di ricerca, istituzioni, università e imprese che collaborano all'infrastruttura di ricerca ambientale Green ERI in Sicilia."
        path="/partner"
      />
      <section className="inner-hero" style={{ backgroundImage: `url(${earthSpace})` }}>
        <Reveal className="container inner-hero__inner">
          <span className="kicker">Network</span>
          <h1>I partner di ENVIRIA</h1>
          <p className="inner-hero__lead">
            L’infrastruttura di ricerca Green ERI nasce dalla collaborazione tra enti interni,
            istituzioni, università, centri di ricerca e imprese del territorio siciliano e
            nazionale.
          </p>
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
                      Visita il sito <ArrowUpRight size={14} />
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
              <h2>Vuoi diventare partner di ENVIRIA?</h2>
              <p>
                Enti di ricerca, istituzioni e imprese possono proporre collaborazioni
                scientifiche e progetti congiunti sull’infrastruttura Green ERI.
              </p>
            </div>
            <div className="cta-banner__actions">
              <Link to="/chi-siamo" className="btn btn-primary">
                Contattaci <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
