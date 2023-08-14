import classNames from 'classnames';
import PropTypes from 'prop-types';

export const Thumbnail = ({ src, size, rounded }) => {
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

Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  rounded: PropTypes.bool,
};

Thumbnail.defaultProps = {
  size: 'md',
  rounded: false,
};
