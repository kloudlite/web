import { cn } from '../utils/commons';

const ColorImage = ({
  light,
  dark,
  imageClassName,
}: {
  light: string;
  dark: string;
  imageClassName?: string;
}) => {
  return (
    <>
      <img
        alt="light"
        src={light}
        className={cn('dark:wb-hidden', imageClassName)}
      />
      <img
        src={dark}
        alt="dark"
        className={cn('wb-hidden dark:wb-block', imageClassName)}
      />
    </>
  );
};
const DynamicImage = ({
  light,
  dark,
  className,
  imageClassName,
  media,
}: {
  light: string;
  dark: string;
  className?: string;
  imageClassName?: string;
  media: '1920' | '1440' | '1280' | '1024' | '768' | 'mobile';
}) => {
  switch (media) {
    case '1920':
      return (
        <div
          className={cn(
            className,
            'wb-hidden 3xl:wb-flex wb-items-center wb-justify-center'
          )}
        >
          <ColorImage
            imageClassName={imageClassName}
            light={light}
            dark={dark}
          />
        </div>
      );
    case '1440':
      return (
        <div
          className={cn(
            className,
            'wb-hidden 2xl:wb-flex 3xl:wb-hidden  wb-items-center wb-justify-center'
          )}
        >
          <ColorImage
            imageClassName={imageClassName}
            light={light}
            dark={dark}
          />
        </div>
      );
    case '1280':
      return (
        <div
          className={cn(
            className,
            'wb-hidden xl:wb-flex 2xl:wb-hidden  wb-items-center wb-justify-center'
          )}
        >
          <ColorImage
            imageClassName={imageClassName}
            light={light}
            dark={dark}
          />
        </div>
      );
    case '1024':
      return (
        <div
          className={cn(
            className,
            'wb-hidden lg:wb-flex xl:wb-hidden  wb-items-center wb-justify-center'
          )}
        >
          <ColorImage
            imageClassName={imageClassName}
            light={light}
            dark={dark}
          />
        </div>
      );
    case '768':
      return (
        <div
          className={cn(
            className,
            'wb-hidden md:wb-flex lg:wb-hidden  wb-items-center wb-justify-center'
          )}
        >
          <ColorImage
            imageClassName={imageClassName}
            light={light}
            dark={dark}
          />
        </div>
      );
    case 'mobile':
    default:
      return (
        <div
          className={cn(
            className,
            'wb-flex md:wb-hidden  wb-items-center wb-justify-center'
          )}
        >
          <ColorImage
            imageClassName={imageClassName}
            light={light}
            dark={dark}
          />
        </div>
      );
  }
};

export default DynamicImage;
