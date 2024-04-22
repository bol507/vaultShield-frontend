// eslint-disable-next-line @typescript-eslint/no-unused-vars

import Table from 'components/Table';
import { useState } from 'react';
import { badgeMenuDashboard } from 'styles/tailwind.classes';

const Welcome = () => {
  const [newCredential, setNewCredential] = useState(false);
  return (
    <>
      <header className="w-full text-start bg-opacity-55 py-4 text-xl flex justify-between relative">
        <div className="text-2xl text-cinder-100 w-full text-center">
          My acounts
        </div>
        <div className="absolute right-5">
          <button
            onClick={() => setNewCredential(true)}
            className="bg-white rounded-3xl text-cinder-900 px-4 cursor-pointer py-2 text-sm"
          >
            new credential
          </button>
        </div>
      </header>

      <div
        className={`${badgeMenuDashboard} flex flex-col items-start h-full mr-2 p-0`}
      >
        {' '}
        {!newCredential && <div className="h-7"></div>}
        {newCredential && (
          <div className="w-full flex px-4 justify-between ">
            <div>
              Name of Acount
              <input className="text-cinder-800 ml-4" type="text" />
            </div>
            <div>
              Name User
              <input className="text-cinder-800 ml-4" type="text" />
            </div>
            <div>
              Password
              <input className="text-cinder-800 ml-4" type="text" />
            </div>
            <div>
              <button
                onClick={() => setNewCredential(false)}
                className="bg-white rounded-3xl text-cinder-900 px-4 cursor-pointer py-1 text-sm"
              >
                Okey!
              </button>
            </div>
          </div>
        )}
        <Table />
      </div>
    </>
  );
};

export default Welcome;
