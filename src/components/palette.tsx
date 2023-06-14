import { useEffect } from 'react';
import {
  usePaletteDispatch,
  usePaletteState,
} from '@/contexts/palette.context';
import { Reorder } from 'framer-motion';
import { getLocalUserPrefs } from 'lib/nedb/handlers';
import { usePrefs } from 'lib/nedb/queries';
import useBreakpoint from 'use-breakpoint';

import { SwatchComponent } from './swatch';

// tw breakpoints: @SEE: https://tailwindcss.com/docs/screens
const TW_BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 };

const BREAKPOINTS = {
  mobile: 0,
  tablet: TW_BREAKPOINTS.md,
  desktop: TW_BREAKPOINTS.lg,
  wide: TW_BREAKPOINTS['2xl'],
};

export const Palette: React.FC<{ reorder: boolean }> = ({ reorder }) => {
  const { data: prefs, isReady, setUserPreferences } = usePrefs();

  const { palette } = usePaletteState();
  const { _setPalette } = usePaletteDispatch();

  const { breakpoint } = useBreakpoint(BREAKPOINTS, 'mobile');

  useEffect(() => {
    if (isReady) return;
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
            return reorder ? (
              <Reorder.Item
                value={swatch}
                key={swatch}
                className="h-full w-full"
              >
                <SwatchComponent swatch={swatch} index={i} reorder={reorder} />
              </Reorder.Item>
            ) : (
              <SwatchComponent
                key={swatch}
                swatch={swatch}
                index={i}
                reorder={reorder}
              />
            );
          })
        : null}
    </Reorder.Group>
  );
};
