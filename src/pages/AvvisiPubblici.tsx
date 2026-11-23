import { useEffect, useState } from 'react'
import { ArrowRight, Briefcase, Calendar, ClipboardList, UserCog } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'
import './AvvisiPubblici.css'

interface Avviso {
  title: string
  date: string
  body: string
  link: string | null
}

const content = {
  it: {
    seoTitle: 'Avvisi Pubblici',
    seoDescription: 'Avvisi per il personale, Albo dei Fornitori e Long List Professionisti di ENVIRIA S.C.A.R.L.',
    kicker: 'Avvisi Pubblici',
    title: 'Avvisi, Albo Fornitori e Long List Professionisti',
    lead: 'In questa sezione ENVIRIA pubblica gli avvisi rivolti al personale e gestisce le iscrizioni all’Albo dei Fornitori e alla Long List dei Professionisti.',
    personaleTitle: 'Avvisi per il personale',
    readDocument: 'Leggi il documento',
    emptyNotice:
      'Nessun avviso attualmente in pubblicazione. Le opportunità di collaborazione e le eventuali selezioni di personale di ENVIRIA S.C.A.R.L. saranno pubblicate in questa sezione non appena disponibili.',
    alboTitle: 'Albo dei Fornitori',
    alboText:
      'L’Albo dei Fornitori raccoglie gli operatori economici interessati a partecipare, nel rispetto dei principi di trasparenza, non discriminazione e rotazione, alle procedure di affidamento di forniture e servizi di ENVIRIA S.C.A.R.L.',
    alboCta: 'Iscriviti all’Albo Fornitori',
    longListTitle: 'Long List Professionisti',
    longListText:
      'La Long List raccoglie i professionisti e gli esperti interessati a essere coinvolti in incarichi di consulenza e collaborazione connessi alle attività di ricerca e gestione dell’infrastruttura Green ERI.',
    longListCta: 'Iscriviti alla Long List',
    locale: 'it-IT',
  },
  en: {
    seoTitle: 'Public Notices',
    seoDescription: 'Staff notices, Supplier Register and Professionals Long List of ENVIRIA S.C.A.R.L.',
    kicker: 'Public Notices',
    title: 'Notices, Supplier Register and Professionals Long List',
    lead: 'In this section ENVIRIA publishes notices addressed to staff and manages registrations to the Supplier Register and the Professionals Long List.',
    personaleTitle: 'Staff notices',
    readDocument: 'Read the document',
    emptyNotice:
      'No notices are currently published. Collaboration opportunities and any staff selection processes of ENVIRIA S.C.A.R.L. will be published in this section as soon as they are available.',
    alboTitle: 'Supplier Register',
    alboText:
      'The Supplier Register collects economic operators interested in participating, in compliance with the principles of transparency, non-discrimination and rotation, in ENVIRIA S.C.A.R.L.’s procurement procedures for supplies and services.',
    alboCta: 'Register for the Supplier Register',
    longListTitle: 'Professionals Long List',
    longListText:
      'The Long List collects professionals and experts interested in being involved in consultancy and collaboration assignments related to the research activities and management of the Green ERI infrastructure.',
    longListCta: 'Join the Long List',
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

export default function AvvisiPubblici() {
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/avvisi-pubblici')
  const alboPath = useLocalizedPath('/avvisi-pubblici/albo-fornitori')
  const longListPath = useLocalizedPath('/avvisi-pubblici/long-list-professionisti')
  // Gli avvisi restano in italiano anche sulla versione inglese (contenuto
  // gestito dall'admin), come News e Partner.
  const [avvisi, setAvvisi] = useState<Avviso[] | null>(null)

  useEffect(() => {
    fetch('/api/avvisi.php')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: Avviso[]) => {
        if (Array.isArray(data)) {
          setAvvisi(data)
        }
      })
      .catch(() => {
        // Database non ancora configurato: resta il messaggio di stato vuoto.
      })
  }, [])

  return (
    <div className="inner-page">
      <Seo title={t.seoTitle} description={t.seoDescription} path={path} />
      <section className="inner-hero">
        <Reveal className="container inner-hero__inner">
          <span className="kicker">{t.kicker}</span>
          <h1>{t.title}</h1>
          <p className="inner-hero__lead">{t.lead}</p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <article id="avvisi-personale" className="card avviso-section">
              <span className="spec-card__icon">
                <UserCog size={22} />
              </span>
              <h2>{t.personaleTitle}</h2>
              {avvisi && avvisi.length > 0 ? (
                <div className="avviso-list">
                  {avvisi.map((avviso) => (
                    <div key={avviso.title + avviso.date} className="avviso-list__item">
                      <span className="avviso-list__date">
                        <Calendar size={13} /> {formatDate(avviso.date, t.locale)}
                      </span>
                      <h3>{avviso.title}</h3>
                      <p>{avviso.body}</p>
                      {avviso.link && (
                        <a href={avviso.link} target="_blank" rel="noreferrer">
                          {t.readDocument} <ArrowRight size={14} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="avviso-section__empty">{t.emptyNotice}</p>
              )}
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="card avviso-section">
              <span className="spec-card__icon spec-card__icon--blue">
                <Briefcase size={22} />
              </span>
              <h2>{t.alboTitle}</h2>
              <p>{t.alboText}</p>
              <Link to={alboPath} className="btn btn-primary">
                {t.alboCta} <ArrowRight size={16} />
              </Link>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="card avviso-section">
              <span className="spec-card__icon spec-card__icon--blue">
                <ClipboardList size={22} />
              </span>
              <h2>{t.longListTitle}</h2>
              <p>{t.longListText}</p>
              <Link to={longListPath} className="btn btn-primary">
                {t.longListCta} <ArrowRight size={16} />
              </Link>
            </article>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
