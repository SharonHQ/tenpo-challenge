/**
 * Servicio de Autenticación
 * 
 * Maneja operaciones de autenticación incluyendo:
 * - Login simulado con validación de email/contraseña
 * - Almacenamiento de token en localStorage (para persistencia entre sesiones)
 * - Recuperación y eliminación de token
 * 
 * Estrategia de Almacenamiento de Token:
 * Usamos localStorage para persistir el token de autenticación. Esto permite:
 * - Persistencia de sesión entre recargas del navegador
 * - Implementación simple adecuada para esta demo
 * 
 * Para producción, considerar:
 * - HttpOnly cookies para mejor seguridad (previene ataques XSS)
 * - Tokens de acceso de corta duración con tokens de actualización
 * - Mecanismos seguros de almacenamiento de tokens
 */

const TOKEN_KEY = 'auth_token'
const FAKE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.fake-signature'

export const authService = {
  /**
   * Implementación de login simulado
   * Valida formato básico de email y contraseña no vacía
   * Retorna un token JWT simulado en caso de éxito
   */
  login: async (email: string, password: string): Promise<string> => {
    // Simular retraso de llamada API
    await new Promise(resolve => setTimeout(resolve, 800))

    // Validación básica
    if (!email || !password) {
      throw new Error('El email y la contraseña son requeridos')
    }

    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('Formato de email inválido')
    }

    // Simular login exitoso
    localStorage.setItem(TOKEN_KEY, FAKE_TOKEN)
    return FAKE_TOKEN
  },

  /**
   * Recupera el token de autenticación almacenado
   */
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY)
  },

  /**
   * Elimina el token de autenticación (logout)
   */
  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY)
  },
}

