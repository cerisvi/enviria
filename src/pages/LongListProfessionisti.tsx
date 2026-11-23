import { type FormEvent, useState } from 'react'
import { ClipboardList, Paperclip, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'
import './AvvisiPubblici.css'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const content = {
  it: {
    seoTitle: 'Long List Professionisti',
    seoDescription: "Modulo di iscrizione alla Long List dei Professionisti di ENVIRIA S.C.A.R.L.",
    kicker: 'Avvisi Pubblici',
    title: 'Long List Professionisti',
    lead: 'I professionisti e gli esperti interessati a collaborazioni con ENVIRIA S.C.A.R.L. possono richiedere l’iscrizione alla Long List compilando il modulo sottostante.',
    successTitle: 'Richiesta inviata!',
    successText:
      'Grazie per il tuo interesse. La tua candidatura sarà valutata e potrai essere contattato/a in occasione di future esigenze di collaborazione.',
    areeCompetenza: [
      'Ambientale e scienze della terra',
      'Ingegneria e tecnologie HPC/data center',
      'Informatica, data science e intelligenza artificiale',
      'Legale e amministrativo',
      'Amministrativo-contabile',
      'Comunicazione e divulgazione scientifica',
      'Altro',
    ],
    legendAnagrafici: 'Dati anagrafici',
    nome: 'Nome e cognome',
    nomePlaceholder: 'Mario Rossi',
    codiceFiscale: 'Codice Fiscale',
    email: 'Email',
    emailPlaceholder: 'mario.rossi@email.it',
    telefono: 'Telefono',
    optional: '(facoltativo)',
    telefonoPlaceholder: '+39 ...',
    pec: 'PEC',
    albo: 'Albo professionale di appartenenza / titolo di studio',
    alboPlaceholder: 'Es. Ordine degli Ingegneri di Catania, n. iscrizione...',
    areaCompetenza: 'Area di competenza',
    selectPlaceholder: 'Seleziona…',
    anniEsperienza: 'Anni di esperienza',
    anniEsperienzaPlaceholder: 'Es. 8',
    cvLink: 'Link a profilo LinkedIn / portfolio',
    cv: 'Curriculum Vitae',
    fileHint: 'Formati accettati: PDF, DOC, DOCX — max 8 MB',
    sintesi: 'Sintesi delle esperienze professionali',
    sintesiPlaceholder: 'Descrivi brevemente il tuo percorso e le competenze rilevanti...',
    dichiarazione:
      'Dichiaro, sotto la mia responsabilità, l’assenza di cause di incompatibilità o conflitto di interesse rispetto alle attività di ENVIRIA S.C.A.R.L. e la veridicità dei dati forniti.',
    privacyPrefix: 'Ho letto l’',
    privacyLink: 'informativa sulla privacy',
    privacySuffix: ' e acconsento al trattamento dei dati personali per la gestione della Long List Professionisti.',
    sending: 'Invio in corso…',
    submit: 'Invia candidatura',
    errorFallback: 'Invio non riuscito. Riprova più tardi.',
    errorNetwork: 'Impossibile contattare il server. Riprova più tardi o scrivi a direzione@enviriahub.it.',
    disclaimer:
      'L’iscrizione alla Long List non comporta alcun incarico automatico né l’instaurazione di un rapporto di lavoro con ENVIRIA S.C.A.R.L.',
  },
  en: {
    seoTitle: 'Professionals Long List',
    seoDescription: "Registration form for ENVIRIA S.C.A.R.L.'s Professionals Long List.",
    kicker: 'Public Notices',
    title: 'Professionals Long List',
    lead: 'Professionals and experts interested in collaborating with ENVIRIA S.C.A.R.L. can request registration to the Long List by filling in the form below.',
    successTitle: 'Request sent!',
    successText:
      'Thank you for your interest. Your application will be reviewed and you may be contacted for future collaboration needs.',
    areeCompetenza: [
      'Environmental and earth sciences',
      'Engineering and HPC/data center technologies',
      'Computer science, data science and artificial intelligence',
      'Legal and administrative',
      'Administrative-accounting',
      'Communications and scientific outreach',
      'Other',
    ],
    legendAnagrafici: 'Personal details',
    nome: 'Full name',
    nomePlaceholder: 'Jane Smith',
    codiceFiscale: 'Tax code',
    email: 'Email',
    emailPlaceholder: 'jane.smith@email.com',
    telefono: 'Phone',
    optional: '(optional)',
    telefonoPlaceholder: '+39 ...',
    pec: 'PEC (certified email)',
    albo: 'Professional register / qualification',
    alboPlaceholder: 'E.g. Order of Engineers of Catania, registration no. ...',
    areaCompetenza: 'Area of expertise',
    selectPlaceholder: 'Select…',
    anniEsperienza: 'Years of experience',
    anniEsperienzaPlaceholder: 'E.g. 8',
    cvLink: 'LinkedIn profile / portfolio link',
    cv: 'Curriculum Vitae',
    fileHint: 'Accepted formats: PDF, DOC, DOCX — max 8 MB',
    sintesi: 'Summary of professional experience',
    sintesiPlaceholder: 'Briefly describe your background and relevant skills...',
    dichiarazione:
      'I declare, under my own responsibility, the absence of any incompatibility or conflict of interest with respect to ENVIRIA S.C.A.R.L.’s activities, and that the information provided is truthful.',
    privacyPrefix: 'I have read the ',
    privacyLink: 'privacy policy',
    privacySuffix: ' and I consent to the processing of my personal data for the management of the Professionals Long List.',
    sending: 'Sending…',
    submit: 'Submit application',
    errorFallback: 'Something went wrong. Please try again later.',
    errorNetwork: 'Could not reach the server. Please try again later or write to direzione@enviriahub.it.',
    disclaimer:
      'Registration to the Long List does not entail any automatic assignment nor the establishment of an employment relationship with ENVIRIA S.C.A.R.L.',
  },
}

export default function LongListProfessionisti() {
  const lang = useLang()
  const t = content[lang]
  const path = useLocalizedPath('/avvisi-pubblici/long-list-professionisti')
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
      const response = await fetch('/long-list-professionisti.php', { method: 'POST', body: formData })
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
                    <ClipboardList size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                    {t.legendAnagrafici}
                  </legend>
                  <div className="contact-form__row contact-form__row--spaced">
                    <label>
                      {t.nome}
                      <input type="text" name="nome" required placeholder={t.nomePlaceholder} />
                    </label>
                    <label>
                      {t.codiceFiscale}
                      <input type="text" name="codiceFiscale" required placeholder="RSSMRA80A01H501X" />
                    </label>
                  </div>
                  <div className="contact-form__row">
                    <label>
                      {t.email}
                      <input type="email" name="email" required placeholder={t.emailPlaceholder} />
                    </label>
                    <label>
                      {t.telefono} <span className="optional">{t.optional}</span>
                      <input type="tel" name="telefono" placeholder={t.telefonoPlaceholder} />
                    </label>
                  </div>
                </fieldset>

                <label>
                  {t.pec}
                  <input type="email" name="pec" required placeholder="mario.rossi@pec.it" />
                </label>

                <label>
                  {t.albo} <span className="optional">{t.optional}</span>
                  <input type="text" name="albo" placeholder={t.alboPlaceholder} />
                </label>

                <div className="contact-form__row">
                  <label>
                    {t.areaCompetenza}
                    <select name="areaCompetenza" required defaultValue="">
                      <option value="" disabled>
                        {t.selectPlaceholder}
                      </option>
                      {t.areeCompetenza.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {t.anniEsperienza} <span className="optional">{t.optional}</span>
                    <input type="number" name="anniEsperienza" min={0} max={60} placeholder={t.anniEsperienzaPlaceholder} />
                  </label>
                </div>

                <label>
                  {t.cvLink} <span className="optional">{t.optional}</span>
                  <input type="url" name="cvLink" placeholder="https://..." />
                </label>

                <label>
                  <Paperclip size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                  {t.cv}
                  <input
                    type="file"
                    name="cv"
                    required
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  />
                  <span className="contact-form__file-hint">{t.fileHint}</span>
                </label>

                <label>
                  {t.sintesi}
                  <textarea
                    name="sintesi"
                    rows={5}
                    required
                    placeholder={t.sintesiPlaceholder}
                  />
                </label>

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
