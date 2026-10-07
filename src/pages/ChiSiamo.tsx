import { type FormEvent, useState } from 'react'
import { Building2, Mail, MapPin, Send, Target, Users } from 'lucide-react'
import './InnerPage.css'
import './ChiSiamo.css'

export default function ChiSiamo() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="inner-page">
      <section className="inner-hero">
        <div className="container inner-hero__inner">
          <span className="kicker">Chi Siamo &amp; Network</span>
          <h1>ENVIRIA S.C.A.R.L.</h1>
          <p className="inner-hero__lead">
            Una società consortile costituita per realizzare e gestire l'infrastruttura di
            ricerca Green ERI, mettendo in rete enti di ricerca, competenze tecniche e territorio
            attorno alla gestione intelligente dei dati ambientali.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <article className="card spec-card">
              <span className="spec-card__icon">
                <Building2 size={22} />
              </span>
              <h3>Il consorzio</h3>
              <p>
                ENVIRIA è una Società Consortile a Responsabilità Limitata nata per dare continuità
                operativa e gestionale all'infrastruttura di ricerca realizzata nell'ambito del
                progetto G.R.E.E.N – E.R.I., finanziato dal PR FESR Sicilia 2021-2027.
              </p>
            </article>
            <article className="card spec-card spec-card--blue">
              <span className="spec-card__icon">
                <Target size={22} />
              </span>
              <h3>La missione</h3>
              <p>
                Mettere l'infrastruttura di ricerca — Green Data Center, laboratori tematici e
                rete di monitoraggio territoriale — al servizio della comunità scientifica, delle
                istituzioni e del tessuto produttivo locale.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Network</span>
            <h2>Enti di ricerca e partner di progetto</h2>
            <p className="section-head__lead">
              L'infrastruttura nasce dalla collaborazione tra enti di ricerca e soggetti tecnici
              del territorio.
            </p>
          </div>

          <div className="partner-list">
            <span className="partner-pill">
              <Users size={16} /> CERISVI — Ente di Ricerca
            </span>
            <span className="partner-pill partner-pill--muted">
              Nuovi partner in fase di consolidamento
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
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

          <div className="card contact-form">
            {submitted ? (
              <div className="contact-form__success">
                <h3>Grazie per averci scritto!</h3>
                <p>Abbiamo ricevuto la tua richiesta. Ti risponderemo al più presto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary">
                  Invia richiesta <Send size={16} />
                </button>
                <p className="contact-form__disclaimer">
                  Modulo dimostrativo: al momento non è collegato a un servizio di invio email.
                  Per richieste reali scrivi direttamente a{' '}
                  <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
