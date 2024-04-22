import { Dispatch, createContext, useReducer } from 'react';
import { Credential } from 'services/credentialApi';

interface CredentialState {
  credential: Credential | null;
}

interface CredentialAction {
  type: 'ADD';
  credential: Credential;
}

interface CredentialContextType {
  credentialState: CredentialState;
  credentialDispatch: Dispatch<CredentialAction>;
}

const initalCredentialState: CredentialState = {
  credential: null
};

const credentialReducer = (
  state: CredentialState,
  action: CredentialAction
): CredentialState => {
  switch (action.type) {
    default:
      return state;
  }
};

export const CredentialContext: React.Context<CredentialContextType> =
  createContext({
    credentialState: initalCredentialState,
    credentialDispatch: () => {}
  });

export const CredentialContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [credentialState, credentialDispatch] = useReducer(
    credentialReducer,
    initalCredentialState
  );

  const contextValue: CredentialContextType = {
    credentialState,
    credentialDispatch
  };

  return (
    <CredentialContext.Provider value={contextValue}>
      {props.children}
    </CredentialContext.Provider>
  );
};
