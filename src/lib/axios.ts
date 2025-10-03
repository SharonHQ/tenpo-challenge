/**
 * Configuración de Axios
 * 
 * Este módulo configura una instancia de axios con:
 * - Interceptores de petición para agregar el token de autenticación a todas las peticiones
 * - Interceptores de respuesta para manejo de errores
 * - Configuración base para llamadas a la API
 * 
 * El token se agrega automáticamente a todas las peticiones, aunque
 * nuestra API pública no lo requiera. Esto demuestra cómo
 * configurar apropiadamente axios para llamadas API autenticadas.
 */

import axios from 'axios'
import { authService } from '@/services/authService'
import { env } from '@/config/env'

// Crear instancia de axios con configuración por defecto desde variables de entorno
export const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de petición para agregar token de autenticación
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken()
    
    if (token) {
      // Agregar encabezado de autorización con token Bearer
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de respuesta para manejo de errores
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Manejar escenarios comunes de error
    if (error.response) {
      // El servidor respondió con un estado de error
      const { status } = error.response
      
      if (status === 401) {
        // No autorizado - el token podría estar expirado
        // En una app real, esto activaría una redirección al login
        if (env.enableLogging) {
          console.error('No autorizado - Por favor inicia sesión nuevamente')
        }
      } else if (status === 403) {
        // Prohibido
        if (env.enableLogging) {
          console.error('Acceso prohibido')
        }
      } else if (status >= 500) {
        // Error del servidor
        if (env.enableLogging) {
          console.error('Error del servidor - Por favor intenta más tarde')
        }
      }
    } else if (error.request) {
      // Petición hecha pero no se recibió respuesta
      if (env.enableLogging) {
        console.error('Error de red - Por favor verifica tu conexión')
      }
    }
    
    return Promise.reject(error)
  }
)

