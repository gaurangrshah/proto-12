import { useRef } from 'react';
import { useFocus } from '@/hooks';
import { generateRandomColor, getContrastColor } from '@/utils';

import { CircleIcon } from './icons';

export const SwatchWrapper: React.FC<{
  color: string;
  updateColor: (color: string) => void;
}> = ({ color, updateColor }) => {
  const {
    ref,
    isActive,
    controls,
    props: focusProps,
  } = useFocus({
    onSpace: (e) => {
      if (updateColor) {
        updateColor(generateRandomColor());
        e.currentTarget?.focus();
      }
    },
  });

  return (
    <div
      className={`flex h-auto w-full flex-1 items-center justify-center`}
      style={{
        backgroundColor: color,
        color: getContrastColor(color ?? '#000'),
      }}
      ref={ref}
      // #NOTE: focused props adds: tabIndex and onKeydown + Mouse Enter/Leave
      {...focusProps}
    >
      <Swatch color={color} updateColor={updateColor} controls={controls} />
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

export const Swatch: React.FC<
  {
    color: string;
    updateColor: (color: string) => void;
    controls?: {
      handleFocus: () => void;
      handleBlur: () => void;
    };
  } & React.ComponentProps<'input'>
> = ({ color, updateColor, controls }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent new line in contentEditable
      e.stopPropagation();
      updateColor(e.currentTarget.innerText);
      e.currentTarget?.blur();
      controls?.handleFocus();
    }
  };

  const onEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget?.blur();
      controls?.handleFocus();
    }
  };

  return (
    <div className="flex h-44 w-44 items-center justify-center border">
      <div
        ref={ref}
        aria-label="hex-input"
        role="textbox"
        contentEditable={true}
        suppressContentEditableWarning={true}
        data-placeholder={color}
        className={`z-[2] cursor-text text-3xl`}
        onKeyDown={(e) => {
          onEnter(e);
          onEscape(e);
          if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.stopPropagation();
          }
        }}
      >
        {color}
      </div>
    </div>
  );
};
