function scrollbar() {
  // @ts-ignore
  return ({ addBase }) => {
    addBase({
      '*': {
        '&::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          '@apply bg-transparent': {},
        },
        '&::-webkit-scrollbar-thumb': {
          '@apply bg-surface-primary-subdued dark:bg-surface-darktheme-primary-subdued rounded cursor-pointer':
            {},
        },
        '&::-webkit-scrollbar-track-piece': {
          '@apply bg-transparent': {},
        },
        '&::-webkit-scrollbar-thumb:hover': {
          '@apply bg-surface-primary-default dark:bg-surface-darktheme-primary-default':
            {},
        },
      },
    });
  };
}

export default scrollbar;
