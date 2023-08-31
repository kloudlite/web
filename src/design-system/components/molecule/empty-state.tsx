import { ReactNode } from 'react';
import { Button, IButton } from '../atoms/button';
import { cn } from '../utils';

interface IEmptyState {
  heading: string;
  image?: string;
  children: ReactNode;
  footer: ReactNode;
  action: IButton;
  secondaryAction: IButton;
}

export const EmptyState = ({
  image,
  heading = 'This is where you’ll manage your projects',
  children,
  footer,
  action,
  secondaryAction,
}: IEmptyState) => {
  return (
    <div className="flex flex-col items-center shadow-card border border-border-default rounded">
      <div className={cn('flex flex-col items-center px-3xl py-8xl gap-5xl')}>
        {image ? (
          <img src={image} className="max-h-43 max-w-37" alt="empty state" />
        ) : (
          <div className="h-43 w-37 bg-surface-basic-hovered" />
        )}
        <div className="flex flex-col gap-2xl pb-8xl">
          <div className="headingLg text-center">{heading}</div>
          {children && (
            <div className="text-text-strong bodyMd text-center">
              {children}
            </div>
          )}
          {(!!action || !!secondaryAction) && (
            <div className="flex flex-row items-center justify-center gap-lg">
              {!!secondaryAction && (
                <Button {...{ ...secondaryAction, variant: 'outline' }} />
              )}
              {!!action && <Button {...{ ...action, variant: 'primary' }} />}
            </div>
          )}
          {!!footer && <div className="bodySm text-text-soft">{footer}</div>}
        </div>
      </div>
    </div>
  );
};
