import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Send } from 'lucide-react'
import Mark from '../components/Mark'
import './InnerPage.css'
import './Hub.css'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const requestTypes = [
  'Collaborazione scientifica',
  'Accesso ai dati dell’infrastruttura',
  'Partnership progettuale',
  'Altro',
]

export default function HubLogin() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/hub-request.php', { method: 'POST', body: formData })
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
    <div className="hub-auth">
      <div className="card hub-auth__card hub-auth__card--wide">
        <Link to="/" className="hub-auth__brand">
          <Mark size={30} />
          ENVIRIA <span>Hub</span>
        </Link>

        {status === 'success' ? (
          <>
            <h1>Richiesta inviata!</h1>
            <p className="hub-auth__lead">
              Grazie per il tuo interesse. Il team ENVIRIA valuterà la tua richiesta e ti
              risponderà via email per i passaggi successivi.
            </p>
          </>
        ) : (
          <>
            <h1>Accedi al Hub</h1>
            <p className="hub-auth__lead">
              Area riservata a partner, enti di ricerca e collaboratori del progetto Green
              ERI. L’accesso è su richiesta: compila il modulo e il team ENVIRIA ti
              contatterà per attivarlo.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Campo anti-spam: type="hidden" non viene mai toccato
                  dall'autocompilazione dei browser (a differenza di un campo
                  di testo nascosto via CSS). */}
              <input type="hidden" name="hpcheck" value="" />
              <label>
                Nome e cognome
                <input type="text" name="name" required placeholder="Mario Rossi" />
              </label>
              <label>
                Email
                <input type="email" name="email" required placeholder="nome@ente.it" />
              </label>
              <label>
                Ente / organizzazione <span className="optional">(facoltativo)</span>
                <input type="text" name="organization" placeholder="Università, azienda, ente..." />
              </label>
              <label>
                Tipo di richiesta
                <select name="requestType" required defaultValue="">
                  <option value="" disabled>
                    Seleziona…
                  </option>
                  {requestTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Messaggio
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Descrivi brevemente la collaborazione o l’accesso richiesto..."
                />
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
            </form>
          </>
        )}

        <Link to="/" className="hub-auth__back">
          ← Torna al sito
        </Link>
      </div>
    </div>
  )
}
