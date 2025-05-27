import type { AxiosInstance } from 'axios';

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export interface Credentials {
  Email: string;
  Password: string;
}

export interface NewUser {
  Name: string;
  Surname: string;
  Age: number | string;  
  Cpf: string;
  Email: string;
  Phone: string;
  Password: string;
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

export interface RegisterUserResponse {
  message: string;
  user: UserBackend;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface OptionalItem {
  id: string;
  registerUser: (userData: NewUser) => Promise<{ data: User }>;
  price: number;
}

export const publicApi: {
  getServices: () => Promise<{ data: Service[] }>;
  sendContact: (data: ContactData) => Promise<void>;
  registerUser: (userData: NewUser) => Promise<{ data: RegisterUserResponse }>;
  loginUser: (credentials: Credentials) => Promise<{
      data: { token: string; user: User; }; token: string 
  }>;
};

export const userApi: {
  getAllUsers: () => Promise<{ data: User[] }>;
  getUserById: (id: string) => Promise<{ data: User }>;
  updateUserById: (id: string, data: Partial<User>) => Promise<{ data: User }>;
  deleteUserById: (id: string) => Promise<void>;
};

export const serviceApi: {
  getAllServices: () => Promise<{ data: Service[] }>;
  getServiceById: (id: string) => Promise<{ data: Service }>;
  createService: (data: Service) => Promise<{ data: Service }>;
  updateServiceById: (id: string, data: Service) => Promise<{ data: Service }>;
  deleteServiceById: (id: string) => Promise<void>;
};

export const optionalApi: {
  getAllOptionalItems: () => Promise<{ data: OptionalItem[] }>;
  getOptionalItemById: (id: string) => Promise<{ data: OptionalItem }>;
  createOptionalItem: (data: OptionalItem) => Promise<{ data: OptionalItem }>;
  updateOptionalItemById: (id: string, data: OptionalItem) => Promise<{ data: OptionalItem }>;
  deleteOptionalItemById: (id: string) => Promise<void>;
};

declare const api: AxiosInstance;
export default api;
