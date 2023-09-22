// @ts-nocheck
module.exports = function noScrollbar() {
  return ({ addComponents }) => {
    addComponents({
      '.no-spinner::-webkit-inner-spin-button, .no-spinner::-webkit-outer-spin-button':
        {
          '-webkit-appearance': 'none',
          margin: '0',
        },
      '.no-spinner': {
        '-moz-appearance': 'textfield',
      },
    });
  };
};