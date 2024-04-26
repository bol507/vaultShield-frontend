import { useNavigate } from 'react-router-dom';
//components
import Welcome from 'components/Welcome';
//hooks
import { useUser } from 'hooks/useUser';
import { btnDefault } from 'styles/tailwind.classes';

const Dashboard = () => {
  const { isKeyPair } = useUser();
  const navigate = useNavigate();

  const handleButton = () => {
    navigate('/NewRegister');
  };

  if (!isKeyPair) {
    return <Welcome />;
  }

  return (
    <div>
      <button className={btnDefault} onClick={() => handleButton()}>
        Create new
      </button>
    </div>
  );
};

export default Dashboard;
