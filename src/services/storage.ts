const KEY = 'token';

interface Token {
  value: string;
}

/**
 * Sets the token in local storage.
 * @param {Token} token - The token to store.
 * @returns {void}
 */
const setToken = (token: Token): void => {
  localStorage.setItem(KEY, JSON.stringify(token));
};

/**
 * Retrieves the token from local storage.
 * @returns {Token|null} - The stored token, or null if none exists.
 */
const getToken = (): Token | null => {
  const tokenString = localStorage.getItem(KEY);
  return tokenString ? JSON.parse(tokenString) : null;
};

/**
 * Removes the token from local storage.
 * @returns {void}
 */
const removeToken = (): void => {
  localStorage.removeItem(KEY);
};

export default {
  setToken,
  getToken,
  removeToken
};
