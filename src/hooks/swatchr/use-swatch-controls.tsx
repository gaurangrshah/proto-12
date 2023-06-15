import { useMemo } from 'react';
import {
  usePaletteDispatch,
  usePaletteState,
} from '@/contexts/palette.context';
import { generateRandomColor } from '@/utils';
import {
  CheckIcon,
  MinusCircleIcon,
  PaletteIcon,
  PlusCircleIcon,
} from 'lucide-react';

import { CircleIcon, DiceIcon } from '@/components/icons';

export function useSwatchControls({ index }: { index: number }) {
  const { palette } = usePaletteState();
  const { updatePalette, removeSwatch, addSwatch } = usePaletteDispatch();

  const paletteManagement = useMemo(
    () => [
      'Palette Management',
      [
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
      ],
    ],
    [addSwatch, index]
  );

  const swatchActions = useMemo(
    () => [
      'Swatch Actions',
      [
        {
          label: 'Remove Swatch',
          icon: <MinusCircleIcon className="h-4 w-4" />,
          onClick: () => removeSwatch(index),
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
    ],
    [index, updatePalette, removeSwatch]
  );

  const paletteActions = useMemo(
    () => [
      {
        label: 'Swatches',
        icon: <PaletteIcon className="h-4 w-4" />,
        sub: palette?.map((color, i) => ({
          label: `Swatch ${i + 1}`,
          icon: (
            <CircleIcon
              className={`h-4 w-4 ${
                // color === swatch ? 'rounded-full border-2 border-current' : ''
                color === palette[index]
                  ? 'rounded-full border-2 border-current'
                  : ''
              }`}
              style={{ fill: color }}
            />
          ),
          sub: [
            {
              label: 'Generate Random Color',
              icon: <DiceIcon className="h-4 w-4 fill-current" />,
              onClick: () => {
                updatePalette({ index: i, color: generateRandomColor() });
              },
            },
            {
              label: 'Remove Swatch',
              icon: <MinusCircleIcon className="h-4 w-4" />,
              onClick: () => {
                removeSwatch(index);
              },
            },
          ],
        })),
      },
    ],
    [palette, index, removeSwatch, updatePalette]
  );

  return useMemo(
    () => [swatchActions, paletteManagement, paletteActions],
    [swatchActions, paletteManagement, paletteActions]
  );
}
