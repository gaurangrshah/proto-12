import { useCallback, useEffect, useRef, useState } from 'react';

import { useKeyboardShortcut } from './use-keyboard-shortcut';

type UseFocusProps = {
  index: number;
  onEscape?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
} & React.ComponentProps<'div'>;

export function useFocus<T extends HTMLElement>(props: UseFocusProps) {
  const ref = useRef<T>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(() => {
    const storedIndex = localStorage.getItem('activeIndex');
    return storedIndex ? parseInt(storedIndex, 10) : props.index;
  });

  const prevSiblingFocus = () => {
    const prevSibling = ref.current?.previousElementSibling as T;
    if (prevSibling) {
      setActiveIndex((prevIndex) => (prevIndex ? prevIndex - 1 : null));
      prevSibling.focus();
    } else {
      const parent = ref.current?.parentElement;
      if (parent) {
        const lastChild = parent.lastElementChild as T;
        if (lastChild) {
          setActiveIndex((prevIndex) => {
            if (prevIndex === 0)
              return parseInt(lastChild.getAttribute('data-index') || '0', 10);
            return prevIndex;
          });
          lastChild.focus();
        }
      }
    }
  };

  const nextSiblingFocus = () => {
    const nextSibling = ref.current?.nextElementSibling as T;
    if (nextSibling) {
      setActiveIndex((prevIndex) => (prevIndex ? prevIndex + 1 : null));
      nextSibling.focus();
    } else {
      const parent = ref.current?.parentElement;
      if (parent) {
        const firstChild = parent.firstElementChild as T;
        if (firstChild) {
          setActiveIndex((prevIndex) => {
            const nextIndex = parseInt(
              firstChild.getAttribute('data-index') || '0',
              10
            );
            if (prevIndex === nextIndex) return 0;
            return prevIndex;
          });
          firstChild.focus();
        }
      }
    }
  };

  const handleFocus = useCallback(() => {
    setActiveIndex(props.index);
  }, [props.index]);

  const handleBlur = useCallback(() => {
    setActiveIndex(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setActiveIndex(props.index);
  }, [props.index]);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  useEffect(() => {
    const current = ref.current;

    if (current) {
      current.addEventListener('focus', handleFocus);
      current.addEventListener('blur', handleBlur);
      current.addEventListener('mouseenter', handleMouseEnter);
      current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (current) {
        current.removeEventListener('focus', handleFocus);
        current.removeEventListener('blur', handleBlur);
        current.removeEventListener('mouseenter', handleMouseEnter);
        current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [handleBlur, handleFocus, handleMouseEnter, handleMouseLeave]);

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

  useEffect(() => {
    if (!activeIndex) return;
    localStorage.setItem('activeIndex', activeIndex.toString());
    if (ref.current) {
      ref.current.setAttribute('data-index', activeIndex.toString());
    }
  }, [activeIndex]);

  const { onEscape: _, ...otherProps } = props;

  const isActive = props.index === activeIndex;

  return {
    controls: {
      isActive,
      handleFocus,
      handleBlur,
    },
    ref,
    props: {
      tabIndex: 0,
      ...otherProps,
    },
  };
}
