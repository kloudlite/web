import type { Item } from 'nextra/normalize-pages';
import type { ReactElement } from 'react';
import { Fragment } from 'react';
import { ChevronRight } from '@jengaicons/react';
import { Anchor } from './anchor';
import { cn } from '../utils/commons';

export function Breadcrumb({
  activePath,
}: {
  activePath: Item[];
}): ReactElement {
  return (
    <div className="wb-items-center wb-gap-md wb-overflow-hidden">
      {activePath
        .filter((f) => f.name !== 'index')
        .map((item, index) => {
          const isLink = !!item.children;
          const isActive = index === activePath.length - 1;

          return (
            <Fragment key={item.route + item.name}>
              {index > 0 && (
                <span className="wb-text-icon-soft inline-block [vertical-align:middle]">
                  <ChevronRight size={16} />
                </span>
              )}
              <span
                className={cn(
                  'wb-shrink-0 wb-transition-colors [vertical-align:middle]',
                  {
                    'wb-bodyMd-medium wb-text-text-default dark:wb-text-text-darktheme-default':
                      isActive,
                    'wb-bodyMd wb-min-w-[24px] wb-overflow-hidden wb-text-ellipsis wb-text-text-strong dark:wb-text-text-darktheme-strong':
                      !isActive,
                    'hover:wb-text-text-strong dark:hover:wb-text-text-darktheme-strong':
                      !!isLink,
                  }
                )}
                title={item.title}
              >
                {isLink && !isActive ? (
                  <Anchor href={item.route}>{item.title}</Anchor>
                ) : (
                  item.title
                )}
              </span>
            </Fragment>
          );
        })}
    </div>
  );
}
