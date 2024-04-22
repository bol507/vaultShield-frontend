import { useContext } from 'react';
import ThemeContext from 'contexts/themeContext';

export const useTheme = (): string => {
  const { themeState } = useContext(ThemeContext);
  return { theme: themeState.theme };
};
