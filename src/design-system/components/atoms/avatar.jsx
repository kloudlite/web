import PropTypes from 'prop-types';
import { cn } from '../utils';

const colors = {
  "one": ["fill-text-soft", "text-text-soft"],
  "two": ["fill-icon-warning", "text-icon-warning"],
  "three": ["fill-icon-success", "text-icon-success"],
  "four": ["fill-icon-critical", "text-icon-critical"],
  "five": ["fill-icon-secondary", "text-icon-secondary"],
}


export const AvatarBase = ({ label, size, color }) => {
  const ab = (() => {
    const words = label.split(' ');
    return words.map(word => word.charAt(0).toUpperCase()).join('');
  })

  return <div
    className={
      cn(
        "relative flex flex-row items-center justify-center",
        "outline-none transition-all",
        "rounded-full",
        "border border-border-default",
        {
          "w-16 h-16 p-2": size === "large",
          "w-10 h-10 p-1": size === "medium",
          "w-8 h-8 p-1": size === "small",
          "w-6 h-6 p-1": size === "extra-small",
        }
      )
    }
  >
    {!label && <svg viewBox="0 0 42 49" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn(`${colors[color][0]}`)}>
      <path fillRule="evenodd" clipRule="evenodd" d="M21.0002 21.0714C26.5756 21.0714 31.0953 16.4664 31.0953 10.7857C31.0953 5.10507 26.5756 0.5 21.0002 0.5C15.4248 0.5 10.9051 5.10507 10.9051 10.7857C10.9051 16.4664 15.4248 21.0714 21.0002 21.0714ZM21.0002 48.5C29.4828 48.5 37.0619 44.4813 42 38.2145C37.062 31.9475 29.4826 27.9286 20.9998 27.9286C12.5172 27.9286 4.93805 31.9473 0 38.214C4.93804 44.4811 12.5174 48.5 21.0002 48.5Z" />
    </svg>
    }
    {label &&
      <div className={cn(`${colors[color][1]}`, {
        "headingLg": size === "large",
        "bodyLg": size === "medium" || size === "small",
        "bodySm": size === "extra-small",
      })}>{ab()}</div>
    }
  </div>
}

export const Avatar = ({ label, size, color }) => {
  return <AvatarBase label={label} size={size} color={color} />
};

Avatar.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf([
    "large", "medium", "small", "extra-small",
  ]),
  color: PropTypes.oneOf([
    "one",
    "two",
    "three",
    "four",
    "five"
  ]),
};

Avatar.defaultProps = {
  label: "test",
  size: "medium",
  color: "one"
};
