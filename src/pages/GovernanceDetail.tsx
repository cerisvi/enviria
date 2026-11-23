import { useEffect, useState } from 'react'
import { ArrowLeft, FileText, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { governanceMembers as fallbackGovernanceMembers, type GovernanceMember } from '../data/governance'
import './InnerPage.css'
import './GovernanceDetail.css'

export default function GovernanceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [members, setMembers] = useState<GovernanceMember[]>(fallbackGovernanceMembers)

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
        <Seo
          title="Figura non trovata"
          description="La figura di governance richiesta non è stata trovata."
          path={`/chi-siamo/governance/${slug ?? ''}`}
        />
        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <span className="kicker" style={{ justifyContent: 'center' }}>
              Governance
            </span>
            <h1>Figura non trovata</h1>
            <p style={{ color: 'var(--color-ink-soft)', marginBottom: 24 }}>
              La figura che cerchi non esiste o è stata rimossa.
            </p>
            <Link to="/chi-siamo" className="btn btn-primary">
              <ArrowLeft size={16} /> Torna a Chi Siamo
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="inner-page">
      <Seo
        title={`${member.name ?? member.role} — Governance`}
        description={`${member.role} di ENVIRIA S.C.A.R.L.${member.bio ? ' ' + member.bio.slice(0, 140) : ''}`}
        path={`/chi-siamo/governance/${member.slug}`}
      />
      <section className="inner-hero">
        <Reveal className="container inner-hero__inner">
          <span className="kicker">Governance</span>
          <h1>{member.name ?? 'In aggiornamento'}</h1>
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
                <h2>{member.name ?? 'In aggiornamento'}</h2>
                <p className="governance-detail__role">{member.role}</p>
              </div>
            </div>

            <div className="governance-detail__bio">
              <h3>Competenze</h3>
              {member.bio ? (
                <p>{member.bio}</p>
              ) : (
                <p className="governance-detail__placeholder">
                  Il profilo e la descrizione sintetica delle competenze sono in
                  aggiornamento.
                </p>
              )}
            </div>

            <div className="governance-detail__cv">
              <h3>Curriculum Vitae</h3>
              {member.cv ? (
                <a href={member.cv} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <FileText size={16} /> Scarica il CV
                </a>
              ) : (
                <p className="governance-detail__placeholder">Documento in pubblicazione.</p>
              )}
            </div>

            <Link to="/chi-siamo" className="governance-detail__back">
              <ArrowLeft size={14} /> Torna a Chi Siamo
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
