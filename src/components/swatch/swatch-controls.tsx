import { usePaletteDispatch } from '@/contexts/palette.context';
import { generateRandomColor } from '@/utils';
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
                asChild: false,
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
                asChild: false,
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
                asChild: false,
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
