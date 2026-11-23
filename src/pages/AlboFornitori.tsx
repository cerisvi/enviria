import { type FormEvent, useState } from 'react'
import { Briefcase, Paperclip, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'
import './AvvisiPubblici.css'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const content = {
  it: {
    seoTitle: 'Albo dei Fornitori',
    seoDescription: "Modulo di iscrizione all'Albo dei Fornitori di ENVIRIA S.C.A.R.L.",
    kicker: 'Avvisi Pubblici',
    title: 'Albo dei Fornitori',
    lead: 'Gli operatori economici interessati a fornire beni e servizi a ENVIRIA S.C.A.R.L. possono richiedere l’iscrizione all’Albo compilando il modulo sottostante.',
    successTitle: 'Richiesta inviata!',
    successText:
      'Grazie per il tuo interesse. Verificheremo la tua richiesta e ti contatteremo per l’eventuale perfezionamento dell’iscrizione.',
    categorie: [
      'Forniture IT, data center e networking',
      'Ingegneria, consulenza tecnica e progettazione',
      'Droni, sensoristica e strumentazione ambientale',
      'Comunicazione, eventi e materiali divulgativi',
      'Forniture e servizi per ufficio',
      'Servizi legali, amministrativi e contabili',
      'Altro',
    ],
    formeGiuridiche: [
      'S.p.A.',
      'S.r.l.',
      'S.r.l.s.',
      'S.n.c. / S.a.s.',
      'Ditta individuale',
      'Libero professionista',
      'Consorzio / Società consortile',
      'Altro',
    ],
    legendOperatore: 'Dati dell’operatore economico',
    ragioneSociale: 'Ragione sociale',
    ragioneSocialePlaceholder: 'Es. Rossi S.r.l.',
    formaGiuridica: 'Forma giuridica',
    selectPlaceholder: 'Seleziona…',
    partitaIva: 'Partita IVA / Codice Fiscale',
    sedeLegale: 'Sede legale',
    sedeLegalePlaceholder: 'Via, città, provincia, CAP',
    legendReferente: 'Referente e contatti',
    referente: 'Referente / Legale rappresentante',
    referentePlaceholder: 'Mario Rossi',
    email: 'Email',
    emailPlaceholder: 'info@impresa.it',
    pec: 'PEC',
    telefono: 'Telefono',
    optional: '(facoltativo)',
    telefonoPlaceholder: '+39 ...',
    categoriaMerceologica: 'Categoria merceologica',
    descrizione: 'Breve descrizione dell’attività',
    descrizioneOptional: '(facoltativa)',
    descrizionePlaceholder: 'Esperienze rilevanti, referenze, certificazioni possedute...',
    visuraCamerale: 'Visura camerale',
    companyProfile: 'Company Profile',
    fileHint: 'PDF, DOC, DOCX — max 8 MB',
    dichiarazione:
      'Dichiaro, sotto la mia responsabilità, l’assenza delle cause di esclusione di cui agli artt. 94-98 del D.Lgs. 36/2023 (Codice dei Contratti Pubblici) e il possesso dei requisiti di idoneità professionale per l’attività dichiarata.',
    privacyPrefix: 'Ho letto l’',
    privacyLink: 'informativa sulla privacy',
    privacySuffix: ' e acconsento al trattamento dei dati personali per la gestione dell’Albo Fornitori.',
    sending: 'Invio in corso…',
    submit: 'Invia richiesta di iscrizione',
    errorFallback: 'Invio non riuscito. Riprova più tardi.',
    errorNetwork: 'Impossibile contattare il server. Riprova più tardi o scrivi a direzione@enviriahub.it.',
    disclaimer:
      'L’iscrizione all’Albo non comporta l’instaurazione di alcun rapporto contrattuale con ENVIRIA S.C.A.R.L. né l’assunzione di obblighi a carico della stessa. Potrà essere richiesta documentazione a comprova dei requisiti dichiarati in una fase successiva.',
  },
  en: {
    seoTitle: 'Supplier Register',
    seoDescription: "Registration form for ENVIRIA S.C.A.R.L.'s Supplier Register.",
    kicker: 'Public Notices',
    title: 'Supplier Register',
    lead: 'Economic operators interested in supplying goods and services to ENVIRIA S.C.A.R.L. can request registration to the Register by filling in the form below.',
    successTitle: 'Request sent!',
    successText:
      'Thank you for your interest. We will review your request and contact you to finalise the registration, if applicable.',
    categorie: [
      'IT, data center and networking supplies',
      'Engineering, technical consultancy and design',
      'Drones, sensors and environmental instrumentation',
      'Communications, events and promotional materials',
      'Office supplies and services',
      'Legal, administrative and accounting services',
      'Other',
    ],
    formeGiuridiche: [
      'S.p.A. (joint-stock company)',
      'S.r.l. (limited liability company)',
      'S.r.l.s. (simplified limited liability company)',
      'S.n.c. / S.a.s. (partnership)',
      'Sole proprietorship',
      'Self-employed professional',
      'Consortium / Consortium company',
      'Other',
    ],
    legendOperatore: 'Economic operator details',
    ragioneSociale: 'Company name',
    ragioneSocialePlaceholder: 'E.g. Rossi S.r.l.',
    formaGiuridica: 'Legal form',
    selectPlaceholder: 'Select…',
    partitaIva: 'VAT number / Tax code',
    sedeLegale: 'Registered office',
    sedeLegalePlaceholder: 'Street, city, province, postcode',
    legendReferente: 'Contact person and details',
    referente: 'Contact person / Legal representative',
    referentePlaceholder: 'Jane Smith',
    email: 'Email',
    emailPlaceholder: 'info@company.com',
    pec: 'PEC (certified email)',
    telefono: 'Phone',
    optional: '(optional)',
    telefonoPlaceholder: '+39 ...',
    categoriaMerceologica: 'Product/service category',
    descrizione: 'Brief description of the business',
    descrizioneOptional: '(optional)',
    descrizionePlaceholder: 'Relevant experience, references, certifications held...',
    visuraCamerale: 'Chamber of Commerce registration',
    companyProfile: 'Company Profile',
    fileHint: 'PDF, DOC, DOCX — max 8 MB',
    dichiarazione:
      'I declare, under my own responsibility, the absence of the grounds for exclusion set out in articles 94-98 of Italian Legislative Decree 36/2023 (Public Contracts Code) and that I meet the professional eligibility requirements for the declared business activity.',
    privacyPrefix: 'I have read the ',
    privacyLink: 'privacy policy',
    privacySuffix: ' and I consent to the processing of my personal data for the management of the Supplier Register.',
    sending: 'Sending…',
    submit: 'Send registration request',
    errorFallback: 'Something went wrong. Please try again later.',
    errorNetwork: 'Could not reach the server. Please try again later or write to direzione@enviriahub.it.',
    disclaimer:
      'Registration to the Register does not establish any contractual relationship with ENVIRIA S.C.A.R.L. nor any obligation on its part. Supporting documentation for the declared requirements may be requested at a later stage.',
  },
}

export default function AlboFornitori() {
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/avvisi-pubblici/albo-fornitori')
  const privacyPath = useLocalizedPath('/privacy-policy')
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
      <section className="inner-hero">
        <Reveal className="container inner-hero__inner">
          <span className="kicker">{t.kicker}</span>
          <h1>{t.title}</h1>
          <p className="inner-hero__lead">{t.lead}</p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="card contact-form avviso-form">
            {status === 'success' ? (
              <div className="contact-form__success">
                <h3>{t.successTitle}</h3>
                <p>{t.successText}</p>
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
                    {t.legendOperatore}
                  </legend>
                  <div className="contact-form__row contact-form__row--spaced">
                    <label>
                      {t.ragioneSociale}
                      <input type="text" name="ragioneSociale" required placeholder={t.ragioneSocialePlaceholder} />
                    </label>
                    <label>
                      {t.formaGiuridica}
                      <select name="formaGiuridica" required defaultValue="">
                        <option value="" disabled>
                          {t.selectPlaceholder}
                        </option>
                        {t.formeGiuridiche.map((forma) => (
                          <option key={forma} value={forma}>
                            {forma}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="contact-form__row">
                    <label>
                      {t.partitaIva}
                      <input type="text" name="partitaIva" required placeholder="00000000000" />
                    </label>
                    <label>
                      {t.sedeLegale}
                      <input
                        type="text"
                        name="sedeLegale"
                        required
                        placeholder={t.sedeLegalePlaceholder}
                      />
                    </label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>{t.legendReferente}</legend>
                  <div className="contact-form__row contact-form__row--spaced">
                    <label>
                      {t.referente}
                      <input type="text" name="referente" required placeholder={t.referentePlaceholder} />
                    </label>
                    <label>
                      {t.email}
                      <input type="email" name="email" required placeholder={t.emailPlaceholder} />
                    </label>
                  </div>
                  <div className="contact-form__row">
                    <label>
                      {t.pec}
                      <input type="email" name="pec" required placeholder="impresa@pec.it" />
                    </label>
                    <label>
                      {t.telefono} <span className="optional">{t.optional}</span>
                      <input type="tel" name="telefono" placeholder={t.telefonoPlaceholder} />
                    </label>
                  </div>
                </fieldset>

                <label>
                  {t.categoriaMerceologica}
                  <select name="categoria" required defaultValue="">
                    <option value="" disabled>
                      {t.selectPlaceholder}
                    </option>
                    {t.categorie.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  {t.descrizione} <span className="optional">{t.descrizioneOptional}</span>
                  <textarea
                    name="descrizione"
                    rows={4}
                    placeholder={t.descrizionePlaceholder}
                  />
                </label>

                <div className="contact-form__row">
                  <label>
                    <Paperclip size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                    {t.visuraCamerale}
                    <input
                      type="file"
                      name="documento"
                      required
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                    <span className="contact-form__file-hint">{t.fileHint}</span>
                  </label>
                  <label>
                    <Paperclip size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                    {t.companyProfile}
                    <input
                      type="file"
                      name="companyProfile"
                      required
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                    <span className="contact-form__file-hint">{t.fileHint}</span>
                  </label>
                </div>

                <div className="contact-form__checkbox-group">
                  <label className="contact-form__checkbox">
                    <input type="checkbox" name="dichiarazione" required />
                    <span>{t.dichiarazione}</span>
                  </label>
                  <label className="contact-form__checkbox">
                    <input type="checkbox" name="privacy" required />
                    <span>
                      {t.privacyPrefix}
                      <Link to={privacyPath}>{t.privacyLink}</Link>
                      {t.privacySuffix}
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? t.sending : t.submit}
                  {status !== 'sending' && <Send size={16} />}
                </button>

                {status === 'error' && (
                  <p className="contact-form__error" role="alert">
                    {errorMessage}
                  </p>
                )}

                <p className="contact-form__disclaimer">{t.disclaimer}</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
