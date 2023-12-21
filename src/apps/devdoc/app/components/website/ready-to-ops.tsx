import { Button } from 'kl-design-system/atoms/button';
import { Graph, GraphItem } from '../graph';

const ReadyToOps = () => {
  return (
    <div>
      <Graph className="-mx-10xl">
        <div className="px-10xl py-10xl">
          <GraphItem>
            <div className="px-3xl pt-3xl pb-5xl md:!px-10xl md:!py-7xl flex flex-col gap-6xl items-center bg-surface-basic-subdued min-h-[288px]">
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
              />
            </div>
          </GraphItem>
        </div>
      </Graph>
    </div>
  );
};

export default ReadyToOps;
