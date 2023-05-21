import { useState } from 'react';
import { usePaletteDispatch } from '@/contexts/palette.context';
import { useEditableControls, useFocus, useKeyboardShortcut } from '@/hooks';
import { generateRandomColor, getContrastColor } from '@/utils';
import { CursorArrowRippleIcon } from '@heroicons/react/24/outline';

import { CircleIcon } from './icons';
import { Popover } from './popover';

export const SwatchWrapper: React.FC<{
  index: number;
  swatch: string;
}> = ({ index, swatch }) => {
  const { updatePalette } = usePaletteDispatch();

  const { isActive, ref, controls, props: focusProps } = useFocus({});
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
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

  return (
    <div
      ref={ref}
      className={`flex h-auto w-full flex-1 items-center justify-center focus:outline-none ${
        isAnimating ? 'animate-color-transition' : ''
      }`}
      style={{
        backgroundColor: isAnimating ? gradientColor : swatch,
        color: getContrastColor(swatch ?? '#000'),
      }}
      {...focusProps}
      // #NOTE: focusProps adds: tabIndex and onKeydown + Mouse Enter/Leave
    >
      <Swatch
        swatch={swatch}
        index={index}
        updateColor={updatePalette}
        controls={controls}
      />
      {isActive ? (
        <div
          role="img"
          aria-label="active swatch"
          className="invisible absolute bottom-20 z-[1] rounded-md md:visible"
        >
          <CircleIcon className="h-4 w-4 rounded-full bg-current opacity-30" />
        </div>
      ) : null}
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
