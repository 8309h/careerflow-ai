import apiClient, { authHeaders } from './api';

export const jobService = {
  getJobs: (token) => apiClient.get('/jobs', { headers: authHeaders(token) }),
  getJobById: (id, token) => apiClient.get(`/jobs/${id}`, { headers: authHeaders(token) }),
  createJob: (payload, token) => apiClient.post('/jobs', payload, { headers: authHeaders(token) }),
  updateJob: (id, payload, token) => apiClient.put(`/jobs/${id}`, payload, { headers: authHeaders(token) }),
  deleteJob: (id, token) => apiClient.delete(`/jobs/${id}`, { headers: authHeaders(token) })
};
