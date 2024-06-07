import { ReactNode, cloneElement } from 'react';
import { cn } from '../utils';

interface IBadge {
  type?: 'neutral' | 'info' | 'success' | 'warning' | 'critical';
  children: ReactNode;
  icon?: JSX.Element;
  className?: string;
}

export const Badge = ({
  type = 'neutral',
  children,
  icon,
  className,
}: IBadge) => {
  const iconProps = { size: 12, color: 'currentColor' };

  return (
    <div
      className={cn(
        'flex gap-md items-center py-md px-2xl w-fit rounded-full bodySm border select-none pulsable',
        {
          'border-border-default bg-surface-basic-default': type === 'neutral',
          'border-border-primary bg-surface-primary-subdued text-text-primary':
            type === 'info',
          'border-border-success bg-surface-success-subdued text-text-success ':
            type === 'success',
          'border-border-warning bg-surface-warning-subdued text-text-warning':
            type === 'warning',
          'border-border-critical bg-surface-critical-subdued text-text-critical':
            type === 'critical',
        },
        className
      )}
    >
      {!!icon && cloneElement(icon, iconProps)}
      {children}
    </div>
  );
};
