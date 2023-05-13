import tinycolor from 'tinycolor2';

export const convertPalette = {
  stringify: (arr: string[]) => {
    try {
      return arr.join('-').replace(/#/g, '');
    } catch (error) {
      console.error(error);
    }
  },
  parse: (str: string) => {
    const hexList = str?.split('-') ?? [];
    return hexList.map((hex) => '#' + hex);
  },
};

export const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function hexToRgb(hexColor: string): [number, number, number] {
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);

  return [r, g, b];
}

export function rgbToHex(color: [number, number, number]) {
  const [r, g, b] = color;
  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function calculateContrastRatio(color1: string, color2: string) {
  const contrast = tinycolor.readability(color1, color2);
  return contrast.toFixed(2);
}

export function rgbaToHex(color: [number, number, number, number]) {
  const [r, g, b, a] = color;
  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a
    .toString(16)
    .padStart(2, '0')}`;
}

export function hexToRgba(hexColor: string): [number, number, number, number] {
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const a = parseInt(hexColor.substr(6, 2), 16);

  return [r, g, b, a];
}
