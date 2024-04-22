import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
interface axiosParams {
  baseUrl: string;
}

// Default config
const params: axiosParams = {
  //baseUrl: import.meta.env.VITE_BACKEND_SERVER //localserver
  baseUrl: '/' //use producction
};

const axiosConfig: AxiosRequestConfig = {
  baseURL: params.baseUrl
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, body, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, body, config)
  };
};

export default api(axiosInstance);
