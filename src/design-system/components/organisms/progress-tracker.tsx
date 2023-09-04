import { Circle, RecordFill } from '@jengaicons/react';
import React, { ReactElement, ReactNode } from 'react';
import { cn } from '../utils';

export interface IProgressTrackerItem {
  children: ReactNode;
  active: boolean;
  completed: boolean;
  item?: any;
}
const ProgressTrackerItem = (props: IProgressTrackerItem) => {
  const { children, active, completed, item: _ } = props;
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
};

interface IProgressTracker {
  children: ReactNode;
  onClick?: (item: any) => void;
}

const Root = ({ children, onClick }: IProgressTracker) => {
  return (
    <div className="flex flex-col gap-y-lg">
      {React.Children.map(children, (child, index) => {
        const childElement = child as ReactElement;
        const childProps = childElement.props as IProgressTrackerItem;
        return (
          <div
            className={cn('flex flex-col select-none', {
              'cursor-pointer': !!onClick,
            })}
            onClick={() => {
              if (onClick) onClick(childProps.item);
            }}
          >
            <ProgressTrackerItem {...childProps} />
            {index < React.Children.count(children) - 1 && (
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
};

const ProgressTracker = {
  Root,
  Item: ProgressTrackerItem,
};

export default ProgressTracker;
