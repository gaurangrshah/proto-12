import tinycolor from 'tinycolor2';

import { calculateContrastRatio } from './swtchr';

type ContrastMode = 'light' | 'dark';

export function getContrastMode(color: string): ContrastMode {
  const colorObj = tinycolor(color);

  // Get the perceived luminance of the color
  const luminance = colorObj.getLuminance();

  // Use a threshold value to determine if the color is considered "light" or "dark"
  // You can adjust the threshold value to fit your needs
  const threshold = 0.5;

  return luminance > threshold ? 'dark' : 'light';
}

export function getContrastColor(hexColor: string) {
  // Calculate the contrast ratio between the input color and mid-gray
  let textColor = tinycolor.mostReadable(
    hexColor,
    Object.values(TailwindColors.gray)
  );

  // If the contrast ratio between the input color and mid-gray is less than 4.5,
  // calculate the contrast ratio between the input color and each gray shade in TailwindColors
  if (
    parseFloat(calculateContrastRatio(hexColor, textColor.toHexString())) < 4.5
  ) {
    const grayShades = Object.values(TailwindColors.gray);
    const compliantGrays = grayShades.filter((gray) => {
      return parseFloat(calculateContrastRatio(hexColor, gray)) >= 4.5;
    });

    if (compliantGrays.length > 0) {
      textColor = tinycolor.mostReadable(hexColor, compliantGrays);
    } else {
      // If no compliant grays are available, select the color with the highest contrast
      const contrastRatios = grayShades.map((gray) => {
        return parseFloat(calculateContrastRatio(hexColor, gray));
      });

      const maxContrastIndex = contrastRatios.indexOf(
        Math.max(...contrastRatios)
      );
      textColor = tinycolor(grayShades[maxContrastIndex]);
    }
  }

  return textColor.toHexString();
}

export const TailwindColors = {
  gray: {
    '100': '#f7fafc',
    '200': '#edf2f7',
    '300': '#e2e8f0',
    '400': '#cbd5e0',
    '500': '#a0aec0',
    '600': '#718096',
    '700': '#4a5568',
    '800': '#2d3748',
    '900': '#1a202c',
    default: '#718096',
  },
  slate: {
    '100': '#f0f4f8',
    '200': '#d9e2ec',
    '300': '#bcdcfa',
    '400': '#a0b3c5',
    '500': '#76839b',
    '600': '#4b5563',
    '700': '#374151',
    '800': '#1f2937',
    '900': '#111827',
    default: '#4b5563',
  },
  zinc: {
    '100': '#f8fafc',
    '200': '#eef2f5',
    '300': '#e0e6ed',
    '400': '#c1c7cd',
    '500': '#a2a9b0',
    '600': '#7c848c',
    '700': '#5c636e',
    '800': '#3d4852',
    '900': '#1f2937',
    default: '#7c848c',
  },
  neutral: {
    '100': '#f1f5f9',
    '200': '#e2e8f0',
    '300': '#cbd5e0',
    '400': '#a0aec0',
    '500': '#718096',
    '600': '#4a5568',
    '700': '#2d3748',
    '800': '#1a202c',
    '900': '#171923',
    default: '#718096',
  },
  stone: {
    '100': '#f7fafc',
    '200': '#e5e7eb',
    '300': '#c7cdd4',
    '400': '#959fa7',
    '500': '#6b7280',
    '600': '#4b5563',
    '700': '#374151',
    '800': '#1f2937',
    '900': '#111827',
    default: '#6b7280',
  },
};
