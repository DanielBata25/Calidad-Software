/**
 * Configuración centralizada de la API.
 *
 * Ajusta `API_BASE_URL` cuando quieras conectar el frontend con el backend.
 * Ejemplo: export const API_BASE_URL = 'https://localhost:5001/api';
 */
export const API_BASE_URL = '';

export function isApiConfigured(): boolean {
  return API_BASE_URL.trim().length > 0;
}
