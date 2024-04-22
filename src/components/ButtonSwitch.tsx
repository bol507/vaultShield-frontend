import { useState } from 'react';
import { SvgDarkIcon } from 'components/svg/SvgDarkIcon';
import { SvgLightIcon } from 'components/svg/SvgLightIcon';

import { useTheme } from 'hooks/useTheme';
const ButtonSwitch = ({ handleClick }) => {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(theme === 'dark');

  const handleButtonClick = () => {
    handleClick();
    switchButton();
  };
  const switchButton = () => {
    setIsDark(!isDark);
  };

  const switchToggleClass = isDark
    ? 'bg-cinder-700 translate-x-full'
    : 'bg-yellow-300 -translate-x-2';

  return (
    <button
      className="w-12 h6 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow"
      onClick={handleButtonClick}
    >
      <div
        id="switch-toggle"
        className={`w-6 h-6 relative rounded-full transition duration-500 transform ${switchToggleClass} p-1 dark:text-yellow-900 text-yellow-100 border-[0.6px]`}
      >
        {isDark ? <SvgDarkIcon /> : <SvgLightIcon />}
      </div>
    </button>
  );
};

export default ButtonSwitch;
