import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useHubAuth } from '../hub/useHubAuth'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useHubAuth()

  if (!isAuthenticated) {
    return <Navigate to="/hub" replace />
  }

  return <>{children}</>
}
