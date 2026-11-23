import { CalendarClock } from 'lucide-react'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'
import './Legal.css'

const bodyByLang = {
  it: (
    <>
      <h2>1. Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti visitati inviano al terminale
        dell’utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti
        alla visita successiva. Possono essere utilizzati per finalità tecniche, di analisi
        statistica o di profilazione.
      </p>

      <h2>2. Cookie utilizzati da questo sito</h2>
      <div className="legal-note">
        <p>
          <strong>Il sito enviriahub.it non installa alcun cookie di profilazione né cookie
          di terze parti</strong> (nessuno strumento di analisi statistica, nessun pixel
          pubblicitario, nessun plugin social con tracciamento). Non è pertanto necessario
          raccogliere il consenso dell’utente tramite banner cookie, in conformità alle Linee
          guida del Garante Privacy del 10 giugno 2021.
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
              <td>Non è installato alcuno strumento di analisi del traffico basato su cookie.</td>
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
                I contenuti multimediali eventualmente linkati (es. video) rimandano al sito
                della piattaforma di origine solo tramite un link esplicito cliccato
                dall’utente, senza incorporare player o widget di terze parti che impostino
                cookie sul nostro dominio.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3. Archiviazione locale del browser (localStorage/sessionStorage)</h2>
      <p>
        Alcune funzionalità del sito (ad esempio l’area riservata Hub) possono utilizzare la
        memoria locale del browser (<em>sessionStorage</em>) per mantenere temporaneamente lo
        stato della sessione durante la navigazione. Si tratta di una tecnologia tecnicamente
        distinta dai cookie: i dati restano esclusivamente sul dispositivo dell’utente, non
        vengono trasmessi al server né condivisi con terze parti, e vengono automaticamente
        cancellati alla chiusura della scheda del browser.
      </p>

      <h2>4. Come gestire i cookie dal browser</h2>
      <p>
        Anche se questo sito non installa cookie non tecnici, l’utente può in qualsiasi
        momento gestire le preferenze sui cookie direttamente dalle impostazioni del proprio
        browser, consultando le relative guide:
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">
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
          <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">
            Apple Safari
          </a>
        </li>
        <li>
          <a href="https://support.microsoft.com/it-it/microsoft-edge" target="_blank" rel="noreferrer">
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2>5. Titolare del trattamento</h2>
      <p>
        Titolare del trattamento è <strong>ENVIRIA S.C.A.R.L.</strong>, Corso Italia 172,
        95128 Catania (CT) — email:{' '}
        <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a>. Per maggiori
        informazioni sul trattamento dei dati personali consulta la{' '}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>6. Aggiornamenti alla presente Cookie Policy</h2>
      <p>
        Qualora in futuro il sito dovesse introdurre strumenti che comportano l’installazione
        di cookie non tecnici, questa pagina sarà aggiornata e, ove richiesto dalla normativa
        vigente, sarà attivato un apposito banner per la raccolta del consenso dell’utente
        prima dell’installazione di tali cookie.
      </p>
    </>
  ),
  en: (
    <>
      <h2>1. What cookies are</h2>
      <p>
        Cookies are small text files that visited websites send to the user’s device, where
        they are stored before being sent back to the same websites on the next visit. They
        can be used for technical purposes, statistical analysis or profiling.
      </p>

      <h2>2. Cookies used by this website</h2>
      <div className="legal-note">
        <p>
          <strong>The enviriahub.it website does not install any profiling cookies or
          third-party cookies</strong> (no statistical analysis tools, no advertising pixels,
          no social plugins with tracking). It is therefore not necessary to collect the
          user’s consent through a cookie banner, in accordance with the Italian Data
          Protection Authority’s Guidelines of 10 June 2021.
        </p>
      </div>

      <div className="legal-table-wrap">
        <table className="legal-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Used</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Necessary technical cookies</td>
              <td>No</td>
              <td>The website does not set cookies for its basic operation.</td>
            </tr>
            <tr>
              <td>Statistical analysis cookies (e.g. Google Analytics)</td>
              <td>No</td>
              <td>No cookie-based traffic analysis tool is installed.</td>
            </tr>
            <tr>
              <td>Profiling / marketing cookies</td>
              <td>No</td>
              <td>No advertising or profiling activity is carried out.</td>
            </tr>
            <tr>
              <td>Third-party cookies (social plugins, video embeds, maps)</td>
              <td>No</td>
              <td>
                Any linked multimedia content (e.g. videos) leads to the source platform’s
                website only through an explicit link clicked by the user, without embedding
                third-party players or widgets that set cookies on our domain.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3. Local browser storage (localStorage/sessionStorage)</h2>
      <p>
        Some website features (for example the Hub reserved area) may use the browser’s local
        storage (<em>sessionStorage</em>) to temporarily keep session state while browsing.
        This is a technology technically distinct from cookies: the data stays exclusively on
        the user’s device, is not transmitted to the server nor shared with third parties,
        and is automatically deleted when the browser tab is closed.
      </p>

      <h2>4. How to manage cookies from your browser</h2>
      <p>
        Even though this website does not install non-technical cookies, you can manage your
        cookie preferences at any time directly from your browser settings, using the
        relevant guides:
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">
            Google Chrome
          </a>
        </li>
        <li>
          <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noreferrer">
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">
            Apple Safari
          </a>
        </li>
        <li>
          <a href="https://support.microsoft.com/en-us/microsoft-edge" target="_blank" rel="noreferrer">
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2>5. Data Controller</h2>
      <p>
        The Data Controller is <strong>ENVIRIA S.C.A.R.L.</strong>, Corso Italia 172, 95128
        Catania (CT), Italy — email:{' '}
        <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a>. For more
        information on the processing of personal data, see the{' '}
        <a href="/en/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>6. Updates to this Cookie Policy</h2>
      <p>
        Should the website introduce, in the future, tools that involve the installation of
        non-technical cookies, this page will be updated and, where required by applicable
        law, a dedicated banner will be activated to collect the user’s consent before such
        cookies are installed.
      </p>
    </>
  ),
}

const content = {
  it: {
    seoTitle: 'Cookie Policy',
    seoDescription: 'Informativa sui cookie e sulle tecnologie di tracciamento utilizzate (o non utilizzate) dal sito enviriahub.it.',
    kicker: 'Cookie',
    title: 'Cookie Policy',
    lead: 'Informativa sui cookie ai sensi dell’art. 122 del Codice Privacy e delle Linee guida del Garante per la protezione dei dati personali in materia di cookie e altri strumenti di tracciamento (10 giugno 2021).',
    updated: 'Ultimo aggiornamento: 23 novembre 2026',
  },
  en: {
    seoTitle: 'Cookie Policy',
    seoDescription: 'Notice on cookies and tracking technologies used (or not used) by the enviriahub.it website.',
    kicker: 'Cookies',
    title: 'Cookie Policy',
    lead: 'Cookie notice pursuant to art. 122 of the Italian Privacy Code and the Guidelines of the Italian Data Protection Authority on cookies and other tracking tools (10 June 2021).',
    updated: 'Last updated: 23 November 2026',
  },
}

export default function CookiePolicy() {
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/cookie-policy')

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
          <Reveal className="legal">
            <span className="legal__updated">
              <CalendarClock size={15} /> {t.updated}
            </span>
            {bodyByLang[lang]}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
