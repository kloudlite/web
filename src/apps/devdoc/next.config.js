// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextra = require('nextra')({
  theme: './app/layout/theme.tsx',
});

module.exports = withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
});

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
// what-is-devops
