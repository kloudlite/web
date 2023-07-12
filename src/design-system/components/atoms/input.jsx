import PropTypes from "prop-types";
import React, { useRef, cloneElement, forwardRef, useEffect, useId, useState } from "react";
import { CaretUpFill, CaretDownFill, XCircleFill, EyeSlash, Eye } from "@jengaicons/react";
import { cn } from "../utils";


export const NumberInput = (props) => {

  const [v, setV] = useState(props.value || props.min || 0)
  const ref = useRef();
  const id = useId();

  const step = props.step || 1;

  useEffect(() => {
    if (props.onChange) {
      props.onChange({
        target: {
          ...ref.current,
          value: v,
        },
      })
    }

  }, [v])

  return <div className={cn("flex flex-col",
    {
      "gap-1": props.label || props.extra
    })}>
    <div className="flex">
      <label className="flex-1 select-none bodyMd-medium" htmlFor={id}>{props.label}</label>
      {props.extra && <div className="bodyMd">{cloneElement(props.extra)}</div>}
    </div>
    <div className={cn("transition-all flex relative", "ring-offset-1 focus-within:ring-2 focus-within:ring-border-focus rounded border overflow-hidden",
      {
        "bg-surface-critical-subdued border-border-critical text-text-critical placeholder:text-critical-400": props.error,
        "text-text-default border-border-default": !props.error
      }
    )}>
      <input
        ref={ref}
        id={id}
        disabled={props.disabled}
        type="number"
        autoComplete="off"
        inputMode="numeric"
        className={cn(
          "outline-none flex-1",
          "outline-none disabled:bg-surface-input disabled:text-text-disabled",
          "rounded px-3 py-2 bodyMd ",
          "no-spinner"
        )}
        value={v}
        onChange={(e) => {
          setV(e.target.value);
        }}
        min={props.min}
        max={props.max}
      />
      <div className={cn("flex flex-col absolute right-0 top-0 bottom-0 justify-center items-center",
        {
          "bg-surface-critical-subdued divide-border-critical divide-y rounded-r border-l border-border-critical text-text-critical placeholder:text-critical-400": props.error,
          "text-text-default border-l border-border-default divide-border-default divide-y": !props.error
        })}
        tabIndex={-1}>
        <button
          aria-controls={id}
          aria-label={`Increase ${props.label}`}
          tabIndex={-1}

          onClick={() => {
            setV((v) => v + step);
            ref.current.focus();
          }} className={cn("flex-1 p-0.5 disabled:text-icon-disabled hover:bg-surface-hovered active:bg-surface-pressed")} ><CaretUpFill size={16} color="currentColor" /></button>
        <button
          aria-controls={id}
          aria-label={`Decrease ${props.label}`}
          tabIndex={-1}
          onClick={() => {
            setV((v) => v - step);
          }} className={cn("flex-1 p-0.5 disabled:text-icon-disabled hover:bg-surface-hovered active:bg-surface-pressed")}><CaretDownFill size={16} color="currentColor" /></button>
      </div>
    </div>

    {props.message && <span className={cn("bodySm", {
      "text-text-critical": props.error,
      "text-text-default": !props.error
    })}>{props.message}</span>}
  </div>
}

export const TextInputBase = forwardRef((props, ref) => {

  const [val, setVal] = useState(props.value || '')
  const [type, setType] = useState(props.type || "text")


  let id = useId()

  let { prefix: Prefix, suffix: Suffix } = props
  const { prefixIcon: PrefixIcon, suffixIcon: SuffixIcon } = props
  if (PrefixIcon) {
    Prefix = <PrefixIcon size={16} color={"currentColor"} />
  }
  if (SuffixIcon) {
    Suffix = <SuffixIcon size={16} color={"currentColor"} />
  }

  const Component = props.component || "input"

  return (
    <div className={cn("flex flex-col",
      {
        "gap-1": props.label || props.extra
      },
      props.className
    )}>
      <div className="flex items-center">
        <label className="flex-1 select-none bodyMd-medium" htmlFor={id}>{props.label}</label>
        <div className={cn(
          {
            "h-6": props.label || props.extra
          }
        )}>{props.extra && cloneElement(props.extra)}</div>
      </div>
      <div className={(cn("transition-all px-3 rounded border flex flex-row items-center relative ring-offset-1 focus-within:ring-2 focus-within:ring-border-focus ",
        {
          "text-text-critical bg-surface-critical-subdued border-border-critical": props.error,
          "text-text-default border-border-default bg-surface-input": !props.error,
          "text-text-disabled border-border-disabled bg-surface-input": props.disabled,
          "pr-0": props.component != "input"
        }))}>
        {Prefix && <div className={cn("pr-2 bodyMd",
          {
            "text-text-strong": typeof (Prefix) !== "object" && !props.error && !props.disabled,
            "text-text-critical": props.error,
            "text-text-disabled": props.disabled
          })}>{Prefix}</div>}
        <Component
          type={type}
          placeholder={props.placeholder}
          id={id}
          className={cn(
            "outline-none disabled:bg-surface-input disabled:text-text-disabled flex-1",
            "rounded py-2 bodyMd ",
            {
              "text-text-critical bg-surface-critical-subdued placeholder:text-critical-400": props.error,
              "text-text-default bg-surface-input": !props.error
            }
          )}
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          disabled={props.disabled}
          ref={ref}
          onKeyDown={props.onKeyDown}
          autoComplete={props.autoComplete}
        // {...tempProps}
        />
        {Suffix && <div className={cn("pl-2 bodyMd",
          {
            "text-text-critical": props.error,
            "text-text-strong": !props.error && !props.disabled,
            "text-text-disabled": props.disabled
          })}>{Suffix}</div>}
        {
          props.showclear && !props.disabled && <button
            tabIndex={-1}
            onClick={() => {
              setVal('')
            }}
            className={cn('outline-none flex items-center rounded justify-center',
              {
                "cursor-default": props.disabled
              })}>
            <XCircleFill size={16} color="currentColor" />
          </button>
        }
        {
          props.type === "password" && !props.disabled && <button
            tabIndex={-1}
            onClick={() => {
              setType((prev) => prev == "text" ? "password" : "text")
            }}
            className={cn('outline-none flex items-center rounded justify-center',
              {
                "cursor-default": props.disabled
              })}>
            {type === "password" ? <EyeSlash size={16} color="currentColor" /> : <Eye size={16} color="currentColor" />}
          </button>
        }
      </div>

      {props.message && (
        <div className={cn("bodySm", {
          "text-text-critical": props.error,
          "text-text-default": !props.error
        })}>
          {props.message}
        </div>
      )}
    </div>
  );
})

export const TextInput = forwardRef((props, ref) => {

  return <TextInputBase {...props} component={'input'} type="text" ref={ref} />
})

export const TextArea = (props) => {
  let ref = useRef(null)
  return <TextInputBase {...props} component={'textarea'} ref={ref} type="text" />
}

export const PasswordInput = (props) => {
  let ref = useRef(null)
  return <TextInputBase {...props} component={'input'} ref={ref} type="password" />
}



const BaseInputProps = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  message: PropTypes.string,
  extra: PropTypes.elementType,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

TextInput.propTypes = {
  ...BaseInputProps,
  prefix: PropTypes.object,
  suffix: PropTypes.object,
  prefixIcon: PropTypes.object,
  suffixIcon: PropTypes.object,
}

TextInput.propTypes = {
  ...BaseInputProps
}

NumberInput.propTypes = {
  ...BaseInputProps
}

TextInput.defaultProps = {
  placeholder: "",
  value: "",
  disabled: false,
}