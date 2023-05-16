import { useRef } from 'react';

export function useEditableControls<T extends HTMLElement>({
  onEnter,
  onEscape,
  props = {},
}: {
  onEnter?: (e: React.KeyboardEvent<T>) => void;
  onEscape?: (e: React.KeyboardEvent<T>) => void;
  props?: React.ComponentProps<'div'>;
}) {
  const ref = useRef<T>(null);
  function onKeyDown(e: React.KeyboardEvent<T>) {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent new line in contentEditable
      e.stopPropagation();
      ref.current?.blur();
      if (onEnter) {
        onEnter(e);
      } else {
        console.log('onEnter not defined', ref.current, e);
      }
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      ref.current?.blur();
      if (onEscape) {
        onEscape(e);
      } else {
        console.log('onEscape not defined', ref.current, e);
      }
    }
  }

  return { ref, props: { onKeyDown, ...props } };
}
