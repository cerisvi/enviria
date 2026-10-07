import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Progetto from './pages/Progetto'
import AiDataCenter from './pages/AiDataCenter'
import FilieraDelDato from './pages/FilieraDelDato'
import ChiSiamo from './pages/ChiSiamo'
import HubLogin from './pages/HubLogin'
import HubDashboard from './pages/HubDashboard'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isHubStandalone = pathname === '/hub' || pathname.startsWith('/hub/dashboard')

  return (
    <>
      <ScrollToTop />
      {!isHubStandalone && <Navbar />}
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/progetto" element={<Progetto />} />
          <Route path="/ai-data-center" element={<AiDataCenter />} />
          <Route path="/filiera-del-dato" element={<FilieraDelDato />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/hub" element={<HubLogin />} />
          <Route
            path="/hub/dashboard"
            element={
              <ProtectedRoute>
                <HubDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isHubStandalone && <Footer />}
    </>
  )
}
