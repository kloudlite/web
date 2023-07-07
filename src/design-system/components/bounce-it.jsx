import { motion } from 'framer-motion';
import { forwardRef } from 'react';

export const BounceIt = forwardRef(({
  disable = false,
  onClick = (_) => { },
  className = '',
  as = "div",
  ...etc
}, ref) => {
  if (disable) {
    return <div>{etc.children}</div>
  }
  let Comp = motion(as)
  return (
    <Comp
      tabIndex="-1"
      className={`${className} flex outline-none`}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      {...etc}
      ref={ref}
    />
  );
});
