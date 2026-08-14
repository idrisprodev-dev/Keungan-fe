// src/lib/api.ts
import axios from 'axios';
import Cookies from 'js-cookie';

// Tembak langsung ke Backend NestJS Anda
const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Penting untuk CORS
});

// Interceptor: Otomatis menyisipkan Token sebelum request terkirim
api.interceptors.request.use(
  (config) => {
    // Kita akan menyimpan JWT dari Backend ke dalam Cookie bernama 'access_token'
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor: Menangkap error jika token kadaluarsa (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika token mati/tidak valid, tendang user kembali ke halaman login
      Cookies.remove('access_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;