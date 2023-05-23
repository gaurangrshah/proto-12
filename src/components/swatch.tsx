import { useEffect, useMemo, useState } from 'react';
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
import { CustomContextMenu } from 'components/ui/context-menu';
import { CustomTooltip } from 'components/ui/tooltip';
import { isBrowser, motion, useAnimation } from 'framer-motion';
import { PaletteIcon } from 'lucide-react';

import { CircleIcon, DiceIcon } from './icons';

const BG_TRANSITION = { duration: 0.5, ease: 'easeInOut' };

export const SwatchWrapper: React.FC<{
  index: number;
  swatch: string;
}> = ({ index, swatch }) => {
  const { palette } = usePaletteState();
  const { updatePalette, removeSwatch, addSwatch } = usePaletteDispatch();

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

  const swatchControls = useMemo(
    () => [
      {
        label: 'Palette',
        icon: <PaletteIcon className="h-4 w-4" />,
        sub: palette?.map((color, i) => ({
          label: `Swatch ${i + 1}`,
          icon: (
            <CircleIcon
              className={`h-4 w-4 ${
                color === swatch ? 'rounded-full border-2 border-current' : ''
              }`}
              style={{ fill: color }}
            />
          ),
        })),
      },
      {
        label: 'Add Swatch Before',
        icon: <PlusCircleIcon className="h-4 w-4" />,
        onClick: () => {
          addSwatch(index);
        },
      },
      {
        label: 'Add Swatch After',
        icon: <PlusCircleIcon className="h-4 w-4" />,
        onClick: () => {
          addSwatch(index + 1);
        },
      },
      {
        label: 'Remove Swatch',
        icon: <MinusCircleIcon className="h-4 w-4" />,
        onClick: () => {
          removeSwatch(index);
        },
      },
      {
        label: 'Generate Random Color',
        icon: <DiceIcon className="h-4 w-4 fill-current" />,
        onClick: () => {
          updatePalette({ index, color: generateRandomColor() });
        },
        shortcut: 'space',
      },
    ],
    [palette, index, swatch, addSwatch, removeSwatch, updatePalette]
  );

  return (
    <motion.div animate={animation}>
      <CustomContextMenu items={swatchControls} title="Swatch Menu">
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
          <motion.div
            initial={{ boxShadow: '0px 0px 20px rgba(0,0,0, 0.05)' }}
            whileHover={{ boxShadow: '0px 0px 20px rgba(0,0,0, 0.25)' }}
            whileTap={{ boxShadow: '0px 0px 20px rgba(0,0,0, 0.25)' }}
            transition={{ duration: 0.33, ease: 'easeInOut', delay: 0.3 }}
            className="relative flex h-56 w-56 cursor-pointer flex-col items-center justify-center rounded-lg"
          >
            <Swatch
              swatch={swatch}
              index={index}
              updateColor={updatePalette}
              controls={controls}
            />
          </motion.div>
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
        </div>
      </CustomContextMenu>
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
    props: {
      onFocus: () => {
        controls.handleBlur();
      },
    },
  });

  const replaced = swatch.replace('#', '');

  return (
    <div className="flex h-44 w-44 items-center justify-center">
      <div className="text-current/30 mr-1 select-none font-dec text-5xl">
        #
      </div>
      <div
        ref={ref}
        aria-label="hex-input"
        role="textbox"
        contentEditable={true}
        suppressContentEditableWarning={true}
        data-placeholder={replaced}
        className="z-[2] cursor-text font-dec text-5xl "
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
