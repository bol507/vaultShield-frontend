// eslint-disable-next-line @typescript-eslint/no-unused-vars
import forge from 'node-forge';
import { useContext, useState, useEffect } from 'react';
//contexts
import { KeyPairContext } from 'contexts/keypairContext';
import { NotificationContext } from 'contexts/notificationContext';
import { UserContext } from 'contexts/userContext';
//hooks
import { useUser } from 'hooks/useUser';
import { useKeyPair } from 'hooks/useKeyPair';
import { useLoader } from 'hooks/useLoader';
//components
import Loader from 'components/Loader';
//styles
import { btnDefault } from 'styles/tailwind.classes';

const Welcome = () => {
  const { user } = useUser(); // charge username
  const { publicKey, privateKey } = useKeyPair();
  const { showNotification } = useContext(NotificationContext); // throw notication to user
  const { isLoading, setIsLoading } = useLoader();

  const [keyPair, setKeyPair] = useState(null); //use when keypair is generated
  const { registerKeyPair, keypairDispatch } = useContext(KeyPairContext); //save keypair in backend

  const { userDispatch } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    handleGenerateKeyPair();
  }, []);

  useEffect(() => {
    if (keyPair) {
      showNotification({
        message: 'key pair is generated',
        variant: 'success'
      });
      handleSave();
    }
  }, [keyPair]);

  const handleSave = async () => {
    const payload = {
      private: privateKey,
      public: publicKey
    };
    await registerKeyPair(payload);
    showNotification({
      message: 'Your keys is saved',
      variant: 'success'
    });
    setIsLoading(false);
  };

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
    const privateKeyPem = forge.pki.privateKeyToPem(kp.privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(kp.publicKey);
    setKeyPair(kp);
    keypairDispatch({
      type: 'SET_KEY_PAIR',
      privateKey: privateKeyPem,
      publicKey: publicKeyPem
    });
  };
  if (isLoading) {
    return <Loader />;
  }

  const handleRefresh = () => {
    userDispatch({ type: 'HAVE_KEYPAIR' });
  };
  return (
    <div className="mt-4 dark:text-white">
      <h1>Welcome! {user?.username}</h1>
      <p>
        For better use of the application we need to create keys that will help
        encrypt the information, please be patient and wait a moment while we
        perform the task
      </p>
      {!isLoading && (
        <button className={btnDefault} onClick={handleRefresh}>
          continue
        </button>
      )}
    </div>
  );
};

export default Welcome;
