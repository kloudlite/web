import { GraphExtended, GraphItem } from '../../graph';
import ProviderUI from '../provider-ui';

const SuperCharge = () => {
  return (
    <div className="3xl:wb-py-8xl">
      <GraphExtended className="xl:[clip-path:inset(24px_1.5px_24px_1.5px)] 3xl:[clip-path:inset(1.5px)]">
        <GraphItem className="wb-bg-surface-basic-input dark:wb-bg-surface-darktheme-basic-input">
          <div className="wb-flex wb-flex-col wb-p-3xl wb-gap-5xl md:wb-px-8xl md:wb-py-7xl md:wb-gap-6xl wb-items-center xl:wb-h-[288px]">
            <div className="wb-flex wb-flex-col wb-gap-2xl">
              <h4 className="wb-heading2xl-marketing md:wb-heading4xl-marketing wb-text-text-default dark:wb-text-text-darktheme-default wb-text-center">
                Supercharge your remote local environments
              </h4>
              <p className="wb-bodyLg md:wb-bodyXl wb-text-text-soft dark:wb-text-text-darktheme-soft wb-text-center">
                See why Kloudlite is the remote local environments of choice for
                modern developer teams
              </p>
            </div>
            <div className="wb-w-full lg:wb-w-[610px]">
              <ProviderUI />
            </div>
          </div>
        </GraphItem>
      </GraphExtended>
    </div>
  );
};

export default SuperCharge;
