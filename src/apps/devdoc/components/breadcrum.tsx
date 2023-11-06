import type { Item } from 'nextra/normalize-pages';
import type { ReactElement } from 'react';
import { Fragment } from 'react';
import { ChevronRight } from '@jengaicons/react';
import { Anchor } from './anchor';
import { cn } from '~/utiltities/commons';

export function Breadcrumb({
  activePath,
}: {
  activePath: Item[];
}): ReactElement {
  return (
    <div className="nextra-breadcrumb flex items-center gap-md overflow-hidden">
      {activePath.map((item, index) => {
        const isLink = !item.children || item.withIndexPage;
        const isActive = index === activePath.length - 1;

        return (
          <Fragment key={item.route + item.name}>
            {index > 0 && <ChevronRight size={16} />}
            <div
              className={cn(
                'whitespace-nowrap transition-colors text-text-default',
                {
                  'bodyMd-medium': isActive,
                  'bodyMd min-w-[24px] overflow-hidden text-ellipsis':
                    !isActive,
                  'hover:text-text-strong': !!isLink,
                }
              )}
              title={item.title}
            >
              {isLink && !isActive ? (
                <Anchor href={item.route}>{item.title}</Anchor>
              ) : (
                item.title
              )}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
