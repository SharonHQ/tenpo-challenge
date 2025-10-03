/**
 * Componente ProtectedRoute
 * 
 * Componente que envuelve las rutas que requieren autenticación.
 * Redirige al login si el usuario no está autenticado.
 * 
 * Uso:
 * <ProtectedRoute>
 *   <ComponentePrivado />
 * </ProtectedRoute>
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ReactNode, memo } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

// Componente de loading memorizado para evitar re-renderizados
const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-dark-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 shadow-lg shadow-primary-500/50"></div>
  </div>
))

LoadingSpinner.displayName = 'LoadingSpinner'

export const ProtectedRoute = memo(({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
})

ProtectedRoute.displayName = 'ProtectedRoute'

