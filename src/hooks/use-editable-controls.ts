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
      (ref.current as T)?.blur();
      if (onEnter) onEnter(e);
      // updateColor(e.currentTarget.textContent || swatch);
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // ref.current?.blur();
      if (onEscape) onEscape(e);
    }
  }

  return { ref, props: { onKeyDown, ...props } };
}
