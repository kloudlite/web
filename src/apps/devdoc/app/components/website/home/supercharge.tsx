import { GraphExtended, GraphItem } from '../../graph';
import JoinProvidersDialog from '../../join-provider-dialog';

const SuperCharge = () => {
  return (
    <div className="2xl:wb-py-8xl">
      <GraphExtended className="xl:[clip-path:inset(24px_1.5px_24px_1.5px)] 3xl:[clip-path:inset(1.5px)]">
        <GraphItem className="wb-bg-surface-basic-subdued">
          <div className="wb-flex wb-flex-col wb-p-3xl wb-gap-5xl md:wb-px-8xl md:wb-py-7xl md:wb-gap-6xl wb-items-center xl:wb-h-[288px]">
            <div className="wb-flex wb-flex-col wb-gap-2xl">
              <h4 className="wb-heading2xl-marketing md:wb-heading4xl-marketing wb-text-text-default wb-text-center">
                Supercharge your remote local environments
              </h4>
              <p className="wb-bodyLg md:wb-bodyXl wb-text-text-soft wb-text-center">
                See why Kloudlite is the remote local environments of choice for
                modern developer teams
              </p>
            </div>
            <div className="wb-w-full lg:wb-w-[300px]">
              <JoinProvidersDialog size="lg" />
            </div>
          </div>
        </GraphItem>
      </GraphExtended>
    </div>
  );
};

export default SuperCharge;
