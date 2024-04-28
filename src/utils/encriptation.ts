import forge from 'node-forge';

export const encrypt = (publicKey: string, value: string): string => {
  const pk = forge.pki.publicKeyFromPem(publicKey);
  const passwordBytes = forge.util.encodeUtf8(value);
  const encryptedBytes = pk.encrypt(passwordBytes);
  const encryptedPassword = forge.util.encode64(encryptedBytes);
  return encryptedPassword;
};

export const decrypt = (privateKey: string, value: string): string => {
  const pk = forge.pki.privateKeyFromPem(privateKey);
  const encryptedBytes = forge.util.decode64(value);
  const decryptedBytes = pk.decrypt(encryptedBytes);
  const decryptedPassword = forge.util.decodeUtf8(decryptedBytes);
  return decryptedPassword;
};
