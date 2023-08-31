import classNames from 'classnames';
import { Link } from '@remix-run/react';
import { ReactNode } from 'react';
import { Button } from '../atoms/button';
import Container from '../atoms/container';

interface ContextualSaveBarProps {
  logo?: ReactNode;
  logoWidth?: number;
  message?: string;
  saveAction?: () => void;
  discardAction?: () => void;
  fixed?: boolean;
}

export const ContextualSaveBar = ({
  logo = null,
  logoWidth = 124,
  message = '',
  saveAction,
  discardAction,
  fixed = false,
}: ContextualSaveBarProps) => {
  return (
    <div
      className={classNames(
        'transition-all bg-surface-secondary-pressed py-xl',
        {
          'sticky top-0 left-0 right-0 z-40': fixed,
        }
      )}
    >
      <Container>
        <div className="flex flex-row items-center justify-between gap-lg md:gap-0">
          {logo && (
            <Link
              to="/"
              className="hidden md:block lg:block xl:block"
              // width={logoWidth}
              style={{ width: `${logoWidth}px` }}
            >
              {logo}
            </Link>
          )}
          {message && (
            <div className="headingMd text-text-on-primary font-sans-serif truncate">
              {message}
            </div>
          )}
          {logo && (
            <>
              <div className="hidden md:block" />
              <div className="hidden md:block" />
              <div className="hidden md:block" />
            </>
          )}
          <div className="gap-x-lg flex flex-row items-center">
            {discardAction && (
              <Button
                content="Discard"
                onClick={discardAction}
                variant="secondary-outline"
              />
            )}
            {saveAction && (
              <Button content="Publish" onClick={saveAction} variant="basic" />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
