import { RocketLaunch } from '@jengaicons/react';
import { GraphExtended, GraphItem } from '../../graph';
import SectionWrapper from '../section-wrapper';

const AboutMission = () => {
  return (
    <SectionWrapper className="wb-flex wb-flex-col wb-w-full">
      <GraphExtended>
        <div className="wb-grid wb-grid-cols-1 md:wb-h-[288px] md:wb-grid-cols-[448px_auto] wb-gap-3xl md:wb-gap-5xl">
          <GraphItem className="wb-bg-surface-basic-subdued wb-p-5xl wb-flex wb-flex-col wb-justify-center">
            <div className="wb-flex wb-flex-row wb-items-center md:wb-items-start md:wb-flex-col wb-gap-6xl">
              <span className="wb-text-icon-primary">
                <RocketLaunch size={80} className="wb-hidden md:wb-block" />
                <RocketLaunch size={40} className="md:wb-hidden" />
              </span>
              <span className="wb-text-text-default wb-heading4xl">
                Our mission
              </span>
            </div>
          </GraphItem>
          <GraphItem className="wb-bg-surface-basic-subdued wb-p-5xl wb-flex wb-flex-col wb-justify-center">
            <span className="wb-bodyXXl wb-text-text-soft">
              To deliver a seamless development experience that mirrors
              production environments. We are committed to building a strong,
              engaged community of developers, ensuring our platform is
              scalable, reliable, and secure. Through open source contributions
              and strategic partnerships, we strive to drive innovation while
              offering comprehensive educational resources and support to help
              developers unlock their full potential.
            </span>
          </GraphItem>
        </div>
      </GraphExtended>
    </SectionWrapper>
  );
};

export default AboutMission;
