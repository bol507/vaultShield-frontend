import CryptoJS from 'crypto-js';

import api from './api';
import ws from 'utils/warningSelf';
import storageService from './storage';

export interface User {
  id?: number;
  username?: string;
  last_name?: string;
  name?: string;
  email: string;
  password: string;
  keyword?: string;
  organization?: string;
}

const register = async (payload: User) => {
  try {
    const hashedPassword = CryptoJS.SHA256(payload.password).toString();
    const response = await api.post('/api/auth/register', {
      ...payload,
      password: hashedPassword
    });
    return response;
  } catch (err) {
    console.info(
      `%cError: ${ws.faceScreaming} %c${err.response.data.error}`,
      ws.style1,
      ws.style2
    );
    throw new Error(err.response.data.error);
  }
};

const login = async (credentials: User) => {
  try {
    const hashedPassword = CryptoJS.SHA256(credentials.password).toString();
    const response = await api.post('/api/auth/login', {
      ...credentials,
      password: hashedPassword
    });
    return response;
  } catch (err) {
    console.info(
      `%cError: ${ws.faceScreaming} %c${err.response.data.error}`,
      ws.style1,
      ws.style2
    );
    throw new Error(err.response.data.error);
  }
};

const getUser = async () => {
  try {
    const headers = await storageService.getHeadersWithToken();
    const response = await api.get('/api/user', { headers });
    return response;
  } catch (err) {
    console.info(
      `%cError: ${ws.faceScreaming} %c${err.response.data.error}`,
      ws.style1,
      ws.style2
    );
    throw new Error(err.response.data.error);
  }
};

export default { register, login, getUser };
