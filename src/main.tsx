import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from 'contexts/userContext';
import { ThemeContextProvider } from 'contexts/themeContext';
import { NotificationContextProvider } from 'context/notificationContext';
import { KeyPairContextProvider } from 'contexts/keypairContext';

import App from './App';
import './index.css';
import { NotificationContextProvider } from 'contexts/notificationContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeContextProvider>
        <NotificationContextProvider>
          <KeyPairContextProvider>
            <Router>
              <App />
            </Router>
          </KeyPairContextProvider>
        </NotificationContextProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
