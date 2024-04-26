import { useContext } from 'react';
import { UserContext } from 'contexts/userContext';

export const useUser = () => {
  const { user, isLogged, isKeyPair } = useContext(UserContext).userState;
  return { user, isLogged, isKeyPair };
};
