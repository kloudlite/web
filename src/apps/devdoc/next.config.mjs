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
  images: {
    unoptimized: true,
  },
  optimizeFonts: false,
});
