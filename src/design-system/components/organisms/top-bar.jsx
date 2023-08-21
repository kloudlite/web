import { ChevronLeft } from '@jengaicons/react';
import Container from '../atoms/container';
import Tabs from '../atoms/tabs';
import { cn } from '../utils';
import ScrollArea from '../atoms/scroll-area';

export const TopBar = ({
  tab,
  actions,
  logo,
  fixed,
  linkComponent,
  breadcrum = null,
  backurl = {},
}) => {
  let BackurlComp = linkComponent;
  let backurlProps = { to: backurl?.href };
  if (!BackurlComp) {
    BackurlComp = 'a';
    backurlProps = { href: backurl?.href };
  }
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
        {(!!tab?.items || !!tab?.backurl) && (
          <div className="flex flex-row items-center">
            {backurl && (
              <div className="flex flex-row items-center">
                <BackurlComp
                  {...backurlProps}
                  className="outline-none flex flex-row items-center gap-lg bodyMd-medium text-text-soft hover:text-text-default active:text-text-default py-lg cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  {backurl.name}
                </BackurlComp>
                <span className="ml-4xl mr-2xl w-xs h-2xl bg-border-default" />
              </div>
            )}
            {/* <div className="-mx-3xl md:mx-0">
             
            </div> */}
            <ScrollArea
              blurfrom="from-white"
              rightblur={false}
              className="flex-1 -mr-2xl"
            >
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
            </ScrollArea>
          </div>
        )}
      </Container>
    </div>
  );
};
