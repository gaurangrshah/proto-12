import { useState } from 'react';
import { useRouter } from 'next/router';
import { convertPalette } from '@/utils';

import { SwatchWrapper } from './swatch';

export const PaletteEditor: React.FC<{ colors: string[] }> = ({ colors }) => {
  const router = useRouter();

  const [palette, setPalette] = useState<string[]>(colors);

  const handleColorUpdate = (updatedPalette: string[]) => {
    router.push({
      pathname: '/editor',
      query: { colors: convertPalette.stringify(updatedPalette) },
    });
  };

  const handleColorChange = (index: number) => (newColor: string) => {
    const updatedColors = [...colors];
    if (updatedColors[index] === newColor) return;
    updatedColors[index] = newColor;
    setPalette(updatedColors);
    handleColorUpdate(updatedColors);
  };

  return (
    <Palette
      palette={palette}
      updateColor={handleColorChange}
      key={convertPalette.stringify(palette)}
    />
  );
};

export const Palette: React.FC<{
  palette: string[];
  updateColor: (index: number) => (color: string) => void;
}> = ({ palette, updateColor }) => {
  return (
    <div className="flex h-full w-screen flex-col overflow-hidden md:h-screen md:w-full  md:flex-row">
      {palette.map((swatch, i) => {
        return (
          <SwatchWrapper
            swatch={swatch}
            key={swatch}
            updateColor={updateColor(i)}
          />
        );
      })}
    </div>
  );
};
