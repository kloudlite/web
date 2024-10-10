import { basePath, siteDesc } from '../utils/config';
import { usePathname } from 'next/navigation';
import HeaderSecondary from '../components/header-secondary';
import { Flexsearch } from '../components/flexsearch';
import { ReactNode } from 'react';
import Footer from '../components/footer';
import Head from 'next/head';
import consts from '../utils/const';
import Banner from '../components/website/event/banner';

const ExternalLayout = ({
  frontMatter,
  children,
}: {
  frontMatter: any;
  children?: ReactNode;
}) => {
  const path = usePathname();
  const canonicalURL = basePath + path;
  return (
    <div className="wb-relative wb-bg-surface-basic-subdued wb-min-h-screen wb-antialiased">
      <Head>
        <title>{frontMatter.metaTitle || 'Kloudlite'}</title>
        <meta
          name="description"
          content={frontMatter.description || siteDesc}
        />
        <meta
          name="og:image"
          content={`${basePath}${frontMatter.image || ''}`}
        />
        <meta
          property="og:title"
          content={frontMatter.metaTitle || 'Kloudlite'}
        />
        <meta
          property="og:description"
          content={frontMatter.description || 'Kloudlite'}
        />

        {/* twitter metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KloudLite" />
        <meta
          name="twitter:creator"
          content={frontMatter.author || 'Kloudlite'}
        />
        <meta
          name="twitter:image"
          content={`${basePath}${frontMatter.image || ''}`}
        />
        <meta
          name="twitter:description"
          content={frontMatter.description || 'Kloudlite'}
        />
        <link rel="canonical" href={canonicalURL} />
      </Head>
      {consts.eventBanner.enabled && path === '/' && (
        <Banner {...consts.eventBanner} />
      )}
      <HeaderSecondary />
      <Flexsearch />
      {children}
      <Footer />
    </div>
  );
};

export default ExternalLayout;
