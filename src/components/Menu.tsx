import { Link } from 'react-router-dom';
import { Anchor } from './Anchor';
import { IconVaultShield } from './svg/IconVaultShield';
import { CloseMenuIcon, OpenMenuIcon } from './svg/MenuIcon';
export function Menu() {
  const menuOpen = () => {
    console.log('hi');

    const menu = document.getElementById('menu');
    const openMenu = document.querySelector('.open-menu');
    const closeMenu = document.querySelector('.close-menu');
    closeMenu?.classList.remove('hidden');
    openMenu?.classList.add('hidden');

    menu?.classList.remove('hidden');
  };
  const menuClose = () => {
    console.log('bye');
    const menu = document.getElementById('menu');
    const openMenu = document.querySelector('.open-menu');
    const closeMenu = document.querySelector('.close-menu');
    menu?.classList.add('hidden');
    openMenu?.classList.remove('hidden');
    closeMenu?.classList.add('hidden');
  };

  return (
    <nav className=" flex justify-center  md:justify-between w-full items-center relative z-20 px-2 md:px-4">
      <div className="w-[172px] flex justify-center sm:justify-start">
        <Link to="/">
          <IconVaultShield />
        </Link>
      </div>

      <ul className="md:flex gap-4 w-[172px] hidden  md:visible  justify-between">
        <li className="flex  w-full items-center ">
          <Anchor direction="/login" name="Login" />
        </li>

        <li className="w-full flex items-center">
          <Anchor direction="/signup" name="Signup" />
        </li>
      </ul>
      <div className="absolute right-2 md:hidden pr-3 md:pr-0 flex flex-col items-end">
        <button
          onClick={() => menuOpen()}
          className="open-menu flex items-center"
        >
          <OpenMenuIcon />
        </button>
        <button
          onClick={() => menuClose()}
          className="close-menu hidden items-center"
        >
          <CloseMenuIcon />
        </button>
      </div>
      <div
        id="menu"
        className="absolute top-10 bg-cinder-750 bg-opacity-75 w-full z-10 flex-col hidden md:hidden"
      >
        <ul className="[&>li]:py-3 [&>li]:w-full w-full pt-3 pb-2">
          <li className="w-full overflow-hidden flex items-center px-4">
            <Anchor direction="/login" name="Login" />
          </li>

          <li className="w-full overflow-hidden flex items-center px-4">
            <Anchor direction="/signup" name="Signup" />
          </li>
          <li>
            <a className="hover:underline text-cinder-100" href="/">
              Home
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
