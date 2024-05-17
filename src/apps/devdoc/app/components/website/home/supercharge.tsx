import { Button } from 'kl-design-system/atoms/button';
import { ArrowRight } from '~/app/icons/icons';
import { GraphExtended, GraphItem } from '../../graph';
import TextInputBig from '../../textinput-big';

const SuperCharge = ({
  value,
  onChange,
  onEnter,
}: {
  value?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
}) => {
  return (
    <GraphExtended>
      <GraphItem className="wb-bg-surface-basic-input dark:wb-bg-surface-darktheme-basic-input">
        <div className="wb-flex wb-flex-col wb-p-3xl wb-gap-5xl md:wb-px-8xl md:wb-py-7xl md:wb-gap-6xl wb-items-center">
          <div className="wb-flex wb-flex-col wb-gap-2xl">
            <h4 className="wb-heading2xl-marketing md:wb-heading4xl-marketing wb-text-text-default dark:wb-text-text-darktheme-default wb-text-center">
              Supercharge your remote local environments
            </h4>
            <p className="wb-bodyLg md:wb-bodyXl wb-text-text-soft dark:wb-text-text-darktheme-soft wb-text-center">
              See why Kloudlite is the remote local environments of choice for
              modern developer teams
            </p>
          </div>
          <div className="wb-hidden md:wb-block wb-w-full lg:wb-w-[610px]">
            <TextInputBig
              value={value}
              onChange={({ target }) => {
                onChange?.(target.value);
              }}
              onEnter={() => {
                if (value) {
                  onEnter?.();
                }
              }}
              onSuffixClicked={onEnter}
            />
          </div>
          <div className="md:wb-hidden">
            <Button
              size="sm"
              content="Join waitlist"
              suffix={<ArrowRight />}
              variant="primary"
              onClick={onEnter}
            />
          </div>
        </div>
      </GraphItem>
    </GraphExtended>
  );
};

export default SuperCharge;
