import { useState } from 'react';
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

import { CircleIcon } from './icons';
import { Tooltip } from './tooltip';

export const SwatchWrapper: React.FC<{
  index: number;
  swatch: string;
  key: string;
}> = ({ index, swatch, key }) => {
  const { palette } = usePaletteState();
  const { updatePalette, addSwatch, removeSwatch } = usePaletteDispatch();

  const { isActive, ref, controls, props: focusProps } = useFocus({});
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [newColor, setNewColor] = useState<string>(swatch);

  useKeyboardShortcut(
    [' '],
    () => {
      if (!isActive) return; // ensures that this is not triggered by the editable input
      const generatedColor = generateRandomColor();

      setIsAnimating(true);
      setNewColor(generatedColor);

      setTimeout(() => {
        setIsAnimating(false);
        updatePalette({ index, color: generatedColor });
      }, 300);
    },
    { overrideSystem: false, ignoreInputFields: true, ref }
  );
  const gradientColor = `linear-gradient(to right, ${swatch}, ${newColor})`;

  const addSwatchBefore = () => addSwatch(index + 1);
  const removeCurrentSwatch = () => removeSwatch(index);

  return (
    <div
      ref={ref}
      className={`relative flex h-full w-full flex-1 items-center justify-center focus:outline-none md:h-screen ${
        isAnimating ? 'animate-color-transition' : ''
      }`}
      style={{
        backgroundColor: isAnimating ? gradientColor : swatch,
        color: getContrastColor(swatch ?? '#000'),
      }}
      // #NOTE: focusProps adds: tabIndex + Mouse Enter/Leave + arrow key support
      {...focusProps}
      onMouseEnter={(e) => {
        e.currentTarget.focus();
        setShowControls(true);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.blur();
        setShowControls(false);
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
      ) : isActive && showControls ? (
        <div className="absolute bottom-48 z-[1] flex flex-row gap-3">
          <Tooltip content="Add New Swatch">
            <button
              aria-label="Add New Swatch"
              className="btn btn-square btn-ghost"
              style={{ color: getContrastColor(swatch ?? '#000') }}
              onClick={addSwatchBefore}
              // onClick={console.log}
            >
              <PlusCircleIcon className="w-5" strokeWidth={2} />
            </button>
          </Tooltip>
          <Tooltip content="Remove Icon">
            <button
              aria-label="Remove Current Swatch"
              className="btn btn-square btn-ghost"
              style={{ color: getContrastColor(swatch ?? '#000') }}
              disabled={palette?.length === 1}
            >
              {palette && palette?.length > 1 ? (
                <MinusCircleIcon
                  className="w-5"
                  strokeWidth={2}
                  onClick={removeCurrentSwatch}
                  // onClick={console.log}
                />
              ) : (
                <XCircleIcon className="w-5" strokeWidth={2} />
              )}
            </button>
          </Tooltip>
        </div>
      ) : null}
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 transform flex-col gap-3"></div>
    </div>
  );
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
