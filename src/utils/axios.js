import axios from 'axios';

// Obtener el token CSRF
const getCsrfToken = async () => {
    await axios.get('http://10.14.4.170:8000/sanctum/csrf-cookie', { withCredentials: true });
};

const api = axios.create({
    baseURL: 'http://10.14.4.170:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Asegúrate de que esto esté habilitado
});

// Interceptores para agregar el token CSRF
api.interceptors.request.use(async (request) => {
    await getCsrfToken(); // Asegúrate de obtener el token CSRF antes de cada solicitud
    return request;
});

api.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.log('Response Error:', error);
        return Promise.reject(error);
    }
);

export default api;