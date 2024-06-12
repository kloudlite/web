import { GitCommit } from '@jengaicons/react';
import Wrapper from '../wrapper';

const Items = () => {
  return (
    <div className="wb-flex wb-flex-row wb-gap-3xl">
      <div className="wb-hidden md:wb-flex wb-w-[160px] wb-shrink-0">
        <span className="wb-headingMd wb-text-text-default">Apr 23, 2024</span>
      </div>
      <div className="wb-flex wb-flex-col wb-items-center wb-gap-md wb-pb-md">
        <div className="wb-rounded-full wb-w-3xl wb-h-3xl wb-p-md wb-flex wb-items-center wb-justify-center wb-bg-surface-basic-pressed wb-text-icon-disabled">
          <GitCommit size={12} />
        </div>
        <div className="wb-bg-border-dark wb-w-[1px] wb-opacity-70 wb-flex-1" />
      </div>
      <div className="wb-flex wb-flex-col wb-gap-3xl wb-pb-5xl">
        <div className="wb-sticky wb-top-0 wb-bg-surface-basic-subdued md:wb-hidden wb-headingMd wb-text-text-default">
          Apr 23, 2024
        </div>
        <div className="wb-text-text-default wb-bodyLg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus
          vitae ex ut bibendum. Nullam a tincidunt elit, ac finibus dolor. Donec
          pellentesque consectetur ante, a tempus nisl faucibus ac. Morbi ac
          metus posuere, mattis dolor vitae, pharetra eros. Vestibulum quis ex a
          eros laoreet efficitur at ut tortor. Sed id libero interdum, dignissim
          augue quis, molestie enim. Morbi sollicitudin mollis tincidunt. Cras
          feugiat lorem at consequat ultricies. In hac habitasse platea
          dictumst. Proin ut tortor quis tortor vestibulum cursus.
        </div>
      </div>
    </div>
  );
};

const Changelogs = () => {
  return (
    <div>
      <Wrapper className="wb-relative wb-flex wb-py-6xl md:wb-py-8xl lg:wb-py-10xl">
        <div className="xl:wb-px-5xl 2xl:wb-px-8xl 3xl:wb-px-10xl wb-flex wb-flex-col wb-gap-xl">
          <h1 className="wb-heading4xl-marketing lg:wb-heading5xl-marketing wb-text-text-default">
            Changelog
          </h1>
          <p className="wb-bodyLg lg:wb-bodyXl wb-text-text-soft">
            The latest Kloudlite features and product launches.
          </p>
        </div>
      </Wrapper>
      <Wrapper>
        <div className="wb-flex wb-flex-col xl:wb-px-5xl 2xl:wb-px-8xl 3xl:wb-px-10xl">
          <Items />
          <Items />
        </div>
      </Wrapper>
    </div>
  );
};

export default Changelogs;
