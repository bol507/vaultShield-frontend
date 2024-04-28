import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//contexts
import { RegisterContext } from 'contexts/registerContext';
//components
import Welcome from 'components/Welcome';
//hooks
import { useUser } from 'hooks/useUser';
import { useRegister } from 'hooks/useRegister';
//styles
import { btnDefault } from 'styles/tailwind.classes';

const Dashboard = () => {
  const { isKeyPair } = useUser();
  const { registers } = useRegister();
  const navigate = useNavigate();
  const { getRegisters } = useContext(RegisterContext);

  useEffect(() => {
    const fetchData = async () => {
      await getRegisters();
    };
    fetchData();
  }, []);

  const handleButton = () => {
    navigate('/NewRegister');
  };

  if (!isKeyPair) {
    return <Welcome />;
  }

  return (
    <div className="flex flex-col justify-center">
      <button className={btnDefault} onClick={() => handleButton()}>
        Create new
      </button>
      <div className="flex flex-wrap mx-2 my-2  self-center w-full justify-center">
        {Array.isArray(registers) &&
          registers.map((register) => (
            <div
              key={register.id}
              className="bg-cinder-100 border-cinder-300 rounded-lg shadow-lg p-4 mb-4 mx-2 w-full  md:w-4/6 lg:w-3/12 xl:w-2/12"
            >
              <h3 className="text-xl text-cinder-700 font-bold mb-2 truncate">
                {register.title}
              </h3>
              <p className="text-gray-600 mb-1 truncate">
                Login: {register.login}
              </p>
              <p className="text-gray-600 truncate">
                Website: {register.website}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
