import { useEffect, useLayoutEffect } from 'react';
import {
  usePaletteDispatch,
  usePaletteState,
} from '@/contexts/palette.context';
import { useFocus, useKeyboardShortcut } from '@/hooks';
import { generateRandomColor, getContrastColor } from '@/utils';
import { CustomContextMenu } from 'components/ui/context-menu';
import { motion, useAnimation } from 'framer-motion';

import { useSwatchControls } from '@/hooks/swatchr/use-swatch-controls';
import { useDebounce } from '@/hooks/use-debounce';
import { useLocalStorage } from '@/hooks/use-local-storage';

import { Details } from '../details';
import { Pickers } from './pickers';
import { Swatch } from './swatch';
import { SwatchControls } from './swatch-controls';

const BG_TRANSITION = { duration: 0.5, ease: 'easeInOut' };

export function useDynamicColors({ swatch }: { swatch: string }) {
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      backgroundColor: swatch,
      transition: BG_TRANSITION,
      color: getContrastColor(swatch),
    });
  }, [swatch, animation]);
  return { animation };
}

export const SwatchComponent = ({
  swatch,
  index,
  reorder,
}: {
  swatch: string;
  index: number;
  reorder: boolean;
}) => {
  return (
    <SwatchWrapper reorder={reorder} key={swatch} swatch={swatch} index={index}>
      {({ swatch, updateColor }) => (
        <Swatch swatch={swatch} updateColor={updateColor} />
      )}
    </SwatchWrapper>
  );
};

export const SwatchWrapper = ({
  index,
  swatch,
  reorder,
  children,
}: {
  index: number;
  swatch: string;
  reorder: boolean;
  children: (props: {
    swatch: string;
    updateColor: ({ color }: { color: string }) => void;
  }) => React.ReactNode;
}) => {
  const { animation } = useDynamicColors({ swatch });
  const swatchControls = useSwatchControls({ index });

  const { palette } = usePaletteState();
  const { updatePalette } = usePaletteDispatch();

  const [picker, setPicker] = useLocalStorage('picker', false);

  const {
    ref,
    controls,
    props: focusProps,
  } = useFocus<HTMLDivElement>({ index });

  const updateColor = ({ color }: { color: string }) => {
    updatePalette({ index, color });
  };

  const handleDebouncedChange = useDebounce((newColor: string) => {
    updateColor({ color: newColor });
  }, 200);

  useKeyboardShortcut(
    [' '],
    () => {
      if (!controls?.isActive) return; // ensures that this is not triggered by the editable input
      const generatedColor = generateRandomColor();
      handleDebouncedChange(generatedColor);
    },
    {
      overrideSystem: false,
      ignoreInputFields: true,
      ref: ref as React.RefObject<HTMLElement>,
    }
  );

  const resetOnLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setPicker(false);
  };

  return (
    <div
      ref={ref}
      {...focusProps}
      className="w-full md:h-screen"
      onMouseLeave={resetOnLeave}
    >
      <CustomContextMenu
        items={swatchControls}
        title="Swatch Menu"
        swatch={swatch}
      >
        <motion.div
          animate={animation}
          className="flex h-full w-full flex-1 flex-col items-center justify-center focus:outline-none"
        >
          <div onClick={() => setPicker(!picker)}>
            {!reorder && picker && (
              <Pickers
                swatch={swatch}
                onChange={handleDebouncedChange}
                onClose={() => setPicker(false)}
              />
            )}
            {children({ swatch, updateColor })}
          </div>
          {!reorder && <Details swatch={swatch} />}
          {controls?.isActive && (
            <SwatchControls palette={palette} index={index} reorder={reorder} />
          )}
        </motion.div>
      </CustomContextMenu>
    </div>
  );
};
