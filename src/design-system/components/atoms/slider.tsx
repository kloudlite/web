import SliderPrimitive from 'rc-slider';
import type { SliderProps as PrimitiveSliderProps } from 'rc-slider';
import { useEffect, useState } from 'react';
import Tooltip from './tooltip';

interface ISlider {
  step?: number;
  max?: number;
  min?: number;
  value: number | number[];
  disabled?: boolean;
  tooltip?: boolean;
  dots?: boolean;
  onChange?: (_value: number | number[]) => void;
}

const Handle: PrimitiveSliderProps['handleRender'] = (node, handleProps) => {
  const { dragging, value } = handleProps;
  const [tooltipVisible, setTooltipVisible] = useState(dragging);

  useEffect(() => {
    setTooltipVisible(dragging);
  }, [dragging]);

  return (
    <Tooltip.Root offset={10} content={value} open={tooltipVisible}>
      {node}
    </Tooltip.Root>
  );
};
const Slider = ({
  value = [],
  step = 1,
  min = 0,
  max = 100,
  disabled = false,
  tooltip = false,
  dots,
  onChange,
}: ISlider) => {
  return (
    <Tooltip.Provider>
      <SliderPrimitive
        range={Array.isArray(value) ? value.length > 1 : false}
        value={value}
        className="range-slider"
        step={step}
        dots={dots}
        handleRender={Handle}
        max={max}
        min={min}
        disabled={disabled}
        onChange={onChange}
      />
    </Tooltip.Provider>
  );
};

export default Slider;
