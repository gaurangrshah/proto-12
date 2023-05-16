import { useRouter } from 'next/router';
import { convertPalette } from '@/utils';

import { SwatchWrapper } from './swatch';

export const PaletteEditor: React.FC<{ colors: string[] }> = ({ colors }) => {
  const router = useRouter();

  const handleColorUpdate = (updatedPalette: string[]) => {
    router.push({
      pathname: '/editor',
      query: { colors: convertPalette.stringify(updatedPalette) },
    });
  };

  const handleColorChange = (index: number) => (newColor: string) => {
    const updatedColors = [...colors];
    updatedColors[index] = newColor;
    handleColorUpdate(updatedColors);
  };

  return (
    <Palette
      colors={colors}
      updateColor={handleColorChange}
      key={convertPalette.stringify(colors)}
    />
  );
};

export const Palette: React.FC<{
  colors: string[];
  updateColor: (index: number) => (color: string) => void;
}> = ({ colors, updateColor }) => {
  return (
    <div className="flex h-full w-screen flex-col overflow-hidden md:h-screen md:w-full  md:flex-row">
      {colors.map((color, i) => {
        return (
          <SwatchWrapper
            color={color}
            key={color}
            updateColor={updateColor(i)}
          />
        );
      })}
    </div>
  );
};
