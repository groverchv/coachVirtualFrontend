# 🏋️ Coach Virtual - Frontend

Aplicación web de entrenamiento virtual con detección de poses en tiempo real usando IA y MediaPipe.

## 🚀 Tecnologías

- **React 19** - Framework UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **Axios** - Cliente HTTP
- **MediaPipe** - Detección de poses con IA
- **TensorFlow.js** - Machine Learning

## 📋 Requisitos Previos

- Node.js 20 o superior
- npm o pnpm
- Cámara web (para funciones de detección de poses)

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/groverchv/coachVirtualFrontend.git
cd coachvirtualfront

# Instalar dependencias
npm install
# o
pnpm install

# Copiar el archivo de variables de entorno
cp .env.example .env

# Editar .env y configurar la URL del backend
# VITE_API_BASE_URL=https://coach-virtual.onrender.com/api
```

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://coach-virtual.onrender.com/api
```

Para desarrollo local con backend local:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

## 🏗️ Build para Producción

```bash
# Crear build optimizado
npm run build

# Preview del build
npm run preview
```

## 📦 Despliegue en Netlify

**Ver guía completa:** [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)

### Pasos rápidos:

1. **Conecta tu repositorio** en Netlify
2. **Configura variables de entorno** en Netlify:
   - `VITE_API_BASE_URL` = `https://coach-virtual.onrender.com/api`
3. **Deploy automático** - La configuración en `netlify.toml` ya está lista

### Archivos de configuración incluidos:

- ✅ `netlify.toml` - Configuración de build y headers de seguridad
- ✅ `public/_redirects` - Routing para SPA
- ✅ `.env.example` - Plantilla de variables de entorno

## 🎥 Características Principales

### Detección de Poses en Tiempo Real
- **MediaPipe Pose Landmarker** - Detección precisa de 33 puntos clave del cuerpo
- **Feedback en tiempo real** - Validación de posturas y ejercicios
- **Soporte para múltiples ejercicios:**
  - Flexiones
  - Sentadillas
  - Curl de bíceps
  - Plancha
  - Yoga (múltiples poses)
  - Y más...

### Gestión de Rutinas
- Crear rutinas personalizadas
- Rutinas generadas por IA
- Seguimiento de progreso
- Historial de entrenamientos

### Sistema de Usuarios
- Autenticación JWT
- Perfiles de usuario
- Niveles de acceso (Usuario/Coach)
- Planes de suscripción

## 🔒 Seguridad

### HTTPS Requerido
El acceso a la cámara requiere HTTPS. En desarrollo local, `localhost` está permitido. En producción, Netlify proporciona HTTPS automáticamente.

### Permisos de Cámara
Los usuarios deben autorizar el acceso a la cámara. Los permisos se gestionan a través de:
- Headers `Permissions-Policy` 
- API `navigator.mediaDevices.getUserMedia()`

### Content Security Policy
Headers configurados en `netlify.toml` para permitir:
- Scripts de MediaPipe desde CDN
- Modelos ML desde Google Cloud Storage
- Conexiones al backend API

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+ (con limitaciones en iOS)
- ❌ Internet Explorer (no soportado)

### Dispositivos
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablets
- ⚠️ Móviles (funcionalidad reducida por rendimiento)

## 🐛 Solución de Problemas

### Error: "Camera access denied"
- Verifica que estés usando HTTPS (o localhost)
- Revisa los permisos del navegador
- Algunos navegadores bloquean cámara en modo incógnito

### Error: "Failed to load WASM files"
- Verifica tu conexión a Internet
- Los archivos se cargan desde CDN externo
- Revisa la consola del navegador para errores específicos

### Error: "API connection failed"
- Verifica que `VITE_API_BASE_URL` esté configurado
- Asegúrate de que el backend esté activo
- Revisa CORS en el backend

### Build fails
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install

# O con pnpm
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📂 Estructura del Proyecto

```
coachvirtualfront/
├── public/
│   ├── _redirects          # Netlify redirects
│   └── sounds/             # Archivos de audio
├── src/
│   ├── api/                # Configuración de API y servicios
│   ├── auth/               # Autenticación
│   ├── components/         # Componentes reutilizables
│   ├── context/            # React Context
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Detector/       # Detección de poses
│   │   ├── Yoga/           # Poses de yoga
│   │   ├── Ejercicios/     # Ejercicios individuales
│   │   └── ...
│   ├── routes/             # Configuración de rutas
│   ├── services/           # Servicios de API
│   ├── utils/              # Utilidades
│   │   ├── cameraUtils.js  # Manejo de cámara
│   │   ├── poseUtils.js    # Cálculos de poses
│   │   └── ...
│   └── main.jsx            # Entry point
├── .env.example            # Variables de entorno ejemplo
├── netlify.toml            # Configuración de Netlify
├── package.json
├── vite.config.js          # Configuración de Vite
└── tailwind.config.js      # Configuración de Tailwind
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y de uso exclusivo para fines educativos.

## 👥 Autores

- **groverchv** - [GitHub](https://github.com/groverchv)

## 🙏 Agradecimientos

- MediaPipe por la tecnología de detección de poses
- Google por los modelos de ML
- Comunidad de React y Vite

---

**¿Necesitas ayuda?** Abre un issue en el repositorio.
