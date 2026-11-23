import { useEffect, useState } from 'react'
import { ArrowRight, Briefcase, Calendar, ClipboardList, UserCog } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import './InnerPage.css'
import './AvvisiPubblici.css'

interface Avviso {
  title: string
  date: string
  body: string
  link: string | null
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function AvvisiPubblici() {
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
      <Seo
        title="Avvisi Pubblici"
        description="Avvisi per il personale, Albo dei Fornitori e Long List Professionisti di ENVIRIA S.C.A.R.L."
        path="/avvisi-pubblici"
      />
      <section className="inner-hero">
        <Reveal className="container inner-hero__inner">
          <span className="kicker">Avvisi Pubblici</span>
          <h1>Avvisi, Albo Fornitori e Long List Professionisti</h1>
          <p className="inner-hero__lead">
            In questa sezione ENVIRIA pubblica gli avvisi rivolti al personale e gestisce le
            iscrizioni all’Albo dei Fornitori e alla Long List dei Professionisti.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <article id="avvisi-personale" className="card avviso-section">
              <span className="spec-card__icon">
                <UserCog size={22} />
              </span>
              <h2>Avvisi per il personale</h2>
              {avvisi && avvisi.length > 0 ? (
                <div className="avviso-list">
                  {avvisi.map((avviso) => (
                    <div key={avviso.title + avviso.date} className="avviso-list__item">
                      <span className="avviso-list__date">
                        <Calendar size={13} /> {formatDate(avviso.date)}
                      </span>
                      <h3>{avviso.title}</h3>
                      <p>{avviso.body}</p>
                      {avviso.link && (
                        <a href={avviso.link} target="_blank" rel="noreferrer">
                          Leggi il documento <ArrowRight size={14} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="avviso-section__empty">
                  Nessun avviso attualmente in pubblicazione. Le opportunità di
                  collaborazione e le eventuali selezioni di personale di ENVIRIA S.C.A.R.L.
                  saranno pubblicate in questa sezione non appena disponibili.
                </p>
              )}
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="card avviso-section">
              <span className="spec-card__icon spec-card__icon--blue">
                <Briefcase size={22} />
              </span>
              <h2>Albo dei Fornitori</h2>
              <p>
                L’Albo dei Fornitori raccoglie gli operatori economici interessati a
                partecipare, nel rispetto dei principi di trasparenza, non discriminazione
                e rotazione, alle procedure di affidamento di forniture e servizi di
                ENVIRIA S.C.A.R.L.
              </p>
              <Link to="/avvisi-pubblici/albo-fornitori" className="btn btn-primary">
                Iscriviti all’Albo Fornitori <ArrowRight size={16} />
              </Link>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="card avviso-section">
              <span className="spec-card__icon spec-card__icon--blue">
                <ClipboardList size={22} />
              </span>
              <h2>Long List Professionisti</h2>
              <p>
                La Long List raccoglie i professionisti e gli esperti interessati a essere
                coinvolti in incarichi di consulenza e collaborazione connessi alle
                attività di ricerca e gestione dell’infrastruttura Green ERI.
              </p>
              <Link to="/avvisi-pubblici/long-list-professionisti" className="btn btn-primary">
                Iscriviti alla Long List <ArrowRight size={16} />
              </Link>
            </article>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
