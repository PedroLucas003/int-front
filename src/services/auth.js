// src/services/auth.js
import axios from 'axios';

// Use a variável de ambiente para a URL base da API em produção,
// ou localhost para desenvolvimento.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const API_URL = `${API_BASE_URL}/api/auth`; // Ajuste conforme a estrutura da sua URL base

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return {
    token: response.data.token,
    email: response.data.user.email,
    name: response.data.user.name,
    isAdmin: response.data.user.isAdmin
  };
};

export const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return {
    token: response.data.token,
    email: response.data.user.email,
    name: response.data.user.name,
    isAdmin: response.data.user.isAdmin
  };
};