type IResponsiveImage = {
  rmobile: string;
  r768: string;
  r1024: string;
  r1280: string;
  r1440: string;
  r1920: string;
  alt: string;
  hasFilter?: boolean;
};
const ResponsiveImage = ({
  rmobile,
  r768,
  r1024,
  r1280,
  r1440,
  r1920,
  alt,
  hasFilter = false,
}: IResponsiveImage) => {
  return (
    <picture>
      <source media="(min-width: 1920px)" srcSet={r1920} />
      <source media="(min-width: 1440px)" srcSet={r1440} />
      <source media="(min-width: 1280px)" srcSet={r1280} />
      <source media="(min-width: 1024px)" srcSet={r1024} />
      <source media="(min-width: 768px)" srcSet={r768} />
      <img
        src={rmobile}
        alt={alt}
        style={{
          filter: hasFilter
            ? 'drop-shadow(0px 2px 16px rgba(33, 43, 54, 0.08)) drop-shadow(0px 0px 0px rgba(6, 44, 82, 0.10))'
            : 'none',
        }}
      />
    </picture>
  );
};

export default ResponsiveImage;
