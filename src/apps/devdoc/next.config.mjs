/** @type {import('nextra').NextraConfig} */
import nextra from 'nextra';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkFrontmatter from 'remark-frontmatter';
import { readFileSync } from 'fs';
import remarkUnwrapImages from 'remark-unwrap-images';

const withNextra = nextra({
  theme: './web/layout/theme.tsx',
  staticImage: false,
  mdxOptions: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkUnwrapImages,
    ],
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
    CONTACT_URL: process.env.CONTACT_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
  images: {
    unoptimized: true,
  },

  optimizeFonts: false,
});
