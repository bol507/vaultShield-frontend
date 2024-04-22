import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Anchor } from './Anchor';
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
        className={`absolute p-0 m-0 left-0 top-10 bg-cinder-750 w-full z-10 flex-col ${menuOpen ? 'flex' : 'hidden'} md:hidden`}
      >
        <ul className="[&>li]:py-3 [&>li]:w-full w-full pt-3 pb-2">
          <li className="w-full overflow-hidden flex items-center px-4">
            <Anchor direction="/login" name="Login" />
          </li>

          <li className="w-full overflow-hidden flex items-center px-4">
            <Anchor direction="/signup" name="Signup" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
