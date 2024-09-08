import { useTheme } from '~/app/utils/useTheme';

type IResponsiveImage = {
  rmobile: string;
  r768?: string;
  r1024?: string;
  r1280?: string;
  r1440?: string;
  r1920?: string;
  rmobileDark?: string;
  r768Dark?: string;
  r1024Dark?: string;
  r1280Dark?: string;
  r1440Dark?: string;
  r1920Dark?: string;
  alt: string;
  hasFilter?: boolean;
  className?: string;
};
const ResponsiveImage = ({
  rmobile,
  r768,
  r1024,
  r1280,
  r1440,
  r1920,
  rmobileDark,
  r768Dark,
  r1440Dark,
  r1280Dark,
  r1920Dark,
  r1024Dark,
  alt,
  hasFilter = false,
  className,
}: IResponsiveImage) => {
  const { binaryTheme } = useTheme();

  const darkComps = () => {
    if (binaryTheme !== 'dark') return null;
    return (
      <>
        {r1920Dark && <source media="(min-width: 1920px)" srcSet={r1920Dark} />}
        {r1440Dark && <source media="(min-width: 1440px)" srcSet={r1440Dark} />}
        {r1280Dark && <source media="(min-width: 1280px)" srcSet={r1280Dark} />}
        {r1024Dark && <source media="(min-width: 1024px)" srcSet={r1024Dark} />}
        {r768Dark && <source media="(min-width: 768px)" srcSet={r768Dark} />}
        {rmobileDark && (
          <img
            src={rmobileDark}
            alt={alt}
            className={className}
            style={{
              filter: hasFilter
                ? 'drop-shadow(0px 2px 16px rgba(33, 43, 54, 0.08)) drop-shadow(0px 0px 0px rgba(6, 44, 82, 0.10))'
                : 'none',
            }}
          />
        )}
      </>
    );
  };

  const lightComps = () => {
    if (binaryTheme !== 'light') {
      return null;
    }
    return (
      <>
        {r1920 && <source media="(min-width: 1920px)" srcSet={r1920} />}
        {r1440 && <source media="(min-width: 1440px)" srcSet={r1440} />}
        {r1280 && <source media="(min-width: 1280px)" srcSet={r1280} />}
        {r1024 && <source media="(min-width: 1024px)" srcSet={r1024} />}
        {r768 && <source media="(min-width: 768px)" srcSet={r768} />}
        {rmobile && (
          <img
            src={rmobile}
            alt={alt}
            className={className}
            style={{
              filter: hasFilter
                ? 'drop-shadow(0px 2px 16px rgba(33, 43, 54, 0.08)) drop-shadow(0px 0px 0px rgba(6, 44, 82, 0.10))'
                : 'none',
            }}
          />
        )}
      </>
    );
  };
  return (
    <picture>
      {darkComps()}
      {lightComps()}
    </picture>
  );
};

export default ResponsiveImage;
