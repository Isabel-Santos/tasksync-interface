import axios from 'axios';
import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken, logout, saveUser } from '../utils/auth';

const API_URL = ''; 

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const publicRoutes = [
    '/auth/login',
    '/auth/signup',
    '/auth/verify-2fa',
    '/auth/refresh',
    '/auth/forgot-password',
    '/auth/reset-password'
  ];
  const isPublicRoute = publicRoutes.some(path => config.url.includes(path));

  if (!isPublicRoute) {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
      try {
        const res = await api.post('/auth/refresh', {}, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        const newAccessToken = res.data.access_token;
        saveAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// --- Funções da API ---

export const login = (email, password) => api.post('/auth/login', { email, password });

export const verify2FA = async (email, code) => {
  const response = await api.post('/auth/verify-2fa', { email, code });
  if (!response.data?.access_token) {
    throw new Error(response.data?.message || 'Código inválido.');
  }
  saveAccessToken(response.data.access_token);
  saveRefreshToken(response.data.refresh_token);
  saveUser(response.data.user);
  return response;
};

export const register = (data) => api.post('/auth/signup', data);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (token, newPassword) => api.post(`/auth/reset-password?token=${token}`, { new_password: newPassword });

// TAREFAS
export const getTasks = () => api.get('/tasks/list');
export const createTask = (data) => api.post('/tasks/add', data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}/remove`);

export const getTaskById = (id) => api.get(`/tasks/get/${id}`);
