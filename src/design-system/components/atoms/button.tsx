/* eslint-disable no-nested-ternary */
import { AnimatePresence, motion } from 'framer-motion';
import React, { KeyboardEventHandler, MouseEventHandler } from 'react';
import { Spinner } from '~/components/icons';
import { cn } from '../utils';

type ButtonTypes = 'submit' | 'button';

export type ButtonVariants =
  | 'outline'
  | 'basic'
  | 'plain'
  | 'primary'
  | 'primary-outline'
  | 'secondary'
  | 'secondary-outline'
  | 'critical'
  | 'critical-outline'
  | 'primary-plain'
  | 'secondary-plain'
  | 'critical-plain'
  | 'purple'
  | 'tertiary'
  | 'warning'
  | (undefined & NonNullable<unknown>);

type IconButtonVariants =
  | 'outline'
  | 'basic'
  | 'plain'
  | (undefined & NonNullable<unknown>);

type IconButtonSizes = 'xs' | 'sm' | 'md' | (undefined & NonNullable<unknown>);

type ButtonSizes =
  | 'md'
  | 'sm'
  | 'lg'
  | 'xl'
  | '2xl'
  | (undefined & NonNullable<unknown>);

interface IBaseButton {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onPointerDown?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  to?: string;
  LinkComponent?: any;
  disabled?: boolean;
  block?: boolean;
  type?: ButtonTypes;
  selected?: boolean;
  className?: string;
  value?: any;
  toLabel?: string;
  target?: string;
}

export interface IIconButton extends IBaseButton {
  icon: JSX.Element;
  variant?: IconButtonVariants;
  size?: IconButtonSizes;
}

export interface IButton extends IBaseButton {
  suffix?: JSX.Element;
  prefix?: JSX.Element;
  noRounded?: boolean;
  noBorder?: boolean;
  sharpLeft?: boolean;
  sharpRight?: boolean;
  iconOnly?: boolean;
  content: React.ReactNode;
  loading?: boolean;
  variant?: ButtonVariants | IconButtonVariants;
  size?: ButtonSizes;
  tabIndex?: number;
}
export const ButtonBase = React.forwardRef<
  HTMLButtonElement,
  Omit<IButton, 'size'> & { size?: ButtonSizes | IconButtonSizes }
