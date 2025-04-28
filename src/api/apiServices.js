import axios from 'axios';
import LocalStorageHelper from '../utils/LocalStorageHelper';

const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const setJwtToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export const setCSRFToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['X-CSRF-Token'] = `${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['X-CSRF-Token'];
  }
};

export const initializeAxios = () => {
  const token = localStorage.getItem('authToken');
  const CSRFToken = localStorage.getItem('CSRFToken');
  if (CSRFToken) {
    setCSRFToken(CSRFToken);
  } else if (token) {
    setJwtToken(token);
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const url = config.url;
    if (url.startsWith('/api/mfa')) {
      if (LocalStorageHelper.getToken()) {
        config.headers['Authorization'] = `Bearer ${LocalStorageHelper.getToken()}`;
      }
    } else if (url.startsWith('/api/auth/password/change')) {
      if (LocalStorageHelper.getToken()) {
        config.headers['Authorization'] = `Bearer ${LocalStorageHelper.getToken()}`;
      }
      // if (LocalStorageHelper.getCSRFToken()) {
      //   config.headers['X-CSRF-Token'] = `${LocalStorageHelper.getCSRFToken()}`;
      // }
    } else if (LocalStorageHelper.getCSRFToken()) {
      config.headers['X-CSRF-Token'] = `${LocalStorageHelper.getCSRFToken()}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

export const setInterceptor = () => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
      } else {
        console.error('Network or Server Error:', error.message);
      }
      return Promise.reject(error);
    }
  );
};

//initializeAxios();

export default axiosInstance;
