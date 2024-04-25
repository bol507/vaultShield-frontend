import forge from 'node-forge';
import { useContext, useEffect, useState } from 'react';

import { NotificationContext } from 'contexts/notificationContext';

const geneareteRandomWord = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_';
  const characterCount = 16;
  let result = '';

  for (let i = 0; i < characterCount; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const character = characters.charAt(randomIndex);
    result += character;
  }

  return result;
};

const KeyPair = () => {
  const [keyPair, setKeyPair] = useState(null);
  const { showNotification } = useContext(NotificationContext);

  const handleGenerateKeyPair = async () => {
    const rsa = forge.pki.rsa;
    const kp = await new Promise((resolve, reject) => {
      rsa.generateKeyPair({ bits: 2048 }, (err, keypair) => {
        if (err) {
          reject(err);
        } else {
          resolve(keypair);
        }
      });
    });
    setKeyPair(kp);
  };

  useEffect(() => {
    if (keyPair) {
      showNotification({
        message: 'key pair is generated',
        variant: 'success'
      });
    }
  }, [keyPair]);

  return (
    <div>
      <button onClick={() => handleGenerateKeyPair()}>Generate Key Pair</button>
    </div>
  );
};

export default KeyPair;
