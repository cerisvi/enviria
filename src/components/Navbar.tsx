import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Mark from './Mark'
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

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <Mark size={28} lineColor="#0f3b30" peakColor="#3a9d5d" />
          <span className="navbar__brand-text">
            ENVIRIA
            <span className="navbar__brand-sub">Green ERI</span>
          </span>
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
              {link.label}
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
