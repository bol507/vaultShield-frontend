import { CloseMenuIcon, OpenMenuIcon } from 'components/svg/MenuIcon';

const Hamburg = ({ handleMenu, menuOpen }) => {
  const handleClickMenu = () => {
    handleMenu();
  };

  return (
    <div className="flex flex-col items-end md:hidden w-auto m-0 p-0 ">
      <button
        onClick={() => handleClickMenu()}
        className={`flex items-center ${menuOpen ? 'hidden' : ' dark:text-white py-2 px-4 '}`}
      >
        <OpenMenuIcon />
      </button>

      <button
        onClick={() => handleClickMenu()}
        className={`flex items-center ${menuOpen ? ' dark:text-white py-2 px-4' : 'hidden'}`}
      >
        <CloseMenuIcon />
      </button>
    </div>
  );
};

export default Hamburg;
