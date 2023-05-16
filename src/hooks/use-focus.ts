import { useEffect, useRef, useState } from 'react';

import { useKeyboardShortcut } from './use-keyboard-shortcut';

type UseFocusProps = {
  onEscape?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onSpace?: () => void;
} & React.ComponentProps<'div'>;

export function useFocus(props: UseFocusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      setIsActive(true);
    };

    const handleBlur = () => {
      setIsActive(false);
    };

    const current = ref.current;

    if (current) {
      current.addEventListener('focus', handleFocus);
      current.addEventListener('blur', handleBlur);
    }

    return () => {
      if (current) {
        current.removeEventListener('focus', handleFocus);
        current.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  const handleFocus = () => {
    ref.current?.focus();
  };

  const handleBlur = () => {
    ref.current?.blur();
  };

  const onEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isActive && e.key === 'Escape' && props.onEscape) {
      e.preventDefault();
      e.stopPropagation();
      props.onEscape(e);
      e.currentTarget.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onEscape(e);
  };

  useKeyboardShortcut<HTMLElement>(
    ['ArrowLeft'],
    () => {
      if (!isActive) return;
      const siblingLeft = ref.current
        ?.previousElementSibling as HTMLElement | null;
      siblingLeft?.focus();
    },
    { ref }
  );

  useKeyboardShortcut<HTMLElement>(
    ['ArrowRight'],
    () => {
      if (!isActive) return;
      const siblingRight = ref.current
        ?.nextElementSibling as HTMLElement | null;
      siblingRight?.focus();
    },
    { ref }
  );
  useKeyboardShortcut<HTMLElement>(
    ['ArrowUp'],
    () => {
      if (!isActive) return;
      const siblingLeft = ref.current
        ?.previousElementSibling as HTMLElement | null;
      siblingLeft?.focus();
    },
    { ref }
  );

  useKeyboardShortcut<HTMLElement>(
    ['ArrowDown'],
    () => {
      if (!isActive) return;
      const siblingRight = ref.current
        ?.nextElementSibling as HTMLElement | null;
      siblingRight?.focus();
    },
    { ref }
  );

  useKeyboardShortcut(
    [' '],
    () => {
      if (!isActive) return;
      props.onSpace?.();
      ref.current?.focus();
    },
    { ref }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onEscape: _, onSpace: __, ...otherProps } = props; // destrcut for otherProps

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
      ...otherProps,
    },
  };
}
