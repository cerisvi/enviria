import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, type ReactElement } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Progetto from './pages/Progetto'
import AiDataCenter from './pages/AiDataCenter'
import FilieraDelDato from './pages/FilieraDelDato'
import Partner from './pages/Partner'
import News from './pages/News'
import ChiSiamo from './pages/ChiSiamo'
import GovernanceDetail from './pages/GovernanceDetail'
import Trasparenza from './pages/Trasparenza'
import AvvisiPubblici from './pages/AvvisiPubblici'
import AlboFornitori from './pages/AlboFornitori'
import LongListProfessionisti from './pages/LongListProfessionisti'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CookiePolicy from './pages/CookiePolicy'
import HubLogin from './pages/HubLogin'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// Ogni pagina pubblica è disponibile sia in italiano (percorso base) sia in
// inglese (stesso percorso prefissato da /en) — la pagina stessa decide cosa
// mostrare in base al prefisso tramite useLang(). /hub e /admin restano solo
// in italiano: sono strumenti interni, non contenuto pubblico da tradurre.
const publicRoutes: { path: string; element: ReactElement }[] = [
  { path: '/', element: <Home /> },
  { path: '/progetto', element: <Progetto /> },
  { path: '/ai-data-center', element: <AiDataCenter /> },
  { path: '/filiera-del-dato', element: <FilieraDelDato /> },
  { path: '/partner', element: <Partner /> },
  { path: '/news', element: <News /> },
  { path: '/chi-siamo', element: <ChiSiamo /> },
  { path: '/chi-siamo/governance/:slug', element: <GovernanceDetail /> },
  { path: '/trasparenza', element: <Trasparenza /> },
  { path: '/avvisi-pubblici', element: <AvvisiPubblici /> },
  { path: '/avvisi-pubblici/albo-fornitori', element: <AlboFornitori /> },
  { path: '/avvisi-pubblici/long-list-professionisti', element: <LongListProfessionisti /> },
  { path: '/privacy-policy', element: <PrivacyPolicy /> },
  { path: '/cookie-policy', element: <CookiePolicy /> },
]

export default function App() {
  const location = useLocation()
  const { pathname } = location
  const isHubStandalone = pathname === '/hub'
  const reduceMotion = useReducedMotion()

  return (
    <>
      <ScrollToTop />
      {!isHubStandalone && <Navbar />}
      <main className="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <Routes location={location}>
              {publicRoutes.map(({ path, element }) => (
                <Route key={`it${path}`} path={path} element={element} />
              ))}
              {publicRoutes.map(({ path, element }) => (
                <Route
                  key={`en${path}`}
                  path={path === '/' ? '/en' : `/en${path}`}
                  element={element}
                />
              ))}
              <Route path="/hub" element={<HubLogin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {!isHubStandalone && <Footer />}
    </>
  )
}
