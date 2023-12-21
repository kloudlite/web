import { ReactNode } from 'react';
import { Button } from 'kl-design-system/atoms/button';
import { ArrowRight } from '@jengaicons/react';
import { cn } from '~/app/utils/commons';
import Image from 'next/image';
import { Graph, GraphItem } from '../graph';

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

interface ISuccessStoryCard extends Omit<ISuccessStoryBase, 'logo'> {}
export const SuccessStoryDetailCard = ({
  content,
  subContent,
  image,
  link: _,
}: ISuccessStoryCard) => {
  return (
    <div className="bg-surface-basic-default p-5xl flex flex-row gap-7xl max-h-[288px]">
      <div className="flex flex-col gap-5xl flex-1">
        <div className="flex flex-col gap-3xl">
          <p className="bodyLg text-text-soft line-clamp-5">{content}</p>
          <span className="bodyLg text-text-soft line-clamp-1">
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
      <div className="flex-1">
        {image ? (
          <Image src={image} alt="success-story" />
        ) : (
          <div className="bg-surface-basic-active w-full h-full" />
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
    <>
      <div className="flex flex-col gap-md text-center">
        <p className="bodyXl-medium text-text-disabled">Case study</p>
        <h3 className="heading5xl-marketing text-text-default">
          {title || 'Success stories'}
        </h3>
      </div>
      <Graph className="-mx-10xl">
        <div className="grid grid-rows-[auto_64px] px-10xl py-10xl gap-5xl">
          <GraphItem>
            <SuccessStoryDetailCard
              {...(tabs.find((tb) => tb.id === activeTab) || tabs[0])}
            />
          </GraphItem>
          <div
            className={cn('grid grid-cols-4 gap-5xl', tabContainerClassName)}
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
      </Graph>
    </>
  );
};

export default SuccessStories;
