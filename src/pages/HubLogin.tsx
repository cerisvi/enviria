import { type FormEvent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Leaf, LogIn } from 'lucide-react'
import { useHubAuth } from '../hub/useHubAuth'
import './Hub.css'

export default function HubLogin() {
  const { isAuthenticated, login } = useHubAuth()
  const [email, setEmail] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/hub/dashboard" replace />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    login(email || 'demo@enviriahub.it')
  }

  return (
    <div className="hub-auth">
      <div className="hub-auth__card card">
        <Link to="/" className="hub-auth__brand">
          <span className="hub-auth__brand-icon">
            <Leaf size={18} />
          </span>
          Enviria <span>Hub</span>
        </Link>

        <h1>Accedi al Hub</h1>
        <p className="hub-auth__lead">
          Area riservata a partner, enti di ricerca e collaboratori del progetto Green ERI.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nome@ente.it"
            />
          </label>
          <label>
            Password
            <input type="password" required placeholder="••••••••" />
          </label>
          <button type="submit" className="btn btn-primary">
            Accedi <LogIn size={16} />
          </button>
        </form>

        <p className="hub-auth__disclaimer">
          Accesso dimostrativo: qualsiasi credenziale valida come formato ti fa entrare
          nell'anteprima del Hub. L'autenticazione reale sarà collegata in un secondo momento.
        </p>

        <Link to="/" className="hub-auth__back">
          ← Torna al sito
        </Link>
      </div>
    </div>
  )
}
