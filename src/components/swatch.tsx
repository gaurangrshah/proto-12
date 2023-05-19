import { usePaletteDispatch } from '@/contexts/palette.context';
import { useEditableControls, useFocus, useKeyboardShortcut } from '@/hooks';
import { generateRandomColor, getContrastColor } from '@/utils';

import { CircleIcon } from './icons';

export const SwatchWrapper: React.FC<{
  index: number;
  swatch: string;
}> = ({ index, swatch }) => {
  const { updatePalette } = usePaletteDispatch();
  const { isActive, ref, controls, props: focusProps } = useFocus({});

  useKeyboardShortcut(
    [' '],
    () => {
      if (!isActive) return; // needed to ensure that this is not triggered in editable input
      updatePalette({ index, color: generateRandomColor() });
    },
    { overrideSystem: false, ignoreInputFields: true, ref }
  );

  return (
    <div
      ref={ref}
      className={`flex h-auto w-full flex-1 items-center justify-center`}
      style={{
        backgroundColor: swatch,
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
      updateColor({ index, color: '#' + e.currentTarget.textContent || '' });
    },
    onFocus: () => {
      controls.handleBlur();
    },
  });

  const replaced = swatch.replace('#', '');

  return (
    <div className="flex h-44 w-44 items-center justify-center border border-current">
      <div className="text-current/30 text-3xl">#</div>
      <div
        ref={ref}
        aria-label="hex-input"
        role="textbox"
        contentEditable={true}
        suppressContentEditableWarning={true}
        data-placeholder={replaced}
        className="z-[2] cursor-text text-3xl"
        {...editableProps}
      >
        {replaced}
      </div>
    </div>
  );
};
