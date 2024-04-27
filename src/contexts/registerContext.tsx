import React, { Dispatch, createContext, useReducer } from 'react';
import registerService, { Register } from 'services/registerApi';

interface RegisterState {
  register: Register | null;
}

interface RegisterAction {
  type: 'SET_REGISTER';
  register: Register;
}

interface RegisterContextType {
  registerState: RegisterState;
  registerDispatch: Dispatch<RegisterAction>;
  createRegister: (payload: Register) => Promise<void>;
}

const initialRegisterState = {
  register: null
};

const registerReducer = (state: RegisterState, action: RegisterAction) => {
  switch (action.type) {
    case 'SET_REGISTER':
      return {
        ...state,
        register: action.register
      };
    default:
      return state;
  }
};

export const RegisterContext: React.Context<RegisterContextType> =
  createContext({
    registerState: initialRegisterState,
    registerDispatch: () => {},
    createRegister: async () => {}
  });

export const RegisterContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [registerState, registerDispatch] = useReducer(
    registerReducer,
    initialRegisterState
  );

  const createRegister = async (payload: Register): Promise<void> => {
    const response = await registerService.createRegister(payload);
    const statusCode = response.status;
    if (statusCode === 201) {
      registerDispatch({
        type: 'SET_REGISTER',
        register: payload
      });
    }
  };

  const contextValue: RegisterContextType = {
    registerState,
    registerDispatch,
    createRegister
  };

  return (
    <RegisterContext.Provider value={contextValue}>
      {props.children}
    </RegisterContext.Provider>
  );
};
