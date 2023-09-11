// @ts-nocheck
module.exports = function noScrollbar() {
  return ({ addComponents }) => {
    addComponents({
      '.no-scrollbar-base::-webkit-scrollbar': {
        display: 'none',
      },
      '.no-scrollbar-base': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      },
      '.no-scrollbar': {
        '@apply no-scrollbar-base': {},
      },
    });
  };
};
