import { Outlet } from 'react-router-dom';

import { Menu } from 'components/Menu';
import { GithubIcon } from 'components/svg/GithubIcon';

const HomeLayout = () => {
  return (
    <div className="flex flex-col justify-between h-screen text-white">
      <header className="bg-cinder-750 h-14 w-full flex justify-between items-center py-4 md:p-4 rounded-none md:rounded-b-xl">
        <Menu />
      </header>
      <Outlet />
      <footer className="flex justify-center pt-6 pb-2 border-b-2 border-cinder-750 w-full">
        <a href="https://github.com/VaultShield">
          <GithubIcon />
        </a>
      </footer>
    </div>
  );
};

export default HomeLayout;
