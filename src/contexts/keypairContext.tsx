import React, { Dispatch, createContext, useReducer } from 'react';

interface KeyPairState {
  privateKey: string;
  publicKey: string;
}

interface KeyPairAction {
  type: 'SET_KEY_PAIR';
  privateKey: string;
  publicKey: string;
}

interface KeyPairContextType {
  keypairState: KeyPairState;
  keypairDispatch: Dispatch<KeyPairAction>;
  setKeyPair: (privateKey: string, publicKey: string) => void;
}

const initialKeyPairState = {
  privateKey: '',
  publicKey: ''
};
const keyPairReducer = (state: KeyPairState, action: KeyPairAction) => {
  switch (action.type) {
    case 'SET_KEY_PAIR':
      return {
        ...state,
        privateKey: action.privateKey,
        publicKey: action.publicKey
      };
    default:
      return state;
  }
};

export const KeyPairContext = createContext<KeyPairContextType>({
  keypairState: initialKeyPairState,
  keypairDispatch: () => {},
  setKeyPair: () => {}
});

export const KeyPairContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [keypairState, keypairDispatch] = useReducer(
    keyPairReducer,
    initialKeyPairState
  );

  const setKeyPair = async (
    privateKey: string,
    publicKey: string
  ): Promise<void> => {
    const action: KeyPairAction = {
      type: 'SET_KEY_PAIR',
      privateKey,
      publicKey
    };
    keypairDispatch(action);
  };

  const contextValue: KeyPairContextType = {
    keypairState,
    keypairDispatch,
    setKeyPair
  };

  return (
    <KeyPairContext.Provider value={contextValue}>
      {props.children}
    </KeyPairContext.Provider>
  );
};
