# ✅ Checklist de Verificación Pre-Despliegue

## 🔍 Verificaciones Locales

### 1. Dependencias
- [ ] Todas las dependencias están instaladas (`npm install`)
- [ ] No hay vulnerabilidades críticas (`npm audit`)
- [ ] El archivo `package.json` tiene las versiones correctas

### 2. Variables de Entorno
- [ ] Existe el archivo `.env.example` con las variables necesarias
- [ ] `.env` está en `.gitignore` (✅ ya incluido)
- [ ] Las variables de entorno están documentadas

### 3. Build Local
```bash
npm run build
```
- [ ] El build se completa sin errores
- [ ] No hay warnings críticos
- [ ] El directorio `dist/` se genera correctamente
- [ ] El tamaño del bundle es razonable (< 2MB recomendado)

### 4. Preview Local
```bash
npm run preview
```
- [ ] La aplicación carga correctamente
- [ ] Todas las rutas funcionan
- [ ] El routing de React Router funciona correctamente
- [ ] Las imágenes y assets se cargan

### 5. Funcionalidad
- [ ] Login/Register funciona
- [ ] La API se conecta correctamente al backend
- [ ] El acceso a cámara funciona (requiere HTTPS en producción)
- [ ] La detección de poses funciona
- [ ] No hay errores en la consola del navegador

---

## 🌐 Configuración de Netlify

### 1. Archivos de Configuración
- [x] `netlify.toml` - Configurado con headers y build settings
- [x] `public/_redirects` - Configurado para SPA routing
- [x] `.env.example` - Documentación de variables

### 2. Repositorio Git
- [ ] Todo el código está commiteado
- [ ] El código está pusheado a GitHub/GitLab
- [ ] La rama principal es `main` o `master`

```bash
git add .
git commit -m "Configuración para despliegue en Netlify"
git push origin main
```

### 3. Cuenta de Netlify
- [ ] Cuenta creada en netlify.com
- [ ] Conectada con GitHub/GitLab
- [ ] Permisos de acceso al repositorio otorgados

### 4. Importar Proyecto en Netlify
1. [ ] Click en "Add new site" → "Import an existing project"
2. [ ] Seleccionar proveedor Git (GitHub/GitLab)
3. [ ] Seleccionar el repositorio `coachVirtualFrontend`
4. [ ] Verificar configuración de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20 (desde netlify.toml)

### 5. Variables de Entorno en Netlify
**CRÍTICO:** Configurar antes del primer deploy

1. [ ] Ir a: Site settings → Build & deploy → Environment variables
2. [ ] Agregar variable:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://coach-virtual.onrender.com/api`

⚠️ **IMPORTANTE:** Sin esta variable, la aplicación no se conectará al backend.

### 6. Deploy
- [ ] Click en "Deploy site"
- [ ] Esperar a que termine el build (2-5 minutos)
- [ ] Revisar logs de deploy en caso de errores

---

## 🧪 Verificaciones Post-Despliegue

### 1. URL y HTTPS
- [ ] El sitio tiene una URL de Netlify (*.netlify.app)
- [ ] HTTPS está habilitado (🔒 en la barra del navegador)
- [ ] El certificado SSL es válido

### 2. Funcionalidad Básica
- [ ] La página principal carga correctamente
- [ ] No hay error 404 en la página principal
- [ ] Los estilos se aplican correctamente (Tailwind CSS)
- [ ] Las imágenes y assets se cargan

### 3. Routing
- [ ] Navegar a diferentes páginas funciona
- [ ] Hacer F5 (refresh) en cualquier ruta NO muestra 404
- [ ] Los links internos funcionan
- [ ] El botón "atrás" del navegador funciona

### 4. API y Backend
Abrir DevTools (F12) → Console

- [ ] No hay errores de CORS
- [ ] Las peticiones a la API se completan
- [ ] El login/register funciona
- [ ] Los datos se cargan correctamente

