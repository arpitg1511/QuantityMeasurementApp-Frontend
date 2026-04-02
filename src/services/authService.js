import axios from 'axios';

const AUTH_URL = import.meta.env.VITE_AUTH_URL || 'http://localhost:8080/auth';

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${AUTH_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  register: async (userData) => {
    return await axios.post(`${AUTH_URL}/register`, userData);
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  }
};
