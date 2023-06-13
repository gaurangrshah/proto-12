import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  usePaletteDispatch,
  usePaletteState,
} from '@/contexts/palette.context';
import {
  useClickOutside,
  useEditableControls,
  useFocus,
  useKeyboardShortcut,
} from '@/hooks';
import { generateRandomColor, getContrastColor } from '@/utils';
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { CustomContextMenu } from 'components/ui/context-menu';
import { CustomTooltip } from 'components/ui/tooltip';
import { isBrowser, motion, useAnimation } from 'framer-motion';
import { PaletteIcon } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

import { useSwatchControls } from '@/hooks/swatchr/use-swatch-controls';
import { useDebounce } from '@/hooks/use-debounce';
import { useLocalStorage } from '@/hooks/use-local-storage';

// import { useCSSVariable } from '@/hooks/use-css-variable';

import { Details } from '../details';
import { CircleIcon, DiceIcon } from '../icons';

const BG_TRANSITION = { duration: 0.5, ease: 'easeInOut' };

export function useDynamicColors({
  ref,
  swatch,
}: {
  ref: React.ForwardedRef<HTMLDivElement>;
  swatch: string;
}) {
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      backgroundColor: swatch,
      transition: BG_TRANSITION,
    });
  }, [swatch, animation]);

  useLayoutEffect(() => {
    let currentRef: HTMLDivElement | null = null;

    if (typeof ref === 'function') {
      currentRef = null; // Invoke the callback ref to get the DOM element
    } else {
      currentRef = ref?.current as HTMLDivElement; // Use the current property of MutableRefObject
    }

    if (currentRef) {
      // const isContrastLight = getContrastMode(swatch) === 'light';
      currentRef?.style.setProperty('--bg', swatch);
      currentRef?.style.setProperty('--text', getContrastColor(swatch));
      // ref.current.style.setProperty(
      //   '--popover',
      //   isContrastLight ? 'var(--light-alpha)' : 'var(--dark-alpha))'
      // );
      // ref.current.style.setProperty(
      //   '--popover-foreground',
      //   isContrastLight ? '#000' : '#fff'
      // );
    }
  }, [swatch, ref]);

  return { animation };
}

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
    index: number;
    reorder: boolean;
    updateColor: ({ index, color }: { index: number; color: string }) => void;
    palette: string[] | null;
    isActive: boolean;
  }) => React.ReactNode;
}) => {
  const { palette } = usePaletteState();
  const { updatePalette } = usePaletteDispatch();

  const {
    ref,
    controls,
    props: focusProps,
  } = useFocus<HTMLDivElement>({ index });

  const { animation } = useDynamicColors({ ref, swatch });

  const handleDebouncedChange = useDebounce((newColor: string) => {
    updatePalette({ index, color: newColor });
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

  return (
    <div className="h-full w-full" ref={ref} {...focusProps}>
      <motion.div animate={animation}>
        {children({
          swatch,
          index,
          reorder,
          updateColor: updatePalette,
          palette,
          isActive: controls?.isActive,
        })}
      </motion.div>
    </div>
  );
};

export const SwatchControls: React.FC<{
  palette: string[] | null;
  index: number;
  reorder?: boolean;
}> = ({ palette, index, reorder }) => {
  const { updatePalette, addSwatch, removeSwatch } = usePaletteDispatch();
  const addSwatchBefore = () => addSwatch(index + 1);
  const removeCurrentSwatch = () => removeSwatch(index);

  return (
    <>
      {reorder ? (
        <div
          role="img"
          aria-label="active swatch indicator"
          className="invisible absolute bottom-20 z-[1] rounded-md md:visible"
        >
          <CircleIcon className="h-4 w-4 rounded-full bg-current opacity-30" />
        </div>
      ) : (
        <div className="absolute bottom-48 z-[1] flex flex-row gap-3">
          <CustomTooltip
            trigger={{
              Component:
                palette && palette?.length > 1 ? (
                  <MinusCircleIcon className="w-5" strokeWidth={2} />
                ) : (
                  <XCircleIcon
                    className="w-6 text-destructive"
                    strokeWidth={2}
                  />
                ),
              props: {
                'aria-label': 'Add New Swatch',
                onClick: removeCurrentSwatch,
              },
            }}
            className="p-2 text-sm"
          >
            {palette && palette?.length > 1
              ? 'Remove Current Swatch'
              : "Can't remove last swatch"}
          </CustomTooltip>
          <CustomTooltip
            trigger={{
              Component: (
                <DiceIcon className="w-5 fill-current" strokeWidth={2} />
              ),
              props: {
                'aria-label': 'Generate Random Color',
                onClick: () =>
                  updatePalette({ color: generateRandomColor(), index }),
              },
            }}
          >
            <div className="flex">
              <p>Random Color</p>
              <span className="ml-2 rounded-md bg-background/30 p-1 text-xs">
                space
              </span>
            </div>
          </CustomTooltip>
          <CustomTooltip
            trigger={{
              Component: <PlusCircleIcon className="w-5" strokeWidth={2} />,
              props: {
                'aria-label': 'Add New Swatch',
                onClick: addSwatchBefore,
              },
            }}
            className="p-2 text-sm"
          >
            <div className="flex">
              <p>Add Swatch</p>
            </div>
          </CustomTooltip>
        </div>
      )}
    </>
  );
};

export const Swatch: React.FC<{
  index: number;
  swatch: string;
  updateColor: ({ index, color }: { index: number; color: string }) => void;
  palette: string[] | null;
  reorder: boolean;
  isActive: boolean;
}> = ({ index, swatch, updateColor, palette, reorder, isActive }) => {
  const { updatePalette } = usePaletteDispatch();
  const swatchControls = useSwatchControls({ index });

  const { ref, props: editableProps } = useEditableControls<HTMLDivElement>({
    onEnter: (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const newColor = '#' + e.currentTarget.textContent?.trim();
      if (!newColor || newColor === swatch) return;
      updateColor({
        index,
        color: newColor ?? swatch,
      });
    },
  });

  const [picker, setPicker] = useLocalStorage('picker', false);

  const replaced = swatch.replace('#', '');

  const handleBlur = () => {
    if (!isBrowser) return;
    // @HACK: unselects all selected text from contenteditable div
    // @SEE: https://stackoverflow.com/a/37923136
    // @SEE: #gvttuW
    window.getSelection()?.removeAllRanges();
  };

  const pickerWrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(pickerWrapperRef, () => {
    setPicker(false);
  });

  const handleDebouncedChange = useDebounce((newColor: string) => {
    updatePalette({ index, color: newColor });
  }, 200);

  const resetOnLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setPicker(false);
  };

  return (
    <CustomContextMenu
      items={swatchControls}
      title="Swatch Menu"
      swatch={swatch}
    >
      <div
        className="foreground flex w-full flex-1 flex-col items-center justify-center focus:outline-none md:h-screen"
        onBlur={handleBlur}
        onMouseLeave={resetOnLeave}
      >
        {!reorder && picker && (
          <div
            ref={pickerWrapperRef}
            className="absolute z-20 -mt-16 flex h-56 w-56 flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
          >
            <HexColorPicker color={swatch} onChange={handleDebouncedChange} />
          </div>
        )}
        <motion.div
          initial={{ boxShadow: '0px 0px 20px rgba(0,0,0, 0.05)' }}
          whileHover={{ boxShadow: '0px 0px 20px rgba(0,0,0, 0.25)' }}
          whileTap={{ boxShadow: '0px 0px 20px rgba(0,0,0, 0.25)' }}
          transition={{ duration: 0.33, ease: 'easeInOut', delay: 0.3 }}
          className="relative flex h-56 w-56 cursor-pointer flex-col items-center justify-center rounded-lg"
          onClick={() => setPicker(!picker)}
        >
          <div className="flex h-44 w-44 items-center justify-center">
            <div className="text-current/30 mr-1 select-none font-dec text-5xl opacity-80">
              #
            </div>
            <div
              ref={ref}
              aria-label="hex-input"
              role="textbox"
              contentEditable={true}
              suppressContentEditableWarning={true}
              data-placeholder={replaced}
              className="z-[2] cursor-text p-1 font-dec text-5xl opacity-80 selection:bg-accent/30 selection:text-background/30"
              {...editableProps}
              onBlur={(e) => {
                if (!e.currentTarget.textContent) {
                  e.currentTarget.textContent = swatch.replace('#', '');
                }
                e.currentTarget.textContent.trim();
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {replaced}
            </div>
          </div>
        </motion.div>

        {!reorder && <Details swatch={swatch} />}
        {isActive && (
          <SwatchControls palette={palette} index={index} reorder={reorder} />
        )}
      </div>
    </CustomContextMenu>
  );
};
