/**
 * Componente PublicRoute
 * 
 * Componente que envuelve las rutas que solo deben ser accesibles cuando NO está autenticado.
 * Redirige al home si el usuario ya está autenticado.
 * 
 * Esto previene que usuarios autenticados accedan a páginas de login/registro.
 * 
 * Uso:
 * <PublicRoute>
 *   <LoginPage />
 * </PublicRoute>
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ReactNode, memo } from 'react'

interface PublicRouteProps {
  children: ReactNode
}

// Componente de loading memorizado para evitar re-renderizados
const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-dark-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 shadow-lg shadow-primary-500/50"></div>
  </div>
))

LoadingSpinner.displayName = 'LoadingSpinner'

export const PublicRoute = memo(({ children }: PublicRouteProps) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
})

PublicRoute.displayName = 'PublicRoute'

