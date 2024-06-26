import capitalbimg from '~/images/about-us/capitalb.png';
import shastra from '~/images/about-us/shastra-vc.png';
import { GraphExtended, GraphItem } from '../../graph';
import SectionWrapper from '../section-wrapper';

const AboutBackedBy = () => {
  return (
    <SectionWrapper className="wb-flex wb-flex-col wb-w-full">
      <GraphExtended>
        <div className="wb-grid wb-grid-cols-1 md:wb-h-[224px] md:wb-grid-cols-[448px_448px_448px] wb-gap-3xl md:wb-gap-5xl">
          <GraphItem className="wb-bg-surface-basic-subdued wb-p-5xl wb-flex wb-flex-col wb-justify-center">
            <div className="wb-flex wb-flex-col wb-gap-3xl">
              <span className="wb-text-text-default wb-heading4xl">
                Backed by
              </span>
              <span className="wb-bodyXl wb-text-text-soft">
                Our visionary investors empower us to innovate, grow, and lead
                with confidence.
              </span>
            </div>
          </GraphItem>
          <GraphItem className="wb-bg-surface-basic-subdued wb-p-5xl wb-flex wb-flex-col wb-justify-center">
            <div className="wb-flex wb-flex-col wb-gap-3xl">
              <div className="wb-h-[84px] wb-w-[104px] wb-border wb-border-border-dark wb-rounded-lg wb-overflow-hidden">
                <img
                  src={capitalbimg.src}
                  className="wb-w-full wb-h-full wb-object-cover"
                  alt="capital2b"
                />
              </div>
              <span className="wb-bodyXl wb-text-text-strong">
                Capital 2B (backed by InfoEdge & Temasek)
              </span>
            </div>
          </GraphItem>
          <GraphItem className="wb-bg-surface-basic-subdued wb-p-5xl wb-flex wb-flex-col wb-justify-center">
            <div className="wb-flex wb-flex-col wb-gap-3xl">
              <div className="wb-h-[84px] wb-w-[84px]">
                <img
                  src={shastra.src}
                  className="wb-object-cover"
                  alt="shastra-vc"
                />
              </div>
              <span className="wb-bodyXl wb-text-text-strong">
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
