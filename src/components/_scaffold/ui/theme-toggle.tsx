import { useEffect, useState } from 'react';
import { useThemeToggle } from '@/hooks';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export function ThemeToggle({ fixed = false }: { fixed?: boolean }) {
  const [theme, toggleTheme] = useThemeToggle();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  return (
    <button
      className="fixed right-10 top-10 rounded-md border-current bg-gray-950 p-2 text-white hover:bg-gray-800 active:bg-gray-950"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 stroke-current" strokeWidth={1} />
      ) : (
        <SunIcon className="h-5 w-5 stroke-current" />
      )}
    </button>
  );
}
