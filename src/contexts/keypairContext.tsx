import React, { Dispatch, createContext, useReducer } from 'react';
import keypairService, { KeyPair } from 'services/keypairApi';

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
  getKeyPair: () => Promise<void>;
  registerKeyPair: (payload: KeyPair) => Promise<void>;
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
  getKeyPair: async () => {},
  registerKeyPair: async () => {}
});

export const KeyPairContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [keypairState, keypairDispatch] = useReducer(
    keyPairReducer,
    initialKeyPairState
  );

  const getKeyPair = async (): Promise<void> => {
    const response = await keypairService.getKeyPair();
    const statusCode = response.status;
    if (statusCode !== 200) {
      throw new Error('Do not have keys');
    }
    //console.log(response.data);
    keypairDispatch({
      type: 'SET_KEY_PAIR',
      privateKey: response.data.private,
      publicKey: response.data.public
    });
  };

  const registerKeyPair = async (payload: KeyPair): Promise<void> => {
    const response = await keypairService.registerKeyPair(payload);
    const statusCode = response.status;
    if (statusCode === 201) {
      keypairDispatch({
        type: 'SET_KEY_PAIR',
        privateKey: payload.privateKey,
        publicKey: payload.publicKey
      });
    }
  };

  const contextValue: KeyPairContextType = {
    keypairState,
    keypairDispatch,
    getKeyPair,
    registerKeyPair
  };

  return (
    <KeyPairContext.Provider value={contextValue}>
      {props.children}
    </KeyPairContext.Provider>
  );
};
