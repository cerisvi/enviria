import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, Calendar, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import riverCanyon from '../assets/photos/river-canyon.webp'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { newsItems as fallbackNewsItems, type NewsItem } from '../data/news'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'
import './News.css'

const content = {
  it: {
    seoTitle: 'News & Eventi',
    seoDescription:
      "Novità, eventi e aggiornamenti sul progetto G.R.E.E.N – E.R.I. e sull'infrastruttura di ricerca ambientale ENVIRIA in Sicilia.",
    kicker: 'Aggiornamenti',
    title: 'News & Eventi',
    lead: 'Le novità, gli appuntamenti e i traguardi del progetto G.R.E.E.N – E.R.I. e dell’infrastruttura di ricerca ENVIRIA.',
    readMore: 'Leggi tutto',
    showLess: 'Mostra meno',
    ctaTitle: 'Vuoi restare aggiornato su ENVIRIA?',
    ctaText: 'Scrivici per ricevere aggiornamenti su eventi, bandi e novità del progetto.',
    ctaContact: 'Contattaci',
    locale: 'it-IT',
  },
  en: {
    seoTitle: 'News & Events',
    seoDescription:
      'News, events and updates on the G.R.E.E.N – E.R.I. project and the ENVIRIA environmental research infrastructure in Sicily.',
    kicker: 'Updates',
    title: 'News & Events',
    lead: 'The news, events and milestones of the G.R.E.E.N – E.R.I. project and the ENVIRIA research infrastructure.',
    readMore: 'Read more',
    showLess: 'Show less',
    ctaTitle: 'Want to stay up to date on ENVIRIA?',
    ctaText: 'Write to us to receive updates on events, calls and project news.',
    ctaContact: 'Contact us',
    locale: 'en-GB',
  },
}

function formatDate(iso: string, locale: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function NewsBody({ body }: { body: string[] }) {
  const blocks: { type: 'heading' | 'list' | 'p'; content: string | string[] }[] = []

  for (const line of body) {
    if (line.startsWith('## ')) {
      blocks.push({ type: 'heading', content: line.slice(3) })
    } else if (line.startsWith('• ')) {
      const last = blocks[blocks.length - 1]
      if (last && last.type === 'list') {
        ;(last.content as string[]).push(line.slice(2))
      } else {
        blocks.push({ type: 'list', content: [line.slice(2)] })
      }
    } else {
      blocks.push({ type: 'p', content: line })
    }
  }

  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return <h4 key={index}>{block.content as string}</h4>
        }
        if (block.type === 'list') {
          return (
            <ul key={index}>
              {(block.content as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        return <p key={index}>{block.content as string}</p>
      })}
    </>
  )
}

export default function News() {
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/news')
  const chiSiamoPath = useLocalizedPath('/chi-siamo')
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  // Contenuto di base (quello incluso nell'ultima build del sito): garantisce
  // che la pagina non sia mai vuota per i crawler o se il database del
  // pannello di gestione non è ancora configurato. Appena la fetch verso il
  // pannello va a buon fine, i dati live la sostituiscono. Le news restano in
  // italiano anche sulla versione inglese (contenuto gestito dall'admin).
  const [newsItems, setNewsItems] = useState<NewsItem[]>(fallbackNewsItems)

  useEffect(() => {
    fetch('/api/news.php')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: NewsItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setNewsItems(data)
        }
      })
      .catch(() => {
        // Database non ancora configurato o non raggiungibile: resta il
        // contenuto di base già mostrato.
      })
  }, [])

  const sorted = [...newsItems].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="inner-page">
      <Seo title={t.seoTitle} description={t.seoDescription} path={path} />
      <section className="inner-hero" style={{ backgroundImage: `url(${riverCanyon})` }}>
        <Reveal className="container inner-hero__inner">
          <span className="kicker">{t.kicker}</span>
          <h1>{t.title}</h1>
          <p className="inner-hero__lead">{t.lead}</p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <div className="news-list">
            {sorted.map((item, index) => {
              const slug = item.date + item.title
              const isOpen = openSlug === slug
              return (
                <Reveal key={slug} delay={index * 0.06}>
                  <article className="card news-card">
                    <div className="news-card__media">
                      <img src={item.image} alt={item.imageAlt} loading="lazy" />
                    </div>
                    <div className="news-card__body">
                      <span className="news-card__date">
                        <Calendar size={14} /> {formatDate(item.date, t.locale)}
                      </span>
                      <h2>{item.title}</h2>
                      {item.subtitle && <p className="news-card__subtitle">{item.subtitle}</p>}
                      <p className="news-card__excerpt">{item.excerpt}</p>

                      {isOpen && (
                        <div className="news-card__full">
                          <NewsBody body={item.body} />
                          {item.gallery && item.gallery.length > 0 && (
                            <div className="news-card__gallery">
                              {item.gallery.map((photo) => (
                                <img
                                  key={photo.src}
                                  src={photo.src}
                                  alt={photo.alt}
                                  loading="lazy"
                                />
                              ))}
                            </div>
                          )}
                          {item.links && item.links.length > 0 && (
                            <div className="news-card__links">
                              {item.links.map((link) => (
                                <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                                  {link.label} <ArrowUpRight size={14} />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        type="button"
                        className="news-card__toggle"
                        onClick={() => setOpenSlug(isOpen ? null : slug)}
                        aria-expanded={isOpen}
                      >
                        {isOpen ? t.showLess : t.readMore}
                        <ChevronDown size={16} className={isOpen ? 'is-open' : ''} />
                      </button>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--tint">
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
