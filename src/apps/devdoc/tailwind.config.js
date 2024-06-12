/* eslint-disable import/no-relative-packages */
/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line import/no-relative-packages
import tailwindBase from '../../design-system/tailwind-base';
import typography from './css-plugins/typography';
import scrollbar from './css-plugins/scrollbar';
// @ts-ignore

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './images/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: tailwindBase.theme,
  plugins: [typography(), scrollbar()],
  prefix: 'wb-',
};
