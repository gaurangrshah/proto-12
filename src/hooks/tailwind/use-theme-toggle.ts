import { useEffect, useState } from 'react';
import { isBrowser } from '@/utils';

const getInitialTheme = (): 'light' | 'dark' => {
  const storedTheme = '';
  if (isBrowser) {
    localStorage.getItem('theme');
  }

  if (storedTheme) {
    return storedTheme === 'dark' ? 'dark' : 'light';
  }
  if (
    isBrowser &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
};

export const useThemeToggle = (): ['light' | 'dark', () => void] => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (): void => {
      setTheme((prevTheme) => {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        return newTheme;
      });
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  return [theme, toggleTheme];
};
