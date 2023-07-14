import { NavTabs } from '../atoms/tabs';
import { cn } from '../utils';

export const TopBar = ({
  tab,
  actions,
  logo,
  fixed,
  fullwidth,
  linkComponent,
}) => {
  return (
    <div
      className={cn(
        'border-b border-border-default bg-surface-basic-subdued px-xl z-10',
        {
          'sticky top-0 left-0 right-0': fixed,
        }
      )}
    >
      <div
        className={cn('flex flex-col m-auto', {
          'max-w-[1184px]': !fullwidth,
        })}
      >
        <div className="flex flex-row items-center justify-between gap-9xl py-xl">
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
