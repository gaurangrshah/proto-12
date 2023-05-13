import { useCallback, useEffect, useMemo, useState } from 'react';

export function useDisclosure({
  defaultIsOpen = false,
}: {
  defaultIsOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(defaultIsOpen);
  }, [defaultIsOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  const returnValue = useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
      setIsOpen,
    }),
    [isOpen, open, close, toggle, setIsOpen]
  );

  return returnValue;
}
