import { type Config } from "tailwindcss";

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    // './src/app/**/*.{js,ts,jsx,tsx}',
    // 'node_modules/daisyui/dist/**/*.js',
    // 'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [    require('@tailwindcss/typography'),
],
} satisfies Config;
