import { useEffect, useRef, useState } from 'react';

import { useKeyboardShortcut } from './use-keyboard-shortcut';

type UseFocusProps = {
  onEscape?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
} & React.ComponentProps<'div'>;

export function useFocus(props: UseFocusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  const prevSiblingFocus = () => {
    if (!isActive || !ref.current) return;
    const prevSibling = ref.current?.previousElementSibling as HTMLDivElement;
    if (prevSibling) {
      prevSibling.focus();
    } else {
      // cycle back to to the last child
      const parent = ref.current.parentElement;
      if (parent) {
        const lastChild = parent.lastElementChild as HTMLDivElement;
        if (lastChild) {
          lastChild.focus();
        }
      }
    }
  };
  const nextSiblingFocus = () => {
    if (!isActive || !ref.current) return;
    const nextSibling = ref.current?.nextElementSibling as HTMLDivElement;
    if (nextSibling) {
      nextSibling.focus();
    } else {
      const parent = ref.current.parentElement;
      if (parent) {
        // cycle back to to the first child
        const firstChild = parent.firstElementChild as HTMLDivElement;
        if (firstChild) {
          firstChild.focus();
        }
      }
    }
  };

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  useEffect(() => {
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

  useKeyboardShortcut(
    ['Alt', 'ArrowLeft'],
    () => {
      prevSiblingFocus();
    },
    {
      ref,
      repeatOnHold: true,
    }
  );
  useKeyboardShortcut(
    ['Alt', 'ArrowRight'],
    () => {
      nextSiblingFocus();
    },
    {
      ref,
      repeatOnHold: true,
    }
  );
  useKeyboardShortcut(
    ['Alt', 'ArrowUp'],
    () => {
      prevSiblingFocus();
    },
    {
      ref,
      repeatOnHold: true,
    }
  );
  useKeyboardShortcut(
    ['Alt', 'ArrowUp'],
    () => {
      nextSiblingFocus();
    },
    {
      ref,
      repeatOnHold: true,
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onEscape: _, ...otherProps } = props; // destrcut for otherProps

  return {
    controls: {
      isActive,
      handleFocus,
      handleBlur,
    },
    isActive,
    ref,
    props: {
      tabIndex: 0,
      ...otherProps,
    },
  };
}
