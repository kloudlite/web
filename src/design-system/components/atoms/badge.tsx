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
          'border-border-default dark:border-border-darktheme-default bg-surface-basic-default dark:bg-surface-darktheme-basic-default text-text-default dark:text-text-darktheme-default':
            type === 'neutral',
          'border-border-primary dark:border-border-darktheme-primary bg-surface-primary-subdued dark:bg-surface-darktheme-primary-subdued text-text-primary dark:text-text-darktheme-primary':
            type === 'info',
          'border-border-success bg-surface-success-subdued text-text-success dark:border-border-darktheme-success dark:bg-surface-darktheme-success-subdued dark:text-text-darktheme-success':
            type === 'success',
          'border-border-warning bg-surface-warning-subdued text-text-warning dark:border-border-darktheme-warning dark:bg-surface-darktheme-warning-subdued dark:text-text-darktheme-warning':
            type === 'warning',
          'border-border-critical bg-surface-critical-subdued text-text-critical dark:border-border-darktheme-critical dark:bg-surface-darktheme-critical-subdued dark:text-text-darktheme-critical':
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
