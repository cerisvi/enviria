import { Link } from 'react-router-dom'
import { Database, Leaf, LogOut, Radar, Sprout } from 'lucide-react'
import { useHubAuth } from '../hub/useHubAuth'
import './Hub.css'

const modules = [
  {
    icon: Radar,
    title: 'Rete di monitoraggio',
    text: "Visualizzazione in tempo reale dei sensori ambientali collegati all'infrastruttura Green ERI.",
  },
  {
    icon: Database,
    title: 'Archivio dati',
    text: 'Storico e download dei dataset ambientali ed energetici raccolti nel tempo.',
  },
  {
    icon: Sprout,
    title: 'Indicatori di sostenibilità',
    text: 'Report periodici su qualità dell\'aria, energia e impatto ambientale.',
  },
]

export default function HubDashboard() {
  const { logout } = useHubAuth()

  return (
    <div className="hub-dashboard">
      <header className="hub-dashboard__topbar">
        <Link to="/" className="hub-auth__brand hub-auth__brand--dark">
          <span className="hub-auth__brand-icon">
            <Leaf size={18} />
          </span>
          Enviria <span>Hub</span>
        </Link>
        <button type="button" className="btn btn-outline" onClick={logout}>
          <LogOut size={16} /> Esci
        </button>
      </header>

      <main className="container hub-dashboard__content">
        <div className="hub-dashboard__intro">
          <span className="eyebrow">Area riservata</span>
          <h1>Benvenuto nell'anteprima del Hub</h1>
          <p>
            Questa è una versione dimostrativa dell'area dati Enviria. I moduli qui sotto
            mostrano come sarà organizzato l'accesso ai dati dell'infrastruttura di ricerca
            Green ERI una volta collegate le fonti dati reali.
          </p>
        </div>

        <div className="grid grid-3">
          {modules.map(({ icon: Icon, title, text }) => (
            <article className="card hub-module" key={title}>
              <span className="hub-module__icon">
                <Icon size={20} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="hub-module__badge">Prossimamente</span>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
