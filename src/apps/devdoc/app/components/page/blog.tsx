import { Search } from '@jengaicons/react';
import { TextInput } from 'kl-design-system/atoms/input';
import Tab from 'kl-design-system/atoms/tabs';
import { ReactNode, useState } from 'react';
import consts from '~/app/utils/const';
import { GraphExtended, GraphItem } from '../graph';
import SectionWrapper from '../website/section-wrapper';
import HoverItem from '../hover-item';

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
        </SectionWrapper>
      </div>
    </div>
  );
};

export default BlogHome;
