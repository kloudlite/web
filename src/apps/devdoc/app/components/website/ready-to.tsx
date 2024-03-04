import Button from '../button';
import { Graph, GraphItem } from '../graph';

const ReadyTo = () => {
  return (
    <div>
      <Graph className="py-6xl px-3xl md:!px-0 md:!py-10xl" responsive>
        <div className="max-w-[1120px] m-auto">
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

export default ReadyTo;
