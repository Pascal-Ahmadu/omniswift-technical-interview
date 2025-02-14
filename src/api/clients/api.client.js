import axios from 'axios';
import { CONFIG } from '../config/api.config';


const apiClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  headers: CONFIG.DEFAULT_HEADERS,
  timeout: 10000
});


apiClient.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default apiClient;