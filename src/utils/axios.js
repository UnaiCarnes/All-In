// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.14.4.170:8000/api',
});

// Interceptar solicitudes para agregar el token dinámicamente
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtener el token actualizado
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptar respuestas para manejar errores de autenticación
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirigir al login si el token es inválido
    }
    return Promise.reject(error);
  }
);

export default instance;
