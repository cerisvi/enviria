import { type FormEvent, useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import './InnerPage.css'
import './Contact.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="inner-page">
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow">Contatti</span>
          <h1>Parliamo di ricerca, dati e sostenibilità</h1>
          <p className="inner-hero__lead">
            Scrivici per informazioni su Enviria, sul progetto Green ERI o per richiedere
            l'accesso all'Hub dati.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="card contact-info">
            <h3>Contatti diretti</h3>
            <a href="mailto:info@enviriahub.it">
              <Mail size={16} /> info@enviriahub.it
            </a>
            <span>
              <MapPin size={16} /> Italia
            </span>
            <p className="contact-info__note">
              Rispondiamo entro pochi giorni lavorativi.
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
                  <a href="mailto:info@enviriahub.it">info@enviriahub.it</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
