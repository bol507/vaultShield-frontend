// eslint-disable-next-line @typescript-eslint/no-unused-vars

//import Table from 'components/Table';
//import { useState } from 'react';
//import { badgeMenuDashboard } from 'styles/tailwind.classes';
//hooks
import { useUser } from 'hooks/useUser';
//components
import KeyPair from 'components/KeyPair';

const Welcome = () => {
  const { user } = useUser();
  return (
    <div className="mt-4 dark:text-white">
      <h1>Welcome! {user?.username}</h1>
      <p>
        For better use of the application we need to create keys that will help
        us encrypt the information
      </p>
      <KeyPair />
    </div>
  );
};

export default Welcome;
