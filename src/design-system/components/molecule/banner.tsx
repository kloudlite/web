import { ReactNode } from 'react';
import {
  CheckCircleFill,
  InfoFill,
  WarningFill,
  WarningOctagonFill,
  X,
} from '~/components/icons';
import { cn } from '../utils';
import { IconButton } from '../atoms/button';

interface IBanner {
  type: 'default' | 'info' | 'success' | 'warning' | 'critical';
  title?: ReactNode;
  body?: ReactNode;
  showclose?: boolean;
  onClose?: () => void;
}

const getStyle = (type: IBanner['type']) => {
  switch (type) {
    case 'info':
      return 'bg-surface-primary-subdued border-border-primary';
    case 'success':
      return 'bg-surface-success-subdued border-border-success';
    case 'warning':
      return 'bg-surface-warning-subdued border-border-warning';
    case 'critical':
      return 'bg-surface-critical-subdued border-border-critical';
    case 'default':
    default:
      return 'bg-surface-basic-subdued border-border-default';
  }
};

const Icon = ({ type }: { type: IBanner['type'] }) => {
  const iconSize = 20;
  switch (type) {
    case 'info':
      return (
        <span className="text-text-primary">
          <InfoFill size={iconSize} />
        </span>
      );
    case 'success':
      return (
        <span
          className="
        text-text-success
        "
        >
          <CheckCircleFill size={iconSize} />
        </span>
      );
    case 'warning':
      return (
        <span className="text-text-warning">
          <WarningFill size={iconSize} />
        </span>
      );
    case 'critical':
      return (
        <span className="text-text-critical">
          {' '}
          <WarningOctagonFill size={iconSize} />
        </span>
      );
    case 'default':
    default:
      return (
        <span className="text-text-default">
          <InfoFill size={iconSize} />
        </span>
      );
  }
};
const Banner = (props: IBanner) => {
  const { type, title, body, onClose, showclose } = props;
  return (
    <div
      className={cn(
        'p-2xl flex flex-row gap-2xl border rounded-lg text-text-default items-start',
        getStyle(type)
      )}
    >
      <span className={cn(!!title && !!body ? 'pt-md' : '')}>
        <Icon type={type} />
      </span>
      <div className="flex-1 flex flex-col gap-sm">
        {title && <div className="headingMd">{title}</div>}
        {body && <div className="bodyMd">{body}</div>}
      </div>
      {showclose && (
        <span>
          <IconButton icon={<X />} variant="plain" onClick={onClose} />
        </span>
      )}
    </div>
  );
};

export default Banner;
