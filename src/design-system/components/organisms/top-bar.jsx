import { createContext, createRef, useEffect, useMemo, useState } from 'react';
import Container from '../atoms/container';
import { cn } from '../utils';

export const TopBarContext = createContext();

export const useSticky = (elementRef, topLimit = 0) => {
  const [isStickey, setIsSticky] = useState(false);

  useEffect(() => {
    const getScroll = () => {
      if (elementRef && elementRef.current) {
        const { top } = elementRef.current.getBoundingClientRect();
        // if (log) {
        //   logger.log(top, topLimit);
        // }

        if (top < topLimit) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };
    document.addEventListener('scroll', getScroll);
    return () => {
      document.removeEventListener('scroll', getScroll);
    };
  }, [elementRef, topLimit]);

  return isStickey;
};

export const TopBar = ({ tabs, actions, logo, fixed, breadcrum = null }) => {
  const tabBarRef = createRef();
  const isTabBarSticked = useSticky(tabBarRef, 0);

  const headingRef = createRef();
  const isHeadingSticked = useSticky(headingRef, 0);

  return (
    <>
      <div
        ref={headingRef}
        className={cn(
          'bg-surface-basic-default z-40 transition-all overflow-hidden',
          {
            'border-b border-border-default': !tabs,
            'sticky -top-xs left-0 right-0': !tabs && fixed,
            'shadow-sm pt-xs': !tabs && fixed && isHeadingSticked,
          }
        )}
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

      <TopBarContext.Provider
        value={useMemo(
          () => ({ isSticked: isTabBarSticked && fixed }),
          [isTabBarSticked]
        )}
      >
        {!!tabs && (
          <div
            ref={tabBarRef}
            className={cn(
              'bg-surface-basic-default z-40 border-b border-border-default',
              {
                'sticky -top-xs pt-xs left-0 right-0': fixed,
                'shadow-sm': fixed && isTabBarSticked,
              }
            )}
          >
            <Container>{tabs}</Container>
          </div>
        )}
      </TopBarContext.Provider>
    </>
  );
};
