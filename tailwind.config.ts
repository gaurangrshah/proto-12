import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    // './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        // #vgdy0w
        sans: ['var(--inter-font)', ...fontFamily.sans],
        dec: ['var(--bebas-font)', 'cursive'],
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(200px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-200px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        top: '0px -5px 16px 0px rgba(153 153 153 / 1)',
        crescendo: '0px -8px 30px rgba(0, 0, 0, 0.12)',
        thin: '2px -2px 4px rgba(255,255,255, 0.5), -2px 2px 4px rgba(255,255,255, 0.5)',
        thinLight:
          '2px -2px 4px rgba(255,255,255, 0.2), -2px 2px 4px rgba(255,255,255, 0.2)',
        thinDark:
          '2px -2px 4px rgba(0,0,0, 0.5), -2px 2px 4px rgba(0,0,0, 0.5)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'var(--ring)',
        foreground: {
          DEFAULT: 'hsl(var(--foreground-hsl) / <alpha-value>)',
          invert: 'hsl(var(--foreground-invert-hsl) / <alpha-value>)',
          muted: 'hsl(var(--foreground-hsl) var(--muted))',
          focus: 'hsl(var(--foreground-hsl) var(--focus))',
        },
        background: 'hsl(var(--background-hsl) / <alpha-value>)',
        primary: 'hsl(var(--primary-hsl) / <alpha-value>)',
        secondary: 'hsl(var(--secondary-hsl) / <alpha-value>)',
        accent: 'hsl(var(--accent-hsl) / <alpha-value>)',
        destructive: 'hsl(var(--destructive-hsl) / <alpha-value>)',
        warning: 'hsl(var(--warning-hsl) / <alpha-value>)',
        success: 'hsl(var(--success-hsl) / <alpha-value>)',
        info: 'hsl(var(--info-hsl) / <alpha-value>)',

        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
  ],
} satisfies Config;
