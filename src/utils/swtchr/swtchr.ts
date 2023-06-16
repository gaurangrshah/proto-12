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

export function hexToHSL(hexValue: string): [number, number, number] | null {
  const hex = hexValue.replace(/^#/, '');
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return null; // Invalid hex value
  }
  const [r, g, b] = hex.match(/.{2}/g)!.map((x) => parseInt(x, 16) / 255);

  const max = Math.max(Number(r), Number(g), Number(b));
  const min = Math.min(Number(r), Number(g), Number(b));
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (Number(g) - Number(b)) / d + (Number(g) < Number(b) ? 6 : 0);
        break;
      case g:
        h = (Number(b) - Number(r)) / d + 2;
        break;
      case b:
        h = (Number(r) - Number(g)) / d + 4;
        break;
    }
    h /= 6;
  }

  const hsl: [number, number, number] = [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(l * 100),
  ];
  return hsl;
}

export function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, '0');
  const hexValue = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  return hexValue;
}

export function getRawHSL(hexValue: string): string {
  const hsl = hexToHSL(hexValue);
  if (hsl === null) {
    return 'Invalid hex value';
  }
  const [h, s, l] = hsl;
  return `${h} ${s.toFixed(2)} ${l.toFixed(2)}`;
}

export function rawHSLToHex(rawHSL: string): string | null {
  const [h, s, l] = rawHSL.split(' ').map(Number);
  if (isNaN(Number(h)) || isNaN(Number(s)) || isNaN(Number(l))) {
    return null; // Invalid raw HSL values
  }
  return hslToHex(Number(h), Number(s), Number(l));
}
