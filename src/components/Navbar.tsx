import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import logo from '../assets/brand/logo-orizzontale-colore.svg'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/progetto', label: 'Il Progetto' },
  { to: '/ai-data-center', label: 'AI Data Center' },
  { to: '/filiera-del-dato', label: 'Filiera del Dato' },
  { to: '/chi-siamo', label: 'Chi siamo' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="ENVIRIA — Infrastruttura di Ricerca Green ERI" className="navbar__logo" />
        </Link>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {({ isActive }) => (
                <>
                  {link.label}
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
            Accedi al Hub
          </Link>
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
