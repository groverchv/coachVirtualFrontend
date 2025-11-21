# 🚀 Guía de Despliegue en Netlify - Coach Virtual

## ✅ Archivos de Configuración Creados

Se han creado los siguientes archivos para asegurar que tu aplicación funcione correctamente en Netlify:

1. **`netlify.toml`** - Configuración principal de Netlify con:
   - Headers de seguridad para acceso a cámara (Permissions-Policy)
   - Forzado de HTTPS (necesario para cámara)
   - Content Security Policy optimizada
   - Cache control para assets estáticos
   - Redirects para SPA routing

2. **`.env.example`** - Plantilla de variables de entorno
3. **`public/_redirects`** - Actualizado para manejar rutas de React Router
4. **`index.html`** - Mejorado con metadatos de seguridad y permisos
5. **`vite.config.js`** - Optimizado para producción

---

## 📋 Pasos para Desplegar en Netlify

### 1. Preparar el Repositorio

```bash
# Asegúrate de que todos los cambios estén confirmados
git add .
git commit -m "Configuración para despliegue en Netlify"
git push origin main
```

### 2. Crear Cuenta en Netlify

1. Ve a [netlify.com](https://www.netlify.com/)
2. Regístrate con GitHub (recomendado)

### 3. Importar el Proyecto

1. Click en **"Add new site"** → **"Import an existing project"**
2. Selecciona **GitHub** como proveedor
3. Autoriza a Netlify para acceder a tus repositorios
4. Selecciona el repositorio `coachVirtualFrontend`

### 4. Configurar Build Settings

Netlify debería detectar automáticamente la configuración desde `netlify.toml`, pero verifica:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20 (se configura automáticamente desde netlify.toml)

### 5. Configurar Variables de Entorno

**MUY IMPORTANTE:** Antes de desplegar, ve a:

1. **Site settings** → **Build & deploy** → **Environment variables**
2. Click en **"Add a variable"**
3. Agrega:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://coach-virtual.onrender.com/api`

> ⚠️ **Nota:** Las variables de entorno en Vite deben empezar con `VITE_` para ser accesibles en el cliente.

### 6. Deploy

1. Click en **"Deploy site"**
2. Espera a que termine el build (2-5 minutos)
3. Una vez completado, obtendrás una URL temporal como `random-name-123456.netlify.app`

### 7. Configurar Dominio Personalizado (Opcional)

1. Ve a **Site settings** → **Domain management**
2. Click en **"Add custom domain"**
3. Sigue las instrucciones para configurar tu dominio

---

## 🔐 Requisitos Importantes para Acceso a Cámara

### HTTPS es Obligatorio

Los navegadores modernos **solo permiten acceso a la cámara en sitios HTTPS**. Netlify proporciona HTTPS automáticamente:

- ✅ Tu sitio en Netlify tendrá HTTPS habilitado por defecto
- ✅ Los headers de seguridad están configurados en `netlify.toml`
- ✅ Los permisos de cámara están declarados en `index.html`

### Permisos del Navegador

Cuando un usuario visite tu sitio por primera vez:
1. El navegador pedirá permiso para acceder a la cámara
2. El usuario debe hacer click en **"Permitir"**
3. Este permiso se guarda para futuras visitas

---

## 🧪 Verificar que Todo Funciona

Después del despliegue, verifica:

### 1. Acceso a la API
- Abre la consola del navegador (F12)
- Ve a la sección de tu app que hace llamadas a la API
- Verifica que no haya errores de CORS o conexión

### 2. Acceso a Cámara
- Ve a cualquier página que use la cámara (detección de poses, yoga, etc.)
- El navegador debe pedir permiso
- La cámara debe activarse correctamente

### 3. Rutas de React Router
- Navega por diferentes páginas de tu app
- Actualiza la página (F5) en cualquier ruta
- La página debe cargar correctamente (no debe mostrar "404 Not Found")

### 4. MediaPipe y WASM
- Verifica que los archivos WASM se carguen desde el CDN
- No debe haber errores de carga de modelos en la consola

---

## 🐛 Solución de Problemas Comunes

### Error: "Camera access denied"
- Verifica que el sitio use HTTPS
- Revisa los permisos del navegador en la barra de direcciones
- Algunos navegadores bloquean cámara en modo incógnito

### Error: "Failed to load WASM files"
- Verifica tu conexión a Internet
- Los archivos WASM se cargan desde CDN externo
- Revisa la consola para errores específicos

### Error: "API connection failed"
- Verifica que `VITE_API_BASE_URL` esté configurado en Netlify
- Asegúrate de que el backend en Render.com esté activo
- Revisa que el backend tenga CORS configurado correctamente

### Error: "404 on page refresh"
- Verifica que `public/_redirects` exista
- Asegúrate de que el archivo contenga: `/* /index.html 200`
- Puede que necesites hacer un nuevo deploy

### Build fails en Netlify
```bash
# Si el build falla, verifica en logs de Netlify
# Errores comunes:
- Dependencias faltantes → Ejecuta: npm install
- Node version incorrecta → Verifica netlify.toml
- ESLint errors → Temporalmente desactiva con: npm run build -- --no-lint
```

---

## 📊 Monitoreo del Sitio

### Ver Logs de Deploy
1. Ve a **Deploys** en tu dashboard de Netlify
2. Click en el último deploy
3. Revisa los logs para errores

### Analytics (Opcional)
1. Activa Netlify Analytics en **Site settings** → **Analytics**
2. Monitorea tráfico y errores 404

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas push a tu repositorio de GitHub:
1. Netlify detectará los cambios automáticamente
2. Iniciará un nuevo build
3. Si el build es exitoso, desplegará automáticamente

Para desactivar auto-deploy:
- Ve a **Site settings** → **Build & deploy** → **Continuous deployment**
- Cambia la configuración según tus necesidades

---

## 📝 Checklist Final

Antes de considerar el despliegue completo:

- [ ] El sitio carga correctamente en HTTPS
- [ ] La cámara funciona en páginas de detección de poses
- [ ] La API se conecta correctamente al backend
- [ ] Todas las rutas funcionan (incluso al refrescar)
- [ ] No hay errores en la consola del navegador
- [ ] MediaPipe carga los modelos correctamente
- [ ] El diseño se ve bien en móvil y escritorio
- [ ] Variables de entorno configuradas en Netlify

---

## 🆘 Soporte Adicional

Si necesitas ayuda:
- Documentación de Netlify: https://docs.netlify.com/
- Documentación de Vite: https://vitejs.dev/
- MediaPipe: https://developers.google.com/mediapipe

---

**¡Tu aplicación está lista para producción! 🎉**
