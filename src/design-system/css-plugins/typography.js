// @ts-nocheck
module.exports = function typography() {
  return ({ addComponents }) => {
    addComponents({
      '.bodyMono': {
        '@apply text-sm leading-sm font-mono': {},
      },
      '.bodySm': {
        '@apply text-xs leading-xs': {},
      },
      '.bodySm-medium': {
        '@apply bodySm font-medium': {},
      },
      '.bodySm-semibold': {
        '@apply bodySm font-semibold': {},
      },
      '.bodyMd': {
        '@apply text-sm leading-sm': {},
      },
      '.bodyMd-medium': {
        '@apply bodyMd font-medium': {},
      },
      '.bodyMd-semibold': {
        '@apply bodyMd font-semibold': {},
      },
      '.bodyMd-underline': {
        '@apply bodyMd underline': {},
      },
      '.bodyLg': {
        '@apply text-md leading-sm': {},
      },
      '.bodyLg-medium': {
        '@apply bodyLg font-medium': {},
      },
      '.bodyLg-underline': {
        '@apply bodyLg underline': {},
      },
      '.headingXs': {
        '@apply font-semibold text-xs leading-xs': {},
      },
      '.headingSm': {
        '@apply font-semibold text-sm leading-xs': {},
      },
      '.headingMd': {
        '@apply font-semibold text-md leading-md': {},
      },
      '.headingLg': {
        '@apply font-semibold text-lg leading-md': {},
      },
      '.headingXl': {
        '@apply font-semibold text-xl leading-lg': {},
      },
      '.heading2xl': {
        '@apply font-semibold text-2xl leading-xl': {},
      },
      '.heading3xl': {
        '@apply font-semibold text-3xl leading-2xl': {},
      },
      '.heading4xl': {
        '@apply font-bold text-4xl leading-3xl': {},
      },
    });
  };
};
