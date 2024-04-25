import { useContext } from 'react';
import { KeyPairContext } from 'contexts/keypairContext';

export const useKeyPair = () => {
  const { privateKey, publicKey } = useContext(KeyPairContext).keypairState;
  return { privateKey, publicKey };
};
