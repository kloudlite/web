/** @type {import('nextra').NextraConfig} */
import nextra from 'nextra';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkFrontmatter from 'remark-frontmatter';
import { readFileSync } from 'fs';

const withNextra = nextra({
  theme: './web/layout/theme.tsx',
  mdxOptions: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePrettyCodeOptions: {
      theme: JSON.parse(readFileSync('./public/code-theme.json', 'utf8')),
    },
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
