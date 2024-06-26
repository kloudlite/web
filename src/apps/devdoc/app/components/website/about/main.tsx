import { GraphExtended, GraphItem } from '../../graph';
import SectionWrapper from '../section-wrapper';

const AboutMain = () => {
  return (
    <SectionWrapper className="wb-flex wb-flex-col wb-w-full">
      <div className="wb-flex wb-flex-col wb-gap-3xl wb-text-center">
        <h1 className="wb-heading3xl-marketing md:wb-heading4xl-marketing lg:wb-heading5xl-marketing wb-text-text-default">
          About us
        </h1>
      </div>
      <GraphExtended>
        <div className="wb-grid wb-grid-cols-1 wb-grid-rows-[352px_auto] md:wb-grid-cols-none wb-gap-3xl md:wb-gap-5xl">
          <GraphItem className="wb-bg-surface-basic-subdued">hello</GraphItem>
          <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-[448px_auto] wb-gap-3xl md:wb-gap-5xl">
            <GraphItem className="wb-bg-surface-basic-subdued wb-p-5xl">
              <span className="wb-text-text-default wb-heading3xl-marketing">
                We make development a breeze, saving developers&apos; time with
                our ultra-efficient platform
              </span>
            </GraphItem>
            <GraphItem className="wb-bg-surface-basic-subdued wb-p-5xl">
              <span className="wb-bodyXXl wb-text-text-soft">
                <span className="wb-text-text-default">Our culture:</span>{' '}
                Learning, Collaboration, Transparency, Experimentation, and
                Passion.
              </span>
            </GraphItem>
          </div>
        </div>
      </GraphExtended>
    </SectionWrapper>
  );
};

export default AboutMain;
