import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://elodrinks-backend.onrender.com';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.url && !config.url.startsWith('/public')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

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

export interface LoginCredentials {
  Email: string;
  Password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterUserRequest {
  Name: string;
  Surname: string;
  Age: string | number;
  Cpf: string;
  Email: string;
  Phone: string;
  Password: string;
}

export interface RegisterUserResponse {
  message: string;
  user: UserBackend;
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  age: number;
  cpf: string;
  email: string;
  phone: string;
  role?: string;
}

export interface UserBackend {
  _id: string;
  Name: string;
  Surname: string;
  Age: number;
  Cpf: string;
  Email: string;
  Phone: string;
  Role?: string;
  __v?: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface OptionalItem {
  [x: string]: any;
  id: string;
  name: string;
  price: number;
}

export const publicApi = {
  getServices: (): Promise<{ data: Service[] }> => api.get('/public/services'),

  sendContact: (data: ContactData): Promise<void> =>
    api.post('/public/contact', data),

  registerUser: (userData: RegisterUserRequest): Promise<{ data: RegisterUserResponse }> =>
    api.post('/users/register', userData),

  loginUser: (credentials: LoginCredentials): Promise<{ data: LoginResponse }> =>
    api.post('/users/login', credentials),
};

export const userApi = {
  getAllUsers: (): Promise<{ data: User[] }> => api.get('/users'),
  getUserById: (id: string): Promise<{ data: User }> => api.get(`/users/${id}`),
  updateUserById: (id: string, data: Partial<RegisterUserRequest>): Promise<{ data: User }> =>
    api.put(`/users/${id}`, data),
  deleteUserById: (id: string): Promise<void> => api.delete(`/users/${id}`),
};

export const serviceApi = {
  getAllServices: (): Promise<{ data: Service[] }> => api.get('/services'),
  getServiceById: (id: string): Promise<{ data: Service }> => api.get(`/services/${id}`),
  createService: (data: Omit<Service, 'id'>): Promise<{ data: Service }> =>
    api.post('/services', data),
  updateServiceById: (id: string, data: Omit<Service, 'id'>): Promise<{ data: Service }> =>
    api.put(`/services/${id}`, data),
  deleteServiceById: (id: string): Promise<void> => api.delete(`/services/${id}`),
};

export const optionalApi = {
  getAllOptionalItems: (): Promise<{ data: OptionalItem[] }> => api.get('/optional-items'),
  getOptionalItemById: (id: string): Promise<{ data: OptionalItem }> =>
    api.get(`/optional-items/${id}`),
  createOptionalItem: (data: Omit<OptionalItem, 'id'>): Promise<{ data: OptionalItem }> =>
    api.post('/optional-items', data),
  updateOptionalItemById: (id: string, data: Omit<OptionalItem, 'id'>): Promise<{ data: OptionalItem }> =>
    api.put(`/optional-items/${id}`, data),
  deleteOptionalItemById: (id: string): Promise<void> => api.delete(`/optional-items/${id}`),
};

export default api;

