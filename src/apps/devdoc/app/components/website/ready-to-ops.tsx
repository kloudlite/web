import { Button } from 'kl-design-system/atoms/button';
import Link from 'next/link';
import { Graph, GraphItem } from '../graph';

const ReadyToOps = () => {
  return (
    <Graph className="xl:m-auto">
      <div className="px-3xl md:!px-5xl lg:!px-8xl xl:!px-10xl xl:!py-10xl box-content xl:w-[1024px] 2xl:w-[1120px]">
        <GraphItem>
          <div className="px-3xl pt-3xl pb-5xl md:!px-5xl md:!py-8xl lg:!px-10xl lg:!py-7xl flex flex-col gap-6xl items-center bg-surface-basic-subdued md:min-h-[288px]">
            <div className="flex flex-col gap-xl text-center">
              <h2 className="heading3xl-marketing md:!heading5xl-marketing text-text-default">
                Ready to try Kloudlite?
              </h2>
              <p className="bodyXl-medium text-text-soft">
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
    </Graph>
  );
};

export default ReadyToOps;
