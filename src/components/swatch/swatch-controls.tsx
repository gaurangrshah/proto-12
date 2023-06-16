import { useRef } from 'react';
import { usePaletteDispatch } from '@/contexts/palette.context';
import { generateRandomColor, getContrastColor } from '@/utils';
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { CustomTooltip } from 'components/ui/tooltip';

import { CircleIcon, DiceIcon } from '../icons';

export const SwatchControls: React.FC<{
  palette: string[] | null;
  index: number;
  reorder?: boolean;
}> = ({ palette, index, reorder }) => {
  const { updatePalette, addSwatch, removeSwatch } = usePaletteDispatch();
  const addSwatchBefore = () => addSwatch(index + 1);
  const removeCurrentSwatch = () => removeSwatch(index);
  const ref = useRef<HTMLDivElement>(null);
  const contrast = getContrastColor(palette ? String(palette[index]) : '#000');

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
        <div
          ref={ref}
          className={`absolute bottom-48 z-[1] flex flex-row gap-3`}
          style={{ color: contrast }}
        >
          <CustomTooltip
            trigger={{
              Component: (
                <button
                  aria-label="Remove Swatch"
                  onClick={() => {
                    removeCurrentSwatch();
                  }}
                >
                  {palette && palette?.length > 1 ? (
                    <MinusCircleIcon className="w-5" strokeWidth={2} />
                  ) : (
                    <XCircleIcon
                      className="w-6 text-destructive"
                      strokeWidth={2}
                    />
                  )}
                </button>
              ),
              props: {},
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
                <button
                  aria-label="Generate Random Color"
                  onClick={() => {
                    updatePalette({ color: generateRandomColor(), index });
                  }}
                >
                  <DiceIcon className="w-5 fill-current" strokeWidth={2} />
                </button>
              ),
              props: {},
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
              Component: (
                <button
                  aria-label="Add New Swatch"
                  onClick={() => {
                    addSwatchBefore();
                  }}
                >
                  <PlusCircleIcon className="h-5 w-5" strokeWidth={2} />
                </button>
              ),
              props: {},
            }}
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
