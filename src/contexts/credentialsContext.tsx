import { createContext, Dispatch, useReducer } from 'react';
import { Credential } from 'services/credentialApi';

interface CredentialsState {
  credentials: Credential[];
}

interface CredentialsAction {
  type: 'ADD';
  credential: Credential;
}

interface CredentialsContextType {
  credentialsState: CredentialsState;
  credentialsDispatch: Dispatch<CredentialsAction>;
}

const initialCredentialsState: CredentialsState = {
  credentials: []
};

const credentialsReducer = (
  state: CredentialsState,
  action: CredentialsAction
): CredentialsState => {
  switch (action.type) {
    case 'ADD':
      return {
        credentials: [...state.credentials, action.credential]
      };
    default:
      return state;
  }
};

export const CredentialsContext = createContext<CredentialsContextType>({
  credentialsState: initialCredentialsState,
  credentialsDispatch: () => {}
});

export const CredentialsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [credentialsState, credentialsDispatch] = useReducer(
    credentialsReducer,
    initialCredentialsState
  );

  const contextValue: CredentialsContextType = {
    credentialsState,
    credentialsDispatch
  };

  return (
    <CredentialsContext.Provider value={contextValue}>
      {children}
    </CredentialsContext.Provider>
  );
};
