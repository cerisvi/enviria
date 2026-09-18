import { useCallback, useState } from 'react'

const STORAGE_KEY = 'enviria-hub-demo-session'

function readSession(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'active'
  } catch {
    return false
  }
}

/**
 * Autenticazione dimostrativa lato client, senza backend reale.
 * Da sostituire con un vero provider di identità prima del go-live del Hub.
 */
export function useHubAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(readSession)

  const login = useCallback((email: string) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'active')
      sessionStorage.setItem(`${STORAGE_KEY}-email`, email)
    } catch {
      // storage non disponibile: la sessione resta solo in memoria
    }
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
      sessionStorage.removeItem(`${STORAGE_KEY}-email`)
    } catch {
      // no-op
    }
    setIsAuthenticated(false)
  }, [])

  return { isAuthenticated, login, logout }
}
