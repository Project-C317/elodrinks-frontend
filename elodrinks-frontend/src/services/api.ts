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
  _id: string;
  Name: string;
  BasePrice: number;
  ClientQuantity: number,
  EventDuration: number,
  EventDate: Date,
  OptionalItems: OptionalItem[],
  FinalBudget: number,
  DownPayment: number,
  FinalPayment: number
}

export interface OptionalItem {
  _id: string;
  Name: string;
  PricePerUnit: number;
  Quantity: number;
  IndividualPrice: number;
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
  getServiceById: (_id: string): Promise<{ data: Service }> => api.get(`/services/${_id}`),
  createService: (data: Omit<Service, '_id'>): Promise<{ data: Service }> =>
    api.post('/services', data),
  updateServiceById: (_id: string, data: Omit<Service, '_id'>): Promise<{ data: Service }> =>
    api.put(`/services/${_id}`, data),
  deleteServiceById: (_id: string): Promise<void> => api.delete(`/services/${_id}`),
};

export const optionalApi = {
  getAllOptionalItems: (): Promise<{ data: OptionalItem[] }> => api.get('/optional-items'),
  getOptionalItemById: (_id: string): Promise<{ data: OptionalItem }> =>
    api.get(`/optional-items/${_id}`),
  createOptionalItem: (data: Omit<OptionalItem, '_id'>): Promise<{ data: OptionalItem }> =>
    api.post('/optional-items', data),
  updateOptionalItemById: (_id: string, data: Omit<OptionalItem, '_id'>): Promise<{ data: OptionalItem }> =>
    api.put(`/optional-items/${_id}`, data),
  deleteOptionalItemById: (_id: string): Promise<void> => api.delete(`/optional-items/${_id}`),
};

export default api;

