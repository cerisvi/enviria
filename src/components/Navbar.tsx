import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import logo from '../assets/brand/logo-orizzontale-colore.svg'
import LanguageSwitcher from './LanguageSwitcher'
import { localizePath, useLang } from '../i18n/useLang'
import './Navbar.css'

const links = [
  { to: '/', label: { it: 'Home', en: 'Home' } },
  { to: '/chi-siamo', label: { it: 'Chi siamo', en: 'About Us' } },
  { to: '/progetto', label: { it: 'Il Progetto', en: 'The Project' } },
  { to: '/ai-data-center', label: { it: 'AI Data Center', en: 'AI Data Center' } },
  { to: '/filiera-del-dato', label: { it: 'Filiera del Dato', en: 'Data Pipeline' } },
  { to: '/partner', label: { it: 'Partner', en: 'Partners' } },
  { to: '/news', label: { it: 'News', en: 'News' } },
  { to: '/trasparenza', label: { it: 'Trasparenza', en: 'Transparency' } },
  { to: '/avvisi-pubblici', label: { it: 'Avvisi Pubblici', en: 'Public Notices' } },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const lang = useLang()
  const homeHref = localizePath('/', lang)

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to={homeHref} className="navbar__brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="ENVIRIA — Infrastruttura di Ricerca Green ERI" className="navbar__logo" />
        </Link>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={localizePath(link.to, lang)}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {({ isActive }) => (
                <>
                  {link.label[lang]}
                  {isActive && (
                    <motion.span
                      className="navbar__indicator"
                      layoutId="navbar-indicator"
                      transition={
                        reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Link to="/hub" className="btn btn-primary navbar__cta" onClick={() => setOpen(false)}>
            {lang === 'it' ? 'Accedi al Hub' : 'Access the Hub'}
          </Link>
          <LanguageSwitcher onNavigate={() => setOpen(false)} />
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}
