function typography() {
  // @ts-ignore
  return ({ addComponents }) => {
    addComponents({
      '.bodyMono': {
        '@apply text-sm leading-sm font-mono': {},
      },
      '.bodyMono-medium': {
        '@apply bodyMono font-medium': {},
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
      '.headingMd-marketing': {
        '@apply headingMd font-familjen': {},
      },
      '.headingLg': {
        '@apply font-semibold text-lg leading-md': {},
      },
      '.headingLg-marketing': {
        '@apply headingLg font-familjen': {},
      },
      '.headingXl': {
        '@apply font-semibold text-xl leading-lg': {},
      },
      '.headingXl-marketing': {
        '@apply headingXl font-familjen': {},
      },
      '.heading2xl': {
        '@apply font-semibold text-2xl leading-xl': {},
      },
      '.heading2xl-marketing': {
        '@apply heading2xl font-familjen': {},
      },
      '.heading3xl': {
        '@apply font-semibold text-3xl leading-2xl': {},
      },
      '.heading3xl-marketing': {
        '@apply heading3xl font-familjen': {},
      },
      '.heading4xl': {
        '@apply font-bold text-4xl leading-3xl': {},
      },
      '.heading4xl-marketing': {
        '@apply heading4xl font-familjen': {},
      },
      '.heading5xl-marketing': {
        '@apply font-bold text-6xl leading-6xl font-familjen': {},
      },
    });
  };
}

export default typography;
