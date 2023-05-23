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
        foreground_: 'rgb(var(--rgb-foreground) / <alpha-value>)',
        foreground__focused:
          'rgb(var(--rgb-foreground-focused)/ <alpha-value>)',
        foreground__muted: 'rgb(var(--rgb-foreground-muted) / <alpha-value>)',
        background_: 'rgb(var(--rgb-background) / <alpha-value>)',
        background__focused:
          'rgb(var(--rgb-background-focused)/ <alpha-value>)',
        background__muted: 'rgb(var(--rgb-background-muted) / <alpha-value>)',
        background__alpha: 'var(--rgba-background-alpha)',
        background__alpha_muted: 'var(--rgba-background-alpha-muted)',
        background__alpha_focused: 'var(--rgba-background-alpha-focused)',
        primary_: 'rgb(var(--rgb-primary) / <alpha-value>)',
        primary__focused: 'rgb(var(--rgb-primary-focused)/ <alpha-value>)',
        primary__muted: 'rgb(var(--rgb-primary-muted) / <alpha-value>)',
        secondary_: 'rgb(var(--rgb-secondary) / <alpha-value>)',
        secondary__focused: 'rgb(var(--rgb-secondary-focused)/ <alpha-value>)',
        secondary__muted: 'rgb(var(--rgb-secondary-muted) / <alpha-value>)',
        neutral_: 'rgb(var(--rgb-neutral) / <alpha-value>)',
        neutral__focused: 'rgb(var(--rgb-neutral-focused)/ <alpha-value>)',
        neutral__muted: 'rgb(var(--rgb-neutral-muted) / <alpha-value>)',
        error_: 'rgb(var(--rgb-error) / <alpha-value>)',
        error__focused: 'rgb(var(--rgb-error-focused)/ <alpha-value>)',
        error__muted: 'rgb(var(--rgb-error-muted) / <alpha-value>)',
        success_: 'rgb(var(--rgb-success) / <alpha-value>)',
        success__focused: 'rgb(var(--rgb-success-focused)/ <alpha-value>)',
        success__muted: 'rgb(var(--rgb-success-muted) / <alpha-value>)',
        info_: 'rgb(var(--rgb-info) / <alpha-value>)',
        info__focused: 'rgb(var(--rgb-info-focused)/ <alpha-value>)',
        info__muted: 'rgb(var(--rgb-info-muted) / <alpha-value>)',
        warning_: 'rgb(var(--rgb-warning) / <alpha-value>)',
        warning__focused: 'rgb(var(--rgb-warning-focused)/ <alpha-value>)',

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        'black-alpha-50': 'rgba(0,0,0, 0.04)',
        'black-alpha-100': 'rgba(0,0,0, 0.06)',
        'black-alpha-200': 'rgba(0,0,0, 0.08)',
        'black-alpha-300': 'rgba(0,0,0, 0.16)',
        'black-alpha-400': 'rgba(0,0,0, 0.24)',
        'black-alpha-500': 'rgba(0,0,0, 0.36)',
        'black-alpha-600': 'rgba(0,0,0, 0.48)',
        'black-alpha-700': 'rgba(0,0,0, 0.64)',
        'black-alpha-800': 'rgba(0,0,0, 0.80)',
        'black-alpha-900': 'rgba(0,0,0, 0.92)',
        'white-alpha-50': 'rgba(255,255, 255, 0.04)',
        'white-alpha-100': 'rgba(255,255, 255, 0.06)',
        'white-alpha-200': 'rgba(255,255, 255, 0.08)',
        'white-alpha-300': 'rgba(255,255, 255, 0.16)',
        'white-alpha-400': 'rgba(255,255, 255, 0.24)',
        'white-alpha-500': 'rgba(255,255, 255, 0.36)',
        'white-alpha-600': 'rgba(255,255, 255, 0.48)',
        'white-alpha-700': 'rgba(255,255, 255, 0.64)',
        'white-alpha-800': 'rgba(255,255, 255, 0.80)',
        'white-alpha-900': 'rgba(255,255, 255, 0.92)',
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
