import { type FormEvent, useState } from 'react'
import { Building2, Mail, MapPin, Send, Target, Users } from 'lucide-react'
import moonBranches from '../assets/photos/moon-branches.webp'
import coastlineAerial from '../assets/photos/coastline-aerial.webp'
import vineyard from '../assets/photos/vineyard.webp'
import PhotoBand from '../components/PhotoBand'
import Reveal from '../components/Reveal'
import './InnerPage.css'
import './ChiSiamo.css'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function ChiSiamo() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setErrorMessage(
          data.message || 'Invio non riuscito. Riprova più tardi o scrivici direttamente.',
        )
      }
    } catch {
      setStatus('error')
      setErrorMessage(
        'Impossibile contattare il server. Riprova più tardi o scrivici direttamente a direzione@enviriahub.it.',
      )
    }
  }

  return (
    <div className="inner-page">
      <section className="inner-hero" style={{ backgroundImage: `url(${moonBranches})` }}>
        <Reveal className="container inner-hero__inner">
          <span className="kicker">Chi Siamo &amp; Network</span>
          <h1>ENVIRIA S.C.A.R.L.</h1>
          <p className="inner-hero__lead">
            Una società consortile costituita per realizzare e gestire l’infrastruttura di
            ricerca Green ERI, mettendo in rete enti di ricerca, competenze tecniche e territorio
            attorno alla gestione intelligente dei dati ambientali.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-layout">
            <div className="grid grid-2">
              <Reveal>
                <article className="card spec-card">
                  <span className="spec-card__icon">
                    <Building2 size={22} />
                  </span>
                  <h3>Il consorzio</h3>
                  <p>
                    ENVIRIA è una Società Consortile a Responsabilità Limitata nata per dare continuità
                    operativa e gestionale all’infrastruttura di ricerca realizzata nell’ambito del
                    progetto G.R.E.E.N – E.R.I., finanziato dal PR FESR Sicilia 2021-2027.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.08}>
                <article className="card spec-card spec-card--blue">
                  <span className="spec-card__icon">
                    <Target size={22} />
                  </span>
                  <h3>La missione</h3>
                  <p>
                    Mettere l’infrastruttura di ricerca — Green Data Center, laboratori tematici e
                    rete di monitoraggio territoriale — al servizio della comunità scientifica, delle
                    istituzioni e del tessuto produttivo locale.
                  </p>
                </article>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="split-layout__media">
              <PhotoBand src={vineyard} alt="Vigneto sul territorio siciliano" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="section-head">
            <span className="kicker">Network</span>
            <h2>Enti di ricerca e partner di progetto</h2>
            <p className="section-head__lead">
              L’infrastruttura nasce dalla collaborazione tra enti di ricerca e soggetti tecnici
              del territorio.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="partner-list">
            <span className="partner-pill">
              <Users size={16} /> CERISVI — Ente di Ricerca
            </span>
            <span className="partner-pill">Smart Hub Srl</span>
            <span className="partner-pill">Europrosvi Srl</span>
            <span className="partner-pill">Area Sistemi di Innovazione</span>
            <span className="partner-pill">ARPA Sicilia</span>
            <span className="partner-pill">ISPRA</span>
            <span className="partner-pill">Università Kore di Enna</span>
          </Reveal>

          <p className="partner-list__categories">
            Lavoriamo inoltre con PMI, start up innovative e grandi imprese del territorio.
          </p>

          <PhotoBand src={coastlineAerial} alt="Vista aerea della costa siciliana" />
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <div className="card contact-info">
              <h3>Contatti</h3>
              <a href="mailto:direzione@enviriahub.it">
                <Mail size={16} /> direzione@enviriahub.it
              </a>
              <a
                href="https://www.openstreetmap.org/search?query=Corso%20Italia%20172%2C%2095128%20Catania"
                target="_blank"
                rel="noreferrer"
                className="contact-info__location"
              >
                <MapPin size={16} /> Corso Italia 172, 95128 Catania (CT)
              </a>
              <div className="contact-info__legal">
                <span>PEC: enviria@legalmail.it</span>
                <span>C.F. / P.IVA: 06297800879</span>
              </div>
              <p className="contact-info__note">
                Per collaborazioni scientifiche, richieste di accesso ai dati o informazioni sul
                progetto Green ERI, scrivici alla direzione.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card contact-form">
              {status === 'success' ? (
                <div className="contact-form__success">
                  <h3>Grazie per averci scritto!</h3>
                  <p>Abbiamo ricevuto la tua richiesta. Ti risponderemo al più presto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Honeypot anti-spam: campo nascosto, invisibile e ignorato dagli utenti reali */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="contact-form__honeypot"
                    aria-hidden="true"
                  />
                  <div className="contact-form__row">
                    <label>
                      Nome e cognome
                      <input type="text" name="name" required placeholder="Mario Rossi" />
                    </label>
                    <label>
                      Email
                      <input type="email" name="email" required placeholder="mario.rossi@email.it" />
                    </label>
                  </div>
                  <label>
                    Ente / organizzazione (opzionale)
                    <input type="text" name="organization" placeholder="Università, azienda, ente..." />
                  </label>
                  <label>
                    Messaggio
                    <textarea name="message" required rows={5} placeholder="Descrivi la tua richiesta..." />
                  </label>
                  <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Invio in corso…' : 'Invia richiesta'}
                    {status !== 'sending' && <Send size={16} />}
                  </button>
                  {status === 'error' && (
                    <p className="contact-form__error" role="alert">
                      {errorMessage}
                    </p>
                  )}
                  <p className="contact-form__disclaimer">
                    Scrivendoci acconsenti al trattamento dei dati per questa richiesta. Per
                    informazioni dirette:{' '}
                    <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a>.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
