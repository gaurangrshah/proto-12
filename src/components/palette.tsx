import { useEffect } from 'react';
import { usePaletteState } from '@/contexts/palette.context';
import { getLocalUserPrefs } from 'lib/nedb/handlers';
import { usePrefs } from 'lib/nedb/queries';

import { SwatchWrapper } from './swatch';

export const Palette: React.FC = () => {
  const { palette } = usePaletteState();

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
    <div className="palette flex-responsive-full">
      {palette?.length
        ? palette.map((swatch, i) => {
            return <SwatchWrapper key={swatch} index={i} swatch={swatch} />;
          })
        : null}
    </div>
  );
};
