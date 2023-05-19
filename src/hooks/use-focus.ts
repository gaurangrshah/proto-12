import { useEffect, useRef, useState } from 'react';

import { useKeyboardShortcut } from './use-keyboard-shortcut';

type UseFocusProps = {
  onEscape?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onSpace?: () => void;
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

  const onLeftArrowDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') prevSiblingFocus();
  };
  const onRightArrowDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') nextSiblingFocus();
  };

  const onEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.currentTarget.blur();
  };

  useKeyboardShortcut([' '], () => props?.onSpace?.(), {
    ref,
    ignoreInputFields: true,
  });

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onEscape(e);
    onLeftArrowDown(e);
    onRightArrowDown(e);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onEscape: _, onSpace: __, ...otherProps } = props; // destrcut for otherProps

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
      onKeyDown,
      // onMouseEnter: () => ref.current?.focus(),
      // onMouseLeave: () => ref.current?.blur(),
      ...otherProps,
    },
  };
}
