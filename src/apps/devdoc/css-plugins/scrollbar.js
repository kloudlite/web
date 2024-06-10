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
          '@apply wb-bg-transparent': {},
        },
        '&::-webkit-scrollbar-thumb': {
          '@apply wb-bg-surface-basic-hovered wb-rounded wb-cursor-pointer': {},
        },
        '&::-webkit-scrollbar-track-piece': {
          '@apply wb-bg-transparent': {},
        },
        '&::-webkit-scrollbar-thumb:hover': {
          '@apply wb-bg-surface-basic-pressed': {},
        },
      },
    });
  };
}

export default scrollbar;
