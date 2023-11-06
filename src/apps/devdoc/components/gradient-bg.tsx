import * as React from 'react';

const SVGComponent = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 1159"
    fill="none"
    {...props}
  >
    <g filter="url(#filter0_f_368_39042)">
      <path
        d="M653.268 446.177C527.105 516.364 394.867 279.09 360.33 202.173C360.33 87.7593 35.7678 41.5291 -126.513 32.7158C86.8101 25.2044 626.138 8.19853 1076.86 0.266491C1640.27 -9.64856 1730.56 260.762 1279.51 202.173C828.448 143.584 810.972 358.444 653.268 446.177Z"
        fill="#BFDBFE"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_368_39042"
        x={-826.513}
        y={-700}
        width={3093.03}
        height={1859}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={350}
          result="effect1_foregroundBlur_368_39042"
        />
      </filter>
    </defs>
  </svg>
);
export default SVGComponent;
