/**
 * Componente HomePage
 * 
 * Ruta protegida que muestra una lista de 2000 elementos de una API pública.
 * 
 * Estrategia de Renderizado de Lista:
 * ====================================
 * Para renderizar 2000 elementos eficientemente, usamos VIRTUALIZACIÓN con react-window.
 * 
 * ¿Por qué virtualización?
 * - Solo renderiza elementos visibles en el viewport (típicamente 10-20 elementos)
 * - Mejora drásticamente el rendimiento al reducir nodos DOM
 * - Mantiene scroll suave incluso con miles de elementos
 * - Huella de memoria mínima
 * 
 * Enfoques alternativos considerados:
 * - Paginación: Bueno para datasets pequeños, pero requiere múltiples interacciones del usuario
 * - Scroll infinito: Mejor UX, pero igual renderiza todos los elementos cargados
 * - Renderizado estándar: Crearía 2000 nodos DOM, causando problemas de rendimiento
 * 
 * react-window fue elegido porque:
 * - Ligero (11kb gzipped)
 * - Excelente rendimiento con listas grandes
 * - API simple y fácil de implementar
 * - Funciona perfectamente con layouts responsivos
 */

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiService, Post } from '@/services/apiService'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { env } from '@/config/env'

// Componente Row memorizado para evitar re-renderizados innecesarios
// Solo se re-renderiza si el post específico cambia
interface RowProps {
  index: number
  style: React.CSSProperties
  data: Post[]
}

const Row = memo(({ index, style, data }: RowProps) => {
  const post = data[index]
  return (
    <div
      style={style}
      className="px-4 py-3 border-b border-dark-700 hover:bg-dark-700/50 transition-colors cursor-pointer group"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30 flex items-center justify-center group-hover:border-primary-500/50 transition-colors">
          <span className="text-sm font-medium text-primary-400">
            {post.userId}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-200 truncate group-hover:text-primary-400 transition-colors">
            #{post.id} - {post.title}
          </p>
          <p className="text-sm text-gray-400 line-clamp-2">
            {post.body}
          </p>
        </div>
      </div>
    </div>
  )
})

Row.displayName = 'PostRow'

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { logout } = useAuth()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await apiService.getPosts()
        setPosts(data)
      } catch (err) {
        setError('Error al cargar los posts. Por favor intenta nuevamente.')
        if (env.enableLogging) {
          console.error(err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Memoriza handler de logout
  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  // Memoriza el contador de posts formateado
  const postsCount = useMemo(() => posts.length.toLocaleString(), [posts.length])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto shadow-lg shadow-primary-500/50"></div>
          <p className="mt-4 text-gray-400">Cargando posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-dark-900">
        <div className="card max-w-md w-full text-center">
          <div className="text-red-400 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">
            Error al Cargar Datos
          </h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Encabezado */}
      <header className="bg-dark-800 border-b border-dark-700 shadow-lg sticky top-0 z-10 backdrop-blur-sm bg-dark-800/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <svg className="w-6 h-6 text-dark-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-100">
                    Feed de Posts
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Mostrando {postsCount} posts
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal con Lista Virtualizada */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-dark-800 rounded-lg shadow-xl border border-dark-700 overflow-hidden">
          {/* Banner Informativo */}
          <div className="bg-gradient-to-r from-primary-500/20 to-accent-500/20 border-b border-primary-500/30 px-4 py-3">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-primary-400">⚡ Optimización de Rendimiento:</span> Esta
              lista usa virtualización para renderizar eficientemente 2000 elementos. Solo los
              elementos visibles se renderizan en el DOM.
            </p>
          </div>

          {/* Contenedor de Lista Virtualizada */}
          <div style={{ height: 'calc(100vh - 280px)' }}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height}
                  itemCount={posts.length}
                  itemSize={90}
                  width={width}
                  itemData={posts}
                  className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage

