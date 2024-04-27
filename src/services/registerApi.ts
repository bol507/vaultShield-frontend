import api from './api';
import ws from 'utils/warningSelf';
import storageService from './storage';

export interface Register {
  title?: string;
  login: string;
  password: string;
  website?: string;
  notes?: string;
}
const createRegister = async (payload: Register) => {
  try {
    const headers = await storageService.getHeadersWithToken();
    const response = await api.post('/api/register', payload, { headers });
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

export default {
  createRegister
};
