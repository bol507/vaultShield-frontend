import { useContext, useEffect } from 'react';
import Welcome from 'components/Welcome';
import { KeyPairContext } from 'contexts/keypairContext';
import { useKeyPair } from 'hooks/useKeyPair';

const Dashboard = () => {
  const { getKeyPair } = useContext(KeyPairContext);
  const { publicKey } = useKeyPair();
  const hasPublicKey = Boolean(publicKey);

  useEffect(() => {
    getKeyPair();
  }, []);
  return <>{hasPublicKey ? <p>has key</p> : <Welcome />}</>;
};

export default Dashboard;
