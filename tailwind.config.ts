import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    // './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // #vgdy0w
        sans: ['var(--inter-font)', ...fontFamily.sans],
        dec: ['var(--bebas-font)', 'cursive'],
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
      },
      animation: {
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
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
        primary: 'var(--primary)',
        primary_focus: 'var(--primary-focus)',
        primary_muted: 'var(--primary-muted)',

        secondary: 'var(--secondary)',
        secondary_focus: 'var(--secondary-focus)',
        secondary_muted: 'var(--secondary-muted)',

        neutral: 'var(--neutral)',
        neutral_focus: 'var(--neutral-focus)',
        neutral_muted: 'var(--neutral-muted)',

        foreground: 'var(--foreground)',
        foreground_focus: 'var(--foreground-focus)',
        foreground_muted: 'var(--foreground-muted)',

        background: 'var(--background)',
        background_focus: 'var(--background-focus)',
        background_muted: 'var(--background-muted)',

        error: 'var(--error)',
        error_focus: 'var(--error-focus)',
        error_muted: 'var(--error-muted)',

        success: 'var(--success)',
        success_focus: 'var(--success-focus)',
        success_muted: 'var(--success-muted)',

        info: 'var(--info)',
        info_focus: 'var(--info-focus)',
        info_muted: 'var(--info-muted)',

        warning: 'var(--warning)',
        warning_focus: 'var(--warning-focus)',
        warning_muted: 'var(--warning-muted)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
