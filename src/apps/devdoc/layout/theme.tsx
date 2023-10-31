import { LayoutGroup, motion } from 'framer-motion';
import Head from 'next/head';
import type { NextraThemeLayoutProps, PageMapItem } from 'nextra';
import { MDXProvider } from 'nextra/mdx';
import { useEffect, useState } from 'react';
import Container from '~/components/container';
import Footer from '~/components/footer';
import Header from '~/components/header';
import Sidebar from '~/components/sidebar';
import createComponents from './mdx-components';

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  const { title, frontMatter, pageMap, headings } = pageOpts;
  const [pages, setPages] = useState<PageMapItem[]>([]);

  useEffect(() => {
    setPages(
      pageMap.filter((pm) => pm.kind === 'Folder' || pm.kind === 'Meta')
    );
    (async () => {
      const response = await fetch(
        `${''}/_next/static/chunks/nextra-data-en-US.json`
      );
      console.log(await response.json());
    })();
  }, [pageMap]);

  return (
    <div className="bg-surface-basic-subdued min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="og:image" content={frontMatter.image} />
      </Head>
      <Header />
      <Container>
        <aside className="w-[224px] shrink-0 sticky top-[76px] self-start">
          <motion.ul
            layout
            layoutRoot
            className="flex flex-col gap-md -mt-[10px] max-h-[calc(100vh-76px)] overflow-y-hidden py-6xl px-3xl scrollbar-gutter hover:overflow-y-auto"
          >
            <LayoutGroup id="sidebar">
              <Sidebar data={pages} />
            </LayoutGroup>
          </motion.ul>
        </aside>
        <nav className="order-last w-[224px] py-6xl">
          <ul className="list-none flex flex-col gap-md">
            {headings.map((heading) => (
              <a key={heading.value} href={`#${heading.id}`}>
                {heading.value}
              </a>
            ))}
          </ul>
        </nav>
        <article>
          <main className="p-6xl w-full max-w-[72rem] min-w-0">
            <MDXProvider components={createComponents}>
              <div>Getting started</div>
              {children}
            </MDXProvider>
          </main>
        </article>
      </Container>
      <Footer />
    </div>
  );
}
