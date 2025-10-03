import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { authService } from '@/services/authService'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Inicializar estado de autenticación desde localStorage al montar
  useEffect(() => {
    const storedToken = authService.getToken()
    if (storedToken) {
      setToken(storedToken)
    }
    setLoading(false)
  }, [])

  // Memoriza función de login para evitar recreación en cada render
  const login = useCallback(async (email: string, password: string) => {
    const authToken = await authService.login(email, password)
    setToken(authToken)
  }, [])

  // Memoriza función de logout para evitar recreación en cada render
  const logout = useCallback(() => {
    authService.logout()
    setToken(null)
  }, [])

  // Memoriza el valor del contexto para evitar re-renders innecesarios
  const value = useMemo(
    () => ({
      isAuthenticated: !!token,
      token,
      login,
      logout,
      loading,
    }),
    [token, login, logout, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

