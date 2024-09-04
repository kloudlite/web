import { ReactNode } from 'react';
import { cn } from '~/app/utils/commons';
import { GraphExtended, GraphItem } from '../graph';
import Wrapper from '../wrapper';

export const InnerContent = ({
  children,
  className,
  title,
  subTitle,
}: {
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
  subTitle?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        'wb-bg-surface-basic-subdued wb-h-full wb-px-6xl',
        className,
      )}
    >
      <h1 className="wb-heading4xl-marketing  wb-text-text-default wb-pt-6xl wb-pb-5xl">
        {title}
      </h1>
      <div>
        {subTitle}
        <div className="wb-bodyLg wb-text-text-strong wb-flex wb-flex-col wb-gap-4xl wb-pt-4xl">
          {children}
        </div>
      </div>
    </div>
  );
};
const PrivacyContainer = ({
  children,
  className,
  title,
  subTitle,
}: {
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
  subTitle?: ReactNode;
}) => {
  return (
    <Wrapper>
      <div className="wb-hidden xl:wb-block xl:wb-py-5xl 2xl:wb-py-8xl">
        <GraphExtended className="before:!wb-bg-[100%_1%,100%_1%,28%_100%,28%_100%] group-[theme=dark]:before/html:!wb-bg-[100%_0.4%,100%_0.4%,11%_100%,11%_100%]">
          <GraphItem>
            <InnerContent
              className={className}
              title={title}
              subTitle={subTitle}
            >
              {children}
            </InnerContent>
          </GraphItem>
        </GraphExtended>
      </div>
      <div className="wb-block xl:wb-hidden">
        <InnerContent className={className} title={title} subTitle={subTitle}>
          {children}
        </InnerContent>
      </div>
    </Wrapper>
  );
};

export default PrivacyContainer;
