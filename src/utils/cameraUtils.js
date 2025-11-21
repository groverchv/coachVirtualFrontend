// Utilidades para manejo de cámara y permisos
// src/utils/cameraUtils.js
import { useState, useEffect } from 'react';

/**
 * Verifica si el navegador soporta acceso a cámara
 */
export const isCameraSupported = () => {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

/**
 * Verifica si el sitio está en HTTPS (necesario para cámara)
 */
export const isSecureContext = () => {
  return window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost';
};

/**
 * Obtiene el estado de permisos de la cámara
 */
export const getCameraPermissionState = async () => {
  if (!navigator.permissions) {
    return 'prompt'; // No se puede verificar, asumir que preguntará
  }

  try {
    const result = await navigator.permissions.query({ name: 'camera' });
    return result.state; // 'granted', 'denied', o 'prompt'
  } catch (error) {
    console.warn('No se pudo verificar permisos de cámara:', error);
    return 'prompt';
  }
};

/**
 * Solicita acceso a la cámara con manejo de errores mejorado
 * @param {Object} constraints - Restricciones de video
 * @returns {Promise<MediaStream>}
 */
export const requestCameraAccess = async (constraints = {}) => {
  // Verificaciones previas
  if (!isCameraSupported()) {
    throw new Error('Tu navegador no soporta acceso a cámara. Por favor, usa un navegador moderno como Chrome, Firefox o Edge.');
  }

  if (!isSecureContext()) {
    throw new Error('El acceso a la cámara requiere HTTPS. Por favor, accede al sitio mediante una conexión segura.');
  }

  // Configuración por defecto
  const defaultConstraints = {
    video: {
      width: { ideal: 1280, min: 640 },
      height: { ideal: 720, min: 480 },
      facingMode: 'user',
      frameRate: { ideal: 30, max: 30 }
    }
  };

  const mergedConstraints = {
    video: { ...defaultConstraints.video, ...constraints.video }
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(mergedConstraints);
    return stream;
  } catch (error) {
    console.error('Error al acceder a la cámara:', error);

    // Manejo específico de errores
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      throw new Error('Permiso de cámara denegado. Por favor, permite el acceso a la cámara en la configuración de tu navegador.');
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      throw new Error('No se encontró ninguna cámara. Por favor, conecta una cámara y recarga la página.');
    } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      throw new Error('La cámara está siendo usada por otra aplicación. Por favor, cierra otras aplicaciones que usen la cámara.');
    } else if (error.name === 'OverconstrainedError') {
      // Intentar con restricciones más flexibles
      console.log('Intentando con restricciones más flexibles...');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        return stream;
      } catch {
        throw new Error('No se pudo configurar la cámara con los requisitos especificados.');
      }
    } else if (error.name === 'SecurityError') {
      throw new Error('Error de seguridad. Asegúrate de estar usando HTTPS.');
    } else {
      throw new Error(`Error al acceder a la cámara: ${error.message}`);
    }
  }
};

/**
 * Detiene un stream de cámara
 * @param {MediaStream} stream
 */
export const stopCameraStream = (stream) => {
  if (stream) {
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }
};

/**
 * Lista todas las cámaras disponibles
 */
export const getAvailableCameras = async () => {
  if (!isCameraSupported()) {
    return [];
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'videoinput');
  } catch (error) {
    console.error('Error al listar cámaras:', error);
    return [];
  }
};

/**
 * Verifica si hay múltiples cámaras disponibles
 */
export const hasMultipleCameras = async () => {
  const cameras = await getAvailableCameras();
  return cameras.length > 1;
};

/**
 * Hook de React para manejar el estado de la cámara
 * Usar en componentes que necesiten acceso a cámara
 */
export const useCameraPermission = () => {
  const [permission, setPermission] = useState('prompt');
  const [isSupported, setIsSupported] = useState(true);
  const [isSecure, setIsSecure] = useState(true);

  useEffect(() => {
    setIsSupported(isCameraSupported());
    setIsSecure(isSecureContext());

    getCameraPermissionState().then(state => {
      setPermission(state);
    });

    // Escuchar cambios en permisos (si el navegador lo soporta)
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'camera' })
        .then(result => {
          result.addEventListener('change', () => {
            setPermission(result.state);
          });
        })
        .catch(() => {
          // Algunos navegadores no soportan esto
        });
    }
  }, []);

  return { permission, isSupported, isSecure };
};

export default {
  isCameraSupported,
  isSecureContext,
  getCameraPermissionState,
  requestCameraAccess,
  stopCameraStream,
  getAvailableCameras,
  hasMultipleCameras
};
