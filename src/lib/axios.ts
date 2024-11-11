import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost", // API backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm token vào header của mỗi request nếu có
api.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    if (token) {
      console.log('Sending request to:', config.url);    
    }
    return config;
  },
  error => Promise.reject(error)
);

// Xử lý lỗi response
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      Cookies.remove('token');
      window.location.href = '/login';
    }
    console.error('Error in response:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
