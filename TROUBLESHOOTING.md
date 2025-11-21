# 🔧 Solución de Problemas Comunes

## 📹 Problemas con la Cámara

### ❌ Error: "Camera access denied" / "NotAllowedError"

**Causa:** El usuario denegó el permiso o el navegador bloqueó el acceso.

**Soluciones:**

1. **Verificar HTTPS:**
   - En producción, el sitio DEBE usar HTTPS
   - En desarrollo local, usa `localhost` o `127.0.0.1`
   - Netlify provee HTTPS automáticamente ✅

2. **Revisar permisos del navegador:**
   - Click en el candado (🔒) en la barra de direcciones
   - Verifica que "Cámara" esté en "Permitir"
   - Si está bloqueado, cambia a "Permitir" y recarga

3. **Limpiar permisos y volver a intentar:**
   - **Chrome:** Settings → Privacy → Site Settings → Camera → Buscar tu sitio → Remove
   - **Firefox:** about:preferences#privacy → Camera → Settings
   - Recarga la página y vuelve a otorgar permiso

4. **Probar en modo incógnito:**
   - Puede haber extensiones bloqueando el acceso
   - Modo incógnito desactiva extensiones

### ❌ Error: "NotFoundError" / "DevicesNotFoundError"

**Causa:** No se detectó ninguna cámara.

**Soluciones:**

1. Verifica que tu cámara esté conectada
2. Cierra otras aplicaciones que usen la cámara (Zoom, Teams, etc.)
3. En Windows: Verifica en Configuración → Privacidad → Cámara
4. Prueba con otra cámara si tienes disponible
5. Reinicia el navegador

### ❌ Error: "NotReadableError" / "TrackStartError"

**Causa:** La cámara está siendo usada por otra aplicación.

**Soluciones:**

1. Cierra todas las aplicaciones que puedan usar la cámara:
   - Zoom, Teams, Skype, OBS, etc.
2. Cierra otras pestañas del navegador que usen cámara
3. Reinicia el navegador
4. En último caso, reinicia el sistema

### ❌ Error: "OverconstrainedError"

**Causa:** La resolución o configuración solicitada no es soportada.

**Soluciones:**

1. La aplicación ya tiene fallback automático
2. Si persiste, verifica las capacidades de tu cámara:
   ```javascript
   navigator.mediaDevices.getSupportedConstraints()
   ```
3. Intenta con una cámara diferente

### ❌ Error: "SecurityError"

**Causa:** Problema de seguridad, usualmente falta HTTPS.

**Soluciones:**

1. **En desarrollo:** Usa `http://localhost:5173` (está permitido)
2. **En producción:** Asegúrate de usar HTTPS
3. Netlify provee HTTPS automáticamente
4. Verifica que no haya mixed content (HTTP en página HTTPS)

---

## 🌐 Problemas con la API

### ❌ Error: "Network Error" / "Failed to fetch"

**Causa:** No se puede conectar al backend.

**Soluciones:**

1. **Verifica que el backend esté activo:**
   - Abre: https://coach-virtual.onrender.com/api
   - Debe responder (aunque sea con error 404, significa que está activo)

2. **Verifica la variable de entorno:**
   ```javascript
   // En consola del navegador:
   console.log(import.meta.env.VITE_API_BASE_URL)
   // Debe mostrar: https://coach-virtual.onrender.com/api
   ```

3. **En Netlify, configura la variable:**
   - Site settings → Environment variables
   - Key: `VITE_API_BASE_URL`
   - Value: `https://coach-virtual.onrender.com/api`
   - Redeploy el sitio

4. **En desarrollo local, crea `.env`:**
   ```env
   VITE_API_BASE_URL=https://coach-virtual.onrender.com/api
   ```
   - Reinicia el servidor de desarrollo

### ❌ Error: "CORS" / "Access-Control-Allow-Origin"

**Causa:** El backend no permite peticiones desde tu dominio.

**Soluciones:**

