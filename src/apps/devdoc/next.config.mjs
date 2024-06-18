/** @type {import('nextra').NextraConfig} */
import nextra from 'nextra';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkFrontmatter from 'remark-frontmatter';

const withNextra = nextra({
  theme: './app/layout/theme.tsx',
  mdxOptions: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  },
});

export default withNextra({
  output: 'export',
  env: {
    APP_ENV: process.env.APP_ENV,
    AUTH_URL: process.env.AUTH_URL,
    CONSOLE_URL: process.env.CONSOLE_URL,
  },
  images: {
    unoptimized: true,
  },
  optimizeFonts: false,
});
