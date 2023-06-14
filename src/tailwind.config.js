export default {
    darkMode: 'class',
    content: [
        "../../components/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            boxShadow: {
                'button': '0px 1px 4px rgba(0, 0, 0, 0.05)',
                'card': [
                    '0px 2px 1px rgba(0, 0, 0, 0.05)',
                    '0px 0px 1px rgba(0, 0, 0, 0.25)'
                ],
                'popover': [
                    '0px 0px 2px rgba(0, 0, 0, 0.2)',
                    '0px 2px 10px rgba(0, 0, 0, 0.1)'
                ],
                'deep': [
                    '0px 0px 0px 1px rgba(6, 44, 82, 0.1)',
                    '0px 2px 16px rgba(33, 43, 54, 0.08);'
                ],
                'modal': [
                    '0px 0px 1px rgba(0, 0, 0, 0.2)',
                    '0px 26px 80px rgba(0, 0, 0, 0.2)'
                ],
                'base': [
                    '0px 1px 3px rgba(63, 63, 68, 0.15)',
                    '0px 0px 0px 1px rgba(63, 63, 68, 0.05)'
                ],
            },
            maxWidth: {
                95: '23.75rem',
                153: '38.25rem',
                296: '74rem' //1184px
            },
            minWidth: {
                72: '18rem'
            }
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        },
        // screens:{
        // 	'xs': {max:'489px'},
        // 	// => @media (min-width: 490px) { ... }
        // 	'sm': {min:'490px', max:'767px'},
        // 	// => @media (min-width: 768px) { ... }
        // 	'md': {min:'768px', max:'1039px'},
        // 	// => @media (min-width: 1040px) { ... }
        // 	'lg': {min:'1440px'},
        // 	// => @media (min-width: 1440px) { ... }

        // },
        screens: {
            'sm': '490',
            'md': '768px',
            'lg': '1040px',
            'xl': '1440px',
        },
        spacing: {
            px: '1px',
            0: '0',
            0.25: '0.0625rem', //1px
            0.5: '0.125rem', //2px
            0.75: '0.188rem',  //3px
            1: '0.25rem',  //4px
            1.25: '0.313rem', //5px
            1.5: '0.375rem', //6px
            1.75: '0.438rem', //7px
            2: '0.5rem', //8px
            2.25: '0.563rem', //9px
            2.5: '0.625rem', //10px
            2.75: '0.688rem', //11px
            3: '0.75rem',
            3.25: '0.813rem', //13px
            3.5: '0.875rem',
            3.75: '0.938rem', //15px
            4: '1rem',
            5: '1.25rem',
            5.25: '1.313rem',
            5.5: '1.375rem', //22px
            6: '1.5rem',
            6.75: '1.688rem',
            8: '2rem',
            10: '2.5rem',
            12: '3rem',
            15: '3.75rem',
            16: '4rem',
            16.75: '4.188',
            20: '5rem',
            23.75: '5.938rem',
            24: '6rem',
            32: '8rem',
            37: '9.25rem',
            43: '10.75rem',
            72: '18rem',
            95: "23.75rem",
            100: '25rem',
        },
        colors: {
            "surface": {
                "default": "#FFFFFF",
                "subdued": "#F3F4F6",
                "hovered": "#F4F4F5",
                "pressed": "#E4E4E7",
                "input": "#FFFFFF",
                "secondary": {
                    "default": "#14B8A6",
                    "subdued": "#ccfbf1",
                    "hovered": "#0D9488",
                    "pressed": "#0F766E",
                    "selected": "#99F6E4",
                },
                "primary": {
                    "default": "#3B82F6",
                    "subdued": "#dbeafe",
                    "hovered": "#2563eb",
                    "pressed": "#1D4ED8",
                    "selected": "#BFDBFE",
                },
                "tertiary": {
                    "default": "#3F3F46",
                    "hovered": "#27272A",
                    "pressed": "#18181B",
                },
                "danger": {
                    "default": "#EF4444",
                    "subdued": "#fee2e2",
                    "hovered": "#dc2626",
                    "pressed": "#B91C1C",
                    "selected": "#FECACA",
                },
                "warning": {
                    "default": "#F59E0B",
                    "subdued": "#fef3c7",
                    "hovered": "#d97706",
                    "pressed": "#B45309",
                    "selected": "#FDE68A",
                },
                "success": {
                    "default": "#22C55E",
                    "subdued": "#dcfce7",
                    "hovered": "#16a34a",
                    "pressed": "#15803D",
                    "selected": "#BBF7D0",
                }
            },
            "text": {
                "default": "#111827",
                "soft": "#71717A",
                "strong": "#4B5563",
                "disabled": "#9ca3af",
                "danger": "#DC2626",
                "warning": "#D97706",
                "success": "#16A34A",
                "primary": "#2563EB",
                "on": {
                    "primary": "#F9FAFB"
                },
                "secondary": "#0D9488",
            },
            "icon": {
                "default": "#111827",
                "soft": "#71717A",
                "strong": "#4B5563",
                "disabled": "#9ca3af",
                "danger": "#DC2626",
                "warning": "#D97706",
                "success": "#16A34A",
                "primary": "#2563EB",
                "on-primary": "#f9fafb",
                "secondary": "#0D9488",
            },
            "border": {
                "default": "#D4D4D8",
                "danger": "#DC2626",
                "warning": "#D97706",
                "success": "#16A34A",
                "primary": "#2563EB",
                "secondary": "#0d9488",
                "focus": "#60A5FA",
                "disabled": "#E4E4E7",
                "tertiary": "#52525B"
            },
            "secondary": {
                "50": "#F0FDFA",
                "100": "#CCFBF1",
                "200": "#99F6E4",
                "300": "#5EEAD4",
                "400": "#2DD4BF",
                "500": "#14B8A6",
                "600": "#0D9488",
                "700": "#0F766E",
                "800": "#115E59",
                "900": "#134E4A",
            },
            "primary": {
                "50": "#EFF6FF",
                "100": "#DBEAFE",
                "200": "#BFDBFE",
                "300": "#93C5FD",
                "400": "#60A5FA",
                "500": "#3B82F6",
                "600": "#2563EB",
                "700": "#1D4ED8",
                "800": "#1E40AF",
                "900": "#1E3A8A",
            },
            "critical": {
                "50": "#FEF2F2",
                "100": "#FEE2E2",
                "200": "#FECACA",
                "300": "#FCA5A5",
                "400": "#F87171",
                "500": "#EF4444",
                "600": "#DC2626",
                "700": "#B91C1C",
                "800": "#991B1B",
                "900": "#7F1D1D",
            },
            "fuchsia": {
                "50": "#FDF4FF",
                "100": "#FAE8FF",
                "200": "#F5D0FE",
                "300": "#F0ABFC",
                "400": "#E879F9",
                "500": "#D946EF",
                "600": "#C026D3",
                "700": "#A21CAF",
                "800": "#86198F",
                "900": "#701A75",
            },
            "success": {
                "50": "#F0FDF4",
                "100": "#DCFCE7",
                "200": "#BBF7D0",
                "300": "#86EFAC",
                "400": "#4ADE80",
                "500": "#22C55E",
                "600": "#16A34A",
                "700": "#15803D",
                "800": "#166534",
                "900": "#14532D",
            },
            "warn": {
                "50": "#FFFBEB",
                "100": "#FEF3C7",
                "200": "#FDE68A",
                "300": "#FCD34D",
                "400": "#FBBF24",
                "500": "#F59E0B",
                "600": "#D97706",
                "700": "#B45309",
                "800": "#92400E",
                "900": "#78350F",
            },
            "zinc": {
                "50": "#FAFAFA",
                "100": "#F4F4F5",
                "200": "#E4E4E7",
                "300": "#D4D4D8",
                "400": "#A1A1AA",
                "500": "#71717A",
                "600": "#52525B",
                "700": "#3F3F46",
                "800": "#27272A",
                "900": "#18181B",
            },
            "grey": {
                "50": "#F9FAFB",
                "100": "#F3F4F6",
                "200": "#E4E4E7",
                "300": "#D1D5DB",
                "400": "#9CA3AF",
                "500": "#6B7280",
                "600": "#4B5563",
                "700": "#374151",
                "800": "#1F2937",
                "900": "#111827",
            }
        }
    },
    plugins: [],
}
