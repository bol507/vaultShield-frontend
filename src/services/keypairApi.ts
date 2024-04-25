import api from './api';
import ws from 'utils/warningSelf';
import storageService from './storage';

export interface KeyPair {
  privateKey: string;
  publicKey: string;
}

const getHeadersWithToken = async () => {
  const token = await storageService.getToken();
  const headers = {
    Authorization: token ? `Bearer ${token}` : null
  };
  return headers;
};

const getKeyPair = async () => {
  try {
    const headers = await getHeadersWithToken();
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

export default { getKeyPair };
