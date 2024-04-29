import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import storageService from 'services/storage';
//context
import { UserContext } from 'contexts/userContext';

const Logout = () => {
  const { logoff } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    storageService.removeToken();
    logoff();
    navigate('/');
  }, []);

  return <div></div>;
};

export default Logout;
