// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useContext, useState } from 'react';
//contexts
import { KeyPairContext } from 'contexts/keypairContext';
import { NotificationContext } from 'contexts/notificationContext';
//hooks
import { useUser } from 'hooks/useUser';
import { useKeyPair } from 'hooks/useKeyPair';
//components
import KeyPair from 'components/KeyPair';
import { btnDefault } from 'styles/tailwind.classes';

const Welcome = () => {
  const { user } = useUser();
  const { publicKey, privateKey } = useKeyPair();
  const { registerKeyPair } = useContext(KeyPairContext);
  const { showNotification } = useContext(NotificationContext);
  const hasPublicKey = Boolean(publicKey);

  const [progressBar, setProgressBar] = useState({
    totalSteps: 3,
    completedSteps: 0,
    progress: 0,
    currentStep: ''
  });

  const handleSaveButton = async () => {
    const payload = {
      private: privateKey,
      public: publicKey
    };
    await registerKeyPair(payload);
    showNotification({
      message: 'Your keys is saved',
      variant: 'success'
    });
  };

  const updateProgressBar = () => {
    setProgressBar((prevProgressBar) => ({
      ...prevProgressBar,
      completedSteps: prevProgressBar.completedSteps + 1,
      progress:
        ((prevProgressBar.completedSteps + 1) / prevProgressBar.totalSteps) *
        100,
      currentStep: `Step ${prevProgressBar.completedSteps + 1}`
    }));
  };

  return (
    <div className="mt-4 dark:text-white">
      <p>{progressBar.currentStep}</p>
      <progress value={progressBar.progress} max="100" />
      <h1>Welcome! {user?.username}</h1>
      <p>
        For better use of the application we need to create keys that will help
        us encrypt the information
      </p>
      <KeyPair />
      {hasPublicKey && (
        <div>
          <p>
            Perfect, we have already generated the keys, we will proceed to
            store it in a safe place.
          </p>
          <button className={btnDefault} onClick={() => handleSaveButton()}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Welcome;
