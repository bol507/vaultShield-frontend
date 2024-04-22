import { useContext } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { useTheme } from 'hooks/useTheme';
import { SvgGear } from 'components/svg/SvgGear';
import { SvgExit } from 'components/svg/SvgExit';
import { ThemeContext } from 'contexts/themeContext';
import ButtonSwitch from 'components/ButtonSwitch';
import { dashboardMainCard, badgeMenuDashboard } from 'styles/tailwind.classes';
import { IconVaultShield } from 'components/svg/IconVaultShield';

const DashboardLayout = () => {
  const { theme } = useTheme();
  const { updateTheme } = useContext(ThemeContext);

  const changeTheme = async () => {
    await updateTheme(theme === 'dark' ? '' : 'dark');
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={dashboardMainCard}>
        <div className="grid sm:grid-cols-5 h-full grid-cols-1 ">
          {/* Side panel */}
          <div className="sm:col-span-1 h-full sm:flex flex-col justify-around items-center px-2  hidden   ">
            {/*  <div
            className={`${badgeMenuDashboard} flex justify-center w-full`}
          ></div> */}
            <div
              className={`${badgeMenuDashboard} h-full w-full flex flex-col items-center`}
            >
              <div className="flex items-center justify-center py-8">
                <IconVaultShield />
              </div>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'w-full dark:bg-cinder-800 dark:bg-opacity-55 bg-cinder-700 bg-opacity-25 py-2 border-r-cinder-700 border-r-2 text-start pl-10'
                    : ' py-2 w-full hover:bg-cinder-300 hover:bg-opacity-50 dark:hover:bg-cinder-800 dark:hover:bg-opacity-30 text-start pl-10'
                }
                to="/"
              >
                My acounts
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'w-full dark:bg-cinder-800 dark:bg-opacity-55 bg-cinder-700 bg-opacity-25 py-2 border-r-cinder-700 border-r-2  text-start pl-10'
                    : 'py-2 w-full  hover:bg-cinder-300 hover:bg-opacity-50 dark:hover:bg-cinder-800 dark:hover:bg-opacity-30  text-start pl-10'
                }
                to="/generator"
              >
                Password generator
              </NavLink>
            </div>
            <div className={`${badgeMenuDashboard} w-full`}>
              <div className="flex pl-6  my-2">
                <ButtonSwitch handleClick={changeTheme} />
              </div>
              <Link
                className="flex justify-start items-center my-1 pl-4"
                to="/settings"
              >
                <SvgGear />
                <span className="ml-2">Settings</span>
              </Link>

              <Link
                className="flex justify-start items-center mt-1 pl-4 mb-1"
                to="/logout"
              >
                <SvgExit />
                <span className="ml-2">Exit</span>
              </Link>
            </div>
          </div>
          {/* panel principal  */}
          <div className="col-span-4 flex flex-col pt-14">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
