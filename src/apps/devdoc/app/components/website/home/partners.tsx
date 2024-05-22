import Marquee from 'react-fast-marquee';
import consts from '~/app/utils/const';
import { cn } from '~/app/utils/commons';
import { GraphItem } from '../../graph';

const Partners = () => {
  return (
    <div className="wb-relative [mask:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
      <Marquee
        className="wb-cursor-pointer wb-max-w-[calc(100vw_-_46px)] md:wb-max-w-[calc(100vw_-_70px)] lg:!wb-w-auto wb-text-text-default dark:wb-text-text-on-primary"
        autoFill
        pauseOnHover
        speed={25}
      >
        {consts.homeNew.partners.map((p, i) => {
          const ii = i;
          return (
            <div
              key={ii}
              className="graph2 wb-py-8xl lg:wb-pb-10xl lg:wb-pt-8xl wb-px-2xl"
            >
              <GraphItem
                className={cn(
                  'wb-h-[64px] wb-flex wb-px-2xl wb-items-center wb-justify-center wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued',
                  p.className
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
    <div className="wb-pt-8xl lg:wb-pb-8xl lg:wb-pt-12xl wb-flex wb-flex-col">
      <p className="wb-bodyLg-medium wb-text-text-strong dark:wb-text-text-darktheme-default wb-text-center">
        Join the cult of our early adopters, and discover the power of Kloudlite
      </p>
      <Partners />
    </div>
  );
};

export default PartnerSection;
