import { ReactNode } from 'react';
import { Button } from 'kl-design-system/atoms/button';
import { ArrowRight } from '~/app/icons/icons';
import Image from 'next/image';
import Radio from 'kl-design-system/atoms/radio';
import { cn } from '~/app/utils/commons';
import { GraphExtended, GraphItem } from '../graph';
import SectionWrapper from './section-wrapper';

type ISuccessStoryButton = { logo: any; onClick: () => void; active: boolean };
export const SuccessStoryDetailButton = ({
  logo: Logo,
  onClick,
  active: _,
}: ISuccessStoryButton) => {
  return (
    <div
      onClick={onClick}
      className="p-3xl bg-surface-basic-subdued flex items-center justify-center h-full"
    >
      <Logo detailed />
    </div>
  );
};

interface ISuccessStoryBase {
  content: ReactNode;
  subContent: ReactNode;
  image: string;
  link: string;
  logo: any;
  id: string;
}

interface ISuccessStoryCard extends Omit<ISuccessStoryBase, 'logo'> {
  extra?: ReactNode;
}
export const SuccessStoryDetailCard = ({
  content,
  subContent,
  image,
  link: _,
  extra,
}: ISuccessStoryCard) => {
  return (
    <div className="bg-surface-basic-default p-3xl md:!p-5xl flex flex-col md:!flex-row md:!gap-7xl md:max-h-[288px] h-full">
      <div className="flex flex-col gap-3xl pb-3xl md:!pb-0 md:!gap-5xl flex-1">
        <div className="flex flex-col gap-3xl">
          <p className="bodyXl text-text-soft line-clamp-5">{content}</p>
          <span className="bodyXl text-text-soft line-clamp-1">
            {subContent}
          </span>
        </div>
        <Button
          content="Read the full story"
          suffix={<ArrowRight />}
          size="sm"
          variant="basic"
        />
      </div>
      {extra}
      <div className="flex-1 -mx-3xl -mb-3xl md:!mx-0 md:!mb-0">
        {image ? (
          <Image src={image} alt="success-story" />
        ) : (
          <div className="bg-surface-basic-active w-full h-[240px] md:!h-full md:!w-auto" />
        )}
      </div>
    </div>
  );
};

interface ISuccessStory {
  title: ReactNode;
  activeTab: string;
  tabs: ISuccessStoryBase[];
  onTabChange: (item: ISuccessStoryBase) => void;
  tabContainerClassName?: string;
}

const SuccessStories = ({
  tabs,
  activeTab,
  onTabChange,
  title,
  tabContainerClassName,
}: ISuccessStory) => {
  return (
    <SectionWrapper className="flex-col">
      <div className="flex flex-col gap-md text-center">
        <p className="bodyXl lg:!bodyXXl text-text-disabled">Case study</p>
        <h3 className="heading3xl-marketing lg:!heading5xl-marketing text-text-default">
          {title || 'Success stories'}
        </h3>
      </div>
      <GraphExtended>
        <div className="grid grid-rows-[auto_64px] 3xl:grid-rows-[288px_64px] gap-3xl lg:!gap-5xl">
          <GraphItem>
            <SuccessStoryDetailCard
              {...(tabs.find((tb) => tb.id === activeTab) || tabs[0])}
              extra={
                <div className="py-3xl flex items-center justify-center md:!hidden">
                  <Radio.Root
                    value={activeTab}
                    className="!flex-row"
                    onChange={(t) =>
                      /** @ts-ignore* */
                      onTabChange?.(tabs.find((tab) => tab.id === t))
                    }
                  >
                    {tabs.map((item) => (
                      /** @ts-ignore* */
                      <Radio.Item key={item.id} value={item.id} />
                    ))}
                  </Radio.Root>
                </div>
              }
            />
          </GraphItem>
          <GraphItem className="md:hidden">
            <SuccessStoryDetailButton
              {...(tabs.find((tb) => tb.id === activeTab) || tabs[0])}
              onClick={() => {}}
              active
            />
          </GraphItem>
          <div
            className={cn(
              'hidden md:!grid grid-cols-4 xl:!grid-cols-[256px_224px_224px_224px] 2xl:!grid-cols-4 3xl:!grid-cols-[352px_320px_320px_320px] gap-3xl lg:!gap-5xl',
              tabContainerClassName
            )}
          >
            {tabs.map((ss) => (
              <GraphItem key={ss.subContent?.toString()}>
                <SuccessStoryDetailButton
                  {...ss}
                  onClick={() => onTabChange?.(ss)}
                  active={activeTab === ss.id}
                />
              </GraphItem>
            ))}
          </div>
        </div>
      </GraphExtended>
    </SectionWrapper>
  );
};

export default SuccessStories;
