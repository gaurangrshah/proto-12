import { useCallback, useEffect, useState } from 'react';

type Theme = string;
type ThemeState = [Theme, Theme];
type SetThemeState = React.Dispatch<React.SetStateAction<ThemeState>>;

const isBrowser = typeof window !== 'undefined';

type Strategy = 'class' | 'data';

export function useTheme(themes: ThemeState, strategy: Strategy = 'data') {
  const [theme, setTheme] = useState<ThemeState>(() => {
    const lsVal = isBrowser ? window.localStorage.getItem('theme') : null;
    if (lsVal) {
      const parsedTheme = JSON.parse(lsVal) as ThemeState;
      if (Array.isArray(parsedTheme) && parsedTheme.length === 2) {
        return parsedTheme;
      }
    }

    return themes;
  });

  useEffect(() => {
    if (!isBrowser) return;
    const preferDarkQuery = '(prefers-color-scheme: dark)';
    const mediaQuery = window.matchMedia(preferDarkQuery);

    const handleChange = () => {
      setTheme((prevTheme) => {
        const [currentTheme, altTheme] = prevTheme;
        return mediaQuery.matches
          ? [altTheme, currentTheme]
          : [currentTheme, altTheme];
      });
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('theme', JSON.stringify(theme));
    }
  }, [theme]);

  useEffect(() => {
    if (strategy === 'class') {
      const root = window.document.documentElement;
      root.classList.remove(...themes);
      root.classList.add(theme[0]);
    }

    if (strategy === 'data') {
      const body = window.document.body;
      body.setAttribute('data-theme', theme[0]);
    }
  }, [strategy, theme, themes]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const [currentTheme, altTheme] = prevTheme;
      return [altTheme, currentTheme];
    });
  }, []);

  return [theme[0], toggleTheme] as const;
}
