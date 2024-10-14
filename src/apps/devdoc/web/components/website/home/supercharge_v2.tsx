import { ArrowRight } from '~/app/icons/icons';
import { GraphExtended, GraphItem } from '../../graph';
import JoinProvidersDialog from '../../join-provider-dialog';
import ResponsiveContainer from '../../responsive-container';

const SuperCharge = () => {
  return (
    <div className="2xl:wb-py-8xl">
      <GraphExtended className="xl:[clip-path:inset(24px_1.5px_24px_1.5px)] 3xl:[clip-path:inset(1.5px)]">
        <ResponsiveContainer>
          <GraphItem className="wb-bg-surface-basic-subdued">
            <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-2 lg:wb-grid-cols-[448px_auto] wb-h-full">
              <div className="wb-flex wb-items-center wb-justify-center wb-text-center md:wb-text-left wb-heading2xl-marketing md:wb-heading3xl wb-text-text-default wb-p-3xl md:wb-p-5xl lg:wb-py-7xl lg:wb-px-8xl wb-bg-surface-basic-active wb-h-full">
                Supercharge your remote local environments
              </div>
              <div className="wb-p-3xl md:wb-p-5xl lg:wb-px-8xl lg:wb-py-5xl wb-flex wb-flex-col wb-gap-3xl md:wb-gap-5xl wb-bg-surface-basic-default">
                <p className="wb-text-center md:wb-text-left wb-bodyLg md:wb-bodyXl wb-text-text-soft">
                  See why Kloudlite is the remote local environments of choice
                  for modern developer teams
                </p>
                <div className="md:wb-w-fit">
                  <JoinProvidersDialog
                    signupButton={{
                      content: 'Get started',
                      suffix: <ArrowRight />,
                    }}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </GraphItem>
        </ResponsiveContainer>
      </GraphExtended>
    </div>
  );
};

export default SuperCharge;
