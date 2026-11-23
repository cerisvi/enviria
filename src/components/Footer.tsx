import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import Mark from './Mark'
import { socialLinks } from '../data/social'
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon } from './icons/SocialIcons'
import { localizePath, useLang } from '../i18n/useLang'
import './Footer.css'

const socialIcons = {
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  x: XIcon,
}

const socialLabels = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  x: 'X (Twitter)',
}

const copy = {
  it: {
    tagline:
      'Infrastruttura di ricerca per la gestione intelligente dei dati ambientali — Progetto G.R.E.E.N – E.R.I.',
    projectHeading: 'Il progetto',
    project: 'Il Progetto Green ERI',
    aiDataCenter: 'AI Data Center',
    filiera: 'Filiera del Dato',
    chiSiamo: 'Chi siamo & Network',
    resourcesHeading: 'Risorse',
    partner: 'Partner',
    news: 'News & Eventi',
    avvisi: 'Avvisi Pubblici',
    trasparenza: 'Società Trasparente',
    hub: 'Accedi al Hub',
    contactsHeading: 'Contatti',
    legalSeatHeading: 'Sede legale',
    rights: (year: number) => `© ${year} Enviria S.C.A.R.L. Tutti i diritti riservati.`,
    privacy: 'Privacy Policy',
    cookie: 'Cookie Policy',
  },
  en: {
    tagline:
      'Research infrastructure for the smart management of environmental data — G.R.E.E.N – E.R.I. Project.',
    projectHeading: 'The Project',
    project: 'The Green ERI Project',
    aiDataCenter: 'AI Data Center',
    filiera: 'Data Pipeline',
    chiSiamo: 'About Us & Network',
    resourcesHeading: 'Resources',
    partner: 'Partners',
    news: 'News & Events',
    avvisi: 'Public Notices',
    trasparenza: 'Transparent Administration',
    hub: 'Access the Hub',
    contactsHeading: 'Contact',
    legalSeatHeading: 'Registered Office',
    rights: (year: number) => `© ${year} Enviria S.C.A.R.L. All rights reserved.`,
    privacy: 'Privacy Policy',
    cookie: 'Cookie Policy',
  },
}

export default function Footer() {
  const lang = useLang()
  const t = copy[lang]
  const p = (base: string) => localizePath(base, lang)

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Mark size={34} />
          <div>
            <strong>ENVIRIA S.C.A.R.L.</strong>
            <p className="footer__tagline">{t.tagline}</p>
          </div>
        </div>

        <div className="footer__col">
          <h4>{t.projectHeading}</h4>
          <Link to={p('/progetto')}>{t.project}</Link>
          <Link to={p('/ai-data-center')}>{t.aiDataCenter}</Link>
          <Link to={p('/filiera-del-dato')}>{t.filiera}</Link>
          <Link to={p('/chi-siamo')}>{t.chiSiamo}</Link>
        </div>

        <div className="footer__col">
          <h4>{t.resourcesHeading}</h4>
          <Link to={p('/partner')}>{t.partner}</Link>
          <Link to={p('/news')}>{t.news}</Link>
          <Link to={p('/avvisi-pubblici')}>{t.avvisi}</Link>
          <Link to={p('/trasparenza')}>{t.trasparenza}</Link>
          <Link to="/hub">{t.hub}</Link>
        </div>

        <div className="footer__col">
          <h4>{t.contactsHeading}</h4>
          <a href="mailto:direzione@enviriahub.it">
            <Mail size={14} /> direzione@enviriahub.it
          </a>
          {socialLinks.length > 0 && (
            <div className="footer__social">
              {socialLinks.map(({ platform, url }) => {
                const Icon = socialIcons[platform]
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={socialLabels[platform]}
                    className="footer__social-icon"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          )}
        </div>

        <div className="footer__col">
          <h4>{t.legalSeatHeading}</h4>
          <p className="footer__legal">
            <MapPin size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
            Corso Italia 172
            <br />
            95128 Catania (CT), Italy
            <br />
            PEC: enviria@legalmail.it
            <br />
            C.F. / P.IVA: 06297800879
          </p>
        </div>
      </div>

      <div className="footer__funding">
        <div className="container">
          <p>
            G.R.E.E.N – E.R.I. (Green&amp;Geo, Renewable, Efficiency, Environmental, Node –
            Environmental Research Infrastructure) · CUP G61E25000170007 · PR FESR Sicilia
            2021-2027 · Azione 1.1.4 "Sostegno alle infrastrutture di ricerca" · Unione Europea ·
            Repubblica Italiana · Regione Siciliana
          </p>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>{t.rights(new Date().getFullYear())}</span>
        <span className="footer__legal-links">
          <Link to={p('/privacy-policy')}>{t.privacy}</Link>
          <Link to={p('/cookie-policy')}>{t.cookie}</Link>
        </span>
        <span>enviriahub.it</span>
      </div>
    </footer>
  )
}
