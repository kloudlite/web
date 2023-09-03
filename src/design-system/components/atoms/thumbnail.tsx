import classNames from 'classnames';

type thumbnailSizes =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | (string & NonNullable<unknown>);

interface IThumbnail {
  src: string;
  size?: thumbnailSizes;
  rounded?: boolean;
}

export const Thumbnail = ({
  src,
  size = 'md',
  rounded = false,
}: IThumbnail) => {
  return (
    <div
      className={classNames(
        'rounded border border-border-default overflow-clip',
        {
          'w-5xl h-5xl': size === 'xs',
          'w-6xl h-6xl': size === 'sm',
          'w-8xl h-8xl': size === 'md',
          'w-9xl h-w-9xl': size === 'lg',
        },
        {
          'rounded-full': rounded,
          'rounded-md': !rounded,
        }
      )}
    >
      <img src={src} alt="thumbnail" className="w-full h-full object-cover" />
    </div>
  );
};
