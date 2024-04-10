import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from 'components/Signup';
import AuthLayout from 'layouts/AuthLayout';
import { useEffect } from 'react';

const App = () => {
  /**
   *Check the user's color theme preferences.
   */
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (prefersDarkMode) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#18181b';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#FFFFFF';
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
