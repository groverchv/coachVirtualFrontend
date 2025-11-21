# 🚀 INICIO RÁPIDO - Coach Virtual

## 📌 Lo Esencial en 5 Minutos

### ✅ Verificar que Todo Está Listo

Tu proyecto ya está **100% configurado** para Netlify. Solo necesitas:

1. **Variables de entorno** en Netlify
2. **Push** a GitHub
3. **Deploy** en Netlify

---

## 🏃 Deploy Rápido (Para Usuarios Avanzados)

```bash
# 1. Commit todos los cambios
git add .
git commit -m "Configuración completa para Netlify"
git push origin main

# 2. Ve a netlify.com
# 3. Import project → Selecciona tu repo
# 4. Configura variable de entorno:
#    VITE_API_BASE_URL = https://coach-virtual.onrender.com/api
# 5. Deploy!
```

**Eso es todo.** 🎉

---

## 📚 Guías Detalladas (Si Necesitas Ayuda)

| Documento | Cuándo Leerlo |
|-----------|---------------|
| **RESUMEN_CONFIGURACION.md** | 📖 Lee PRIMERO - Visión general completa |
| **DEPLOY_NETLIFY.md** | 🚀 Guía paso a paso para desplegar |
| **CHECKLIST_DEPLOY.md** | ✅ Checklist de verificación completo |
| **TROUBLESHOOTING.md** | 🔧 Si algo no funciona |
| **HTTPS_LOCAL.md** | 🔐 Si necesitas HTTPS en desarrollo local |

---

## ⚡ Desarrollo Local

```bash
# Instalar dependencias (solo primera vez)
npm install

# Crear archivo .env (solo primera vez)
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

**URL:** http://localhost:5173

---

## 🎯 Variables de Entorno

### En Desarrollo Local (archivo `.env`)
```env
VITE_API_BASE_URL=https://coach-virtual.onrender.com/api
```

### En Producción Netlify
```
Site Settings → Environment Variables → Add Variable

Key: VITE_API_BASE_URL
Value: https://coach-virtual.onrender.com/api
```

**⚠️ IMPORTANTE:** Sin esto, la API no funcionará.

---

## 🔍 Verificación Rápida

### ¿El build funciona?
```bash
npm run build
```
✅ Debe completarse sin errores

### ¿El preview funciona?
```bash
npm run preview
```
✅ Debe cargar en http://localhost:4173

### ¿Todo está commiteado?
```bash
git status
```
✅ No debe haber cambios sin commit

---

## 🎬 Flujo de Deploy en Netlify

### Primera Vez

1. **Crear cuenta** en [netlify.com](https://netlify.com)
2. **Conectar GitHub**
3. **Import project** → Selecciona tu repo
4. **Build settings** (se detectan automáticamente desde `netlify.toml`)
5. **Environment variables** → Agregar `VITE_API_BASE_URL`
6. **Deploy!**

### Actualizaciones Futuras

```bash
git add .
git commit -m "Tu mensaje"
git push origin main
```

Netlify hace **auto-deploy automáticamente** ✨

---

## ⚠️ Puntos Críticos

### 1. HTTPS es Obligatorio
- Netlify lo provee **automáticamente** ✅
- Necesario para acceso a cámara

### 2. Variable de Entorno
```
VITE_API_BASE_URL=https://coach-virtual.onrender.com/api
```
**DEBE** estar configurada en Netlify

### 3. Headers de Seguridad
Ya están en `netlify.toml` ✅

### 4. Redirects para SPA
Ya están en `public/_redirects` ✅

---

## 🐛 Problemas Comunes

### ❌ La cámara no funciona
1. Verifica HTTPS (🔒 en barra de direcciones)
2. Permite permisos en el navegador
3. Consulta: `TROUBLESHOOTING.md`

### ❌ Error de conexión a API
1. Verifica variable `VITE_API_BASE_URL` en Netlify
2. Verifica que el backend esté activo
3. Consulta: `TROUBLESHOOTING.md`

### ❌ 404 al recargar página
1. Verifica que existe `public/_redirects`
2. Redeploy en Netlify
3. Consulta: `TROUBLESHOOTING.md`

---

## 📊 Estado del Proyecto

### ✅ Archivos de Configuración
- [x] `netlify.toml` - Configuración de Netlify
- [x] `.env.example` - Template de variables
- [x] `public/_redirects` - SPA routing
- [x] `vite.config.js` - Optimización de build
- [x] `index.html` - Meta tags de seguridad

### ✅ Utilidades
- [x] `src/utils/cameraUtils.js` - Manejo de cámara robusto

### ✅ Componentes Actualizados
- [x] `PoseDetector.jsx` - Mejor manejo de errores
- [x] `YogaPoseDetector.jsx` - Mejor manejo de errores

### ✅ Documentación
- [x] `README.md` - Documentación principal
- [x] `DEPLOY_NETLIFY.md` - Guía de despliegue
- [x] `CHECKLIST_DEPLOY.md` - Checklist completo
- [x] `TROUBLESHOOTING.md` - Solución de problemas
- [x] `HTTPS_LOCAL.md` - HTTPS en desarrollo
- [x] `RESUMEN_CONFIGURACION.md` - Resumen completo
- [x] `INICIO_RAPIDO.md` - Este archivo

---

## 🎓 Orden Recomendado de Lectura

### Si es tu Primera Vez con Netlify
1. `INICIO_RAPIDO.md` (este archivo) ← **Estás aquí**
2. `RESUMEN_CONFIGURACION.md` (visión general)
3. `DEPLOY_NETLIFY.md` (guía paso a paso)
4. `CHECKLIST_DEPLOY.md` (mientras despliegas)

### Si Algo No Funciona
1. `TROUBLESHOOTING.md` (solución de problemas)
2. Consola del navegador (F12)
3. Logs de Netlify

### Si Necesitas HTTPS Local
1. `HTTPS_LOCAL.md` (configuración local)

---

## 🎯 Siguiente Paso

**👉 Lee:** `RESUMEN_CONFIGURACION.md` para entender todo lo que se ha configurado.

**👉 Luego:** `DEPLOY_NETLIFY.md` para desplegar paso a paso.

---

## 📞 Ayuda

**¿Tienes dudas?**
1. Lee `TROUBLESHOOTING.md`
2. Revisa logs de Netlify
3. Abre un issue en GitHub

---

**✨ Todo está listo. ¡Solo falta hacer deploy! ✨**

**URL después del deploy:** `https://[tu-sitio].netlify.app`

---

## 📋 Resumen Ultra-Rápido

```bash
# Build local (verificar)
npm run build

# Commit
git add .
git commit -m "Listo para deploy"
git push origin main

# Netlify
1. Import project
2. Add env var: VITE_API_BASE_URL
3. Deploy
4. ¡Listo!
```

**Tiempo estimado:** 10-15 minutos ⏱️
