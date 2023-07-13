import classNames from "classnames"
import PropTypes from 'prop-types';

export const Thumbnail = ({ src, size, rounded }) => {
  return (<div className={
    classNames("rounded border border-border-default overflow-clip", {
      "w-5xl h-5xl": size === "extra-small",
      "w-6xl h-6xl": size === "small",
      "w-8xl h-8xl": size === "medium",
      "w-9xl h-9xl": size === "large",
    }, {
      "rounded-full": rounded,
      "rounded-md": !rounded,
    })}>
    <img src={src} className="w-full h-full object-cover" />
  </div>)
}


Thumbnail.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
  rounded: PropTypes.bool
}

Thumbnail.defaultProps = {
  size: "medium",
  rounded: false
}