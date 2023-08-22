import { cn } from '../utils';

export const Badge = ({ type, children, icon = null }) => {
  const Icon = icon;
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
      {icon && <Icon size={12} color="currentColor" />}
      {children}
    </div>
  );
};
