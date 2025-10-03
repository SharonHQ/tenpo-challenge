# Guía de Inicio Rápido

Ejecuta la aplicación en 4 simples pasos:

## 1️⃣ Configurar Variables de Entorno (REQUERIDO)

```bash
# Copia el archivo de ejemplo
cp .env.example .env
```

**Importante:** Este paso es necesario. El archivo `.env` no está incluido en el repositorio por seguridad.

## 2️⃣ Instalar Dependencias

```bash
npm install
```

Esto instalará todos los paquetes requeridos incluyendo React, TypeScript, Tailwind, React Hook Form y más.

## 3️⃣ Iniciar Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 4️⃣ Iniciar Sesión y Explorar

1. Abre `http://localhost:5173` en tu navegador
2. Ingresa un email válido con mínimo 5 caracteres (ej., `user@test.com`)
3. Ingresa una contraseña con mínimo 6 caracteres (ej., `123456`)
4. El formulario te mostrará errores de validación en tiempo real
5. Haz clic en "Iniciar Sesión"
6. Navega por la lista virtualizada de 2000 elementos
7. Haz clic en "Cerrar Sesión" para volver al login

## ✨ Características Destacadas

- ⚡ **React Hook Form** - Validación de formularios sin re-renders
- 🎯 **Variables de Entorno** - Configuración centralizada y type-safe
- 🚀 **Optimizaciones React** - memo, useMemo, useCallback
- 📱 **Diseño Responsivo** - Funciona perfecto en móvil y desktop

¡Eso es todo! ¡Estás listo para comenzar! 🚀

---

Para documentación detallada, decisiones de arquitectura e instrucciones de despliegue, consulta [README.md](./README.md).
