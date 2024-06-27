import { Target } from '@jengaicons/react';
import { GraphExtended, GraphItem } from '../../graph';
import SectionWrapper from '../section-wrapper';

const AboutVision = () => {
  return (
    <SectionWrapper className="wb-flex wb-flex-col wb-w-full">
      <GraphExtended>
        <div className="wb-grid lg:wb-h-[256px] wb-grid-cols-1 lg:wb-grid-cols-[448px_auto] wb-gap-3xl md:wb-gap-5xl">
          <GraphItem className="wb-bg-surface-basic-subdued wb-p-5xl wb-flex wb-flex-col wb-justify-center">
            <div className="wb-flex wb-flex-row wb-items-center lg:wb-items-start lg:wb-flex-col wb-gap-6xl">
              <span className="wb-text-icon-primary">
                <Target size={80} className="wb-hidden lg:wb-block" />
                <Target
                  size={60}
                  className="wb-hidden md:wb-block lg:wb-hidden"
                />
                <Target size={40} className="md:wb-hidden wb-block" />
              </span>
              <span className="wb-text-text-default wb-heading2xl-marketing md:heading3xl-marketing lg:wb-heading4xl">
                Our vision
              </span>
            </div>
          </GraphItem>
          <GraphItem className="wb-bg-surface-basic-subdued wb-p-5xl wb-flex wb-flex-col wb-justify-center">
            <span className="wb-bodyLg md:wb-bodyXl lg:wb-bodyXXl wb-text-text-soft">
              To empower developers worldwide by providing the ultimate platform
              for building, testing, and deploying distributed applications with
              unparalleled efficiency and ease, fostering a vibrant community
              and driving innovation in the tech ecosystem.
            </span>
          </GraphItem>
        </div>
      </GraphExtended>
    </SectionWrapper>
  );
};

export default AboutVision;
