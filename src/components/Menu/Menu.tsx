import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconVaultShield } from 'components/svg/IconVaultShield';
import { CloseMenuIcon, OpenMenuIcon } from 'components/svg/MenuIcon';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="flex justify-between items-center w-full z-20 px-1 md:px-4 ">
      <div className="w-[172px] flex justify-center sm:justify-start">
        <Link to="/">
          <IconVaultShield />
        </Link>
      </div>
      <ul className="md:flex gap-4 w-[172px] hidden  md:visible  justify-between">
        <li className="flex  w-full items-center ">
          <Link to="/login">Login</Link>
        </li>

        <li className="w-full flex items-center">
          <Link to="/signup">Signup</Link>
        </li>
      </ul>

      {/* menu in sm */}
      <div className="flex flex-col items-end md:hidden w-auto ">
        <button
          onClick={handleMenuOpen}
          className={`flex items-center ${menuOpen ? 'hidden' : ' text-white py-2 px-4 '}`}
        >
          <OpenMenuIcon />
        </button>

        <button
          onClick={handleMenuClose}
          className={`flex items-center ${menuOpen ? ' text-white py-2 px-4' : 'hidden'}`}
        >
          <CloseMenuIcon />
        </button>
      </div>
      <div
        id="menu"
        className={`absolute p-0 m-0 left-0 top-11 bg-cinder-750 w-full z-10 flex-col ${menuOpen ? 'flex' : 'hidden'} md:hidden`}
      >
        <ul className="[&>li]:py-3 [&>li]:w-full w-full pt-3 pb-2">
          <li className="w-full overflow-hidden flex items-center px-4">
            <Link
              to="/login"
              className=" cursor-pointer rounded-lg text-center bg-cinder-50 w-full hover:bg-[#d9d5ff] hover:text-cinder-800 mt-0  max-w-full m-0 py-2  text-cinder-750 box-border "
            >
              Login
            </Link>
          </li>

          <li className="w-full overflow-hidden flex items-center px-4">
            <Link
              to="/signup"
              className=" cursor-pointer rounded-lg text-center bg-cinder-50 w-full hover:bg-[#d9d5ff] hover:text-cinder-800 mt-0  max-w-full m-0 py-2  text-cinder-750 box-border "
            >
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
