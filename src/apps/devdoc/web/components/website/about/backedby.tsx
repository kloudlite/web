import capitalbimg from '~/images/about-us/capitalb.png';
import shastra from '~/images/about-us/shastra-vc.png';
import { GraphExtended, GraphItem } from '../../graph';
import SectionWrapper from '../section-wrapper';

const AboutBackedBy = () => {
  return (
    <SectionWrapper className="wb-flex wb-flex-col wb-w-full 2xl:!wb-py-8xl">
      <GraphExtended>
        <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-2 lg:wb-grid-cols-3 2xl:wb-h-[224px] xl:wb-h-[256px]  wb-gap-3xl md:wb-gap-5xl">
          <GraphItem className="md:wb-col-span-2 lg:wb-col-span-1 wb-bg-surface-basic-subdued wb-p-5xl wb-flex wb-flex-col wb-justify-center">
            <div className="wb-flex wb-flex-col wb-gap-3xl">
              <h2 className="wb-text-text-default wb-heading3xl-marketing md:wb-heading4xl">
                Backed by
              </h2>
              <p className="wb-bodyXl wb-text-text-soft">
                Our visionary investors empower us to innovate, grow, and lead
                with confidence.
              </p>
            </div>
          </GraphItem>
          <GraphItem className="md:wb-col-span-1 wb-bg-surface-basic-subdued wb-p-5xl wb-flex wb-flex-col wb-justify-center">
            <div className="wb-flex wb-flex-col wb-gap-3xl">
              <div className="wb-h-[84px] wb-w-[104px] wb-border wb-border-border-dark wb-rounded-lg wb-overflow-hidden">
                <img
                  src={capitalbimg.src}
                  className="wb-w-full wb-h-full wb-object-cover"
                  alt="capital2b"
                />
              </div>
              <span className="wb-bodyLg md:wb-bodyXl wb-text-text-strong">
                Capital 2B (backed by InfoEdge & Temasek)
              </span>
            </div>
          </GraphItem>
          <GraphItem className="md:wb-col-span-1 wb-bg-surface-basic-subdued wb-p-5xl wb-flex wb-flex-col wb-justify-center">
            <div className="wb-flex wb-flex-col wb-gap-3xl">
              <div className="wb-h-[84px] wb-w-[84px]">
                <img
                  src={shastra.src}
                  className="wb-object-cover"
                  alt="shastra-vc"
                />
              </div>
              <span className="wb-bodyLg md:wb-bodyXl wb-text-text-strong">
                Shastra VC <br />
                (formerly Veda VC)
              </span>
            </div>
          </GraphItem>
        </div>
      </GraphExtended>
    </SectionWrapper>
  );
};

export default AboutBackedBy;
