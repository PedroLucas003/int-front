import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

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