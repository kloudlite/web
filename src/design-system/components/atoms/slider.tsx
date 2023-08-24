import * as SliderPrimitive from '@radix-ui/react-slider';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils';
import Tooltip from './tooltip';

type ValueChangeFunction = () => void;

interface SliderProps {
  step?: number;
  max?: number;
  min?: number;
  defaultValue?: number[];
  value: number[];
  disabled?: boolean;
  onChange?: ValueChangeFunction;
}

const clamp = (value: number, [min, max]: [number, number]): number =>
  Math.min(max, Math.max(min, value));

function convertValueToPercentage(value: number, min: number, max: number) {
  const maxSteps = max - min;
  const percentPerStep = 100 / maxSteps;
  const percentage = percentPerStep * (value - min);
  return clamp(percentage, [0, 100]);
}

const linearScale =
  (input: readonly [number, number], output: readonly [number, number]) =>
  (value: number) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };

function getThumbInBoundsOffset(
  width: number,
  left: number,
  direction: number
) {
  const halfWidth = width / 2;
  const halfPercent = 50;
  const offset = linearScale([0, halfPercent], [0, halfWidth]);
  return (halfWidth - offset(left) * direction) * direction;
}

const Slider = ({
  value,
  step = 20,
  min = 0,
  max = 100,
  defaultValue,
  disabled = false,
  onChange,
}: SliderProps) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  // const thumbWidth = 16; // w-2xl

  // const dashLeftOffset = (index: number) =>
  //   getThumbInBoundsOffset(
  //     thumbWidth,
  //     convertValueToPercentage((index + 1) * step, min, max),
  //     1
  //   );
  return (
    <SliderPrimitive.Root
      defaultValue={defaultValue}
      max={max}
      min={min}
      step={step}
      onValueChange={(e) => {
        if (onChange) onChange(e);
        setShowToolTip(true);
      }}
      onValueCommit={(e) => setShowToolTip(false)}
      disabled={disabled}
      value={value}
      // minStepsBetweenThumbs={1}
      className="relative flex items-center select-none touch-none w-[200px] h-5"
    >
      <SliderPrimitive.Track className="bg-border-default relative grow rounded-full h-md overflow-hidden">
        <SliderPrimitive.Range className="absolute bg-icon-primary rounded-full h-full z-10" />
        {/* <div
          className={cn(
            'flex flex-row items-center absolute inset-0 bg-transparent'
          )}
        >
          {Array.from({ length: max / step - 1 }).map((_, index) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}dash-array`}
              className={cn('h-md bg-white w-xs absolute top-0')}
              style={{
                left: `calc(${(index + 1) * step}% + ${dashLeftOffset(
                  index
                )}px)`,
              }}
            />
          ))}
        </div> */}
      </SliderPrimitive.Track>
      <Tooltip.Provider>
        <Tooltip.Root content="h" open={showToolTip}>
          <SliderPrimitive.Thumb
            className="block h-2xl w-2xl bg-icon-primary rounded-full ring-offset-1 focus:ring-[3px] focus:ring-border-focus"
            aria-label="Volume"
          />
        </Tooltip.Root>
      </Tooltip.Provider>
    </SliderPrimitive.Root>
  );
};

export default Slider;
