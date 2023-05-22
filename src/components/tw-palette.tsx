import { useRef } from 'react';
import { getContrastColor } from '@/utils';
import { Popover as Popper } from '@headlessui/react';

import { useComputedStyle } from '@/hooks/use-computed-style';

import { Popover } from './popover';

const COLORS_LIGHT = [
  'bg-foreground_',
  'bg-foreground__focused',
  'bg-foreground__muted',
  'bg-background_',
  'bg-background__focused',
  'bg-background__muted',
  'bg-primary_',
  'bg-primary__focused',
  'bg-primary__muted',
  'bg-secondary_',
  'bg-secondary__focused',
  'bg-secondary__muted',
  'bg-neutral_',
  'bg-neutral__focused',
  'bg-neutral__muted',
  'bg-error_',
  'bg-error__focused',
  'bg-error__muted',
  'bg-success_',
  'bg-success__focused',
  'bg-success__muted',
  'bg-info_',
  'bg-info__focused',
  'bg-info__muted',
  'bg-warning_',
  'bg-warning__focused',
  'bg-warning__muted',
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
