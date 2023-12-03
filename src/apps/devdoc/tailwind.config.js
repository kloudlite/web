/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line import/no-relative-packages
import tailwindBase from '../../design-system/tailwind-base';

export default {
  ...tailwindBase,
  content: [
    './**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
