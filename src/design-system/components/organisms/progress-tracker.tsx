import { Circle, RecordFill } from '@jengaicons/react';
import { ReactNode } from 'react';
import { cn } from '../utils';
import { ChildrenProps } from '../types';

type IProgressTrackerItem<I = any> = {
  active?: boolean;
  completed?: boolean;
} & I;

function ProgressTrackerItem<I = any>(
  props: IProgressTrackerItem<I> & ChildrenProps
) {
  const { children, active = false, completed = false } = props;
  return (
    <div
      className={cn(
        'flex flex-row gap-x-xl items-center headingMd select-none',
        {
          'text-text-default': active,
          'text-text-disabled': !active || (!active && completed),
        }
      )}
    >
      <div className={cn('rounded-full flex items-center justify-center')}>
        {(active || completed) && <RecordFill size={12} color="currentColor" />}
        {!active && !completed && <Circle size={12} color="currentColor" />}
      </div>
      <div className="py-lg select-none">{children}</div>
    </div>
  );
}

export type ProgressItemProps<I = any, V = any> = {
  item: IProgressTrackerItem<I>;
  value: V;
};

interface IProgressTracker<I = any, V = any> {
  children: (item: IProgressTrackerItem<I>) => ReactNode;
  onClick: (item: V) => void;
  items: {
    item: IProgressTrackerItem<I>;
    value: V;
  }[];
}

function Root<I = any, V = any>({
  children,
  items = [],
  onClick,
}: IProgressTracker<I, V>) {
  return (
    <div className="flex flex-col gap-y-lg">
      {items.map(({ item, value }, index) => {
        // const childProps = childElement.props;
        // as IProgressTrackerItem
        return (
          <div
            key={JSON.stringify(value)}
            className={cn('flex flex-col select-none', {
              'cursor-pointer': !!onClick,
            })}
            onClick={() => {
              if (onClick) onClick(value);
            }}
          >
            {children(item)}
            {/* <ProgressTrackerItem {...item} /> */}
            {index < items.length - 1 && (
              <div className="flex items-center justify-center w-[12px] -mt-[13px] -mb-[21px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="36"
                  viewBox="0 0 2 36"
                  fill="none"
                >
                  <path
                    d="M1 1.18723V34.9972"
                    stroke="#9CA3AF"
                    strokeLinecap="round"
                    strokeDasharray="2 2"
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const ProgressTracker = {
  Root,
  Item: ProgressTrackerItem,
};

export default ProgressTracker;
