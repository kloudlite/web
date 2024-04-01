import Link from 'next/link';
import { Graph, GraphItem } from '../graph';
import Button from '../button';

const ReadyToOps = () => {
  return (
    <Graph className="-mx-10xl my-5xl xl:!py-8xl">
      <div className="px-10xl">
        <GraphItem>
          <div className="px-3xl pt-5xl pb-5xl md:!px-10xl md:!py-7xl lg:!px-10xl lg:!py-7xl flex flex-col gap-6xl items-center bg-surface-basic-subdued md:min-h-[288px]">
            <div className="flex flex-col gap-xl text-center">
              <h2 className="heading3xl-marketing md:!heading5xl-marketing text-text-default">
                Ready to try Kloudlite?
              </h2>
              <p className="bodyXXl text-text-soft">
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
