import { useState } from 'react';
import consts from '~/app/utils/const';
import HorizontalTopTab from '../horizontal-top-tab-home';

const HowItWorksSection = () => {
  const [selectedTab, setSelectedTab] = useState(
    consts.homeNew.howitworks.items[0].id
  );

  const imgs = consts.homeNew.howitworks.images;
  const getTab = () => {
    switch (selectedTab) {
      case 'collaborate':
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <img
              className="dark:wb-hidden  wb-max-h-full"
              alt="distribute"
              src={imgs.collaborate.r1440}
            />
            <img
              className="wb-hidden dark:wb-block  wb-max-h-full"
              alt="distribute"
              src={imgs.collaborate.r1440Dark}
            />
          </div>
        );
      case 'nocommit':
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <img
              className="dark:wb-hidden  wb-max-h-full"
              alt="distribute"
              src={imgs.nocommit.r1440}
            />
            <img
              className="wb-hidden dark:wb-block  wb-max-h-full"
              alt="distribute"
              src={imgs.nocommit.r1440Dark}
            />
          </div>
        );
      case 'integrate':
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <img
              className="dark:wb-hidden  wb-max-h-full"
              alt="distribute"
              src={imgs.integrate.r1440}
            />
            <img
              className="wb-hidden dark:wb-block  wb-max-h-full"
              alt="distribute"
              src={imgs.integrate.r1440Dark}
            />
          </div>
        );
      case 'connect':
      default:
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <img
              className="dark:wb-hidden wb-max-h-full"
              alt="distribute"
              src={imgs.connect.r1440}
            />
            <img
              className="wb-hidden dark:wb-block wb-max-h-full"
              alt="distribute"
              src={imgs.connect.r1440Dark}
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
