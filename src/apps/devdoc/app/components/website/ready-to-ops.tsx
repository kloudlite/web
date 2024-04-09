import Link from 'next/link';
import { GraphExtended, GraphItem } from '../graph';
import Button from '../button';
import SectionWrapper from './section-wrapper';

const ReadyToOps = () => {
  return (
    <SectionWrapper className="flex-col">
      <GraphExtended>
        <div className="grid grid-cols-1">
          <GraphItem>
            <div className="flex flex-col px-3xl py-5xl md:!px-5xl lg:!px-7xl xl:!px-10xl md:!py-7xl gap-6xl items-center bg-surface-basic-subdued md:min-h-[288px] md:max-h-[288px] w-full">
              <div className="flex flex-col gap-xl text-center">
                <h2 className="heading3xl-marketing md:!heading5xl-marketing text-text-default">
                  Ready to try Kloudlite?
                </h2>
                <p className="bodyXl text-text-soft">
                  Join the cult of our early adopters, and discover the power of
                  Kloudlite.
                </p>
              </div>
              <Button
                content="Get started for free"
                variant="primary"
                size="lg"
                to="https://auth.kloudlite.io"
                LinkComponent={Link}
                toLabel="href"
              />
            </div>
          </GraphItem>
        </div>
      </GraphExtended>
    </SectionWrapper>
  );
};

export default ReadyToOps;
