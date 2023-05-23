import { useEffect, useState } from 'react';
import {
  usePaletteDispatch,
  usePaletteState,
} from '@/contexts/palette.context';
import { useEditableControls, useFocus, useKeyboardShortcut } from '@/hooks';
import { generateRandomColor, getContrastColor } from '@/utils';
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { CustomTooltip } from 'components/ui/tooltip';
import { isBrowser, motion, useAnimation } from 'framer-motion';

import { CircleIcon, DiceIcon } from './icons';

const BG_TRANSITION = { duration: 0.5, ease: 'easeInOut' };

export const SwatchWrapper: React.FC<{
  index: number;
  swatch: string;
}> = ({ index, swatch }) => {
  const { palette } = usePaletteState();
  const { updatePalette } = usePaletteDispatch();

  const { isActive, ref, controls, props: focusProps } = useFocus({});
  const [showControls, setShowControls] = useState<boolean>(false);

  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      backgroundColor: swatch,
      transition: BG_TRANSITION,
    });
  }, [swatch, animation]);

  useKeyboardShortcut(
    [' '],
    () => {
      if (!isActive) return; // ensures that this is not triggered by the editable input
      const generatedColor = generateRandomColor();
      setTimeout(() => {
        updatePalette({ index, color: generatedColor });
      }, 300);
    },
    { overrideSystem: false, ignoreInputFields: true, ref }
  );

  return (
    <motion.div animate={animation}>
      <div
        ref={ref}
        className="flex h-full w-full flex-1 items-center justify-center focus:outline-none md:h-screen"
        style={{
          color: getContrastColor(swatch ?? '#000'),
        }}
        onMouseEnter={(e) => {
          e.currentTarget.focus();
          setShowControls(true);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.blur();
          setShowControls(false);
        }}
        // #NOTE: focusProps adds: tabIndex + Mouse Enter/Leave + arrow key support
        {...focusProps}
        onBlur={() => {
          if (!isBrowser) return;
          // @HACK: unselects all selected text from contenteditable div
          // @SEE: https://stackoverflow.com/a/37923136
          window.getSelection()?.removeAllRanges();
        }}
      >
        <Swatch
          swatch={swatch}
          index={index}
          updateColor={updatePalette}
          controls={controls}
        />
        {isActive && !showControls ? (
          <div
            role="img"
            aria-label="active swatch indicator"
            className="invisible absolute bottom-20 z-[1] rounded-md md:visible"
          >
            <CircleIcon className="h-4 w-4 rounded-full bg-current opacity-30" />
          </div>
        ) : (
          <SwatchControls
            showControls={showControls}
            palette={palette}
            index={index}
          />
        )}

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 transform flex-col gap-3"></div>
      </div>
    </motion.div>
  );
};

export const SwatchControls: React.FC<{
  showControls: boolean;
  palette: string[] | null;
  index: number;
}> = ({ showControls, palette, index }) => {
  const { updatePalette, addSwatch, removeSwatch } = usePaletteDispatch();
  const swatch = palette ? palette[index] : null;
  const addSwatchBefore = () => addSwatch(index + 1);
  const removeCurrentSwatch = () => removeSwatch(index);
  const contrast = getContrastColor(swatch ?? '#000');
  return showControls ? (
    <div className="absolute bottom-48 z-[1] flex flex-row gap-3">
      <CustomTooltip
        trigger={{
          Component:
            palette && palette?.length > 1 ? (
              <MinusCircleIcon className="w-5" strokeWidth={2} />
            ) : (
              <XCircleIcon className="w-6 text-destructive" strokeWidth={2} />
            ),
          props: {
            'aria-label': 'Add New Swatch',
            onClick: removeCurrentSwatch,
            style: { color: contrast },
          },
        }}
        className="bg-popover p-2 text-sm text-popover-foreground"
      >
        {palette && palette?.length > 1
          ? 'Remove Current Swatch'
          : "Can't remove last swatch"}
      </CustomTooltip>
      <CustomTooltip
        trigger={{
          Component: <DiceIcon className="w-5 fill-current" strokeWidth={2} />,
          props: {
            'aria-label': 'Generate Random Color',
            style: { color: contrast },
            onClick: () =>
              updatePalette({ color: generateRandomColor(), index }),
          },
        }}
      >
        <div className="flex">
          <p>Random Color</p>
          <span className="ml-2 rounded-md bg-neutral_ p-1 text-xs text-foreground">
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
            style: { color: contrast },
          },
        }}
        className="bg-popover p-2 text-sm text-popover-foreground"
      >
        <div className="flex">
          <p>Add Swatch</p>
        </div>
      </CustomTooltip>
    </div>
  ) : null;
};

export const Swatch: React.FC<{
  index: number;
  swatch: string;
  updateColor: ({ index, color }: { index: number; color: string }) => void;
  controls: {
    isActive: boolean;
    handleFocus: () => void;
    handleBlur: () => void;
  };
}> = ({ index, swatch, updateColor, controls }) => {
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
      controls.handleFocus();
    },
    onFocus: () => {
      controls.handleBlur();
    },
  });

  const replaced = swatch.replace('#', '');

  return (
    <div className="flex h-44 w-44 items-center justify-center border border-current">
      <div className="text-current/30 select-none text-3xl">#</div>
      <div
        ref={ref}
        aria-label="hex-input"
        role="textbox"
        contentEditable={true}
        suppressContentEditableWarning={true}
        data-placeholder={replaced}
        className="z-[2] cursor-text text-3xl"
        {...editableProps}
        onBlur={(e) => {
          if (!e.currentTarget.textContent) {
            e.currentTarget.textContent = swatch.replace('#', '');
          }
          e.currentTarget.textContent.trim();
        }}
      >
        {replaced}
      </div>
    </div>
  );
};
