/**
 * Servicio de API
 * 
 * Maneja la obtención de datos de APIs públicas.
 * Usando JSONPlaceholder API que provee 5000 posts - obtendremos 2000.
 * 
 * Todas las peticiones incluyen automáticamente el token de autenticación vía interceptores de axios.
 */

import { axiosInstance } from '@/lib/axios'
import { env } from '@/config/env'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

/**
 * Obtiene una lista grande de posts de la API JSONPlaceholder
 * Obtenemos 2000 elementos haciendo múltiples peticiones si es necesario,
 * o usando los posts disponibles y duplicándolos para alcanzar 2000 elementos.
 */
export const apiService = {
  getPosts: async (): Promise<Post[]> => {
    try {
      // JSONPlaceholder tiene 100 posts, los obtenemos y duplicamos para llegar a 2000
      // La URL base se configura en axios desde variables de entorno
      const response = await axiosInstance.get<Post[]>('/posts')
      
      const originalPosts = response.data
      const posts: Post[] = []
      
      // Duplicar posts para alcanzar 2000 elementos
      for (let i = 0; i < 20; i++) {
        originalPosts.forEach((post, index) => {
          posts.push({
            ...post,
            id: i * 100 + index + 1, // Asegurar IDs únicos
          })
        })
      }
      
      return posts
    } catch (error) {
      if (env.enableLogging) {
        console.error('Error al obtener posts:', error)
      }
      throw error
    }
  },
}

