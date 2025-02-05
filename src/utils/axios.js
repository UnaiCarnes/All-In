import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.14.4.170:3000/api',
});

// Interceptor para añadir el token de autenticación
instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log('Response Error:', error);
        // Solo redirigir al login si no estamos ya en la página de login
        if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;