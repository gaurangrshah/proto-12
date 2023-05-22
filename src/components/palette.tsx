import { useEffect, useState } from 'react';
import {
  usePaletteDispatch,
  usePaletteState,
} from '@/contexts/palette.context';
import { Reorder } from 'framer-motion';
import { getLocalUserPrefs } from 'lib/nedb/handlers';
import { usePrefs } from 'lib/nedb/queries';
import useBreakpoint from 'use-breakpoint';

import { SwatchWrapper } from './swatch';

const TW_BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }; // tw breakpoints: @SEE: https://tailwindcss.com/docs/screens

const BREAKPOINTS = {
  mobile: 0,
  tablet: TW_BREAKPOINTS.md,
  desktop: TW_BREAKPOINTS.lg,
  wide: TW_BREAKPOINTS['2xl'],
};

export const Palette: React.FC = () => {
  const { palette } = usePaletteState();
  const { _setPalette } = usePaletteDispatch();

  const { breakpoint } = useBreakpoint(BREAKPOINTS, 'mobile');

  const { data: prefs, isLoading, error, setUserPreferences } = usePrefs();

  useEffect(() => {
    if (isLoading) return;
    if (!prefs?.mode) {
      console.warn('loading fresh data data');
      const localPreferences = getLocalUserPrefs();
      if (localPreferences) {
        setUserPreferences(localPreferences);
        console.log('seeded local prefs');
        return;
      } else {
        setUserPreferences({ mode: 'hex' });
        console.log('seeded default prefs');
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Reorder.Group
      className="palette flex-responsive-full h-screen w-screen"
      axis={breakpoint === 'mobile' ? 'y' : 'x'}
      values={palette ?? ['#BADA55']}
      onReorder={_setPalette}
    >
      {palette?.length
        ? palette.map((swatch, i) => {
            return (
              <Reorder.Item
                value={swatch}
                key={swatch}
                className="h-full w-full"
              >
                <SwatchWrapper key={swatch} swatch={swatch} index={i} />
              </Reorder.Item>
            );
          })
        : null}
    </Reorder.Group>
  );
};
