import { ReactNode } from 'react';
import { cn } from '~/app/utils/commons';
import { Graph, GraphItem } from '../graph';

interface IGetStartedItem {
  label: string;
  id: string;
  active: boolean;
  onClick: () => void;
}

const GetStartedItem = ({
  label,
  active,
  onClick,
  id: _id,
}: IGetStartedItem) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'transition-all cursor-pointer bg-surface-basic-subdued p-4xl heading3xl-marketing min-h-[96px]',
        active ? 'text-text-primary' : 'text-text-disabled'
      )}
    >
      {label}
    </div>
  );
};

interface IGetStarted {
  title: ReactNode;
  tab: ReactNode;
  activeTab: string;
  tabs: Omit<IGetStartedItem, 'active' | 'onClick'>[];
  onTabChange: (item: Omit<IGetStartedItem, 'active' | 'onClick'>) => void;
  tabContainerClassName?: string;
}

const GetStarted = ({
  title,
  tab,
  activeTab,
  tabs,
  onTabChange,
  tabContainerClassName,
}: IGetStarted) => {
  return (
    <div className="flex flex-col 2xl:pt-10xl">
      <div className="flex flex-col gap-md text-center">
        <p className="bodyXl-medium text-text-disabled">Get started</p>
        <h3 className="heading5xl-marketing text-text-default">{title}</h3>
      </div>
      <Graph className="-mx-10xl">
        <div className="grid grid-cols-[448px_auto] gap-5xl px-10xl py-10xl">
          <div
            className={cn('grid grid-rows-3 gap-5xl', tabContainerClassName)}
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
          <GraphItem>
            <div className="bg-surface-basic-active h-full">{tab}</div>
          </GraphItem>
        </div>
      </Graph>
    </div>
  );
};

export default GetStarted;
