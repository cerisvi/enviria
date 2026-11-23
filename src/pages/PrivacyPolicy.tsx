import { CalendarClock } from 'lucide-react'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import './InnerPage.css'
import './Legal.css'

export default function PrivacyPolicy() {
  return (
    <div className="inner-page">
      <Seo
        title="Privacy Policy"
        description="Informativa sul trattamento dei dati personali raccolti dal sito enviriahub.it, ai sensi del Regolamento (UE) 2016/679 (GDPR)."
        path="/privacy-policy"
      />
      <section className="inner-hero">
        <Reveal className="container inner-hero__inner">
          <span className="kicker">Dati Personali</span>
          <h1>Privacy Policy</h1>
          <p className="inner-hero__lead">
            Informativa sul trattamento dei dati personali degli utenti del sito
            enviriahub.it, ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679
            (“GDPR”).
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="legal">
            <span className="legal__updated">
              <CalendarClock size={15} /> Ultimo aggiornamento: 23 novembre 2026
            </span>

            <h2>1. Titolare del trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati personali raccolti tramite il sito
              enviriahub.it è:
            </p>
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
            <p>
              Il sito raccoglie, in forma diretta o automatizzata, le seguenti categorie di
              dati personali:
            </p>
            <ul>
              <li>
                <strong>Dati di navigazione</strong>: i sistemi informatici e le procedure
                software preposte al funzionamento del sito acquisiscono, nel corso del loro
                normale esercizio, alcuni dati personali la cui trasmissione è implicita
                nell’uso dei protocolli di comunicazione internet (es. indirizzi IP, tipo di
                browser, sistema operativo, pagine visitate, orari di accesso).
              </li>
              <li>
                <strong>Dati forniti volontariamente dall’utente</strong> tramite la
                compilazione dei moduli presenti sul sito: modulo di contatto (pagina{' '}
                <em>Chi Siamo</em>), richiesta di accesso al Hub, iscrizione all’Albo dei
                Fornitori e iscrizione alla Long List Professionisti. In questi casi i dati
                richiesti includono, a seconda del modulo, nome e cognome o ragione sociale,
                indirizzo email, recapiti telefonici, dati dell’ente/azienda di appartenenza e
                ogni altra informazione liberamente inserita nei campi di testo.
              </li>
            </ul>
            <div className="legal-note">
              <p>
                Il sito <strong>non utilizza cookie di profilazione né cookie di terze
                parti</strong> e non effettua alcuna attività di tracciamento pubblicitario.
                Per i dettagli tecnici consulta la{' '}
                <a href="/cookie-policy">Cookie Policy</a>.
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
                      Iscrizione all’Albo dei Fornitori e alla Long List Professionisti,
                      valutazione dei requisiti ed eventuale instaurazione di rapporti
                      contrattuali
                    </td>
                    <td>
                      Esecuzione di misure precontrattuali adottate su richiesta
                      dell’interessato (lett. b)
                    </td>
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
              Il trattamento è effettuato con strumenti informatici e/o telematici, con
              modalità organizzative e logiche strettamente correlate alle finalità indicate,
              in modo da garantire la sicurezza e la riservatezza dei dati. I dati sono
              trattati presso la sede del Titolare e presso il fornitore del servizio di
              hosting del sito, situato nel territorio dell’Unione Europea. Non è previsto
              alcun trasferimento di dati personali verso Paesi extra-UE.
            </p>

            <h2>5. Natura del conferimento dei dati</h2>
            <p>
              Il conferimento dei dati richiesti nei moduli del sito è facoltativo ma
              necessario per dare seguito alla richiesta; il mancato conferimento comporta
              l’impossibilità per ENVIRIA di rispondere o di dare corso alla procedura di
              iscrizione richiesta.
            </p>

            <h2>6. Tempi di conservazione</h2>
            <ul>
              <li>
                I dati raccolti tramite il modulo di contatto e la richiesta di accesso al
                Hub sono conservati per il tempo necessario a gestire la richiesta e,
                successivamente, per un massimo di 24 mesi, salvo diverso obbligo di legge.
              </li>
              <li>
                I dati raccolti per l’iscrizione all’Albo dei Fornitori e alla Long List
                Professionisti sono conservati per tutta la durata di validità dell’elenco e
                comunque secondo i termini stabiliti dal relativo avviso pubblico.
              </li>
              <li>
                I dati di navigazione raccolti automaticamente dai log del server sono
                conservati per il tempo strettamente necessario a finalità di sicurezza
                informatica, di norma non superiore a 12 mesi.
              </li>
            </ul>

            <h2>7. Comunicazione e diffusione dei dati</h2>
            <p>
              I dati personali non sono oggetto di diffusione. Possono essere comunicati a
              soggetti terzi che svolgono attività in outsourcing per conto del Titolare
              (es. fornitore del servizio di hosting), nominati, ove necessario, responsabili
              del trattamento ai sensi dell’art. 28 GDPR, nonché a enti pubblici e soggetti
              finanziatori nei limiti previsti dagli obblighi di trasparenza connessi al
              progetto G.R.E.E.N – E.R.I., finanziato dal PR FESR Sicilia 2021-2027.
            </p>

            <h2>8. Diritti dell’interessato</h2>
            <p>
              In qualità di interessato, hai il diritto di chiedere al Titolare, in
              qualunque momento, l’accesso ai tuoi dati personali, la rettifica, la
              cancellazione degli stessi, la limitazione del trattamento, oppure di opporti
              al loro trattamento, oltre al diritto alla portabilità dei dati (artt. 15-22
              GDPR). Hai inoltre il diritto di proporre reclamo a un’autorità di controllo,
              in particolare al{' '}
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">
                Garante per la protezione dei dati personali
              </a>
              .
            </p>

            <h2>9. Modalità di esercizio dei diritti</h2>
            <p>
              Per esercitare i diritti di cui al punto precedente, o per qualsiasi
              informazione relativa al trattamento dei tuoi dati personali, puoi scrivere
              a: <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a> oppure
              tramite PEC a <a href="mailto:enviria@legalmail.it">enviria@legalmail.it</a>.
            </p>

            <h2>10. Responsabile della Protezione dei Dati (DPO)</h2>
            <p>
              Il Titolare non ha proceduto alla nomina di un Responsabile della Protezione
              dei Dati (DPO), non ricorrendo i presupposti di cui all’art. 37 del GDPR. Per
              ogni richiesta relativa al trattamento dei dati personali è possibile fare
              riferimento ai recapiti indicati al punto 9.
            </p>

            <h2>11. Modifiche alla presente informativa</h2>
            <p>
              La presente informativa può essere soggetta a modifiche nel tempo, anche
              connesse all’eventuale introduzione di nuovi servizi. Si invita a consultare
              periodicamente questa pagina. La data di ultimo aggiornamento è indicata in
              apertura della presente informativa.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
