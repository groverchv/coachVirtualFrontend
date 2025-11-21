import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Configuración para producción
  build: {
    // Generar sourcemaps para debugging en producción (opcional)
    sourcemap: false,
    
    // Optimizar el tamaño del bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor chunks para mejor caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mediapipe': ['@mediapipe/pose', '@mediapipe/tasks-vision'],
        },
      },
    },
    
    // Aumentar el límite de advertencia de tamaño de chunk
    chunkSizeWarningLimit: 1000,
  },
  
  // Configuración del servidor de desarrollo
  server: {
    // Permitir acceso desde otros dispositivos en la red local
    host: true,
    port: 5173,
    
    // Configuración de CORS para desarrollo
    cors: true,
  },
  
  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
  },
})
