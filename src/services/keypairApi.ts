import api from './api';
import ws from 'utils/warningSelf';
import storageService from './storage';

export interface KeyPair {
  privateKey: string;
  publicKey: string;
}

const getKeyPair = async () => {
  try {
    const headers = await storageService.getHeadersWithToken();
    const response = await api.get('/api/keypair', { headers });
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

const registerKeyPair = async (payload: KeyPair) => {
  try {
    const headers = await storageService.getHeadersWithToken();
    const response = await api.post('/api/keypair', payload, { headers });
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

export default { getKeyPair, registerKeyPair };
