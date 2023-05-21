import { useRef } from 'react';

export function useEditableControls<T extends HTMLElement | HTMLInputElement>({
  onEnter,
  onEscape,
  props = {},
}: {
  onEnter?: (e: React.KeyboardEvent<T>) => void;
  onEscape?: (e: React.KeyboardEvent<T>) => void;
  onFocus?: (e: React.KeyboardEvent<T>) => void;
  props?: React.ComponentProps<'div'>;
}) {
  const ref = useRef<T>(null);
  function onKeyDown(e: React.KeyboardEvent<T>) {
    e.stopPropagation(); // ensures that the keyboard events do not bubble up to swatch wrapper
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent new line in contentEditable
      ref.current?.blur();
      if (onEnter) {
        onEnter(e);
      } else {
        console.log('onEnter not defined', ref.current, e);
      }
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      ref.current?.blur();
      if (onEscape) {
        onEscape(e);
      } else {
        console.warn('onEscape not defined', { ref: ref.current, e });
      }
    }
  }

  const onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    props?.onFocus?.(e);
    if (e.currentTarget !== document.activeElement) return;
    // @NOTE: execCommand is deprecated, but still works: @SEE: https://stackoverflow.com/a/3805897
    // @UPDATE: added request animation frame otherwise chrome selects all elements indiscriminately
    // @ SEE: https://stackoverflow.com/a/52926437
    requestAnimationFrame(() => document.execCommand('selectAll'));
  };

  return { ref, props: { onKeyDown, onFocus, ...props } };
}
