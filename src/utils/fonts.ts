import { Bebas_Neue, Inter } from 'next/font/google';

// #vgdy0w

// If loading a variable font, you don't need to specify the font weight
export const inter = Inter({
  // weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--inter-font',
});

export const bebas = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--bebas-font',
});
