// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextra = require('nextra')({
  theme: './app/layout/theme.tsx',
});

module.exports = withNextra({
  redirects: () => {
    return [
      {
        source: '/docs',
        destination: '/docs/devops',
        statusCode: 301,
      },
      {
        source: '/docs/devops',
        destination: '/docs/devops/what-is-devops',
        statusCode: 301,
      },
      {
        source: '/docs/infraops',
        destination: '/docs/infraops/what-is-infraops',
        statusCode: 301,
      },
    ];
  },
});

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
// what-is-devops
