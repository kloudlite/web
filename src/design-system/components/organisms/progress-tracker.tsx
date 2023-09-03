import { cn } from '../utils';

const ProgressTrackerItem = ({ label, active }: any) => {
  return (
    <div
      className={cn('flex flex-row gap-x-xl items-center headingMd', {
        'text-text-default': active,
        'text-text-disabled': !active,
      })}
    >
      <div
        className={cn(
          'w-[10px] h-[10px] rounded-full flex items-center justify-center'
        )}
      >
        {active && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-icon-primary"
          >
            <circle cx="5" cy="5" r="5" />
          </svg>
        )}
        {!active && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-border-default"
          >
            <circle cx="5" cy="5" r="2.5" />
          </svg>
        )}
      </div>
      <div className="py-lg">{label}</div>
    </div>
  );
};

interface IProgressTracker {
  items: {
    label: string;
    active?: boolean;
    id: string | number;
  }[];
  onClick?: (id: string | number) => void;
}

export const ProgressTracker = ({
  items,
  onClick = () => {},
}: IProgressTracker) => {
  return (
    <div className="flex flex-col gap-y-lg">
      {items &&
        items.map((item, index) => {
          return (
            <div
              className={cn('flex flex-col', {
                'cursor-pointer': !!onClick,
              })}
              key={item.id}
              onClick={() => onClick(item.id)}
            >
              <ProgressTrackerItem active={item.active} label={item.label} />
              {index !== items.length - 1 && (
                <div className="flex items-center justify-center w-[10px]">
                  <svg
                    width="10"
                    height="35"
                    className="-mt-[13px] -mb-[22px] stroke-border-default"
                  >
                    <line
                      x1="5"
                      y1="1"
                      x2="5"
                      y2="34"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeDasharray="3, 4"
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
