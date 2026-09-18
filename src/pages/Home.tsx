import { Link } from 'react-router-dom'
import { ArrowRight, Gauge, Leaf, Microscope, Radar, ShieldCheck, Sprout } from 'lucide-react'
import './Home.css'

const pillars = [
  {
    icon: Radar,
    title: 'Monitoraggio ambientale continuo',
    text: 'Reti di sensori e piattaforme dati per osservare in tempo reale la qualità ambientale ed energetica degli spazi monitorati.',
  },
  {
    icon: Microscope,
    title: 'Ricerca applicata',
    text: "Metodologie e strumenti sviluppati nell'ambito del progetto Green ERI, validati su casi reali con enti di ricerca e partner istituzionali.",
  },
  {
    icon: Sprout,
    title: 'Sostenibilità misurabile',
    text: 'Indicatori chiari per orientare decisioni su efficienza energetica, riduzione degli impatti e qualità degli ambienti costruiti.',
  },
]

const stats = [
  { value: 'Green ERI', label: 'Progetto di ricerca di origine' },
  { value: '100%', label: 'Dati ambientali ed energetici' },
  { value: '24/7', label: 'Monitoraggio continuo via Hub' },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">Nato dal progetto di ricerca Green ERI</span>
            <h1>
              L'infrastruttura di ricerca green per ambienti più sani e sostenibili
            </h1>
            <p className="hero__lead">
              Enviria Hub raccoglie e mette a sistema il lavoro dell'infrastruttura di ricerca
              Green ERI: monitoraggio ambientale, dati energetici e strumenti di analisi per
              chi progetta, gestisce e studia edifici e territori sostenibili.
            </p>
            <div className="hero__actions">
              <Link to="/contatti" className="btn btn-primary">
                Parla con noi <ArrowRight size={16} />
              </Link>
              <Link to="/chi-siamo" className="btn btn-outline">
                Scopri il progetto Green ERI
              </Link>
            </div>
          </div>

          <div className="hero__panel card">
            <div className="hero__panel-header">
              <Gauge size={18} />
              <span>Enviria Hub · anteprima</span>
            </div>
            <ul className="hero__metrics">
              <li>
                <span>Qualità dell'aria</span>
                <strong>Buona</strong>
              </li>
              <li>
                <span>Consumo energetico</span>
                <strong>-18% vs baseline</strong>
              </li>
              <li>
                <span>Sensori attivi</span>
                <strong>In espansione</strong>
              </li>
            </ul>
            <p className="hero__panel-note">
              Dati dimostrativi: l'integrazione con le reti di monitoraggio reali è in corso.
            </p>
          </div>
        </div>
      </section>

      <section className="section pillars">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Cosa facciamo</span>
            <h2>Dalla ricerca al monitoraggio quotidiano</h2>
            <p className="section-head__lead">
              Tre ambiti in cui l'esperienza maturata nel progetto Green ERI si traduce in
              strumenti concreti per la sostenibilità ambientale.
            </p>
          </div>

          <div className="grid grid-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <article className="card pillar-card" key={title}>
                <span className="pillar-card__icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight stats">
        <div className="container stats__inner">
          {stats.map((stat) => (
            <div className="stats__item" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section cta">
        <div className="container cta__inner card">
          <div className="cta__icon">
            <ShieldCheck size={26} />
          </div>
          <div className="cta__copy">
            <h2>Vuoi collaborare con Green ERI o accedere all'Hub?</h2>
            <p>
              Enti di ricerca, gestori di edifici e partner istituzionali possono richiedere
              l'accesso alla piattaforma dati Enviria o proporre una collaborazione.
            </p>
          </div>
          <div className="cta__actions">
            <Link to="/contatti" className="btn btn-primary">
              Richiedi informazioni
            </Link>
            <Link to="/hub" className="btn btn-outline">
              <Leaf size={16} /> Accedi al Hub
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
