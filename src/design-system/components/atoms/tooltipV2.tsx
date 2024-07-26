import { ReactNode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { PlacesType, Tooltip } from 'react-tooltip';
import { cn } from '../utils';

const TooltipV2 = ({
  children,
  content,
  place = 'top-start',
  className,
  offset,
}: {
  children?: ReactNode;
  content?: ReactNode;
  place?: PlacesType;
  className?: string;
  offset?: number;
}) => {
  return (
    <a
      className="flex w-fit max-w-full truncate"
      data-tooltip-id="tooltip"
      data-tooltip-html={ReactDOMServer.renderToStaticMarkup(content)}
      data-tooltip-place={place}
      data-tooltip-class-name={className}
      data-tooltip-offset={offset}
    >
      {children}
    </a>
  );
};

export const TooltipContainer = () => {
  return (
    <Tooltip
      clickable
      id={'tooltip'}
      disableStyleInjection
      className={cn(
        'z-[99999999999] bodySm text-text-default px-lg py-md shadow-popover bg-surface-basic-default rounded w-fit overflow-hidden [pointer-events:all]',
      )}
      noArrow
      offset={0}
      opacity={1}
      place="top-start"
    />
  );
};

export default TooltipV2;
