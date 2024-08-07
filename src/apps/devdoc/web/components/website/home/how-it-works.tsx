import { useState } from 'react';
import consts from '~/app/utils/const';
import HorizontalTopTab from '../horizontal-top-tab-home';
import ResponsiveImage from '../responsive-image';

const HowItWorksSection = () => {
  const [selectedTab, setSelectedTab] = useState(
    consts.homeNew.howitworks.items[0].id,
  );

  const imgs = consts.homeNew.howitworks.images;
  const getTab = () => {
    switch (selectedTab) {
      case 'collaborate':
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <ResponsiveImage
              alt={selectedTab}
              rmobile={imgs.collaborate.rmobile}
              rmobileDark={imgs.collaborate.rmobile}
              r768={imgs.collaborate.r768}
              r768Dark={imgs.collaborate.r768Dark}
              r1024={imgs.collaborate.r1440}
              r1024Dark={imgs.collaborate.r1440Dark}
              r1280={imgs.collaborate.r1440}
              r1280Dark={imgs.collaborate.r1440Dark}
              r1440={imgs.collaborate.r1440}
              r1440Dark={imgs.collaborate.r1440Dark}
              r1920={imgs.collaborate.r1440}
              r1920Dark={imgs.collaborate.r1440Dark}
            />
          </div>
        );
      case 'nocommit':
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <ResponsiveImage
              alt={selectedTab}
              rmobile={imgs.nocommit.rmobile}
              rmobileDark={imgs.nocommit.rmobile}
              r768={imgs.nocommit.r768}
              r768Dark={imgs.nocommit.r768Dark}
              r1024={imgs.nocommit.r1440}
              r1024Dark={imgs.nocommit.r1440Dark}
              r1280={imgs.nocommit.r1440}
              r1280Dark={imgs.nocommit.r1440Dark}
              r1440={imgs.nocommit.r1440}
              r1440Dark={imgs.nocommit.r1440Dark}
              r1920={imgs.nocommit.r1440}
              r1920Dark={imgs.nocommit.r1440Dark}
            />
          </div>
        );
      case 'integrate':
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <ResponsiveImage
              alt={selectedTab}
              rmobile={imgs.integrate.rmobile}
              rmobileDark={imgs.integrate.rmobile}
              r768={imgs.integrate.r768}
              r768Dark={imgs.integrate.r768Dark}
              r1024={imgs.integrate.r1440}
              r1024Dark={imgs.integrate.r1440Dark}
              r1280={imgs.integrate.r1440}
              r1280Dark={imgs.integrate.r1440Dark}
              r1440={imgs.integrate.r1440}
              r1440Dark={imgs.integrate.r1440Dark}
              r1920={imgs.integrate.r1440}
              r1920Dark={imgs.integrate.r1440Dark}
            />
          </div>
        );
      case 'connect':
      default:
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <ResponsiveImage
              alt={selectedTab}
              rmobile={imgs.connect.rmobile}
              rmobileDark={imgs.connect.rmobile}
              r768={imgs.connect.r768}
              r768Dark={imgs.connect.r768Dark}
              r1024={imgs.connect.r1440}
              r1024Dark={imgs.connect.r1440Dark}
              r1280={imgs.connect.r1440}
              r1280Dark={imgs.connect.r1440Dark}
              r1440={imgs.connect.r1440}
              r1440Dark={imgs.connect.r1440Dark}
              r1920={imgs.connect.r1440}
              r1920Dark={imgs.connect.r1440Dark}
            />
          </div>
        );
    }
  };

  return (
    <HorizontalTopTab
      images={imgs}
      title={
        <div className="2xl:!wb-max-w-[746px] wb-m-auto">
          How Kloudlite transforms your workflows?
        </div>
      }
      tabContainerClassName="wb-grid wb-grid-cols-4 xl:wb-grid-cols-[256px_224px_224px_224px] 2xl:wb-grid-cols-4 3xl:wb-grid-cols-[352px_320px_320px_320px] wb-gap-3xl lg:wb-gap-5xl"
      tabContentClassName="wb-px-xl md:wb-px-0 wb-py-md"
      tabs={consts.homeNew.howitworks.items}
      onTabChange={(item) => setSelectedTab(item.id)}
      activeTab={selectedTab}
      tab={getTab()}
    />
  );
};

export default HowItWorksSection;
