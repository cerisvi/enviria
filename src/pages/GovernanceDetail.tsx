import { useEffect, useState } from 'react'
import { ArrowLeft, FileText, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { governanceMembers as fallbackGovernanceMembers, type GovernanceMember } from '../data/governance'
import { useLang, useLocalizedPath } from '../i18n/useLang'
import './InnerPage.css'
import './GovernanceDetail.css'

const content = {
  it: {
    notFoundTitle: 'Figura non trovata',
    notFoundText: 'La figura che cerchi non esiste o è stata rimossa.',
    notFoundSeoTitle: 'Figura non trovata',
    notFoundSeoDescription: 'La figura di governance richiesta non è stata trovata.',
    back: 'Torna a Chi Siamo',
    kicker: 'Governance',
    inAggiornamento: 'In aggiornamento',
    competenciesTitle: 'Competenze',
    competenciesPlaceholder: 'Il profilo e la descrizione sintetica delle competenze sono in aggiornamento.',
    cvTitle: 'Curriculum Vitae',
    cvDownload: 'Scarica il CV',
    cvPlaceholder: 'Documento in pubblicazione.',
    seoSuffix: '— Governance',
    seoDescription: (role: string, bio?: string | null) =>
      `${role} di ENVIRIA S.C.A.R.L.${bio ? ' ' + bio.slice(0, 140) : ''}`,
  },
  en: {
    notFoundTitle: 'Figure not found',
    notFoundText: 'The figure you are looking for does not exist or has been removed.',
    notFoundSeoTitle: 'Figure not found',
    notFoundSeoDescription: 'The requested governance figure was not found.',
    back: 'Back to About Us',
    kicker: 'Governance',
    inAggiornamento: 'To be announced',
    competenciesTitle: 'Competencies',
    competenciesPlaceholder: 'The profile and summary of competencies are being updated.',
    cvTitle: 'Curriculum Vitae',
    cvDownload: 'Download CV',
    cvPlaceholder: 'Document to be published.',
    seoSuffix: '— Governance',
    seoDescription: (role: string, bio?: string | null) =>
      `${role} at ENVIRIA S.C.A.R.L.${bio ? ' ' + bio.slice(0, 140) : ''}`,
  },
}

export default function GovernanceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [members, setMembers] = useState<GovernanceMember[]>(fallbackGovernanceMembers)
  const lang = useLang()
  const t = content[lang]
  const chiSiamoPath = useLocalizedPath('/chi-siamo')
  const path = useLocalizedPath(`/chi-siamo/governance/${slug ?? ''}`)

  useEffect(() => {
    fetch('/api/governance.php')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: GovernanceMember[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setMembers(data)
        }
      })
      .catch(() => {
        // Database non ancora configurato o non raggiungibile: resta il
        // contenuto di base già mostrato.
      })
  }, [])

  const member = members.find((m) => m.slug === slug)

  if (!member) {
    return (
      <div className="inner-page">
        <Seo title={t.notFoundSeoTitle} description={t.notFoundSeoDescription} path={path} />
        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <span className="kicker" style={{ justifyContent: 'center' }}>
              {t.kicker}
            </span>
            <h1>{t.notFoundTitle}</h1>
            <p style={{ color: 'var(--color-ink-soft)', marginBottom: 24 }}>{t.notFoundText}</p>
            <Link to={chiSiamoPath} className="btn btn-primary">
              <ArrowLeft size={16} /> {t.back}
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="inner-page">
      <Seo
        title={`${member.name ?? member.role} ${t.seoSuffix}`}
        description={t.seoDescription(member.role, member.bio)}
        path={path}
      />
      <section className="inner-hero">
        <Reveal className="container inner-hero__inner">
          <span className="kicker">{t.kicker}</span>
          <h1>{member.name ?? t.inAggiornamento}</h1>
          <p className="inner-hero__lead">{member.role}</p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="card governance-detail">
            <div className="governance-detail__header">
              {member.photo ? (
                <img src={member.photo} alt={member.name ?? member.role} className="governance-detail__photo" />
              ) : (
                <span className="governance-detail__photo governance-detail__photo--placeholder">
                  <UserRound size={40} />
                </span>
              )}
              <div>
                <h2>{member.name ?? t.inAggiornamento}</h2>
                <p className="governance-detail__role">{member.role}</p>
              </div>
            </div>

            <div className="governance-detail__bio">
              <h3>{t.competenciesTitle}</h3>
              {member.bio ? (
                <p>{member.bio}</p>
              ) : (
                <p className="governance-detail__placeholder">{t.competenciesPlaceholder}</p>
              )}
            </div>

            <div className="governance-detail__cv">
              <h3>{t.cvTitle}</h3>
              {member.cv ? (
                <a href={member.cv} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <FileText size={16} /> {t.cvDownload}
                </a>
              ) : (
                <p className="governance-detail__placeholder">{t.cvPlaceholder}</p>
              )}
            </div>

            <Link to={chiSiamoPath} className="governance-detail__back">
              <ArrowLeft size={14} /> {t.back}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
