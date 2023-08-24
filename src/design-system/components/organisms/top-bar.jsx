import { createContext, createRef, useEffect, useMemo, useState } from 'react';
import Container from '../atoms/container';
import { cn } from '../utils';

export const TopBarContext = createContext();

export const TopBar = ({ tabs, actions, logo, fixed, breadcrum = null }) => {
  const ref = createRef();

  const [isSticked, setIsSticked] = useState(false);

  useEffect(() => {
    const getScroll = () => {
      if (ref && ref.current) {
        const { top } = ref.current.getBoundingClientRect();
        // if (log) {
        //   logger.log(top, topLimit);
        // }

        if (top < 0) {
          setIsSticked(true);
        } else {
          setIsSticked(false);
        }
      }
    };
    document.addEventListener('scroll', getScroll);
    return () => {
      document.removeEventListener('scroll', getScroll);
    };
  }, [ref]);

  return (
    <>
      <div
        className={cn('bg-surface-basic-default z-40', {
          'border-b border-border-default': !tabs,
          'sticky top-0 left-0 right-0': !tabs,
        })}
      >
        <Container>
          <div className="flex flex-row items-center gap-3xl py-xl">
            <div className="flex flex-row gap-lg items-center">
              {!!logo && logo}
              {!!breadcrum && breadcrum}
            </div>
            <div className="flex flex-row items-center justify-end flex-1">
              <div className="flex flex-row items-center justify-center">
                {actions && actions}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div
        ref={ref}
        className={cn(
          'border-b border-border-default bg-surface-basic-default z-40',
          {
            'sticky -top-xs left-0 right-0': fixed,
            'pt-xs': fixed && isSticked,
          }
        )}
      >
        <TopBarContext.Provider
          value={useMemo(
            () => ({ isSticked: isSticked && fixed }),
            [isSticked]
          )}
        >
          <Container>{!!tabs && tabs}</Container>
        </TopBarContext.Provider>
      </div>
    </>
  );
};
