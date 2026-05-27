import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const serverMessage = error.response?.data?.message;
    return Promise.reject(new Error(serverMessage || error.message || 'Server error'));
  }
);

export const authHeaders = (token) => ({
  Authorization: token ? `Bearer ${token}` : ''
});

export default apiClient;
