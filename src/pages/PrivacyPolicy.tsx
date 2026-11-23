import { CalendarClock } from 'lucide-react'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'
import './Legal.css'

const bodyByLang = {
  it: (
    <>
      <h2>1. Titolare del trattamento</h2>
      <p>Il Titolare del trattamento dei dati personali raccolti tramite il sito enviriahub.it è:</p>
      <p>
        <strong>ENVIRIA S.C.A.R.L.</strong>
        <br />
        Corso Italia 172, 95128 Catania (CT)
        <br />
        C.F. / P.IVA: 06297800879
        <br />
        PEC: enviria@legalmail.it
        <br />
        Email: direzione@enviriahub.it
      </p>

      <h2>2. Tipologie di dati raccolti</h2>
      <p>Il sito raccoglie, in forma diretta o automatizzata, le seguenti categorie di dati personali:</p>
      <ul>
        <li>
          <strong>Dati di navigazione</strong>: i sistemi informatici e le procedure software
          preposte al funzionamento del sito acquisiscono, nel corso del loro normale
          esercizio, alcuni dati personali la cui trasmissione è implicita nell’uso dei
          protocolli di comunicazione internet (es. indirizzi IP, tipo di browser, sistema
          operativo, pagine visitate, orari di accesso).
        </li>
        <li>
          <strong>Dati forniti volontariamente dall’utente</strong> tramite la compilazione
          dei moduli presenti sul sito: modulo di contatto (pagina <em>Chi Siamo</em>),
          richiesta di accesso al Hub, iscrizione all’Albo dei Fornitori e iscrizione alla
          Long List Professionisti. In questi casi i dati richiesti includono, a seconda del
          modulo, nome e cognome o ragione sociale, indirizzo email, recapiti telefonici,
          dati dell’ente/azienda di appartenenza e ogni altra informazione liberamente
          inserita nei campi di testo.
        </li>
      </ul>
      <div className="legal-note">
        <p>
          Il sito <strong>non utilizza cookie di profilazione né cookie di terze parti</strong>{' '}
          e non effettua alcuna attività di tracciamento pubblicitario. Per i dettagli tecnici
          consulta la <a href="/cookie-policy">Cookie Policy</a>.
        </p>
      </div>

      <h2>3. Finalità e base giuridica del trattamento</h2>
      <div className="legal-table-wrap">
        <table className="legal-table">
          <thead>
            <tr>
              <th>Finalità</th>
              <th>Base giuridica (art. 6 GDPR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Erogazione del sito e sicurezza informatica</td>
              <td>Legittimo interesse del Titolare (lett. f)</td>
            </tr>
            <tr>
              <td>Gestione delle richieste di contatto e collaborazione</td>
              <td>Consenso dell’interessato (lett. a)</td>
            </tr>
            <tr>
              <td>Gestione della richiesta di accesso al Hub</td>
              <td>Consenso dell’interessato (lett. a)</td>
            </tr>
            <tr>
              <td>
                Iscrizione all’Albo dei Fornitori e alla Long List Professionisti, valutazione
                dei requisiti ed eventuale instaurazione di rapporti contrattuali
              </td>
              <td>Esecuzione di misure precontrattuali adottate su richiesta dell’interessato (lett. b)</td>
            </tr>
            <tr>
              <td>Adempimento di obblighi di legge (es. fiscali, trasparenza)</td>
              <td>Obbligo legale (lett. c)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. Modalità e luogo del trattamento</h2>
      <p>
        Il trattamento è effettuato con strumenti informatici e/o telematici, con modalità
        organizzative e logiche strettamente correlate alle finalità indicate, in modo da
        garantire la sicurezza e la riservatezza dei dati. I dati sono trattati presso la sede
        del Titolare e presso il fornitore del servizio di hosting del sito, situato nel
        territorio dell’Unione Europea. Non è previsto alcun trasferimento di dati personali
        verso Paesi extra-UE.
      </p>

      <h2>5. Natura del conferimento dei dati</h2>
      <p>
        Il conferimento dei dati richiesti nei moduli del sito è facoltativo ma necessario per
        dare seguito alla richiesta; il mancato conferimento comporta l’impossibilità per
        ENVIRIA di rispondere o di dare corso alla procedura di iscrizione richiesta.
      </p>

      <h2>6. Tempi di conservazione</h2>
      <ul>
        <li>
          I dati raccolti tramite il modulo di contatto e la richiesta di accesso al Hub sono
          conservati per il tempo necessario a gestire la richiesta e, successivamente, per un
          massimo di 24 mesi, salvo diverso obbligo di legge.
        </li>
        <li>
          I dati raccolti per l’iscrizione all’Albo dei Fornitori e alla Long List
          Professionisti sono conservati per tutta la durata di validità dell’elenco e
          comunque secondo i termini stabiliti dal relativo avviso pubblico.
        </li>
        <li>
          I dati di navigazione raccolti automaticamente dai log del server sono conservati
          per il tempo strettamente necessario a finalità di sicurezza informatica, di norma
          non superiore a 12 mesi.
        </li>
      </ul>

      <h2>7. Comunicazione e diffusione dei dati</h2>
      <p>
        I dati personali non sono oggetto di diffusione. Possono essere comunicati a soggetti
        terzi che svolgono attività in outsourcing per conto del Titolare (es. fornitore del
        servizio di hosting), nominati, ove necessario, responsabili del trattamento ai sensi
        dell’art. 28 GDPR, nonché a enti pubblici e soggetti finanziatori nei limiti previsti
        dagli obblighi di trasparenza connessi al progetto G.R.E.E.N – E.R.I., finanziato dal
        PR FESR Sicilia 2021-2027.
      </p>

      <h2>8. Diritti dell’interessato</h2>
      <p>
        In qualità di interessato, hai il diritto di chiedere al Titolare, in qualunque
        momento, l’accesso ai tuoi dati personali, la rettifica, la cancellazione degli
        stessi, la limitazione del trattamento, oppure di opporti al loro trattamento, oltre
        al diritto alla portabilità dei dati (artt. 15-22 GDPR). Hai inoltre il diritto di
        proporre reclamo a un’autorità di controllo, in particolare al{' '}
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">
          Garante per la protezione dei dati personali
        </a>
        .
      </p>

      <h2>9. Modalità di esercizio dei diritti</h2>
      <p>
        Per esercitare i diritti di cui al punto precedente, o per qualsiasi informazione
        relativa al trattamento dei tuoi dati personali, puoi scrivere a:{' '}
        <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a> oppure tramite PEC
        a <a href="mailto:enviria@legalmail.it">enviria@legalmail.it</a>.
      </p>

      <h2>10. Responsabile della Protezione dei Dati (DPO)</h2>
      <p>
        Il Titolare non ha proceduto alla nomina di un Responsabile della Protezione dei Dati
        (DPO), non ricorrendo i presupposti di cui all’art. 37 del GDPR. Per ogni richiesta
        relativa al trattamento dei dati personali è possibile fare riferimento ai recapiti
        indicati al punto 9.
      </p>

      <h2>11. Modifiche alla presente informativa</h2>
      <p>
        La presente informativa può essere soggetta a modifiche nel tempo, anche connesse
        all’eventuale introduzione di nuovi servizi. Si invita a consultare periodicamente
        questa pagina. La data di ultimo aggiornamento è indicata in apertura della presente
        informativa.
      </p>
    </>
  ),
  en: (
    <>
      <h2>1. Data Controller</h2>
      <p>The Controller of the personal data collected through the enviriahub.it website is:</p>
      <p>
        <strong>ENVIRIA S.C.A.R.L.</strong>
        <br />
        Corso Italia 172, 95128 Catania (CT), Italy
        <br />
        Tax code / VAT no.: 06297800879
        <br />
        PEC (certified email): enviria@legalmail.it
        <br />
        Email: direzione@enviriahub.it
      </p>

      <h2>2. Types of data collected</h2>
      <p>The website collects, directly or automatically, the following categories of personal data:</p>
      <ul>
        <li>
          <strong>Browsing data</strong>: the computer systems and software procedures used to
          operate the website acquire, during their normal operation, certain personal data
          whose transmission is implicit in the use of internet communication protocols (e.g.
          IP addresses, browser type, operating system, pages visited, access times).
        </li>
        <li>
          <strong>Data voluntarily provided by the user</strong> by filling in the forms
          available on the website: the contact form (<em>About Us</em> page), the Hub access
          request, registration to the Supplier Register and registration to the Professionals
          Long List. In these cases, the data requested includes, depending on the form,
          first and last name or company name, email address, phone number, details of the
          organisation/company the user belongs to, and any other information freely entered
          in the text fields.
        </li>
      </ul>
      <div className="legal-note">
        <p>
          The website <strong>does not use profiling cookies or third-party cookies</strong>{' '}
          and does not carry out any advertising tracking activity. For technical details, see
          the <a href="/en/cookie-policy">Cookie Policy</a>.
        </p>
      </div>

      <h2>3. Purposes and legal basis of processing</h2>
      <div className="legal-table-wrap">
        <table className="legal-table">
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Legal basis (GDPR art. 6)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Operating the website and IT security</td>
              <td>Legitimate interest of the Controller (point f)</td>
            </tr>
            <tr>
              <td>Managing contact and collaboration requests</td>
              <td>Consent of the data subject (point a)</td>
            </tr>
            <tr>
              <td>Managing the Hub access request</td>
              <td>Consent of the data subject (point a)</td>
            </tr>
            <tr>
              <td>
                Registration to the Supplier Register and the Professionals Long List,
                assessment of requirements and any resulting contractual relationship
              </td>
              <td>Performance of pre-contractual measures taken at the data subject’s request (point b)</td>
            </tr>
            <tr>
              <td>Compliance with legal obligations (e.g. tax, transparency)</td>
              <td>Legal obligation (point c)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. How and where processing takes place</h2>
      <p>
        Processing is carried out using IT and/or telematic tools, with organisational and
        logical methods strictly related to the purposes indicated, in a way that ensures the
        security and confidentiality of the data. Data is processed at the Controller’s
        offices and at the website’s hosting provider, located within the European Union. No
        transfer of personal data to countries outside the EU is envisaged.
      </p>

      <h2>5. Nature of data provision</h2>
      <p>
        Providing the data requested in the website’s forms is optional but necessary to
        follow up on the request; failure to provide it means ENVIRIA will be unable to
        respond or to proceed with the requested registration procedure.
      </p>

      <h2>6. Retention periods</h2>
      <ul>
        <li>
          Data collected through the contact form and the Hub access request is kept for the
          time necessary to handle the request and, subsequently, for a maximum of 24 months,
          unless otherwise required by law.
        </li>
        <li>
          Data collected for registration to the Supplier Register and the Professionals Long
          List is kept for the entire validity period of the register, and in any case
          according to the terms set out in the relevant public notice.
        </li>
        <li>
          Browsing data automatically collected through server logs is kept for the time
          strictly necessary for IT security purposes, generally not exceeding 12 months.
        </li>
      </ul>

      <h2>7. Data disclosure and transfer</h2>
      <p>
        Personal data is not disclosed to the public. It may be communicated to third parties
        carrying out outsourced activities on behalf of the Controller (e.g. the hosting
        provider), appointed, where necessary, as data processors under art. 28 GDPR, as well
        as to public bodies and funding entities within the limits set by the transparency
        obligations connected to the G.R.E.E.N – E.R.I. project, funded by the PR FESR Sicilia
        2021-2027 programme.
      </p>

      <h2>8. Rights of the data subject</h2>
      <p>
        As a data subject, you have the right to ask the Controller, at any time, for access
        to your personal data, its rectification or erasure, the restriction of its
        processing, or to object to its processing, as well as the right to data portability
        (GDPR arts. 15-22). You also have the right to lodge a complaint with a supervisory
        authority, in particular the{' '}
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">
          Italian Data Protection Authority (Garante per la protezione dei dati personali)
        </a>
        .
      </p>

      <h2>9. How to exercise your rights</h2>
      <p>
        To exercise the rights referred to in the previous point, or for any information
        regarding the processing of your personal data, you can write to:{' '}
        <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a> or via certified
        email (PEC) to <a href="mailto:enviria@legalmail.it">enviria@legalmail.it</a>.
      </p>

      <h2>10. Data Protection Officer (DPO)</h2>
      <p>
        The Controller has not appointed a Data Protection Officer (DPO), as the conditions
        set out in art. 37 of the GDPR do not apply. For any request regarding the processing
        of personal data, please refer to the contact details indicated in point 9.
      </p>

      <h2>11. Changes to this notice</h2>
      <p>
        This notice may be subject to change over time, including in connection with the
        possible introduction of new services. Please check this page periodically. The date
        of the last update is indicated at the top of this notice.
      </p>
    </>
  ),
}

const content = {
  it: {
    seoTitle: 'Privacy Policy',
    seoDescription:
      'Informativa sul trattamento dei dati personali raccolti dal sito enviriahub.it, ai sensi del Regolamento (UE) 2016/679 (GDPR).',
    kicker: 'Dati Personali',
    title: 'Privacy Policy',
    lead: 'Informativa sul trattamento dei dati personali degli utenti del sito enviriahub.it, ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (“GDPR”).',
    updated: 'Ultimo aggiornamento: 23 novembre 2026',
  },
  en: {
    seoTitle: 'Privacy Policy',
    seoDescription:
      'Notice on the processing of personal data collected by the enviriahub.it website, pursuant to Regulation (EU) 2016/679 (GDPR).',
    kicker: 'Personal Data',
    title: 'Privacy Policy',
    lead: 'Notice on the processing of personal data of enviriahub.it users, pursuant to articles 13 and 14 of Regulation (EU) 2016/679 (the “GDPR”).',
    updated: 'Last updated: 23 November 2026',
  },
}

export default function PrivacyPolicy() {
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/privacy-policy')

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