```javascript
// Verificar en consola:
console.log(import.meta.env.VITE_API_BASE_URL);
// Debe mostrar: https://coach-virtual.onrender.com/api
```

### 5. Acceso a Cámara
**CRUCIAL:** Requiere HTTPS

- [ ] Ir a una página con detección de poses
- [ ] El navegador pide permiso para acceder a la cámara
- [ ] Click en "Permitir"
- [ ] La cámara se activa correctamente
- [ ] La detección de poses funciona
- [ ] No hay errores en la consola

**Errores comunes:**
- ❌ "Camera access denied" → Verificar permisos del navegador
- ❌ "getUserMedia is not defined" → Verificar que sea HTTPS
- ❌ "NotAllowedError" → Usuario denegó el permiso

### 6. MediaPipe y WASM
- [ ] Los modelos de MediaPipe se cargan desde el CDN
- [ ] Los archivos WASM se cargan correctamente
- [ ] No hay errores 404 para archivos .wasm
- [ ] La detección de poses responde en tiempo real

### 7. Performance
Abrir DevTools → Network

- [ ] Tiempo de carga inicial < 5 segundos
- [ ] Los archivos estáticos tienen cache headers
- [ ] Las imágenes están optimizadas
- [ ] No hay recursos bloqueantes

### 8. Consola del Navegador
Abrir DevTools (F12) → Console

- [ ] No hay errores en rojo
- [ ] Los warnings (amarillo) son aceptables
- [ ] No hay errores de recursos no encontrados (404)

### 9. Responsive Design
Probar en:
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Rotación en móvil

### 10. Navegadores
Probar en al menos 2:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (si disponible)

---

## 🔧 Verificación de Headers de Seguridad

Usar herramientas online:
- https://securityheaders.com
- https://observatory.mozilla.org

Headers esperados:
- [ ] `Strict-Transport-Security` (HSTS)
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `Permissions-Policy` con `camera=(self)`
- [ ] `Content-Security-Policy` configurado

---

## 📊 Monitoreo Post-Despliegue

### Primeros 15 minutos
- [ ] Revisar logs de Netlify
- [ ] Monitorear errores en consola
- [ ] Probar funcionalidad principal

### Primera hora
- [ ] Verificar que no haya errores 500
- [ ] Confirmar que la API responde
- [ ] Verificar que usuarios puedan registrarse/login

### Primer día
- [ ] Revisar analytics de Netlify
- [ ] Verificar tiempo de respuesta
- [ ] Revisar feedback de usuarios beta

---

## 🚨 Plan de Rollback

En caso de problemas críticos:

### Opción 1: Rollback en Netlify
1. Ir a **Deploys** en Netlify
2. Seleccionar un deploy anterior que funcionaba
3. Click en **"Publish deploy"**

### Opción 2: Revertir en Git
```bash
git revert HEAD
git push origin main
# Netlify hará auto-deploy del commit anterior
```

### Opción 3: Desactivar sitio temporalmente
1. Site settings → General → Stop auto publishing
2. Investigar y arreglar el problema
3. Reactivar cuando esté listo

---

## 📝 Documentación Post-Despliegue

- [ ] Documentar la URL de producción
- [ ] Actualizar README con URL del sitio
- [ ] Guardar credenciales de Netlify en lugar seguro
- [ ] Documentar cualquier problema encontrado
- [ ] Crear guía de usuario si es necesario

---

## ✅ Confirmación Final

Una vez completadas todas las verificaciones:

- [ ] El sitio está 100% funcional en producción
- [ ] Todas las features críticas funcionan
- [ ] No hay errores en consola
- [ ] El acceso a cámara funciona
- [ ] La API se conecta correctamente
- [ ] El performance es aceptable
- [ ] HTTPS está activo y funcional

---

**🎉 ¡Despliegue Exitoso!**

URL de producción: `https://[tu-sitio].netlify.app`

Fecha de despliegue: __________

Notas adicionales:
___________________________________
___________________________________
___________________________________
