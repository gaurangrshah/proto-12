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

import { useLocalStorage } from '../use-local-storage';

export function useSwatchControls({ index }: { index: number }) {
  const { palette } = usePaletteState();
  const { updatePalette, removeSwatch, addSwatch } = usePaletteDispatch();
  const [picker, setPicker] = useLocalStorage('picker', false);
  return useMemo(
    () => [
      {
        label: 'Palette',
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
          ],
        })),
      },
      {
        label: 'Toggle Picker',
        icon: picker ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <CircleIcon className="stroke h-4 w-4 fill-transparent" />
        ),
        onClick: () => {
          setPicker(!picker);
        },
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
    [palette, index, addSwatch, removeSwatch, updatePalette]
  );
}
