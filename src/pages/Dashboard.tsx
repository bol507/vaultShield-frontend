import { useContext, useEffect, useState } from 'react';
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
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getRegisters();
    };
    fetchData();
  }, []);

  useEffect(() => {
    setItems(registers);
    console.log(items);
  }, [registers]);

  const handleButtonNew = () => {
    navigate('/NewRegister');
  };

  const handleButtonDetails = (id: string) => {
    navigate(`/RegisterDetails/${id}`);
  };

  /**
   * draggable feature
   */

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, newIndex) => {
    const oldIndex = event.dataTransfer.getData('text/plain');
    const newItems = [...items];
    const [removedItem] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, removedItem);
    setItems(newItems);
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
        {Array.isArray(items) &&
          items.map((register, index) => (
            <div
              key={register.id}
              className="bg-gradient-to-br from-cinder-400 to-cinder-700 text-gray-100 rounded-lg shadow-lg p-4 mb-4 mx-2 w-full  md:w-4/6 lg:w-3/12 xl:w-2/12 cursor-pointer"
              onClick={() => handleButtonDetails(register.id)}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, index)}
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
