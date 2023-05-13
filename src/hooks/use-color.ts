import { useEffect, useState } from 'react';

export function useColor({
  initialColor,
  setPaletteColor,
}: {
  initialColor: string;
  setPaletteColor: (color: string) => void;
}) {
  const [color, setColor] = useState<string>(initialColor);

  const updateColor = (color: string) => {
    setColor(color);
  };

  useEffect(() => {
    setPaletteColor(color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return { color, updateColor };
}