>((props, ref) => {
  const {
    onClick = () => {},
    to = '',
    LinkComponent = motion.button,
    disabled = false,
    suffix,
    prefix,
    block = false,
    type = 'button',
    variant = 'primary',
    // noRing,
    noRounded = false,
    noBorder = false,
    sharpLeft = false,
    sharpRight = false,
    selected = false,
    iconOnly = false,
    className = '',
    content,
    size = 'md',
    loading = false,
    tabIndex,
    toLabel = 'to',
    target,
    ...mprops
  } = props;

  let Component: any = LinkComponent;

  let tempToLabel = toLabel;

  let extraProps = {} as any;
  if (to) {
    if (LinkComponent === motion.button) {
      Component = motion.a;
      tempToLabel = 'href';
    } else {
      Component = LinkComponent;
    }
  }

  if (Component === motion.button || Component === motion.a) {
    extraProps = {
      initial: { scale: 1 },
      whileTap: { scale: 0.99 },
    };
  }

  const noRing = false;

  return (
    <Component
      {...mprops}
      {...{ [tempToLabel]: to }}
      disabled={disabled}
      onClick={onClick}
      {...extraProps}
      ref={ref}
      type={type}
      tabIndex={tabIndex}
      target={target}
      className={cn(
        'pulsable flex-nowrap',
        {
          'w-full': !!block,
          'w-fit': !block,
          selected,
        },
        {
          'pointer-events-none': loading,
        },
        {
          'bodyMd-medium': !variant?.includes('plain'),
          bodyMd: variant?.includes('plain'),
        },
        {
          'pointer-events-none !text-text-disabled !bg-surface-basic-default':
            disabled,
          '!border-border-disabled':
            disabled &&
            ![
              'plain',
              'primary-plain',
              'critical-plain',
              'secondary-plain',
            ].includes(variant),
        },
        'relative ring-offset-1',
        'outline-none shadow-button',
        'flex flex-row gap-lg items-center justify-center',
        'disabled:text-text-disabled',
        {
          // noRing
          'focus-visible:ring-2 focus:ring-border-focus focus:z-10': !noRing,
        },
        {
          ...(!noRounded && {
            'rounded-none': sharpLeft && sharpRight,
            'rounded-r': sharpLeft && !sharpRight,
            'rounded-l': !sharpLeft && sharpRight,
            rounded: !sharpLeft && !sharpRight,
          }),
        },
        'transition-all',
        'disabled:pointer-events-none',
        {
          'border-none': noBorder,
          ...(!noBorder && {
            'border-border-default disabled:border-border-disabled':
              variant === 'basic' ||
              variant === 'outline' ||
              variant === 'secondary-outline',
            'border-border-primary disabled:border-border-disabled':
              variant === 'primary' || variant === 'primary-outline',
            'border-border-secondary disabled:border-border-disabled':
              variant === 'secondary',
            'border-border-critical disabled:border-border-disabled':
              variant === 'critical-outline' || variant === 'critical',
            'border-border-purple': variant === 'purple',
            'border-border-warning': variant === 'warning',
            'border-border-tertiary': variant === 'tertiary',
            'border-none':
              variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'critical-plain' ||
              variant === 'secondary-plain',
            border: !(
              variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'critical-plain' ||
              variant === 'secondary-plain'
            ),
          }),
        },
        {
          'bg-surface-basic-default hover:bg-surface-basic-hovered active:bg-surface-basic-pressed disabled:bg-surface-basic-default':
            variant === 'basic',
          'bg-surface-basic-pressed hover:bg-surface-basic-pressed active:bg-surface-basic-pressed disabled:bg-surface-basic-default':
            variant === 'basic' && selected,
          'bg-surface-primary-default hover:bg-surface-primary-hovered active:bg-surface-primary-pressed disabled:bg-surface-basic-default':
            variant === 'primary',
          'bg-surface-secondary-default hover:bg-surface-secondary-hovered active:bg-surface-secondary-pressed disabled:bg-surface-basic-default':
            variant === 'secondary',
          'bg-surface-critical-default hover:bg-surface-critical-hovered active:bg-surface-critical-pressed disabled:bg-surface-basic-default':
            variant === 'critical',
          'bg-none hover:bg-surface-critical-subdued active:bg-surface-critical-subdued':
            variant === 'critical-outline',
          'bg-none hover:bg-surface-primary-subdued active:bg-surface-primary-subdued':
            variant === 'primary-outline',
          'bg-none hover:bg-surface-secondary-subdued active:bg-surface-secondary-subdued':
            variant === 'secondary-outline',
          'bg-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed':
            variant === 'outline',
          'bg-surface-basic-pressed shadow-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed hover:shadow-button active:shadow-button':
            variant === 'outline' && selected,
          'bg-none shadow-none':
            (variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'secondary-plain' ||
              variant === 'critical-plain') &&
            !iconOnly,
          'bg-surface-basic-pressed shadow-none active:shadow-button':
            variant === 'plain' && !iconOnly && selected,
          'bg-none shadow-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed active:shadow-button':
            variant === 'plain' && iconOnly,
          'bg-surface-basic-pressed shadow-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed active:shadow-button':
            variant === 'plain' && iconOnly && selected,
          'bg-surface-purple-default hover:bg-surface-purple-hovered active:bg-surface-purple-pressed':
            variant === 'purple',
          'bg-surface-tertiary-default hover:bg-surface-tertiary-hovered active:bg-surface-tertiary-pressed':
            variant === 'tertiary',
          'bg-surface-warning-default hover:bg-surface-warning-hovered active:bg-surface-warning-pressed':
            variant === 'warning',
        },
        {
          'text-text-default':
            variant === 'basic' || variant === 'plain' || variant === 'outline',
          'text-text-on-primary':
            variant === 'primary' ||
            variant === 'critical' ||
            variant === 'secondary' ||
            variant === 'secondary-outline' ||
            variant === 'tertiary' ||
            variant === 'purple' ||
            variant === 'warning',
          'text-text-critical':
            variant === 'critical-outline' || variant === 'critical-plain',
          'text-text-primary':
            variant === 'primary-outline' || variant === 'primary-plain',
          'text-text-secondary': variant === 'secondary-plain',
        },
        {
          'focus:underline': noRing,
        },
        {
          'hover:underline':
            variant === 'plain' ||
            variant === 'primary-plain' ||
            variant === 'critical-plain' ||
            variant === 'secondary-plain',
        },
        {
          underline: selected && !iconOnly && variant === 'plain',
        },
        {
          // icon
          ...(!iconOnly &&
            !(
              variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'critical-plain' ||
              variant === 'secondary-plain'
            ) && {
              'py-md px-lg': size === 'sm',
              'py-lg px-2xl': size === 'md',
              'py-xl px-4xl': size === 'lg',
              'py-2xl px-6xl': size === 'xl',
              'py-2xl px-9xl': size === '2xl',
            }),
        },
        {
          ...(!iconOnly &&
            (variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'critical-plain' ||
              variant === 'secondary-plain') && {
              'px-md py-sm': size === 'sm',
              'py-sm px-md': size === 'md',
              'py-md px-lg': size === 'lg',
            }),
        },
        {
          'p-lg': iconOnly && size === 'md',
          'p-md': iconOnly && size === 'sm',
          'p-sm': iconOnly && size === 'xs',
        },
        className
      )}
    >
      <AnimatePresence>
        {loading && (
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 'auto', paddingRight: 0 }}
            exit={{ width: 0 }}
            className="flex items-center justify-center aspect-square overflow-hidden"
          >
            <span className="animate-spin">
              <Spinner color="currentColor" weight={2} size={18} />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
      {!!prefix &&
        React.cloneElement(prefix, {
          size: 16,
          color: 'currentColor',
        })}
      {!iconOnly && <span className="block truncate">{content}</span>}
      {!!suffix &&
        React.cloneElement(suffix, {
          size: 16,
          color: 'currentColor',
        })}
    </Component>
  );
});

export const IconButton = React.forwardRef<HTMLButtonElement, IIconButton>(
  (props, ref) => {
    const { icon, block } = props;
    return (
      <ButtonBase
        {...props}
        ref={ref}
        iconOnly
        content={null}
        prefix={icon}
        block={!!block}
      />
    );
  }
);

export const Button = React.forwardRef<HTMLButtonElement, IButton>(
  (props: any, ref) => {
    const { block } = props;
    return <ButtonBase {...props} iconOnly={false} ref={ref} block={!!block} />;
  }
);
