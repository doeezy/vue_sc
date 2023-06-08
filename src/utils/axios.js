import axios from "axios";

const service = axios.create({
  timeout: 600000,
  withCredentials: true,
});

service.interceptors.request.use((config) => {
  return config;
});

export default service;
