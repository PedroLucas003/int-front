import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/auth`;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { 
      email, 
      password 
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: false
    });
    
    return {
      token: response.data.token,
      email: response.data.user.email,
      name: response.data.user.name,
      isAdmin: response.data.user.isAdmin,
      id: response.data.user.id
    };
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { 
      name, 
      email, 
      password 
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: false
    });
    
    return {
      token: response.data.token,
      email: response.data.user.email,
      name: response.data.user.name,
      isAdmin: response.data.user.isAdmin,
      id: response.data.user.id
    };
  } catch (error) {
    console.error('Erro no registro:', error);
    throw error;
  }
};