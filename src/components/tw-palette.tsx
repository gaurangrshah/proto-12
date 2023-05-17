import { useRef } from 'react';
import { getContrastColor } from '@/utils';
import { Popover as Popper } from '@headlessui/react';

import { useComputedStyle } from '@/hooks/use-computed-style';

import { Popover } from './popover';

const COLORS_LIGHT = [
  'bg-foreground',
  'bg-foreground_focused',
  'bg-foreground_muted',
  'bg-background',
  'bg-background_focused',
  'bg-background_muted',
  'bg-primary',
  'bg-primary_focused',
  'bg-primary_muted',
  'bg-secondary',
  'bg-secondary_focused',
  'bg-secondary_muted',
  'bg-neutral',
  'bg-neutral_focused',
  'bg-neutral_muted',
  'bg-error',
  'bg-error_focused',
  'bg-error_muted',
  'bg-success',
  'bg-success_focused',
  'bg-success_muted',
  'bg-info',
  'bg-info_focused',
  'bg-info_muted',
  'bg-warning',
  'bg-warning_focused',
  'bg-warning_muted',
];

function ColorSquare({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { bg } = useComputedStyle<HTMLDivElement>({
    ref,
    style: 'backgroundColor',
  });

  return (
    <div
      key={`${color}`}
      className={`${color} p-2 text-sm`}
      style={{ color: getContrastColor(bg) }}
      ref={ref}
    >
      <Popover
        btnProps={{
          'aria-label': 'color',
        }}
        btnLabel={color}
      >
        <p className="pb-3 text-xs leading-4">{bg}</p>
      </Popover>
    </div>
  );
}

export function ColorSquares() {
  return (
    <Popper.Group className="flex w-full flex-wrap">
      {COLORS_LIGHT?.length
        ? COLORS_LIGHT.map((color) => <ColorSquare key={color} color={color} />)
        : null}
    </Popper.Group>
  );
}
