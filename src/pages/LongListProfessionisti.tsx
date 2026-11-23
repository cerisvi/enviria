import { type FormEvent, useState } from 'react'
import { ClipboardList, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import './InnerPage.css'
import './AvvisiPubblici.css'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const areeCompetenza = [
  'Ambientale e scienze della terra',
  'Ingegneria e tecnologie HPC/data center',
  'Informatica, data science e intelligenza artificiale',
  'Legale e amministrativo',
  'Amministrativo-contabile',
  'Comunicazione e divulgazione scientifica',
  'Altro',
]

export default function LongListProfessionisti() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/long-list-professionisti.php', { method: 'POST', body: formData })
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
        title="Long List Professionisti"
        description="Modulo di iscrizione alla Long List dei Professionisti di ENVIRIA S.C.A.R.L."
        path="/avvisi-pubblici/long-list-professionisti"
      />
      <section className="inner-hero">
        <Reveal className="container inner-hero__inner">
          <span className="kicker">Avvisi Pubblici</span>
          <h1>Long List Professionisti</h1>
          <p className="inner-hero__lead">
            I professionisti e gli esperti interessati a collaborazioni con ENVIRIA
            S.C.A.R.L. possono richiedere l’iscrizione alla Long List compilando il
            modulo sottostante.
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
                  Grazie per il tuo interesse. La tua candidatura sarà valutata e potrai
                  essere contattato/a in occasione di future esigenze di collaborazione.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                    <ClipboardList size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                    Dati anagrafici
                  </legend>
                  <div className="contact-form__row contact-form__row--spaced">
                    <label>
                      Nome e cognome
                      <input type="text" name="nome" required placeholder="Mario Rossi" />
                    </label>
                    <label>
                      Codice Fiscale
                      <input type="text" name="codiceFiscale" required placeholder="RSSMRA80A01H501X" />
                    </label>
                  </div>
                  <div className="contact-form__row">
                    <label>
                      Email
                      <input type="email" name="email" required placeholder="mario.rossi@email.it" />
                    </label>
                    <label>
                      Telefono <span className="optional">(facoltativo)</span>
                      <input type="tel" name="telefono" placeholder="+39 ..." />
                    </label>
                  </div>
                </fieldset>

                <label>
                  PEC <span className="optional">(facoltativa)</span>
                  <input type="email" name="pec" placeholder="mario.rossi@pec.it" />
                </label>

                <label>
                  Albo professionale di appartenenza / titolo di studio{' '}
                  <span className="optional">(facoltativo)</span>
                  <input
                    type="text"
                    name="albo"
                    placeholder="Es. Ordine degli Ingegneri di Catania, n. iscrizione..."
                  />
                </label>

                <div className="contact-form__row">
                  <label>
                    Area di competenza
                    <select name="areaCompetenza" required defaultValue="">
                      <option value="" disabled>
                        Seleziona…
                      </option>
                      {areeCompetenza.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Anni di esperienza <span className="optional">(facoltativo)</span>
                    <input type="number" name="anniEsperienza" min={0} max={60} placeholder="Es. 8" />
                  </label>
                </div>

                <label>
                  Link a CV / profilo LinkedIn <span className="optional">(facoltativo)</span>
                  <input type="url" name="cvLink" placeholder="https://..." />
                </label>

                <label>
                  Sintesi delle esperienze professionali
                  <textarea
                    name="sintesi"
                    rows={5}
                    required
                    placeholder="Descrivi brevemente il tuo percorso e le competenze rilevanti..."
                  />
                </label>

                <div className="contact-form__checkbox-group">
                  <label className="contact-form__checkbox">
                    <input type="checkbox" name="dichiarazione" required />
                    <span>
                      Dichiaro, sotto la mia responsabilità, l’assenza di cause di
                      incompatibilità o conflitto di interesse rispetto alle attività di
                      ENVIRIA S.C.A.R.L. e la veridicità dei dati forniti.
                    </span>
                  </label>
                  <label className="contact-form__checkbox">
                    <input type="checkbox" name="privacy" required />
                    <span>
                      Ho letto l’<Link to="/privacy-policy">informativa sulla privacy</Link> e
                      acconsento al trattamento dei dati personali per la gestione della Long
                      List Professionisti.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Invio in corso…' : 'Invia candidatura'}
                  {status !== 'sending' && <Send size={16} />}
                </button>

                {status === 'error' && (
                  <p className="contact-form__error" role="alert">
                    {errorMessage}
                  </p>
                )}

                <p className="contact-form__disclaimer">
                  L’iscrizione alla Long List non comporta alcun incarico automatico né
                  l’instaurazione di un rapporto di lavoro con ENVIRIA S.C.A.R.L.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
