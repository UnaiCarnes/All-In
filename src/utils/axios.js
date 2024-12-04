import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Interceptor para manejar errores
api.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la petición:', error);
        return Promise.reject(error);
    }
);

export default api;