import { Outlet } from 'react-router-dom';

import Menu from 'components/Menu';
import { GithubIcon } from 'components/svg/GithubIcon';

const HomeLayout = () => {
  return (
    <div className="flex flex-col justify-between h-screen text-white">
      <header className="bg-cinder-750 h-14 w-full flex justify-between items-center py-4 px-4 lg:rounded-b-xl relative  ">
        <Menu />
      </header>
      <Outlet />
      <footer className="flex justify-center h-14 dark:bg-cinder-700 pt-6 pb-2 border-t-2 border-cinder-750 w-full lg:rounded-t-xl">
        <a href="https://github.com/bol507/vaultShield-frontend">
          <GithubIcon />
        </a>
      </footer>
    </div>
  );
};

export default HomeLayout;
