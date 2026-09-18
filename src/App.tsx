import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
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
          <Route path="/chi-siamo" element={<About />} />
          <Route path="/servizi" element={<Services />} />
          <Route path="/contatti" element={<Contact />} />
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
