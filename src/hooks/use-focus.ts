import { useEffect, useRef, useState } from 'react';
import { isBrowser } from '@/utils';

import { useKeyboardShortcut } from './use-keyboard-shortcut';

type UseFocusProps = {
  onEscape?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onSpace?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
} & React.ComponentProps<'div'>;

export function useFocus(props: UseFocusProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isBrowser) {
      ref.current?.addEventListener('focus', () => setIsActive(true));
      ref.current?.addEventListener('blur', () => setIsActive(false));
    }
    const current = ref.current;
    return () => {
      if (isBrowser) {
        current?.removeEventListener('focus', () => setIsActive(true));
        current?.removeEventListener('blur', () => setIsActive(false));
      }
    };
  }, []);

  const handleFocus = () => {
    if (isActive && ref.current) {
      ref.current.focus();
    }
  };
  const handleBlur = () => {
    if (isActive && ref.current) {
      ref.current.blur();
    }
  };

  const onSpace = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isActive && e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (props.onSpace) props.onSpace(e);
    }
  };

  const onEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isActive && e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      if (props.onEscape) props.onEscape(e);
      e.currentTarget?.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onSpace(e);
    onEscape(e);
  };

  useKeyboardShortcut<HTMLDivElement>(
    ['ArrowLeft'],
    () => {
      if (!isActive) return;
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
      if (!isActive) return;
      const siblingRight = ref.current?.nextElementSibling as HTMLElement;
      siblingRight?.focus();
    },
    {
      ref: ref,
    }
  );

  delete props.onEscape;
  delete props.onSpace;
  return {
    controls: {
      handleFocus,
      handleBlur,
    },
    isActive,
    ref,
    props: {
      tabIndex: 0,
      onKeyDown: handleKeyDown,
      onMouseEnter: () => ref.current?.focus(),
      onMouseLeave: () => ref.current?.blur(),
      ...props,
    },
  };
}
