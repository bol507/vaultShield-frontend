import { useContext } from 'react';
import { RegisterContext } from 'contexts/registerContext';

export const useRegister = () => {
  const { register, registers } = useContext(RegisterContext).registerState;
  return { register, registers };
};
