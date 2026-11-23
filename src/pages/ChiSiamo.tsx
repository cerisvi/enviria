import { type FormEvent, useEffect, useState } from 'react'
import {
  ArrowRight,
  Building2,
  Calculator,
  FlaskConical,
  Mail,
  MapPin,
  Send,
  Target,
  UsersRound,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import coastlineAerial from '../assets/photos/coastline-aerial.webp'
import networkSphere from '../assets/photos/network-sphere.webp'
import laptopRender from '../assets/photos/laptop-3d-render.webp'
import PhotoBand from '../components/PhotoBand'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { governanceMembers as fallbackGovernanceMembers, type GovernanceMember } from '../data/governance'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'
import './ChiSiamo.css'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const content = {
  it: {
    seoTitle: 'Chi Siamo — Organismo di Ricerca ENVIRIA',
    seoDescription:
      "ENVIRIA è l'Organismo di Ricerca, società consortile siciliana che gestisce la prima e unica infrastruttura di ricerca sull'ambiente nel Mediterraneo, in rete con enti di ricerca, istituzioni e imprese del territorio.",
    heroKicker: 'Chi Siamo & Network',
    heroTitle: 'ENVIRIA S.C.A.R.L.',
    heroLead:
      'Una società consortile costituita per realizzare e gestire l’infrastruttura di ricerca Green ERI, mettendo in rete enti di ricerca, competenze tecniche e territorio attorno alla gestione intelligente dei dati ambientali.',
    consortiumTitle: 'Il consorzio',
    consortiumText:
      'ENVIRIA è una Società Consortile a Responsabilità Limitata, Organismo di Ricerca nato per dare continuità operativa e gestionale alla prima e unica infrastruttura di ricerca sull’ambiente nel Mediterraneo, realizzata nell’ambito del progetto G.R.E.E.N – E.R.I., finanziato dal PR FESR Sicilia 2021-2027.',
    missionTitle: 'La missione',
    missionText:
      'Mettere l’infrastruttura di ricerca — Green Data Center, laboratori tematici e rete di monitoraggio territoriale — al servizio della comunità scientifica, delle istituzioni e del tessuto produttivo locale.',
    laptopAlt: 'Elaborazione di un modello dati 3D su schermo',
    governanceKicker: 'Governance',
    governanceTitle: 'Governance e figure chiave',
    governanceLead:
      'La struttura di governo di ENVIRIA S.C.A.R.L. e i referenti chiave dell’infrastruttura di ricerca Green ERI, secondo il modello di governance — direzione scientifica, direzione amministrativa e organo tecnico-scientifico consultivo — adottato dalle principali infrastrutture di ricerca nazionali ed europee.',
    rootSubtitle: 'Organismo di Ricerca — Infrastruttura Green ERI',
    inAggiornamento: 'In aggiornamento',
    scopriDiPiu: 'Scopri di più →',
    networkKicker: 'Network',
    networkTitle: 'Enti di ricerca e partner di progetto',
    networkLead: 'L’infrastruttura nasce dalla collaborazione tra enti di ricerca e soggetti tecnici del territorio.',
    centiRicerca: 'CERISVI — Ente di Ricerca',
    partnerPills: ['Smart Hub Srl', 'Europrosvi Srl', 'Area Sistemi di Innovazione', 'ARPA Sicilia', 'ISPRA', 'Università Kore di Enna'],
    categoriesText: 'Lavoriamo inoltre con enti istituzionali, centri di ricerca e imprese del territorio siciliano e nazionale.',
    seeAllPartners: 'Vedi tutti i partner',
    coastlineAlt: 'Vista aerea della costa siciliana',
    contactsTitle: 'Contatti',
    addressLabel: 'Corso Italia 172, 95128 Catania (CT)',
    contactNote:
      'Per collaborazioni scientifiche, richieste di accesso ai dati o informazioni sul progetto Green ERI, scrivici alla direzione.',
    formSuccessTitle: 'Grazie per averci scritto!',
    formSuccessText: 'Abbiamo ricevuto la tua richiesta. Ti risponderemo al più presto.',
    nameLabel: 'Nome e cognome',
    namePlaceholder: 'Mario Rossi',
    emailLabel: 'Email',
    emailPlaceholder: 'mario.rossi@email.it',
    orgLabel: 'Ente / organizzazione (opzionale)',
    orgPlaceholder: 'Università, azienda, ente...',
    messageLabel: 'Messaggio',
    messagePlaceholder: 'Descrivi la tua richiesta...',
    sending: 'Invio in corso…',
    send: 'Invia richiesta',
    errorFallback: 'Invio non riuscito. Riprova più tardi o scrivici direttamente.',
    errorNetwork:
      'Impossibile contattare il server. Riprova più tardi o scrivici direttamente a direzione@enviriahub.it.',
    disclaimerPrefix: 'Scrivendoci acconsenti al trattamento dei dati per questa richiesta. Per informazioni dirette:',
  },
  en: {
    seoTitle: 'About Us — ENVIRIA Research Body',
    seoDescription:
      'ENVIRIA is the Research Body, a Sicilian consortium company that manages the first and only environmental research infrastructure in the Mediterranean, networked with research bodies, institutions and businesses across the territory.',
    heroKicker: 'About Us & Network',
    heroTitle: 'ENVIRIA S.C.A.R.L.',
    heroLead:
      'A consortium company set up to build and manage the Green ERI research infrastructure, connecting research bodies, technical expertise and the territory around the smart management of environmental data.',
    consortiumTitle: 'The Consortium',
    consortiumText:
      'ENVIRIA is a limited consortium company (S.C.A.R.L.) and Research Body, created to ensure operational and managerial continuity for the first and only environmental research infrastructure in the Mediterranean, developed under the G.R.E.E.N – E.R.I. project, funded by the PR FESR Sicilia 2021-2027 programme.',
    missionTitle: 'The Mission',
    missionText:
      'Putting the research infrastructure — Green Data Center, thematic laboratories and territorial monitoring network — at the service of the scientific community, institutions and the local business ecosystem.',
    laptopAlt: 'A 3D data model being processed on a screen',
    governanceKicker: 'Governance',
    governanceTitle: 'Governance and key figures',
    governanceLead:
      'The governing structure of ENVIRIA S.C.A.R.L. and the key contacts of the Green ERI research infrastructure, following the governance model — scientific direction, administrative direction and an advisory scientific-technical body — adopted by leading national and European research infrastructures.',
    rootSubtitle: 'Research Body — Green ERI Infrastructure',
    inAggiornamento: 'To be announced',
    scopriDiPiu: 'Learn more →',
    networkKicker: 'Network',
    networkTitle: 'Research bodies and project partners',
    networkLead: 'The infrastructure was born from the collaboration between research bodies and technical partners across the territory.',
    centiRicerca: 'CERISVI — Research Body',
    partnerPills: ['Smart Hub Srl', 'Europrosvi Srl', 'Area Sistemi di Innovazione', 'ARPA Sicilia', 'ISPRA', 'Kore University of Enna'],
    categoriesText: 'We also work with institutional bodies, research centres and businesses across Sicily and Italy.',
    seeAllPartners: 'See all partners',
    coastlineAlt: 'Aerial view of the Sicilian coastline',
    contactsTitle: 'Contact',
    addressLabel: 'Corso Italia 172, 95128 Catania (CT), Italy',
    contactNote:
      'For scientific collaborations, data access requests or information about the Green ERI project, write to the management office.',
    formSuccessTitle: 'Thank you for writing to us!',
    formSuccessText: 'We have received your request. We will get back to you as soon as possible.',
    nameLabel: 'Full name',
    namePlaceholder: 'Jane Smith',
    emailLabel: 'Email',
    emailPlaceholder: 'jane.smith@email.com',
    orgLabel: 'Organisation (optional)',
    orgPlaceholder: 'University, company, institution...',
    messageLabel: 'Message',
    messagePlaceholder: 'Describe your request...',
    sending: 'Sending…',
    send: 'Send request',
    errorFallback: 'Something went wrong. Please try again later or contact us directly.',
    errorNetwork:
      'Could not reach the server. Please try again later or write directly to direzione@enviriahub.it.',
    disclaimerPrefix: 'By writing to us you consent to the processing of your data for this request. For direct enquiries:',
  },
}

const roleMeta: Record<string, { icon: typeof FlaskConical; intl: string; accent: string }> = {
  'responsabile-scientifico': {
    icon: FlaskConical,
    intl: 'Scientific Director',
    accent: 'var(--color-forest)',
  },
  'responsabile-amministrativo': {
    icon: Calculator,
    intl: 'Administrative Director',
    accent: 'var(--color-data-blue)',
  },
  'comitato-tecnico-scientifico': {
    icon: UsersRound,
    intl: 'Scientific-Technical Committee',
    accent: 'var(--color-nature)',
  },
}
const defaultRoleMeta = { icon: UsersRound, intl: '', accent: 'var(--color-forest)' }

export default function ChiSiamo() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/chi-siamo')
  const partnerPath = useLocalizedPath('/partner')
  // Contenuto di base (quello incluso nell'ultima build del sito): garantisce
  // che l'organigramma non sia mai vuoto per i crawler o se il database del
  // pannello di gestione non è ancora configurato.
  const [governanceMembers, setGovernanceMembers] = useState<GovernanceMember[]>(
    fallbackGovernanceMembers,
  )

  useEffect(() => {
    fetch('/api/governance.php')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: GovernanceMember[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setGovernanceMembers(data)
        }
      })
      .catch(() => {
        // Database non ancora configurato o non raggiungibile: resta il
        // contenuto di base già mostrato.
      })
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setErrorMessage(lang === 'it' ? data.message || t.errorFallback : t.errorFallback)
      }
    } catch {
      setStatus('error')
      setErrorMessage(t.errorNetwork)
    }
  }

  return (
    <div className="inner-page">
      <Seo title={t.seoTitle} description={t.seoDescription} path={path} />
      <section className="inner-hero" style={{ backgroundImage: `url(${networkSphere})` }}>
        <Reveal className="container inner-hero__inner">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p className="inner-hero__lead">{t.heroLead}</p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-layout">
            <div className="grid grid-2">
              <Reveal>
                <article className="card spec-card">
                  <span className="spec-card__icon">
                    <Building2 size={22} />
                  </span>
                  <h3>{t.consortiumTitle}</h3>
                  <p>{t.consortiumText}</p>
                </article>
              </Reveal>
              <Reveal delay={0.08}>
                <article className="card spec-card spec-card--blue">
                  <span className="spec-card__icon">
                    <Target size={22} />
                  </span>
                  <h3>{t.missionTitle}</h3>
                  <p>{t.missionText}</p>
                </article>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="split-layout__media">
              <div className="split-layout__sticky">
                <PhotoBand src={laptopRender} alt={t.laptopAlt} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="kicker">{t.governanceKicker}</span>
            <h2>{t.governanceTitle}</h2>
            <p className="section-head__lead">{t.governanceLead}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="orgchart-panel">
              <div className="orgchart">
                <div className="orgchart__node orgchart__node--root">
                  <span className="orgchart__icon orgchart__icon--root">
                    <Building2 size={22} />
                  </span>
                  <strong>ENVIRIA S.C.A.R.L.</strong>
                  <span className="orgchart__root-subtitle">{t.rootSubtitle}</span>
                </div>
                <div className="orgchart__trunk" aria-hidden="true" />
                <div className="orgchart__row">
                  {governanceMembers.map((member) => {
                    const meta = roleMeta[member.slug] ?? defaultRoleMeta
                    const Icon = meta.icon
                    return (
                      <div className="orgchart__branch" key={member.slug}>
                        <Link
                          to={`${path}/governance/${member.slug}`}
                          className="orgchart__link"
                          style={{ ['--orgchart-accent' as string]: meta.accent }}
                        >
                          <div className="orgchart__node card">
                            {member.photo ? (
                              <img src={member.photo} alt="" className="orgchart__photo" />
                            ) : (
                              <span className="orgchart__icon">
                                <Icon size={20} />
                              </span>
                            )}
                            {meta.intl && <span className="orgchart__intl">{meta.intl}</span>}
                            <h4>{member.role}</h4>
                            <span className="orgchart__status">
                              {member.name ?? t.inAggiornamento}
                            </span>
                            <span className="orgchart__hint">{t.scopriDiPiu}</span>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="kicker">{t.networkKicker}</span>
            <h2>{t.networkTitle}</h2>
            <p className="section-head__lead">{t.networkLead}</p>
          </Reveal>

          <Reveal delay={0.1} className="partner-list">
            <span className="partner-pill">
              <Users size={16} /> {t.centiRicerca}
            </span>
            {t.partnerPills.map((name) => (
              <span className="partner-pill" key={name}>
                {name}
              </span>
            ))}
          </Reveal>

          <p className="partner-list__categories">
            {t.categoriesText}{' '}
            <Link to={partnerPath} className="partner-list__cta">
              {t.seeAllPartners} <ArrowRight size={14} />
            </Link>
          </p>

          <PhotoBand src={coastlineAerial} alt={t.coastlineAlt} />
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <div className="card contact-info">
              <h3>{t.contactsTitle}</h3>
              <a href="mailto:direzione@enviriahub.it">
                <Mail size={16} /> direzione@enviriahub.it
              </a>
              <a
                href="https://www.openstreetmap.org/search?query=Corso%20Italia%20172%2C%2095128%20Catania"
                target="_blank"
                rel="noreferrer"
                className="contact-info__location"
              >
                <MapPin size={16} /> {t.addressLabel}
              </a>
              <div className="contact-info__legal">
                <span>PEC: enviria@legalmail.it</span>
                <span>C.F. / P.IVA: 06297800879</span>
              </div>
              <p className="contact-info__note">{t.contactNote}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card contact-form">
              {status === 'success' ? (
                <div className="contact-form__success">
                  <h3>{t.formSuccessTitle}</h3>
                  <p>{t.formSuccessText}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Honeypot anti-spam: campo nascosto, invisibile e ignorato dagli utenti reali */}
                  <input
                    type="text"
                    name="hpcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="contact-form__honeypot"
                    aria-hidden="true"
                  />
                  <div className="contact-form__row">
                    <label>
                      {t.nameLabel}
                      <input type="text" name="name" required placeholder={t.namePlaceholder} />
                    </label>
                    <label>
                      {t.emailLabel}
                      <input type="email" name="email" required placeholder={t.emailPlaceholder} />
                    </label>
                  </div>
                  <label>
                    {t.orgLabel}
                    <input type="text" name="organization" placeholder={t.orgPlaceholder} />
                  </label>
                  <label>
                    {t.messageLabel}
                    <textarea name="message" required rows={5} placeholder={t.messagePlaceholder} />
                  </label>
                  <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    {status === 'sending' ? t.sending : t.send}
                    {status !== 'sending' && <Send size={16} />}
                  </button>
                  {status === 'error' && (
                    <p className="contact-form__error" role="alert">
                      {errorMessage}
                    </p>
                  )}
                  <p className="contact-form__disclaimer">
                    {t.disclaimerPrefix}{' '}
                    <a href="mailto:direzione@enviriahub.it">direzione@enviriahub.it</a>.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