1. **Configurar CORS en el backend Django:**
   ```python
   # settings.py
   CORS_ALLOWED_ORIGINS = [
       "http://localhost:5173",
       "https://tu-sitio.netlify.app",
   ]
   ```

2. **O permitir todos los orígenes (solo desarrollo):**
   ```python
   CORS_ALLOW_ALL_ORIGINS = True  # Solo para desarrollo
   ```

3. Verificar que `django-cors-headers` esté instalado en el backend

### ❌ Error: 401 Unauthorized

**Causa:** Token de autenticación inválido o expirado.

**Soluciones:**

1. **Cierra sesión y vuelve a iniciar:**
   - Puede que el token haya expirado

2. **Limpia localStorage:**
   ```javascript
   // En consola:
   localStorage.clear()
   location.reload()
   ```

3. **Verifica que el token se esté enviando:**
   - Abre DevTools → Network
   - Busca una petición a la API
   - Headers → Request Headers
   - Debe tener: `Authorization: Bearer [token]`

### ❌ Error: 500 Internal Server Error

**Causa:** Error en el backend.

**Soluciones:**

1. Verifica los logs del backend en Render.com
2. Puede ser un problema de base de datos
3. Contacta al administrador del backend

---

## 🧩 Problemas con MediaPipe

### ❌ Error: "Failed to load WASM"

**Causa:** No se pueden cargar los archivos WebAssembly.

**Soluciones:**

1. **Verifica tu conexión a internet:**
   - Los archivos se cargan desde CDN externo

2. **Revisa Content Security Policy:**
   - Ya está configurado en `netlify.toml`
   - Permite: `cdn.jsdelivr.net` y `storage.googleapis.com`

3. **Verifica en Network (DevTools):**
   - Busca peticiones a `.wasm` files
   - Deben responder con status 200
   - Si hay 404, puede ser problema de CDN

4. **Intenta con otro navegador:**
   - Algunos navegadores antiguos no soportan WASM

### ❌ Error: "Failed to create PoseLandmarker"

**Causa:** No se pudo inicializar MediaPipe.

**Soluciones:**

1. Recarga la página
2. Limpia cache del navegador
3. Verifica que tu navegador sea compatible:
   - Chrome 90+
   - Firefox 88+
   - Edge 90+
   - Safari 14+

---

## 🚀 Problemas de Performance

### ⚠️ La detección de poses es lenta

**Soluciones:**

1. **Reduce la resolución de la cámara:**
   - El código ya usa resoluciones optimizadas
   
2. **Usa modelo "lite" en lugar de "heavy":**
   - `pose_landmarker_lite.task` (más rápido)
   - `pose_landmarker_heavy.task` (más preciso pero lento)
   - Ya está configurado correctamente

3. **Cierra otras aplicaciones:**
   - MediaPipe consume GPU/CPU
   - Cierra tabs innecesarias del navegador

4. **Verifica tu hardware:**
   - Mínimo recomendado: i5/Ryzen 5, 8GB RAM
   - GPU dedicada mejora mucho el rendimiento

### ⚠️ El sitio carga muy lento

**Soluciones:**

1. **Verifica el tamaño del bundle:**
   ```bash
   npm run build
   # Revisa el tamaño en dist/
   ```

2. **Optimiza imágenes:**
   - Usa formatos modernos (WebP)
   - Comprime imágenes antes de subirlas

3. **Code splitting:**
   - Ya está configurado en `vite.config.js`
   - React.lazy() para componentes grandes

4. **CDN y Cache:**
   - Netlify tiene CDN automático
   - Los headers de cache ya están configurados

---

## 📱 Problemas en Móviles

### ❌ La cámara no funciona en móvil

**Soluciones:**

1. **Verifica HTTPS:**
   - Debe tener el candado (🔒)
   
2. **Safari en iOS puede ser problemático:**
   - Usa Chrome o Firefox en iOS si es posible
   - Safari requiere `playsinline` en video (ya incluido)

