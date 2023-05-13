import { useRef, useState } from 'react';

import { useKeyboardShortcut } from './use-keyboard-shortcut';

interface UseFocusProps {
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEscape?: () => void;
  onSpace?: () => void;
}

export function useFocus(props: UseFocusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const active = document.activeElement;
    const isActive = active === ref.current;
    switch (event.key) {
      case ' ':
        if (!isActive) break;
        if (props.onSpace) {
          props.onSpace();
        }
        break;
      case 'Escape':
        if (!isActive) break;
        if (props.onEscape) {
          props.onEscape();
        }
        ref.current?.blur();
        break;
      default:
        return;
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  useKeyboardShortcut<HTMLDivElement>(
    ['ArrowLeft'],
    () => {
      if (!focused) return;
      const siblingLeft = ref.current?.previousElementSibling as HTMLElement;
      siblingLeft?.focus();
    },
    {
      ref: ref,
    }
  );

  useKeyboardShortcut<HTMLDivElement>(
    ['ArrowRight'],
    () => {
      if (!focused) return;
      const siblingRight = ref.current?.nextElementSibling as HTMLElement;
      siblingRight?.focus();
    },
    {
      ref: ref,
    }
  );

  return {
    focused,
    ref,
    props: {
      tabIndex: 0,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
}
