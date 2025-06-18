import React, { useContext } from 'react';
import { DarkModeContext } from '@/contexts/DarkModeContext';
import { Switch } from '@headlessui/react';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext)!;

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span
        className={`${
          isDarkMode ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};

export default DarkModeToggle;
