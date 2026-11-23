import { CalendarClock } from 'lucide-react'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import './InnerPage.css'
import './Legal.css'

export default function CookiePolicy() {
  return (
    <div className="inner-page">
      <Seo
        title="Cookie Policy"
        description="Informativa sui cookie e sulle tecnologie di tracciamento utilizzate (o non utilizzate) dal sito enviriahub.it."
        path="/cookie-policy"
      />
      <section className="inner-hero">
        <Reveal className="container inner-hero__inner">
          <span className="kicker">Cookie</span>
          <h1>Cookie Policy</h1>
          <p className="inner-hero__lead">
            Informativa sui cookie ai sensi dell’art. 122 del Codice Privacy e delle Linee
            guida del Garante per la protezione dei dati personali in materia di cookie e
            altri strumenti di tracciamento (10 giugno 2021).
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="legal">
            <span className="legal__updated">
              <CalendarClock size={15} /> Ultimo aggiornamento: 23 novembre 2026
            </span>

            <h2>1. Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti visitati inviano al terminale
              dell’utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi
              siti alla visita successiva. Possono essere utilizzati per finalità tecniche,
              di analisi statistica o di profilazione.
            </p>

            <h2>2. Cookie utilizzati da questo sito</h2>
            <div className="legal-note">
              <p>
                <strong>Il sito enviriahub.it non installa alcun cookie di profilazione né
                cookie di terze parti</strong> (nessuno strumento di analisi statistica, nessun
                pixel pubblicitario, nessun plugin social con tracciamento). Non è pertanto
                necessario raccogliere il consenso dell’utente tramite banner cookie, in
                conformità alle Linee guida del Garante Privacy del 10 giugno 2021.
              </p>
            </div>

            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Tipologia</th>
                    <th>Utilizzato</th>
                    <th>Descrizione</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cookie tecnici necessari</td>
                    <td>No</td>
                    <td>Il sito non imposta cookie per il proprio funzionamento di base.</td>
                  </tr>
                  <tr>
                    <td>Cookie di analisi statistica (es. Google Analytics)</td>
                    <td>No</td>
                    <td>
                      Non è installato alcuno strumento di analisi del traffico basato su
                      cookie.
                    </td>
                  </tr>
                  <tr>
                    <td>Cookie di profilazione / marketing</td>
                    <td>No</td>
                    <td>Non è presente alcuna attività pubblicitaria o di profilazione.</td>
                  </tr>
                  <tr>
                    <td>Cookie di terze parti (social plugin, video embed, mappe)</td>
                    <td>No</td>
                    <td>
                      I contenuti multimediali eventualmente linkati (es. video) rimandano al
                      sito della piattaforma di origine solo tramite un link esplicito
                      cliccato dall’utente, senza incorporare player o widget di terze parti
                      che impostino cookie sul nostro dominio.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>3. Archiviazione locale del browser (localStorage/sessionStorage)</h2>
            <p>
              Alcune funzionalità del sito (ad esempio l’area riservata Hub) possono
              utilizzare la memoria locale del browser (<em>sessionStorage</em>) per
              mantenere temporaneamente lo stato della sessione durante la navigazione.
              Si tratta di una tecnologia tecnicamente distinta dai cookie: i dati restano
              esclusivamente sul dispositivo dell’utente, non vengono trasmessi al server né
              condivisi con terze parti, e vengono automaticamente cancellati alla chiusura
              della scheda del browser.
            </p>

            <h2>4. Come gestire i cookie dal browser</h2>
            <p>
              Anche se questo sito non installa cookie non tecnici, l’utente può in
              qualsiasi momento gestire le preferenze sui cookie direttamente dalle
              impostazioni del proprio browser, consultando le relative guide:
            </p>
            <ul>
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noreferrer"
                >
                  Apple Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/it-it/microsoft-edge"
                  target="_blank"
                  rel="noreferrer"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h2>5. Titolare del trattamento</h2>
            <p>
              Titolare del trattamento è <strong>ENVIRIA S.C.A.R.L.</strong>, Corso Italia
              172, 95128 Catania (CT) — email:{' '}
              <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a>. Per
              maggiori informazioni sul trattamento dei dati personali consulta la{' '}
              <a href="/privacy-policy">Privacy Policy</a>.
            </p>

            <h2>6. Aggiornamenti alla presente Cookie Policy</h2>
            <p>
              Qualora in futuro il sito dovesse introdurre strumenti che comportano
              l’installazione di cookie non tecnici, questa pagina sarà aggiornata e, ove
              richiesto dalla normativa vigente, sarà attivato un apposito banner per la
              raccolta del consenso dell’utente prima dell’installazione di tali cookie.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
