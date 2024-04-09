import { Search } from '@jengaicons/react';
import { TextInput } from 'kl-design-system/atoms/input';
import Tab from 'kl-design-system/atoms/tabs';
import { ReactNode, useState } from 'react';
import { GraphExtended, GraphItem } from '../graph';
import SectionWrapper from '../website/section-wrapper';

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
      <div className="flex flex-col gap-xl 2xl:p-3xl 3xl:p-4xl">
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
      <div className="py-10xl flex flex-col">
        <div className="flex flex-col gap-3xl">
          <h1 className="heading5xl-marketing">Blog</h1>
          <p className="bodyXXl text-text-soft">
            The one stop shop for latest tech trends, tools, insights, and
            analysis
          </p>
        </div>
        <div className="flex flex-row items-center justify-between pt-5xl">
          <Tab.Root value={tab} onChange={setTab}>
            {tabs.map((t) => (
              <Tab.Tab key={t.value} label={t.label} value={t.value} />
            ))}
          </Tab.Root>
          <div className="w-[330px]">
            <TextInput placeholder="Search" prefixIcon={<Search />} />
          </div>
        </div>
        <SectionWrapper className="flex flex-col" noPadding>
          <GraphExtended>
            <div className="grid grid-cols-3 gap-5xl">
              {tabItems[tab].map((ti) => {
                return (
                  <GraphItem key={ti.label}>
                    <TabCard
                      label={ti.label}
                      desc={ti.desc}
                      img="https://s3-alpha-sig.figma.com/img/00b4/62fc/41bbcc28adba5a2fbfcc1bda3fcfa8b5?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dDBCOY1clpXXoQcjT3J6d0~BC6pt2iRRRpFi9o92d5plwaypARZLTqscwBdKIJDN-1XraK12BxL70VN60b-vNlgPPwaPYm1uzDLzDKNR~PbjakKKG2U-b0K9XtcPTkq1ozd9swbIYbmIeFRckevFiDv04EzWFVsi~Ofskl0dqxFewAbGLlLurytwp84m7vHo6bzYo82jqHLLVKBwPm42xmj~PPS5PitFyDy8SplM0RfH0E~4zb7hwR2EZmHjJ8J0nZqPLfeE7hHfT8od1GaNhVL09QTeSfLJeDi5s0TUp1u87us1mbeuYJbVIOvp1N72tZkSpA44qrkCcXnIxhHVqg__"
                    />
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
