import { Route, Routes, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import './App.css';
//layouts
import DashboardLayout from 'layouts/DashboardLayout';
import HomeLayout from 'layouts/HomeLayout';
//pages
import Home from 'pages/Home';
import Dashboard from 'pages/Dashboard';
//components
import Login from 'components/login';
import Signup from 'components/Signup';
import Notification from 'components/Notification';
import Generator from 'components/Generator';
import Loader from 'components/Loader';
//contexts
import { ThemeContext } from 'contexts/themeContext';
//hooks
import { useUser } from 'hooks/useUser';

const App = () => {
  const { updateTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { isLogged } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLogged !== undefined) {
      setIsLoading(false);
    }
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged]);

  /**
   *Check the user's color theme preferences.
   */
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const asignTheme = async () => {
      if (prefersDarkMode) {
        await updateTheme('dark');
      } else {
        await updateTheme('');
      }
    };

    asignTheme();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  let routes;
  if (isLogged) {
    routes = null;
    routes = (
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/generator" element={<Generator />} />
      </Route>
    );
  } else {
    routes = null;
    routes = (
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    );
  }

  return (
    <>
      <Notification />

      <Routes>{routes}</Routes>
    </>
  );
};

export default App;
