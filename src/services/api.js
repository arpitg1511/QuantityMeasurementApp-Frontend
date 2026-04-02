import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/quantities';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const measurementService = {
  compare: (data) => api.post('/compare', data),
  convert: (data) => api.post('/convert', data),
  add: (data) => api.post('/add', data),
  subtract: (data) => api.post('/subtract', data),
  divide: (data) => api.post('/divide', data),
  getHistoryByOperation: (operation) => api.get(`/history/operation/${operation}`),
  getHistoryByType: (type) => api.get(`/history/type/${type}`),
  getErrorHistory: () => api.get('/history/errored'),
  getAllHistory: () => api.get('/history'),
};

export default api;
