import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Leaf, Menu, X } from 'lucide-react'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/chi-siamo', label: 'Chi siamo' },
  { to: '/servizi', label: 'Servizi' },
  { to: '/contatti', label: 'Contatti' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__brand-icon">
            <Leaf size={18} />
          </span>
          Enviria <span className="navbar__brand-hub">Hub</span>
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
