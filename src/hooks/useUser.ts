import { useContext } from 'react';
import { UserContext } from 'contexts/userContext';

export const useUser = () => {
  const { userState } = useContext(UserContext);
  return { user: userState.user, isLogged: userState.isLogged };
};
