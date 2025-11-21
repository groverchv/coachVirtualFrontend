# Configuración de HTTPS para Desarrollo Local

## ¿Por qué necesito HTTPS en desarrollo local?

El acceso a la cámara web requiere un contexto seguro (HTTPS) por razones de seguridad. 
**Excepciones:** `localhost` y `127.0.0.1` están permitidos en HTTP.

## Opciones para Desarrollo Local

### Opción 1: Usar localhost (Recomendado para desarrollo)

```bash
npm run dev
# Acceder a: http://localhost:5173
```

✅ **Ventajas:**
- No requiere certificados
- Funciona inmediatamente
- Los navegadores permiten cámara en localhost

⚠️ **Limitaciones:**
- Solo accesible desde tu máquina
- No puedes probar desde otros dispositivos en la red

### Opción 2: HTTPS con Vite (Para testing en red local)

Si necesitas probar desde otros dispositivos (móvil, tablet), puedes habilitar HTTPS en Vite.

#### Paso 1: Instalar mkcert (Generador de certificados locales)

**Windows (con Chocolatey):**
```powershell
choco install mkcert
```

**Mac (con Homebrew):**
```bash
brew install mkcert
brew install nss # Si usas Firefox
```

**Linux:**
```bash
# Instalar mkcert según tu distribución
wget -O mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64
chmod +x mkcert
sudo mv mkcert /usr/local/bin/
```

#### Paso 2: Crear certificados

```bash
# Instalar la CA local
mkcert -install

# Crear certificados para localhost
mkcert localhost 127.0.0.1 ::1

# Esto creará dos archivos:
# - localhost+2.pem (certificado)
# - localhost+2-key.pem (clave privada)
```

#### Paso 3: Configurar Vite

Crear archivo `vite.config.local.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  server: {
    https: {
      key: fs.readFileSync('./localhost+2-key.pem'),
      cert: fs.readFileSync('./localhost+2.pem'),
    },
    host: true, // Permitir acceso desde red local
    port: 5173,
  },
})
```

#### Paso 4: Usar la configuración HTTPS

```bash
# Ejecutar con configuración HTTPS
vite --config vite.config.local.js

# Acceder a: https://localhost:5173
# O desde otro dispositivo: https://[tu-ip-local]:5173
```

### Opción 3: Túnel con ngrok (Para testing remoto)

Si necesitas compartir tu desarrollo con otros o probar desde internet:

#### Paso 1: Instalar ngrok

```bash
# Descargar desde https://ngrok.com/download
# O con npm:
npm install -g ngrok
```

#### Paso 2: Ejecutar tu servidor local

```bash
npm run dev
# Servidor en http://localhost:5173
```

#### Paso 3: Crear túnel

```bash
ngrok http 5173
```

Obtendrás una URL HTTPS pública:
```
Forwarding https://abc123.ngrok.io -> http://localhost:5173
```

✅ **Ventajas:**
- HTTPS automático
- Accesible desde cualquier lugar
- Bueno para demos y testing

⚠️ **Limitaciones:**
- Requiere conexión a internet
- La URL cambia cada vez (gratis)
- Puede ser lento dependiendo de tu conexión

### Opción 4: Cloudflare Tunnel (Alternativa a ngrok)

```bash
# Instalar cloudflared
# Ver: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

# Crear túnel
cloudflared tunnel --url http://localhost:5173
```

## 🔧 Troubleshooting

### Error: "Certificate not trusted"

Si ves advertencias del navegador sobre certificado no confiable:

1. Asegúrate de haber ejecutado `mkcert -install`
2. Reinicia el navegador
3. En Chrome: Ir a `chrome://flags` y buscar "Allow invalid certificates for resources loaded from localhost"

### Error: "EACCES: permission denied"

En Linux/Mac, puede que necesites permisos:
```bash
sudo mkcert -install
```

### Error: "Camera still not working"

1. Verifica que estés accediendo por HTTPS (🔒 en la barra)
2. Revisa los permisos de cámara del navegador
3. Intenta en modo incógnito (puede estar bloqueado por extensiones)
4. Verifica que ninguna otra app esté usando la cámara

## 📱 Testing en Dispositivos Móviles

### Opción 1: Mismo WiFi + HTTPS

1. Usa mkcert para generar certificados
2. Ejecuta Vite con HTTPS
3. Encuentra tu IP local:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```
4. Accede desde móvil: `https://[tu-ip]:5173`

### Opción 2: ngrok

1. Ejecuta ngrok: `ngrok http 5173`
2. Copia la URL HTTPS generada
3. Ábrela en tu móvil

## 🚀 Recomendaciones

**Para desarrollo diario:**
- Usa `localhost` sin HTTPS (más simple)

**Para testing con cámara en otros dispositivos:**
- Usa ngrok (más fácil) o mkcert (más profesional)

**Para producción:**
- Netlify provee HTTPS automáticamente ✅

## 📝 Notas Importantes

- ⚠️ **NUNCA** subas los certificados (*.pem) a Git
- ✅ Los certificados de mkcert son solo para desarrollo local
- ✅ En producción (Netlify), HTTPS está incluido automáticamente
- ✅ `localhost` siempre permite cámara, incluso en HTTP

## 🔐 Seguridad

Los certificados generados con mkcert son **solo para desarrollo local**:
- Son auto-firmados
- Solo son confiables en tu máquina
- NO deben usarse en producción
- NO deben compartirse públicamente

Para producción, usa servicios como Netlify que proveen certificados SSL reales (Let's Encrypt).
