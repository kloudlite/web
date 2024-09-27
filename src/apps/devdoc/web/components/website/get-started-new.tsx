import { ReactNode } from 'react';
import Radio from 'kl-design-system/atoms/radio';
import { cn } from '~/app/utils/commons';
import { GraphItem } from '../graph';
import { Block } from '../commons';

interface IGetStartedItem {
  label?: ReactNode;
  desc?: ReactNode;
  id?: string;
  active: boolean;
  onClick: () => void;
}

const GetStartedItem = ({
  label,
  desc,
  active,
  onClick,
  id: _id,
}: IGetStartedItem) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex flex-col gap-2xl transition-all cursor-pointer p-3xl h-full lg:min-h-[160px]',
        active
          ? 'text-text-primary bg-surface-primary-subdued'
          : 'text-text-default bg-surface-basic-default'
      )}
    >
      <div className="headingXl-marketing">{label}</div>
      <div className={cn('bodyLg', active ? '' : '!text-text-soft')}>
        {desc}
      </div>
    </div>
  );
};

interface IGetStarted {
  title: ReactNode;
  desc?: ReactNode;
  tab: ReactNode;
  activeTab: string;
  tabs: Omit<IGetStartedItem, 'active' | 'onClick'>[];
  onTabChange: (item: Omit<IGetStartedItem, 'active' | 'onClick'>) => void;
  tabContainerClassName?: string;
}

const GetStartedNew = ({
  title,
  desc,
  tab,
  activeTab,
  tabs,
  onTabChange,
  tabContainerClassName,
}: IGetStarted) => {
  return (
    <Block title={title} desc={desc}>
      <div className="grid grid-rows-[112px_50px] md:!grid-rows-none md:!grid-cols-[250px_auto] lg:!grid-cols-[448px_auto] md:!gap-3xl lg:!gap-5xl">
        <div
          className={cn(
            'hidden md:!grid gap-3xl lg:!gap-5xl',
            tabContainerClassName
          )}
        >
          {tabs.map((gs) => (
            <GraphItem key={gs.id}>
              <GetStartedItem
                {...gs}
                onClick={() => onTabChange(gs)}
                active={gs.id === activeTab}
              />
            </GraphItem>
          ))}
        </div>
        <GraphItem className="md:hidden">
          <GetStartedItem
            {...(tabs.find((t) => t.id === activeTab) || {})}
            onClick={() => {}}
            active
          />
        </GraphItem>

        <GraphItem className="flex items-center justify-center md:!hidden">
          <div className="flex items-center justify-center">
            <Radio.Root
              value={activeTab}
              className="!flex-row"
              onChange={(t) =>
                onTabChange(tabs.find((tab) => tab.id === t) || {})
              }
            >
              {tabs.map((item) => (
                <Radio.Item key={item.id} value={item.id || ''}>
                  {true}
                </Radio.Item>
              ))}
            </Radio.Root>
          </div>
        </GraphItem>

        <GraphItem>
          <div className="bg-surface-basic-default h-full">{tab}</div>
        </GraphItem>
      </div>
    </Block>
  );
};

export default GetStartedNew;
