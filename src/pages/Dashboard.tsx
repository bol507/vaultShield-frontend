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

  const handleButtonNew = () => {
    navigate('/NewRegister');
  };

  const handleButtonDetails = (id: string) => {
    navigate(`/RegisterDetails/${id}`);
  };

  if (!isKeyPair) {
    return <Welcome />;
  }

  return (
    <div className="flex flex-col justify-center">
      <button className={btnDefault} onClick={() => handleButtonNew()}>
        Create new
      </button>
      <div className="flex flex-wrap mx-2 my-2  self-center w-full justify-center">
        {Array.isArray(registers) &&
          registers.map((register) => (
            <div
              key={register.id}
              className="bg-gradient-to-br from-cinder-400 to-cinder-700 text-gray-100 rounded-lg shadow-lg p-4 mb-4 mx-2 w-full  md:w-4/6 lg:w-3/12 xl:w-2/12 cursor-pointer"
              onClick={() => handleButtonDetails(register.id)}
            >
              <h3 className="text-xl font-bold mb-2 truncate">
                {register.title}
              </h3>
              <p className="mb-1 truncate">Login: {register.login}</p>
              <p className=" truncate">Website: {register.website}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
