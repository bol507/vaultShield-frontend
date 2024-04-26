import React, { createContext, useState, ReactNode } from 'react';

export interface LoaderContextProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextProps | undefined>(
  undefined
);

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};
