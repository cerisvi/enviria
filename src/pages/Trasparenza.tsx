import { FileCheck2, Landmark, Leaf, Mail } from 'lucide-react'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import './InnerPage.css'
import './Legal.css'
import './Trasparenza.css'

const sections = [
  {
    id: 'accesso-civico',
    icon: Landmark,
    title: 'Accesso civico',
    reference: 'Art. 5, D.Lgs. 14 marzo 2013, n. 33',
    body: (
      <>
        <p>
          ENVIRIA, in quanto soggetto che gestisce un’infrastruttura di ricerca realizzata
          con risorse pubbliche (PR FESR Sicilia 2021-2027), aderisce volontariamente ai
          principi di trasparenza previsti dal D.Lgs. 33/2013 per le attività connesse
          all’utilizzo di fondi pubblici.
        </p>
        <h3>Accesso civico “semplice” (art. 5, comma 1)</h3>
        <p>
          Chiunque ha diritto di richiedere i documenti, le informazioni o i dati che
          ENVIRIA ha l’obbligo di pubblicare in questa sezione, nei casi in cui ne sia
          omessa la pubblicazione.
        </p>
        <h3>Accesso civico “generalizzato” (art. 5, comma 2)</h3>
        <p>
          Chiunque ha inoltre diritto di accedere a dati e documenti ulteriori rispetto a
          quelli oggetto di pubblicazione obbligatoria, nel rispetto dei limiti relativi
          alla tutela di interessi pubblici e privati giuridicamente rilevanti e secondo
          quanto previsto dall’art. 5-bis del medesimo decreto.
        </p>
      </>
    ),
  },
  {
    id: 'informazioni-ambientali',
    icon: Leaf,
    title: 'Informazioni ambientali',
    reference: 'D.Lgs. 19 agosto 2005, n. 195',
    body: (
      <>
        <p>
          In coerenza con la propria missione di infrastruttura di ricerca ambientale,
          ENVIRIA favorisce l’accesso del pubblico alle informazioni ambientali raccolte o
          detenute nell’ambito del progetto G.R.E.E.N – E.R.I., in attuazione dei principi
          del D.Lgs. 195/2005 (recepimento della Direttiva 2003/4/CE).
        </p>
        <p>
          Rientrano in questa categoria, a titolo esemplificativo, i dati relativi allo
          stato dell’ambiente (aria, acqua, suolo, biodiversità), ai fattori che incidono
          sull’ambiente e alle misure adottate nell’ambito delle attività di monitoraggio
          territoriale condotte attraverso la rete di sensori, droni e laboratori tematici
          dell’infrastruttura Green ERI.
        </p>
      </>
    ),
  },
  {
    id: 'principio-dnsh',
    icon: FileCheck2,
    title: 'Principio DNSH',
    reference: 'Reg. (UE) 2020/852 — “Do No Significant Harm”',
    body: (
      <>
        <p>
          Il progetto G.R.E.E.N – E.R.I., finanziato nell’ambito del PR FESR Sicilia
          2021-2027 (Azione 1.1.4), è stato concepito nel rispetto del principio “non
          arrecare un danno significativo” (DNSH) agli obiettivi ambientali individuati dal
          Regolamento (UE) 2020/852 (Tassonomia UE) e richiamato, come principio
          orizzontale, dal Regolamento (UE) 2021/1060 sui fondi strutturali e di
          investimento europei.
        </p>
        <p>Gli obiettivi ambientali presi a riferimento nella valutazione del progetto sono:</p>
        <ul>
          <li>mitigazione dei cambiamenti climatici;</li>
          <li>adattamento ai cambiamenti climatici;</li>
          <li>uso sostenibile e protezione delle risorse idriche e marine;</li>
          <li>transizione verso un’economia circolare;</li>
          <li>prevenzione e riduzione dell’inquinamento;</li>
          <li>protezione e ripristino della biodiversità e degli ecosistemi.</li>
        </ul>
        <p>
          La documentazione di dettaglio relativa alla verifica di conformità DNSH del
          progetto è in corso di pubblicazione e sarà resa disponibile in questa sezione.
        </p>
      </>
    ),
  },
]

export default function Trasparenza() {
  return (
    <div className="inner-page">
      <Seo
        title="Società Trasparente"
        description="Sezione trasparenza di ENVIRIA S.C.A.R.L.: accesso civico, informazioni ambientali e principio DNSH relativi al progetto G.R.E.E.N – E.R.I."
        path="/trasparenza"
      />
      <section className="inner-hero">
        <Reveal className="container inner-hero__inner">
          <span className="kicker">Trasparenza</span>
          <h1>Società Trasparente</h1>
          <p className="inner-hero__lead">
            ENVIRIA pubblica in questa sezione le informazioni relative all’accesso
            civico, alle informazioni ambientali e al principio DNSH connessi al progetto
            G.R.E.E.N – E.R.I., realizzato con il contributo del PR FESR Sicilia
            2021-2027.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <nav className="trasparenza-nav" aria-label="Sezioni trasparenza">
            {sections.map(({ id, icon: Icon, title }) => (
              <a key={id} href={`#${id}`} className="trasparenza-nav__item">
                <Icon size={16} /> {title}
              </a>
            ))}
            <a href="/avvisi-pubblici" className="trasparenza-nav__item">
              <FileCheck2 size={16} /> Avvisi Pubblici
            </a>
          </nav>

          {sections.map(({ id, icon: Icon, title, reference, body }, index) => (
            <Reveal key={id} delay={index * 0.06}>
              <article id={id} className="card trasparenza-section">
                <span className="spec-card__icon">
                  <Icon size={22} />
                </span>
                <h2>{title}</h2>
                <span className="trasparenza-section__ref">{reference}</span>
                <div className="legal trasparenza-section__body">{body}</div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <div className="card trasparenza-request">
              <span className="spec-card__icon">
                <Mail size={22} />
              </span>
              <h3>Come richiedere l’accesso a dati o documenti</h3>
              <p>
                Per presentare un’istanza di accesso civico, di accesso alle informazioni
                ambientali o per richiedere la documentazione relativa al principio DNSH,
                scrivi a <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a>,
                specificando: dati identificativi del richiedente, oggetto della richiesta e,
                ove possibile, riferimento ai documenti o alle informazioni di interesse.
                ENVIRIA riscontra le richieste nei termini previsti dalla normativa di
                riferimento.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
