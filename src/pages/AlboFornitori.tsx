import { type FormEvent, useState } from 'react'
import { Briefcase, Paperclip, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import './InnerPage.css'
import './AvvisiPubblici.css'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const categorie = [
  'Forniture IT, data center e networking',
  'Ingegneria, consulenza tecnica e progettazione',
  'Droni, sensoristica e strumentazione ambientale',
  'Comunicazione, eventi e materiali divulgativi',
  'Forniture e servizi per ufficio',
  'Servizi legali, amministrativi e contabili',
  'Altro',
]

const formeGiuridiche = [
  'S.p.A.',
  'S.r.l.',
  'S.r.l.s.',
  'S.n.c. / S.a.s.',
  'Ditta individuale',
  'Libero professionista',
  'Consorzio / Società consortile',
  'Altro',
]

export default function AlboFornitori() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/albo-fornitori.php', { method: 'POST', body: formData })
      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Invio non riuscito. Riprova più tardi.')
      }
    } catch {
      setStatus('error')
      setErrorMessage(
        'Impossibile contattare il server. Riprova più tardi o scrivi a direzione@enviriahub.it.',
      )
    }
  }

  return (
    <div className="inner-page">
      <Seo
        title="Albo dei Fornitori"
        description="Modulo di iscrizione all'Albo dei Fornitori di ENVIRIA S.C.A.R.L."
        path="/avvisi-pubblici/albo-fornitori"
      />
      <section className="inner-hero">
        <Reveal className="container inner-hero__inner">
          <span className="kicker">Avvisi Pubblici</span>
          <h1>Albo dei Fornitori</h1>
          <p className="inner-hero__lead">
            Gli operatori economici interessati a fornire beni e servizi a ENVIRIA
            S.C.A.R.L. possono richiedere l’iscrizione all’Albo compilando il modulo
            sottostante.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="card contact-form avviso-form">
            {status === 'success' ? (
              <div className="contact-form__success">
                <h3>Richiesta inviata!</h3>
                <p>
                  Grazie per il tuo interesse. Verificheremo la tua richiesta e ti
                  contatteremo per l’eventuale perfezionamento dell’iscrizione.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="contact-form__honeypot"
                  aria-hidden="true"
                />

                <fieldset>
                  <legend>
                    <Briefcase size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                    Dati dell’operatore economico
                  </legend>
                  <div className="contact-form__row contact-form__row--spaced">
                    <label>
                      Ragione sociale
                      <input type="text" name="ragioneSociale" required placeholder="Es. Rossi S.r.l." />
                    </label>
                    <label>
                      Forma giuridica
                      <select name="formaGiuridica" required defaultValue="">
                        <option value="" disabled>
                          Seleziona…
                        </option>
                        {formeGiuridiche.map((forma) => (
                          <option key={forma} value={forma}>
                            {forma}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="contact-form__row">
                    <label>
                      Partita IVA / Codice Fiscale
                      <input type="text" name="partitaIva" required placeholder="00000000000" />
                    </label>
                    <label>
                      Sede legale
                      <input
                        type="text"
                        name="sedeLegale"
                        required
                        placeholder="Via, città, provincia, CAP"
                      />
                    </label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Referente e contatti</legend>
                  <div className="contact-form__row contact-form__row--spaced">
                    <label>
                      Referente / Legale rappresentante
                      <input type="text" name="referente" required placeholder="Mario Rossi" />
                    </label>
                    <label>
                      Email
                      <input type="email" name="email" required placeholder="info@impresa.it" />
                    </label>
                  </div>
                  <div className="contact-form__row">
                    <label>
                      PEC
                      <input type="email" name="pec" required placeholder="impresa@pec.it" />
                    </label>
                    <label>
                      Telefono <span className="optional">(facoltativo)</span>
                      <input type="tel" name="telefono" placeholder="+39 ..." />
                    </label>
                  </div>
                </fieldset>

                <label>
                  Categoria merceologica
                  <select name="categoria" required defaultValue="">
                    <option value="" disabled>
                      Seleziona…
                    </option>
                    {categorie.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Breve descrizione dell’attività <span className="optional">(facoltativa)</span>
                  <textarea
                    name="descrizione"
                    rows={4}
                    placeholder="Esperienze rilevanti, referenze, certificazioni possedute..."
                  />
                </label>

                <div className="contact-form__row">
                  <label>
                    <Paperclip size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                    Visura camerale
                    <input
                      type="file"
                      name="documento"
                      required
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                    <span className="contact-form__file-hint">PDF, DOC, DOCX — max 8 MB</span>
                  </label>
                  <label>
                    <Paperclip size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                    Company Profile
                    <input
                      type="file"
                      name="companyProfile"
                      required
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                    <span className="contact-form__file-hint">PDF, DOC, DOCX — max 8 MB</span>
                  </label>
                </div>

                <div className="contact-form__checkbox-group">
                  <label className="contact-form__checkbox">
                    <input type="checkbox" name="dichiarazione" required />
                    <span>
                      Dichiaro, sotto la mia responsabilità, l’assenza delle cause di
                      esclusione di cui agli artt. 94-98 del D.Lgs. 36/2023 (Codice dei
                      Contratti Pubblici) e il possesso dei requisiti di idoneità
                      professionale per l’attività dichiarata.
                    </span>
                  </label>
                  <label className="contact-form__checkbox">
                    <input type="checkbox" name="privacy" required />
                    <span>
                      Ho letto l’<Link to="/privacy-policy">informativa sulla privacy</Link> e
                      acconsento al trattamento dei dati personali per la gestione dell’Albo
                      Fornitori.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Invio in corso…' : 'Invia richiesta di iscrizione'}
                  {status !== 'sending' && <Send size={16} />}
                </button>

                {status === 'error' && (
                  <p className="contact-form__error" role="alert">
                    {errorMessage}
                  </p>
                )}

                <p className="contact-form__disclaimer">
                  L’iscrizione all’Albo non comporta l’instaurazione di alcun rapporto
                  contrattuale con ENVIRIA S.C.A.R.L. né l’assunzione di obblighi a carico
                  della stessa. Potrà essere richiesta documentazione a comprova dei
                  requisiti dichiarati in una fase successiva.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
