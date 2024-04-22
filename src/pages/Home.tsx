import CardInfo from 'components/Menu/CardsInfo';
import { Login } from 'components/login';
import Signup from 'components/Signup';

import { PadlockIcon, SecurityIcon } from 'components/svg/IconsCardsInfo';
import { useState } from 'react';

export function Home() {
  const [islogin, setIsLogin] = useState(true);
  const handleLogin = () => {
    setIsLogin(!islogin);
  };
  return (
    <div className="flex md:flex-col md:m-4 lg:flex-row justify-center items-center w-full p-0 m-0">
      <div className="lg:w-6/12 hidden md:flex md:flex-col md:justify-center md:items-center m-0 p-0 ">
        <main className="h-auto flex flex-col justify-center p-0 m-0 ">
          <section className="flex flex-col gap-4 ">
            <h1 className="text-cinder-100 lg:text-7xl md:text-5xl">
              VaultShield
            </h1>
            <p className="text-cinder-700 lg:text-2xl text-xl">
              Password manager
            </p>
          </section>
        </main>
        <section className="hidden sm:flex sm:justify-center sm:items-center py-10 h-32 px-1 ">
          <CardInfo title="Store your passwords">
            <PadlockIcon />
          </CardInfo>
          <CardInfo title="Export your passwords">
            <SecurityIcon />
          </CardInfo>
        </section>
      </div>
      <div className="lg:w-6/12 m-0 p-0">
        {islogin ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <Signup handleSignup={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default Home;
