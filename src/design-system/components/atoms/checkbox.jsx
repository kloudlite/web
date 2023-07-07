import PropTypes from "prop-types";
import { useEffect, useId, useState } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from "../utils";

export const Checkbox = (props) => {
  const [checked, setChecked] = useState(props.checked)

  useEffect(() => {
    if (props.onChange) props.onChange(checked)
  }, [checked])

  const id = useId();

  return (
    <div className="flex items-center justify-center w-fit">
      <CheckboxPrimitive.Root
        className={cn("rounded flex flex-row items-center justify-center border w-4 h-4 outline-none transition-all cursor-pointer",
          "ring-border-focus ring-offset-1 focus:ring-2",
          {
            "border-border-disabled !cursor-default": props.disabled,
          },
          {
            "bg-surface-default border-border-default": !checked && !props.disabled && !props.error,
            "bg-surface-critical-subdued border-border-critical": !checked && !props.disabled && props.error,
            "bg-surface-primary-default border-border-primary": checked && !props.error && !props.disabled,
            "bg-surface-critical-default border-border-critical": checked && props.error && !props.disabled,
            "hover:bg-surface-hovered": !checked && !props.disabled
          })}
        defaultChecked
        id={id}
        checked={checked}
        onCheckedChange={(e) => { setChecked((prev) => props.indeterminate ? prev == "indeterminate" ? false : "indeterminate" : e) }}
        disabled={props.disabled}

      >
        <CheckboxPrimitive.Indicator>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            {
              checked === true && <path d="M12.25 3.50017L5.25 10.4999L1.75 7.00017" strokeLinecap="round" strokeLinejoin="round"
                className={
                  cn({
                    "stroke-text-disabled": props.disabled,
                    "stroke-text-on-primary": !props.disabled,

                  })
                }
              />
            }
            {
              checked === "indeterminate" && <path d="M1.75 7H12.25" strokeLinecap="round" strokeLinejoin="round"
                className={
                  cn({
                    "stroke-text-disabled": props.disabled,
                    "stroke-text-on-primary": !props.disabled,
                  })
                } />
            }
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {
        props.label && <label
          className={
            cn({
              "text-text-disabled": props.disabled,
              "text-text-default cursor-pointer": !props.disabled && !props.error,
              "text-text-critical cursor-pointer": !props.disabled && props.error,
            }, "bodyMd pl-2 select-none")}
          htmlFor={id}>
          {props.label}
        </label>
      }
    </div >
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  checked: PropTypes.any,
  indeterminate: PropTypes.bool,
}

Checkbox.defaultProps = {
  onChange: () => { },
  disabled: false,
  error: false,
}
