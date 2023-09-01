import React, { ReactNode, cloneElement } from 'react';
import { cn } from '../utils';

interface IBadge {
  type?: string;
  children: ReactNode;
  icon?: JSX.Element;
}

export const Badge = ({ type = 'neutral', children, icon }: IBadge) => {
  const iconProps = { size: 12, color: 'currentColor' };

  return (
    <div
      className={cn(
        'flex gap-md items-center h-3xl py-sm px-lg w-fit rounded-full bodySm border select-none',
        {
          'border-border-default bg-surface-basic-default text-text-default':
            type === 'neutral',
          'border-border-primary bg-surface-primary-subdued text-text-primary':
            type === 'info',
          'border-border-success bg-surface-success-subdued text-text-success':
            type === 'success',
          'border-border-warning bg-surface-warning-subdued text-text-warning':
            type === 'warning',
          'border-border-critical bg-surface-critical-subdued text-text-critical':
            type === 'critical',
        }
      )}
    >
      {!!icon && cloneElement(icon, iconProps)}
      {children}
    </div>
  );
};
