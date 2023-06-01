import { useEffect, useRef, useState } from 'react';

type CSSVariableHookResult = {
  value: string | undefined;
  ref: React.MutableRefObject<HTMLElement | null>;
};

export const useCSSVariable = (variableName: string): CSSVariableHookResult => {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const computedStyle = getComputedStyle(ref.current);
        setValue(computedStyle.getPropertyValue(variableName).trim());
      }
    };

    handleResize(); // Initial value

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [variableName]);

  return { value, ref };
};
