import forge from 'node-forge';
import { useContext, useEffect, useState } from 'react';

import { NotificationContext } from 'contexts/notificationContext';
import { KeyPairContext } from 'contexts/keypairContext';

const KeyPair = () => {
  const [keyPair, setKeyPair] = useState(null);
  const { showNotification } = useContext(NotificationContext);
  const { keypairDispatch } = useContext(KeyPairContext);

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
    keypairDispatch({
      type: 'SET_KEY_PAIR',
      privateKey: kp.privateKey,
      publicKey: kp.publicKey
    });
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
