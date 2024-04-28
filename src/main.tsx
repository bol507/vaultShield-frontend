import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from 'contexts/userContext';
import { ThemeContextProvider } from 'contexts/themeContext';
import { NotificationContextProvider } from 'contexts/notificationContext';
import { KeyPairContextProvider } from 'contexts/keypairContext';
import { RegisterContextProvider } from 'contexts/registerContext';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeContextProvider>
        <NotificationContextProvider>
          <KeyPairContextProvider>
            <RegisterContextProvider>
              <Router>
                <App />
              </Router>
            </RegisterContextProvider>
          </KeyPairContextProvider>
        </NotificationContextProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
