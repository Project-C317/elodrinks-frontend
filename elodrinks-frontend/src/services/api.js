import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // url do backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona token em todas as requisições privadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.url.startsWith('/public')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Interceptor para lidar com erros globalmente (logout se token expirar)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

// Rotas públicas (não precisam de token)
export const publicApi = {
  getServices: () => api.get('/public/services'),
  sendContact: (data) => api.post('/public/contact', data),

  registerUser: (userData) => api.post('/users/register', userData),
  loginUser: (credentials) => api.post('/users/login', credentials),
};

// Rotas privadas (precisam de token)
export const userApi = {
  getAllUsers: () => api.get('/users'), // precisa ser admin
  getUserById: (id) => api.get(`/users/${id}`),
  updateUserById: (id, data) => api.put(`/users/${id}`, data),
  deleteUserById: (id) => api.delete(`/users/${id}`), // precisa ser admin
};

export const serviceApi = {
  getAllServices: () => api.get('/services'),
  getServiceById: (id) => api.get(`/services/${id}`),
  createService: (serviceData) => api.post('/services', serviceData),
  updateServiceById: (id, serviceData) => api.put(`/services/${id}`, serviceData),
  deleteServiceById: (id) => api.delete(`/services/${id}`),
};

export const optionalApi = {
  getAllOptionalItems: () => api.get('/optional-items'),
  getOptionalItemById: (id) => api.get(`/optional-items/${id}`),
  createOptionalItem: (data) => api.post('/optional-items', data),
  updateOptionalItemById: (id, data) => api.put(`/optional-items/${id}`, data),
  deleteOptionalItemById: (id) => api.delete(`/optional-items/${id}`),
};

export default api;
