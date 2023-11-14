import SliderPrimitive from 'rc-slider';

interface ISlider {
  step?: number;
  max?: number;
  min?: number;
  value: number | number[];
  disabled?: boolean;
  dots?: boolean;
  onChange?: (_value: number | number[]) => void;
}

const Slider = ({
  value = [],
  step = 1,
  min = 0,
  max = 100,
  disabled = false,
  dots,
  onChange,
}: ISlider) => {
  return (
    <SliderPrimitive
      range={Array.isArray(value) ? value.length > 1 : false}
      value={value}
      className="range-slider"
      step={step}
      dots={dots}
      max={max}
      min={min}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default Slider;
