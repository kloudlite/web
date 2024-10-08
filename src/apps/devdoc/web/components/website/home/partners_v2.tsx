import Marquee from 'react-fast-marquee';
import consts from '~/app/utils/const';
import { cn } from '~/app/utils/commons';
import { GraphItem } from '../../graph';
import '@splidejs/react-splide/css/core';

const Partners = () => {
  return (
    <div className="wb-relative [mask:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)] xl:-wb-mx-7xl">
      <Marquee
        className="wb-cursor-pointer wb-max-w-[calc(100vw_-_46px)] md:wb-max-w-[calc(100vw_-_70px)] lg:!wb-w-auto wb-text-text-default"
        autoFill
        pauseOnHover
        speed={25}
      >
        {consts.homeNew.partners.map((p, i) => {
          const ii = i;
          return (
            <div
              key={ii}
              className="wb-relative wb-bg-[position:16px_0px] graph2 wb-py-8xl lg:wb-py-8xl wb-px-2xl"
            >
              <GraphItem
                className={cn(
                  'wb-h-[64px] wb-flex wb-px-2xl wb-items-center wb-justify-center wb-bg-surface-basic-subdued',
                  p.className,
                )}
              >
                {p.icon}
              </GraphItem>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

const PartnerSection = () => {
  return (
    <div className="wb-pt-8xl md:wb-pt-10xl md:wb-pb-5xl wb-flex wb-flex-col">
      <p className="wb-bodyXl wb-text-text-strong wb-text-center">
        Join the cult of our early adopters and discover the power of Kloudlite
      </p>
      <Partners />
    </div>
  );
};

export default PartnerSection;
