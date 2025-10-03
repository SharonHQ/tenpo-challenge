/**
 * Configuración de Variables de Entorno
 * 
 * Este módulo centraliza el acceso a las variables de entorno,
 * proporciona validación y valores por defecto.
 * 
 * Las variables de entorno en Vite deben comenzar con VITE_ para
 * ser expuestas al cliente.
 */

interface EnvConfig {
  apiBaseUrl: string
  appName: string
  appVersion: string
  enableLogging: boolean
  apiTimeout: number
  isDevelopment: boolean
  isProduction: boolean
}

/**
 * Obtiene una variable de entorno con validación
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key]
  
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    console.warn(`Variable de entorno ${key} no definida`)
    return ''
  }
  
  return value
}

/**
 * Obtiene una variable de entorno booleana
 */
function getBooleanEnvVar(key: string, defaultValue: boolean): boolean {
  const value = import.meta.env[key]
  
  if (value === undefined) {
    return defaultValue
  }
  
  return value === 'true' || value === true
}

/**
 * Obtiene una variable de entorno numérica
 */
function getNumberEnvVar(key: string, defaultValue: number): number {
  const value = import.meta.env[key]
  
  if (value === undefined) {
    return defaultValue
  }
  
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? defaultValue : parsed
}

/**
 * Configuración de la aplicación basada en variables de entorno
 */
export const env: EnvConfig = {
  // API Configuration
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'https://jsonplaceholder.typicode.com'),
  
  // App Configuration
  appName: getEnvVar('VITE_APP_NAME', 'Tenpo Challenge'),
  appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  
  // Feature Flags
  enableLogging: getBooleanEnvVar('VITE_ENABLE_LOGGING', true),
  
  // Timeouts
  apiTimeout: getNumberEnvVar('VITE_API_TIMEOUT', 30000),
  
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
}

/**
 * Valida que todas las variables de entorno requeridas estén presentes
 */
export function validateEnv(): void {
  const requiredVars = [
    'VITE_API_BASE_URL',
  ]
  
  const missing = requiredVars.filter(
    (key) => !import.meta.env[key]
  )
  
  if (missing.length > 0) {
    console.error(
      `Variables de entorno faltantes: ${missing.join(', ')}\n` +
      'Por favor copia .env.example a .env y configura las variables.'
    )
  }
}

// Validar en desarrollo
if (env.isDevelopment) {
  validateEnv()
}

// Log de configuración en desarrollo
if (env.isDevelopment && env.enableLogging) {
  console.log('🔧 Configuración de la aplicación:', {
    apiBaseUrl: env.apiBaseUrl,
    appName: env.appName,
    appVersion: env.appVersion,
    environment: env.isDevelopment ? 'development' : 'production',
  })
}

