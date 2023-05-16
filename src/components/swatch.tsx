import { useRef } from 'react';
import { useFocus } from '@/hooks';
import { generateRandomColor, getContrastColor } from '@/utils';

import { CircleIcon } from './icons';

export const SwatchWrapper: React.FC<{
  swatch: string;
  updateColor: (color: string) => void;
}> = ({ swatch, updateColor }) => {
  const {
    ref,
    isActive,
    props: focusProps,
  } = useFocus({
    onSpace: () => {
      updateColor(generateRandomColor());
    },
  });

  const handleUpdateColor = (newColor: string) => {
    updateColor(newColor);
    ref.current?.focus();
  };

  return (
    <div
      className={`flex h-auto w-full flex-1 items-center justify-center`}
      style={{
        backgroundColor: swatch,
        color: getContrastColor(swatch ?? '#000'),
      }}
      ref={ref}
      // #NOTE: focused props adds: tabIndex and onKeydown + Mouse Enter/Leave
      {...focusProps}
    >
      <Swatch swatch={swatch} updateColor={handleUpdateColor} />
      {isActive ? (
        <div
          role="img"
          aria-label="active swatch"
          className="invisible absolute bottom-20 z-[1] flex w-full items-center justify-center rounded-md md:visible"
        >
          <CircleIcon className="h-4 w-4 rounded-full bg-current opacity-30" />
        </div>
      ) : null}
    </div>
  );
};

export const Swatch: React.FC<{
  swatch: string;
  updateColor: (color: string) => void;
}> = ({ swatch, updateColor }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateColor(e.currentTarget.textContent || '');
      e.currentTarget.blur();
    }
  };

  const onEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="flex h-44 w-44 items-center justify-center border border-current">
      <div
        ref={ref}
        aria-label="hex-input"
        role="textbox"
        contentEditable={true}
        suppressContentEditableWarning={true}
        data-placeholder={swatch}
        className="z-[2] cursor-text text-3xl"
        onKeyDown={(e) => {
          onEnter(e);
          onEscape(e);
          if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault(); // #keep page from scrolling
          }
        }}
      >
        {swatch}
      </div>
    </div>
  );
};