3. **Permisos en el sistema:**
   - iOS: Settings → Safari → Camera
   - Android: Settings → Apps → Chrome → Permissions

### ⚠️ Performance bajo en móvil

**Soluciones:**

1. **Reduce la resolución:**
   - En móviles se puede usar 640x480 en lugar de 1280x720

2. **Usa modelo "lite":**
   - Más rápido que "heavy"
   - Ya está configurado

3. **Cierra apps en segundo plano:**
   - MediaPipe consume recursos

---

## 🔄 Problemas de Routing

### ❌ Error 404 al recargar página (F5)

**Causa:** Netlify no está redirigiendo correctamente.

**Soluciones:**

1. **Verifica que existe `public/_redirects`:**
   ```
   /* /index.html 200
   ```

2. **O verifica `netlify.toml`:**
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Redeploy en Netlify:**
   - A veces se necesita un nuevo deploy

---

## 🔐 Problemas de Autenticación

### ❌ El login no funciona

**Soluciones:**

1. **Verifica credenciales:**
   - Usuario y contraseña correctos

2. **Revisa la consola:**
   - Busca errores de API

3. **Verifica que el backend esté activo:**
   - https://coach-virtual.onrender.com/api

4. **Limpia localStorage:**
   ```javascript
   localStorage.clear()
   location.reload()
   ```

### ❌ La sesión expira muy rápido

**Causa:** Token JWT con tiempo de expiración corto.

**Soluciones:**

1. La app ya tiene refresh token automático
2. Si persiste, contacta al administrador del backend
3. Verifica en DevTools → Application → Local Storage:
   - `access_token`
   - `refresh_token`

---

## 🛠️ Herramientas de Diagnóstico

### Consola del Navegador

```javascript
// Verificar variables de entorno
console.log(import.meta.env.VITE_API_BASE_URL)

// Verificar tokens
console.log(localStorage.getItem('access_token'))
console.log(localStorage.getItem('refresh_token'))

// Verificar soporte de cámara
console.log(navigator.mediaDevices)
console.log(navigator.mediaDevices.getSupportedConstraints())

// Listar cámaras disponibles
navigator.mediaDevices.enumerateDevices()
  .then(devices => console.log(devices.filter(d => d.kind === 'videoinput')))

// Verificar WebAssembly
console.log(typeof WebAssembly)
```

### Network Tab (DevTools)

1. Abre DevTools → Network
2. Filtra por "Fetch/XHR" para ver peticiones API
3. Filtra por "wasm" para ver archivos MediaPipe
4. Busca errores (status rojo)

### Application Tab (DevTools)

1. Local Storage → Verifica tokens
2. Cache Storage → Verifica archivos en cache
3. Clear all storage para resetear todo

---

## 📞 Obtener Ayuda

Si ninguna solución funciona:

1. **Revisa los logs:**
   - Consola del navegador (F12)
   - Netlify deploy logs
   - Backend logs en Render.com

2. **Información para reportar:**
   - Navegador y versión
   - Sistema operativo
   - Mensaje de error exacto
   - Pasos para reproducir
   - Screenshots si es posible

3. **Contacto:**
   - Abre un issue en GitHub
   - Incluye toda la información anterior

---

## ✅ Checklist de Diagnóstico Rápido

Cuando algo no funciona, verifica:

- [ ] ¿El sitio está en HTTPS? (🔒)
- [ ] ¿La consola muestra errores?
- [ ] ¿La variable `VITE_API_BASE_URL` está configurada?
- [ ] ¿El backend está activo?
- [ ] ¿Los tokens existen en localStorage?
- [ ] ¿La cámara funciona en otras apps?
- [ ] ¿El navegador está actualizado?
- [ ] ¿Probaste recargar la página?
- [ ] ¿Probaste limpiar cache?
- [ ] ¿Probaste en otro navegador?

Si todo lo anterior está OK y sigue sin funcionar, contacta soporte.
