import { useRef } from 'react';
import { useClickOutside } from '@/hooks';
import { HexColorPicker } from 'react-colorful';

export function Pickers({
  swatch,
  mode = 'hex', // @TODO: add support for other color modes
  onChange,
  onClose,
}: {
  swatch: string;
  mode: string;
  onChange: (color: string) => void;
  onClose: () => void;
}) {
  const pickerWrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(pickerWrapperRef, () => {
    onClose();
  });
  return (
    <div
      ref={pickerWrapperRef}
      className="absolute z-20 flex h-56 w-56 flex-col items-center justify-center"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      <HexColorPicker color={swatch} onChange={onChange} />
    </div>
  );
}
