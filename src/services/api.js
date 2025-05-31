// src/services/api.js
import axios from 'axios';

// Use a variável de ambiente para a URL base da API em produção,
// ou localhost para desenvolvimento.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, // Adiciona /api ao final se sua base URL não o incluir
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;