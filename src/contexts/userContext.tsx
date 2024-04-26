import { createContext, useReducer, Dispatch } from 'react';
import userService, { User } from 'services/userApi';
import storageService from 'services/storage';

/**
 * @typedef {Object} UserState - Represents the state of the user.
 * @property {User | null} user - The current user object or null if no user is logged in.
 * @property {boolean} isLogged - Indicates whether a user is logged in or not.
 */
// Interfaces
interface UserState {
  user: User | null;
  isLogged: boolean;
  isKeyPair: boolean;
}

/**
 * @typedef {Object} UserAction - Represents different types of user actions.
 * @property {'ADD_USER' | 'LOGGED'} type - The type of user action.
 * @property {User} user - The user object related to the action.
 */
interface UserAction {
  type: 'ADD_USER' | 'LOGGED' | 'HAVE_KEYPAIR';
  user: User;
}
/**
 * @typedef {Object} UserContextType - Represents the user context.
 * @property {UserState} userState - The current user state.
 * @property {Dispatch<UserAction>} userDispatch - The dispatcher function for user actions.
 * @property {(newUser: User) => Promise<void>} addUser - A function to add a new user.
 * @property {(credentials: User) => Promise<void>} loginUser - A function to log in a user.
 * @property {() => void} logged - A function to indicate that a user is logged in.
 */

interface UserContextType {
  userState: UserState;
  userDispatch: Dispatch<UserAction>;
  addUser: (newUser: User) => Promise<void>;
  loginUser: (credentials: User) => Promise<void>;
  logged: () => void;
  getUser: () => Promise<void>;
}
/**
 * Represents the initial user state.
 * @type {UserState}
 */
const initialUserState: UserState = {
  user: null,
  isLogged: false, //change this for development
  isKeyPair: false
};

// Reducer function to handle user actions and update state
/**
 * Reducer function to handle user actions and update the state.
 * @param {UserState} state - The current user state.
 * @param {UserAction} action - The user action to be performed.
 * @returns {UserState} The updated user state.
 */
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, user: action.user };
    case 'LOGGED':
      return { ...state, isLogged: true };
    case 'HAVE_KEYPAIR':
      return { ...state, isKeyPair: true };
    default:
      return state;
  }
};

// Create the UserContext with initial values
/**
 * The user context.
 * @type {React.Context<UserContextType>}
 */
export const UserContext: React.Context<UserContextType> = createContext({
  userState: initialUserState,
  userDispatch: () => {},
  addUser: async () => {},
  loginUser: async () => {},
  logged: () => {},
  getUser: () => {}
});

// UserContextProvider component
/**
 * The provider component for the user context.
 * @type {React.FC<{ children: React.ReactNode }>}
 */
export const UserContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  // Function to add a new user
  /**
   * Adds a new user.
   * @param {User} newUser - The new user to be added.
   * @returns {Promise<void>} A promise that resolves when the user is added.
   */
  const addUser = async (newUser: User): Promise<void> => {
    const response = await userService.register(newUser);
    const statusCode = response.status;
    if (statusCode === 201) {
      const token = response.data.token;
      if (token) {
        await storageService.setToken(token); // Store the user token in local storage
        logged();
        await getUser();
      } else {
        throw new Error('Missing token');
      }
    } else {
      throw new Error(`Registration error. Status Code: ${statusCode}`);
    }
  };

  // Function to log in a user
  /**
   * Logs in a user.
   * @param {User} credentials - The user credentials for logging in.
   * @returns {Promise<void>} A promise that resolves when the user is logged in.
   */
  const loginUser = async (credentials: User): Promise<void> => {
    const response = await userService.login(credentials);
    const statusCode = response.status;
    if (statusCode === 200) {
      const token = response.data.token;
      if (token) {
        await storageService.setToken(token); // Store the user token in local storage
        await getUser();
        logged();
      } else {
        throw new Error('Missing token');
      }
    } else {
      throw new Error(`Login error. Status code: ${statusCode}`);
    }
  };

  // Function to indicate that a user is logged in
  /**
   * Marks the user as logged in.
   */
  const logged = () => {
    userDispatch({ type: 'LOGGED' }); // Dispatch the 'LOGGED' action to update the state
  };

  const getUser = async (): Promise<void> => {
    const response = await userService.getUser();
    const statusCode = response.status;
    if (statusCode === 200) {
      const user = response.data;
      userDispatch({ type: 'ADD_USER', user: user });
      if (user.keypair && user.keypair.length > 0) {
        userDispatch({ type: 'HAVE_KEYPAIR' });
      }
    }
  };

  // Create the context value object
  /**
   * The context value for the user context.
   * @type {UserContextType}
   */
  const contextValue: UserContextType = {
    userState,
    userDispatch,
    addUser,
    loginUser,
    logged,
    getUser
  };

  // Render the UserContextProvider with the context value and child components
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
