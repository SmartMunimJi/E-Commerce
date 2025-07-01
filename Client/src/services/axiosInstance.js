// src/services/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const token = userData?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
