import React, { createContext, useReducer, Dispatch } from 'react';

interface ThemeState {
  theme: string;
}

interface ThemeAction {
  type: 'UPDATE_THEME';
  theme: string;
}

interface ThemeContextType {
  themeState: ThemeState;
  themeDispatch: Dispatch<ThemeAction>;
  updateTheme: (payload: string) => Promise<void>;
}

const initialThemeState = {
  theme: ''
};

const themeReducer = (state: ThemeState, action: ThemeAction) => {
  switch (action.type) {
    case 'UPDATE_THEME':
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};

export const ThemeContext = createContext<ThemeContextType>({
  themeState: initialThemeState,
  themeDispatch: () => {},
  updateTheme: async () => {}
});

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialThemeState
  );
  const svgSettings = document.querySelectorAll('.fill-current');

  const updateTheme = async (payload: string): Promise<void> => {
    try {
      themeDispatch({ type: 'UPDATE_THEME', theme: payload });
      if (payload === 'dark') {
        setDark();
      } else {
        setLight();
      }
    } catch (err) {
      throw new Error('Error registering theme user');
    }
    return Promise.resolve();
  };

  const setDark = () => {
    document.body.classList.add('dark');
    document.body.style.backgroundColor = '#18181b';
    svgSettings.forEach(function (element) {
      element?.classList.add('text-white');
      element?.classList.remove('text-black');
    });
  };

  const setLight = () => {
    document.body.classList.remove('dark');
    document.body.style.backgroundColor = '#FFFFFF';
    svgSettings.forEach(function (element) {
      element?.classList.add('text-black');
      element?.classList.remove('text-white');
    });
  };

  const contextValue: ThemeContextType = {
    themeState,
    themeDispatch,
    updateTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
