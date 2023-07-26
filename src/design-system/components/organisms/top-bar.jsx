import Container from '../atoms/container';
import { NavTabs } from '../atoms/tabs';
import { cn } from '../utils';

export const TopBar = ({ tab, actions, logo, fixed, linkComponent }) => {
  return (
    <div
      className={cn(
        'border-b border-border-default bg-surface-basic-subdued z-40',
        {
          'sticky top-0 left-0 right-0': fixed,
        }
      )}
    >
      <Container>
        <div className="flex flex-row items-center justify-between gap-3xl py-xl">
          {logo && logo}
          <div className="flex flex-row items-center justify-center">
            {actions && actions}
          </div>
        </div>
        {tab && (
          <div className="-mx-3xl md:mx-0">
            <NavTabs
              value={tab.value}
              layoutId={tab.layoutId}
              fitted={tab.fitted}
              items={tab.items}
              onChange={tab.onChange}
              LinkComponent={linkComponent}
            />
          </div>
        )}
      </Container>
    </div>
  );
};
