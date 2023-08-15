import Container from '../atoms/container';
import Tabs from '../atoms/tabs';
import { cn } from '../utils';

export const TopBar = ({
  tab,
  actions,
  logo,
  fixed,
  linkComponent,
  breadcrum = null,
}) => {
  return (
    <div
      className={cn(
        'border-b border-border-default bg-surface-basic-default z-40',
        {
          'sticky top-0 left-0 right-0': fixed,
        }
      )}
    >
      <Container>
        <div className="flex flex-row items-center gap-3xl py-xl">
          <div className="flex flex-row gap-lg items-center">
            {logo && logo}
            {breadcrum && breadcrum}
          </div>
          <div className="flex flex-row items-center justify-end flex-1">
            <div className="flex flex-row items-center justify-center">
              {actions && actions}
            </div>
          </div>
        </div>
        {tab && (
          <div className="-mx-3xl md:mx-0">
            <Tabs.Root
              basePath={tab.basePath}
              value={tab.value}
              fitted={tab.fitted}
              onChange={tab.onChange}
              LinkComponent={linkComponent}
            >
              {tab.items?.map((tabitem, index) => {
                return <Tabs.Tab {...tabitem} key={index} />;
              })}
            </Tabs.Root>
          </div>
        )}
      </Container>
    </div>
  );
};
