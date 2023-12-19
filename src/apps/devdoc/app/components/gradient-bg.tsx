import * as React from 'react';

const SVGComponent = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={640}
    height={480}
    viewBox="0 0 640 480"
    xmlSpace="preserve"
    {...props}
  >
    <defs />
    <g transform="matrix(0.37 0 0 0.37 315.32 99.67)">
      <path
        style={{
          stroke: 'none',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: 'rgb(191,219,254)',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform=" translate(-720, -229.5)"
        d="M 653.268 446.177 C 527.105 516.364 394.867 279.09 360.33 202.173 C 360.33 87.7593 35.7678 41.5291 -126.513 32.7158 C 86.8101 25.2044 626.138 8.19853 1076.86 0.266491 C 1640.27 -9.64856 1730.56 260.762 1279.51 202.173 C 828.448 143.584 810.972 358.444 653.268 446.177 Z"
        strokeLinecap="round"
      />
    </g>
  </svg>
);
export default SVGComponent;
