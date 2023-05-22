import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import {
  convertPalette,
  generateRandomColor,
  insertAtIndex,
  removeFromArrayAtIndex,
} from '@/utils';

type PaletteProviderFC = React.FC<PropsWithChildren<{ colors: string }>>;
interface PaletteState {
  palette: string[] | null;
}

type updatePaletteArgs = { index: number; color: string };
interface PaletteDispatch {
  updatePalette: ({ color }: updatePaletteArgs) => void;
  addSwatch: (index: number) => void;
  removeSwatch: (index: number) => void;
}

export const PaletteStateContext = createContext({} as PaletteState);
export const PaletteDispatchContext = createContext({} as PaletteDispatch);

export const PaletteProvider: PaletteProviderFC = ({ colors, children }) => {
  const router = useRouter();
  const [palette, setPalette] = useState<PaletteState['palette']>(null);

  useEffect(() => {
    // @NOTE: ensures the page will refresh when using the back/fwd browser buttons.
    setPalette(colors ? convertPalette.parse(colors) : ['#BADA55']);
  }, [colors]);

  useEffect(() => {
    if (!palette || !palette?.length) return;
    const paletteString = convertPalette.stringify(palette);
    if (colors === paletteString) return;
    router.push({
      pathname: '/editor',
      query: { colors: paletteString },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette]);

  const updatePalette = useCallback(
    ({ index, color }: updatePaletteArgs) => {
      if (!palette || !palette.length) return;
      const _palette = [...palette];
      if (_palette[index] === color) return;
      _palette[index] = color;
      setPalette(_palette);
    },
    [palette]
  );

  const addSwatch = useCallback(
    (index: number) => {
      if (!palette || !palette.length) return;
      const _palette = [...palette];
      const newPalette = insertAtIndex(_palette, index, generateRandomColor());
      setPalette(newPalette);
    },
    [palette]
  );

  const removeSwatch = useCallback(
    (index: number) => {
      if (!palette || !palette.length || palette.length === 1) return;
      const _palette = [...palette];
      const newPalette = removeFromArrayAtIndex(_palette, index);
      setPalette(newPalette);
    },
    [palette]
  );

  const state = useMemo(() => ({ palette }), [palette]);
  const dispatch = useMemo(
    () => ({ updatePalette, addSwatch, removeSwatch }),
    [updatePalette, addSwatch, removeSwatch]
  );

  return (
    <PaletteStateContext.Provider value={state}>
      <PaletteDispatchContext.Provider value={dispatch}>
        {children}
      </PaletteDispatchContext.Provider>
    </PaletteStateContext.Provider>
  );
};

export function usePaletteState(): PaletteState {
  const context = useContext(PaletteStateContext);
  if (context === undefined) {
    throw new Error('usePaletteState must be used within a PaletteProvider');
  }

  return context;
}

export function usePaletteDispatch(): PaletteDispatch {
  const context = useContext(PaletteDispatchContext);
  if (context === undefined) {
    throw new Error('usePaletteState must be used within a PaletteProvider');
  }
  return context;
}
