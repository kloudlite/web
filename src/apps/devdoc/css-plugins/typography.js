function typography() {
  // @ts-ignore
  return ({ addComponents }) => {
    addComponents({
      '.bodyXs': {
        '@apply wb-text-xxs wb-leading-xxs wb-font-sans wb-font-normal': {},
      },
      '.bodyMono': {
        '@apply wb-text-sm wb-leading-sm wb-font-mono': {},
      },
      '.bodyMono-medium': {
        '@apply wb-bodyMono !wb-font-medium': {},
      },
      '.bodySm': {
        '@apply wb-text-xs wb-leading-xs wb-font-sans wb-font-normal': {},
      },
      '.bodySm-medium': {
        '@apply wb-bodySm !wb-font-medium': {},
      },
      '.bodySm-semibold': {
        '@apply wb-bodySm !wb-font-semibold': {},
      },
      '.bodyMd': {
        '@apply wb-text-sm wb-leading-sm wb-font-sans': {},
      },
      '.bodyMd-medium': {
        '@apply wb-bodyMd !wb-font-medium': {},
      },
      '.bodyMd-semibold': {
        '@apply wb-bodyMd !wb-font-semibold': {},
      },
      '.bodyMd-underline': {
        '@apply wb-bodyMd wb-underline': {},
      },
      '.bodyLg': {
        '@apply wb-text-md wb-leading-md wb-font-sans': {},
      },
      '.bodyLg-medium': {
        '@apply wb-bodyLg !wb-font-medium': {},
      },
      '.bodyLg-underline': {
        '@apply wb-bodyLg wb-underline': {},
      },
      '.bodyXl': {
        '@apply wb-font-normal wb-font-sans wb-text-lg wb-leading-lg': {},
      },
      '.bodyXXl': {
        '@apply wb-font-normal wb-font-sans wb-text-xl wb-leading-bodyXXl-lineHeight':
          {},
      },
      '.bodyXl-medium': {
        '@apply wb-font-medium wb-font-sans wb-text-lg wb-leading-lg': {},
      },
      '.headingXs': {
        '@apply wb-font-semibold wb-text-xs wb-leading-xs wb-font-sans': {},
      },
      '.headingSm': {
        '@apply wb-font-semibold wb-text-sm wb-leading-sm wb-font-sans': {},
      },
      '.headingMd': {
        '@apply wb-font-semibold wb-text-md wb-leading-md wb-font-sans': {},
      },
      '.headingMd-marketing': {
        '@apply wb-headingMd !wb-font-familjen': {},
      },
      '.headingLg': {
        '@apply wb-font-semibold wb-text-lg wb-leading-md wb-font-sans': {},
      },
      '.headingLg-marketing': {
        '@apply wb-headingLg !wb-font-familjen': {},
      },
      '.headingXl': {
        '@apply wb-font-semibold wb-text-xl wb-leading-lg wb-font-sans': {},
      },
      '.headingXl-marketing': {
        '@apply wb-headingXl !wb-font-familjen': {},
      },
      '.heading2xl': {
        '@apply wb-font-semibold wb-text-2xl wb-leading-xl wb-font-sans': {},
      },
      '.heading2xl-Re': {
        '@apply wb-font-normal wb-text-2xl wb-leading-xl wb-font-sans': {},
      },
      '.heading2xl-marketing': {
        '@apply wb-heading2xl wb-font-familjen': {},
      },
      '.heading3xl': {
        '@apply wb-font-semibold wb-text-3xl wb-leading-2xl wb-font-sans': {},
      },
      '.heading3xl-marketing': {
        '@apply wb-heading3xl !wb-font-familjen': {},
      },
      '.heading3xl-1-marketing': {
        '@apply wb-heading3xl !wb-font-sriracha': {},
      },
      '.heading4xl': {
        '@apply wb-font-bold wb-text-4xl wb-leading-3xl wb-font-sans': {},
      },
      '.heading4xl-md': {
        '@apply wb-font-medium wb-text-4xl wb-leading-3xl wb-font-sans': {},
      },
      '.heading4xl-marketing': {
        '@apply wb-heading4xl !wb-font-familjen': {},
      },

      '.heading4xl-1-marketing': {
        '@apply wb-font-normal wb-text-4xl wb-leading-3xl wb-font-sriracha': {},
      },
      '.heading5xl-marketing': {
        '@apply wb-font-bold wb-text-5xl wb-leading-5xl wb-font-familjen': {},
      },
      '.heading5xl-1-marketing': {
        '@apply wb-font-normal wb-text-5xl wb-leading-5xl wb-font-sriracha': {},
      },
      '.heading6xl-marketing': {
        '@apply wb-font-bold wb-text-6xl wb-leading-6xl wb-font-familjen': {},
      },
      '.heading7xl-marketing': {
        '@apply wb-font-bold wb-text-7xl wb-leading-7xl wb-font-familjen': {},
      },

      '.heading7xl-1-marketing': {
        '@apply wb-font-normal wb-text-7xl wb-leading-7xl wb-font-sriracha': {},
      },
    });
  };
}

export default typography;
