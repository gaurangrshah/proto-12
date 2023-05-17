import { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';

type UseComputedStyleProps<T extends HTMLElement> = {
  ref: React.MutableRefObject<T | null>;
  style: string;
};

export function useComputedStyle<T extends HTMLElement>({
  ref,
  style,
}: UseComputedStyleProps<T>) {
  const [bg, setBg] = useState<string>('');
  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      const computedStyle = getComputedStyle(element);
      const backgroundColor = tinycolor(
        computedStyle[style as any]
      ).toHexString();

      setBg(backgroundColor);
    }
  }, [ref, style]);

  return {
    bg,
  };
}
