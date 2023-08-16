import plugin from 'tailwindcss/plugin';

const primitives = {
  colors: {
    amber: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
    green: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },
    fuchsia: {
      50: '#FDF4FF',
      100: '#FAE8FF',
      200: '#F5D0FE',
      300: '#F0ABFC',
      400: '#E879F9',
      500: '#D946EF',
      600: '#C026D3',
      700: '#A21CAF',
      800: '#86198F',
      900: '#701A75',
    },
    purple: {
      50: '#DFDCF3',
      100: '#BFB9E7',
      200: '#A196D9',
      300: '#8573CB',
      400: '#6B4FBB',
      500: '#5C44A2',
      600: '#4E388A',
      700: '#3F2E73',
      800: '#32235C',
      900: '#251946',
    },
    red: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D',
    },
    blue: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
    teal: {
      50: '#F0FDFA',
      100: '#CCFBF1',
      200: '#99F6E4',
      300: '#5EEAD4',
      400: '#2DD4BF',
      500: '#14B8A6',
      600: '#0D9488',
      700: '#0F766E',
      800: '#115E59',
      900: '#134E4A',
    },
    zinc: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E4E4E7',
      300: '#D4D4D8',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#3F3F46',
      800: '#27272A',
      900: '#18181B',
    },
    grey: {
      50: '#FFFFFF',
      100: '#F3F4F6',
      200: '#E4E4E7',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  spacing: {
    '025': '1px',
    '05': '2px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '140px',
    48: '192px',
    60: '240px',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '28px',
    '3xl': '32px',
    '4xl': '40px',
  },
  lineHeight: {
    xs: '16px',
    sm: '20px',
    md: '24px',
    lg: '28px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '48px',
  },
};

const width = {
  '8xl': '90rem',
};

