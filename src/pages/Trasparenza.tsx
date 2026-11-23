import { FileCheck2, Landmark, Leaf, Mail } from 'lucide-react'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'
import './Legal.css'
import './Trasparenza.css'

const sectionsByLang = {
  it: [
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
  ],
  en: [
    {
      id: 'accesso-civico',
      icon: Landmark,
      title: 'Civic Access',
      reference: 'Art. 5, Italian Legislative Decree 14 March 2013, no. 33',
      body: (
        <>
          <p>
            ENVIRIA, as the body managing a research infrastructure built with public funds
            (PR FESR Sicilia 2021-2027), voluntarily adheres to the transparency principles
            set out in Legislative Decree 33/2013 for activities connected with the use of
            public funds.
          </p>
          <h3>“Simple” civic access (art. 5, para. 1)</h3>
          <p>
            Anyone has the right to request the documents, information or data that ENVIRIA
            is required to publish in this section, in cases where such publication has been
            omitted.
          </p>
          <h3>“Generalised” civic access (art. 5, para. 2)</h3>
          <p>
            Anyone also has the right to access data and documents beyond those subject to
            mandatory publication, within the limits relating to the protection of legally
            relevant public and private interests and in accordance with art. 5-bis of the
            same decree.
          </p>
        </>
      ),
    },
    {
      id: 'informazioni-ambientali',
      icon: Leaf,
      title: 'Environmental Information',
      reference: 'Italian Legislative Decree 19 August 2005, no. 195',
      body: (
        <>
          <p>
            In line with its mission as an environmental research infrastructure, ENVIRIA
            promotes public access to environmental information collected or held under the
            G.R.E.E.N – E.R.I. project, implementing the principles of Legislative Decree
            195/2005 (transposing Directive 2003/4/EC).
          </p>
          <p>
            This category includes, for example, data on the state of the environment (air,
            water, soil, biodiversity), factors affecting the environment, and measures
            adopted as part of the territorial monitoring activities carried out through the
            Green ERI infrastructure’s network of sensors, drones and thematic laboratories.
          </p>
        </>
      ),
    },
    {
      id: 'principio-dnsh',
      icon: FileCheck2,
      title: 'DNSH Principle',
      reference: 'Regulation (EU) 2020/852 — “Do No Significant Harm”',
      body: (
        <>
          <p>
            The G.R.E.E.N – E.R.I. project, funded under the PR FESR Sicilia 2021-2027
            programme (Action 1.1.4), was designed in compliance with the “Do No Significant
            Harm” (DNSH) principle for the environmental objectives set out in Regulation
            (EU) 2020/852 (the EU Taxonomy) and referred to, as a horizontal principle, by
            Regulation (EU) 2021/1060 on the European structural and investment funds.
          </p>
          <p>The environmental objectives used as a reference in assessing the project are:</p>
          <ul>
            <li>climate change mitigation;</li>
            <li>climate change adaptation;</li>
            <li>the sustainable use and protection of water and marine resources;</li>
            <li>the transition to a circular economy;</li>
            <li>pollution prevention and control;</li>
            <li>the protection and restoration of biodiversity and ecosystems.</li>
          </ul>
          <p>
            Detailed documentation on the project’s DNSH compliance assessment is being
            finalised and will be made available in this section.
          </p>
        </>
      ),
    },
  ],
}

const content = {
  it: {
    seoTitle: 'Società Trasparente',
    seoDescription:
      'Sezione trasparenza di ENVIRIA S.C.A.R.L.: accesso civico, informazioni ambientali e principio DNSH relativi al progetto G.R.E.E.N – E.R.I.',
    kicker: 'Trasparenza',
    title: 'Società Trasparente',
    lead: 'ENVIRIA pubblica in questa sezione le informazioni relative all’accesso civico, alle informazioni ambientali e al principio DNSH connessi al progetto G.R.E.E.N – E.R.I., realizzato con il contributo del PR FESR Sicilia 2021-2027.',
    avvisiLabel: 'Avvisi Pubblici',
    requestTitle: 'Come richiedere l’accesso a dati o documenti',
    requestText: (
      <>
        Per presentare un’istanza di accesso civico, di accesso alle informazioni ambientali
        o per richiedere la documentazione relativa al principio DNSH, scrivi a{' '}
        <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a>, specificando: dati
        identificativi del richiedente, oggetto della richiesta e, ove possibile, riferimento
        ai documenti o alle informazioni di interesse. ENVIRIA riscontra le richieste nei
        termini previsti dalla normativa di riferimento.
      </>
    ),
  },
  en: {
    seoTitle: 'Transparent Administration',
    seoDescription:
      'ENVIRIA S.C.A.R.L. transparency section: civic access, environmental information and the DNSH principle relating to the G.R.E.E.N – E.R.I. project.',
    kicker: 'Transparency',
    title: 'Transparent Administration',
    lead: 'In this section ENVIRIA publishes information on civic access, environmental information and the DNSH principle connected to the G.R.E.E.N – E.R.I. project, carried out with the contribution of the PR FESR Sicilia 2021-2027 programme.',
    avvisiLabel: 'Public Notices',
    requestTitle: 'How to request access to data or documents',
    requestText: (
      <>
        To submit a civic access request, a request for environmental information, or to
        request documentation relating to the DNSH principle, write to{' '}
        <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a>, specifying: your
        identifying details, the subject of the request and, where possible, a reference to
        the documents or information of interest. ENVIRIA responds to requests within the
        terms set out by the applicable regulations.
      </>
    ),
  },
}

export default function Trasparenza() {
  const lang = useLang()
  const t = content[lang]
  const sections = sectionsByLang[lang]
  const path = useLocalizedPath('/trasparenza')
  const avvisiPath = useLocalizedPath('/avvisi-pubblici')

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
          <nav className="trasparenza-nav" aria-label="Sezioni trasparenza">
            {sections.map(({ id, icon: Icon, title }) => (
              <a key={id} href={`#${id}`} className="trasparenza-nav__item">
                <Icon size={16} /> {title}
              </a>
            ))}
            <a href={avvisiPath} className="trasparenza-nav__item">
              <FileCheck2 size={16} /> {t.avvisiLabel}
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
              <h3>{t.requestTitle}</h3>
              <p>{t.requestText}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
