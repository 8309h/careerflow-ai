import apiClient from './api';

export const authService = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  signup: (payload) => apiClient.post('/auth/signup', payload),
  googleLogin: (credential) => apiClient.post('/auth/google', { credential })
};