const config = {
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        animation: {
          'spin-slow': 'indeterminate 1s infinite linear',
        },
        indeterminate: {
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
      },
      boxShadow: {
        button: '0px 1px 4px rgba(0, 0, 0, 0.05)',
        card: [
          '0px 2px 1px rgba(0, 0, 0, 0.05)',
          '0px 0px 1px rgba(0, 0, 0, 0.25)',
        ],
        popover: [
          '0px 0px 2px rgba(0, 0, 0, 0.2)',
          '0px 2px 10px rgba(0, 0, 0, 0.1)',
        ],
        deep: [
          '0px 0px 0px 1px rgba(6, 44, 82, 0.1)',
          '0px 2px 16px rgba(33, 43, 54, 0.08);',
        ],
        modal: [
          '0px 0px 1px rgba(0, 0, 0, 0.2)',
          '0px 26px 80px rgba(0, 0, 0, 0.2)',
        ],
        base: [
          '0px 1px 3px rgba(63, 63, 68, 0.15)',
          '0px 0px 0px 1px rgba(63, 63, 68, 0.05)',
        ],
      },
      maxWidth: { ...width },
      minWidth: { ...width },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    screens: {
      sm: '490px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    // fontSize: { ...primitives.fontSize },
    // lineHeight: { ...primitives.lineHeight },
    spacing: {
      0: '0px',
      xs: primitives.spacing['025'],
      sm: primitives.spacing['05'],
      md: primitives.spacing['1'],
      lg: primitives.spacing['2'],
      xl: primitives.spacing['3'],
      '2xl': primitives.spacing['4'],
      '3xl': primitives.spacing['5'],
      '4xl': primitives.spacing['6'],
      '5xl': primitives.spacing['8'],
      '6xl': primitives.spacing['10'],
      '7xl': primitives.spacing['12'],
      '8xl': primitives.spacing['16'],
      '9xl': primitives.spacing['20'],
      '10xl': primitives.spacing['24'],
      '11xl': primitives.spacing['32'],
      '12xl': primitives.spacing['40'],
      '13xl': primitives.spacing['48'],
      '14xl': primitives.spacing['60'],
    },
    colors: {
      surface: {
        basic: {
          default: primitives.colors.grey['50'],
          subdued: primitives.colors.zinc['50'],
          hovered: primitives.colors.zinc['50'],
          pressed: primitives.colors.zinc['200'],
          input: primitives.colors.grey['50'],
          active: primitives.colors.zinc['100'],
        },
        primary: {
          default: primitives.colors.blue['500'],
          subdued: primitives.colors.blue['100'],
          hovered: primitives.colors.blue['600'],
          pressed: primitives.colors.blue['700'],
          selected: primitives.colors.blue['100'],
        },
        secondary: {
          default: primitives.colors.teal['500'],
          subdued: primitives.colors.teal['100'],
          hovered: primitives.colors.teal['600'],
          pressed: primitives.colors.teal['700'],
        },
        tertiary: {
          default: '#3F3F46',
          hovered: '#27272A',
          pressed: '#18181B',
        },
        critical: {
          default: primitives.colors.red['500'],
          subdued: primitives.colors.red['100'],
          hovered: primitives.colors.red['600'],
          pressed: primitives.colors.red['700'],
        },
        warning: {
          default: primitives.colors.amber['500'],
          subdued: primitives.colors.amber['100'],
          hovered: primitives.colors.amber['600'],
          pressed: primitives.colors.amber['700'],
        },
        success: {
          default: primitives.colors.green['500'],
          subdued: primitives.colors.green['100'],
          hovered: primitives.colors.green['600'],
          pressed: primitives.colors.green['700'],
        },
        purple: {
          default: primitives.colors.purple['400'],
          hovered: primitives.colors.purple['300'],
          pressed: primitives.colors.purple['500'],
        },
      },
      text: {
        default: primitives.colors.grey['900'],
        soft: primitives.colors.zinc['500'],
        strong: primitives.colors.grey['600'],
        disabled: primitives.colors.grey['400'],
        primary: primitives.colors.blue['600'],
        'on-primary': primitives.colors.grey['50'],
        secondary: primitives.colors.teal['600'],
        critical: primitives.colors.red['600'],
        warning: primitives.colors.amber['600'],
        success: primitives.colors.green['600'],
      },
      icon: {
        default: primitives.colors.grey['900'],
        soft: primitives.colors.zinc['500'],
        strong: primitives.colors.grey['600'],
        disabled: primitives.colors.grey['400'],
        primary: primitives.colors.blue['600'],
        'on-primary': primitives.colors.grey['50'],
        secondary: primitives.colors.teal['600'],
        critical: primitives.colors.red['600'],
        warning: primitives.colors.amber['600'],
        success: primitives.colors.green['600'],
      },
      border: {
        default: primitives.colors.zinc['200'],
        disabled: primitives.colors.zinc['100'],
        primary: primitives.colors.blue['600'],
        focus: primitives.colors.blue['400'],
        secondary: primitives.colors.teal['600'],
        tertiary: primitives.colors.zinc['600'],
        critical: primitives.colors.red['600'],
        warning: primitives.colors.amber['600'],
        success: primitives.colors.green['600'],
        purple: primitives.colors.purple['500'],
      },
      transparent: 'transparent',
      white: 'white',
      black: 'black',
    },
  },
  plugins: [
    // plugin(({ addComponents, theme }) => {
    //   console.log(theme('fontWeight'));
    //   addComponents({
    //     '.bodySm': {
    //       fontSize: theme('fontSize.xs'),
    //       lineHeight: theme('lineHeight.xs'),
    //       fontWeight: theme('fontWeight.normal'),
    //     },
    //     '.bodySm-medium': {
    //       fontSize: theme('fontSize.xs'),
    //       lineHeight: theme('lineHeight.xs'),
    //       fontWeight: theme('fontWeight.medium'),
    //     },
    //     '.bodyMd': {
    //       fontSize: theme('fontSize.sm'),
    //       lineHeight: theme('lineHeight.sm'),
    //       fontWeight: theme('fontWeight.normal'),
    //     },
    //     '.abcd': {
    //       '@apply .bodyMd underline': {},
    //     },
    //     '.bodyLg': {
    //       fontSize: theme('fontSize.md'),
    //       lineHeight: theme('lineHeight.sm'),
    //       fontWeight: theme('fontWeight.normal'),
    //     },
    //   });
    // }),
  ],
};

export const LightTitlebarColor = config.theme.colors.surface.basic.subdued;
export const ChipGroupPaddingTop = config.theme.spacing.xl;

export default config;
