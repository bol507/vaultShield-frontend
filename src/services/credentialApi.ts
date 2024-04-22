import api from './api';
import ws from 'utils/warningSelf';
import storageService from '../services/storage';

/**
 * HTTP headers for API requests.
 * @typedef {Object} Headers
 * @property {string} Authorization - The authorization header with the token.
 */

const headers = {
  Authorization: storageService.getToken
    ? `Bearer ${storageService.getToken()?.value}`
    : null
};

/**
 * Represents a credential.
 * @typedef {Object} Credential
 * @property {string} name - The name of the credential.
 * @property {string} [type] - The type of the credential.
 * @property {string} [status] - The status of the credential.
 */
export interface Credential {
  name: string;
  type?: string;
  status?: string;
}

/**
 * Retrieves all credentials.
 * @async
 * @function allCredentials
 * @returns {Promise<any>} - A promise that resolves to the API response.
 * @throws {Error} - If an error occurs during the API call.
 */
const allCredentials = async () => {
  try {
    const response = await api.get('/api/all-credentials', { headers });
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

export default { allCredentials };
