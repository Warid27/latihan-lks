import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = encodeURIComponent(data.message);
      const errorStatus = status;

      if (status === 403 || status === 401) {
        window.location.href = `/?error=${errorMessage}&status=${errorStatus}`;
        return; 
      }
    }

    console.error('API error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);


export default api;
