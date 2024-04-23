import { Search } from '@jengaicons/react';
import { TextInput } from 'kl-design-system/atoms/input';
import Tab from 'kl-design-system/atoms/tabs';
import { ReactNode, useState } from 'react';
import consts from '~/app/utils/const';
import useConfig from '~/app/utils/use-config';
import { PageMapItem } from 'nextra';
import { DEFAULT_LOCALE } from '~/app/utils/constants';
import { useRouter } from 'next/router';
import HoverItem from '../hover-item';
import SectionWrapper from '../website/section-wrapper';
import { GraphExtended, GraphItem } from '../graph';

const tabs = [
  {
    label: 'Overview',
    value: 'overview',
  },
  {
    label: 'Engineering',
    value: 'engineering',
  },
  {
    label: 'Community',
    value: 'community',
  },
];

const tabItems = {
  overview: [
    {
      label: 'Kloudlite',
      desc: 'Glimpses of our journey, people, culture, and everything.',
      img: '',
    },
    {
      label: 'Engineering',
      desc: 'From the principles of coding, to the launch of your advanced apps.',
      img: '',
    },
    {
      label: 'Community',
      desc: 'Ask anything and get the right answers from our experts',
      img: '',
    },
  ],

  engineering: [
    {
      label: 'Kloudlite',
      desc: 'Glimpses of our journey, people, culture, and everything.',
      img: '',
    },
    {
      label: 'Engineering',
      desc: 'From the principles of coding, to the launch of your advanced apps.',
      img: '',
    },
    {
      label: 'Community',
      desc: 'Ask anything and get the right answers from our experts',
      img: '',
    },
  ],

  community: [
    {
      label: 'Kloudlite',
      desc: 'Glimpses of our journey, people, culture, and everything.',
      img: '',
    },
    {
      label: 'Engineering',
      desc: 'From the principles of coding, to the launch of your advanced apps.',
      img: '',
    },
    {
      label: 'Community',
      desc: 'Ask anything and get the right answers from our experts',
      img: '',
    },
  ],
};

const TabCard = ({
  label,
  desc,
  img,
}: {
  label: ReactNode;
  desc: ReactNode;
  img: string;
}) => {
  return (
    <div className="h-full flex flex-col bg-surface-basic-default 2xl:!min-h-[176px]">
      <img className="h-[240px]" src={img} />
      <div className="flex flex-col gap-lg md:!gap-xl p-3xl 2xl:!p-3xl 3xl:!p-4xl">
        <h3 className="heading3xl-marketing text-text-default">{label}</h3>
        <p className="bodyXl text-text-strong">{desc}</p>
      </div>
    </div>
  );
};

const BlogHome = () => {
  const [tab, setTab] = useState<'overview' | 'engineering' | 'community'>(
    'overview'
  );

  const { locale = DEFAULT_LOCALE } = useRouter();

  const config = useConfig();
  const blogPage = config.config.pageOpts?.pageMap.find(
    (p) => p.kind === 'Folder' && p.route === '/blog'
  );

  const blogPosts =
    blogPage?.kind === 'Folder'
      ? blogPage.children.filter(
          (f) => f.kind === 'MdxPage' && f.frontMatter
        ) || ([] as PageMapItem[])
      : ([] as PageMapItem[]);

  return (
    <div className="flex flex-col">
      <div className="py-6xl md:!py-8xl lg:!py-10xl flex flex-col">
        <div className="flex flex-col gap-3xl">
          <h1 className="heading4xl-marketing lg:!heading5xl-marketing">
            Blog
          </h1>
          <p className="bodyXl lg:!bodyXXl text-text-soft">
            The one stop shop for latest tech trends, tools, insights, and
            analysis
          </p>
        </div>
        <div className="flex flex-col gap-3xl md:!gap-0 md:!flex-row md:!items-center justify-between pt-5xl">
          <div className="-ml-xl md:!ml-0">
            <Tab.Root value={tab} onChange={setTab}>
              {tabs.map((t) => (
                <Tab.Tab key={t.value} label={t.label} value={t.value} />
              ))}
            </Tab.Root>
          </div>
          <div className="w-full md:!w-[330px]">
            <TextInput placeholder="Search" prefixIcon={<Search />} />
          </div>
        </div>
        <SectionWrapper className="flex flex-col" noPadding>
          <GraphExtended>
            <div className="grid grid-cols-1 md:!grid-cols-3 gap-5xl">
              {tabItems[tab].map((ti) => {
                return (
                  <GraphItem key={ti.label}>
                    <HoverItem to="">
                      <TabCard
                        label={ti.label}
                        desc={ti.desc}
                        img={consts.blog.images.cover}
                      />
                    </HoverItem>
                  </GraphItem>
                );
              })}
            </div>
          </GraphExtended>
          <GraphExtended>
            <div className="grid grid-cols-1 grid-rows-[64px_640px_64px]">
              <GraphItem>
                <div className="flex flex-row items-center py-xl px-5xl h-8xl bg-surface-basic-active headingLg text-text-default">
                  <span className="flex-1">Name</span>
                  <span className="w-[180px]">Category</span>
                  <span className="w-[200px]">Published date</span>
                </div>
              </GraphItem>
              <GraphItem className="bg-surface-basic-subdued flex flex-col">
                {blogPosts.map((bp) => {
                  if (bp.kind !== 'MdxPage') {
                    return null;
                  }
                  return (
                    <a
                      href={bp.route}
                      key={bp.name}
                      className="py-xl px-5xl flex flex-row items-center h-8xl"
                    >
                      <div className="flex-1 text-text-default bodyXl">
                        {bp.frontMatter?.title}
                      </div>
                      <div className="text-text-soft bodyXl w-[180px] capitalize">
                        {bp.frontMatter?.category}
                      </div>
                      <div className="text-text-soft bodyXl w-[200px]">
                        {new Date(bp.frontMatter?.date).toLocaleDateString(
                          locale,
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </div>
                    </a>
                  );
                })}
              </GraphItem>
              <GraphItem>hello</GraphItem>
            </div>
          </GraphExtended>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default BlogHome;
