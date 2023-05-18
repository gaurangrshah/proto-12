import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="btn btn-square fixed right-10 top-10 rounded-md"
      onClick={() =>
        currentTheme == 'dark' ? setTheme('light') : setTheme('dark')
      }
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 stroke-current" strokeWidth={1} />
      ) : (
        <SunIcon
          className={`h-5 w-5 stroke-current ${
            theme === 'light' ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
    </button>
  );
}
