/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
//contexts
import { ThemeContext } from 'contexts/themeContext';
//hooks
import { useTheme } from 'hooks/useTheme';
//components
import Hamburg from 'components/Hamburg';
import { IconVaultShield } from 'components/svg/IconVaultShield';
import { SvgGear } from 'components/svg/SvgGear';
import { SvgExit } from 'components/svg/SvgExit';
import { MagnifyingGlass } from 'components/svg/MagnifyingGlass';
import { PersonRound } from 'components/svg/PersonRound';
import SubMenu from 'components/SubMenu';

const DashboardLayout = () => {
  const { theme } = useTheme();
  const { updateTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  // control menu sidebar
  const [menuOpen, setMenuOpen] = useState(false);
  //submenu Acctoun
  const [subAccount, setSubAccount] = useState(false);

  const elementsSubMenu = [
    {
      text: 'Settings account',
      path: 'settings',
      svg: <SvgGear width="16" height="16" />
    },
    {
      text: 'Exit',
      path: 'logout',
      svg: <SvgExit width="16" height="16" />
    }
  ];

  const changeTheme = async () => {
    await updateTheme(theme === 'dark' ? '' : 'dark');
  };

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleSubAccount = () => {
    setSubAccount(!subAccount);
    console.log(subAccount);
  };

  const handlenNewRegister = () => {
    navigate('/NewRegister');
    handleMenu();
  };
  return (
    <div className="flex flex-col justify-between h-full w-full z-0 ">
      <nav className="bg-cinder-700 h-12 w-full flex justify-between items-center px-1 dark:text-white relative ">
        <Hamburg handleMenu={handleMenu} menuOpen={menuOpen} />
        <IconVaultShield className="hidden md:block" />
        <MagnifyingGlass className="mr-4 block md:hidden" />
        {/* Menu*/}
        <div
          className={`absolute w-full  p-0 m-0 left-0 top-12 h-max bg-cinder-800 flex-col ${menuOpen ? 'flex' : 'hidden'} md:hidden`}
        >
          <ul className="[&>li]:py-3 [&>li]:w-full w-full pt-3 pb-2">
            <li
              className="w-full overflow-hidden flex items-center px-4"
              onClick={handlenNewRegister}
            >
              <div className="relative rounded-full w-8 h-8 bg-cinder-500 flex items-center justify-center dark:text-white">
                <span className="absolute top-[2px]">+</span>
              </div>
              <span className="ml-1 dark:text-white"> New register</span>
            </li>

            <li className="w-full relative   px-4">
              <div
                className="flex items-center pointer "
                onClick={() => handleSubAccount()}
              >
                <PersonRound />
                <span className="ml-1">Account</span>
              </div>
            </li>
            {subAccount && <SubMenu elements={elementsSubMenu} />}
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
