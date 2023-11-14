/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line import/no-relative-packages
import tailwindBase from '../../design-system/tailwind-base';

export default {
  ...tailwindBase,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
