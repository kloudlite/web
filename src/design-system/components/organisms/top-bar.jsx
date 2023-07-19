import { NavTabs } from '../atoms/tabs';
import { cn } from '../utils';

export const TopBar = ({ tab, actions, logo, fixed, linkComponent }) => {
  return (
    <div
      className={cn(
        'border-b border-border-default bg-surface-basic-subdued px-0 md:px-6xl lg:px-9xl xl:px-11xl z-40',
        {
          'sticky top-0 left-0 right-0': fixed,
        }
      )}
    >
      <div className={cn('flex flex-col m-auto')}>
        <div className="flex flex-row items-center justify-between gap-9xl py-xl px-3xl md:px-0">
          {logo && logo}
          <div className="flex flex-row items-center justify-center">
            {actions && actions}
          </div>
        </div>
        {tab && (
          <NavTabs
            value={tab.value}
            layoutId={tab.layoutId}
            fitted={tab.fitted}
            items={tab.items}
            onChange={tab.onChange}
            LinkComponent={linkComponent}
          />
        )}
      </div>
    </div>
  );
};
