import React, { ReactElement, cloneElement, forwardRef, useState } from 'react';
import * as ButtonGroupPrimitive from '@radix-ui/react-toggle-group';
import { ButtonBase, ButtonProps, IconButtonProps } from './button';
import { cn } from '../utils';

interface BGButtonProps extends ButtonProps {
  value: string;
}

const Button = forwardRef<HTMLButtonElement, BGButtonProps>((props, ref) => {
  return (
    <ButtonGroupPrimitive.Item value={props.value} asChild ref={ref}>
      <ButtonBase
        {...props}
        variant="basic"
        noRounded
        className={cn('-ml-xs first:rounded-l last:rounded-r first:ml-0')}
      />
    </ButtonGroupPrimitive.Item>
  );
});

interface BGIconButtonProps extends IconButtonProps {
  value: string;
}

const IconButton = forwardRef<HTMLButtonElement, BGIconButtonProps>(
  (props, ref) => {
    return (
      <ButtonGroupPrimitive.Item value={props.value} asChild ref={ref}>
        <ButtonBase
          {...props}
          content=""
          variant="basic"
          iconOnly
          prefix={props.icon}
          noRounded
          className={cn('-ml-xs first:rounded-l last:rounded-r first:ml-0')}
        />
      </ButtonGroupPrimitive.Item>
    );
  }
);

interface RootProps {
  children: ReactElement | ReactElement[];
  value: string;
  selectable: boolean;
  onValueChange: (value: string) => void;
  onClick: (value: string) => void;
}

const Root = ({
  children,
  value = '',
  selectable = false,
  onValueChange,
  onClick,
}: RootProps) => {
  const [v, setV] = useState(value);
  return (
    <ButtonGroupPrimitive.Root
      className="bg-surface-basic-default rounded shadow-button flex flex-row w-fit"
      onClick={(_e) => {
        if (onClick) onClick(v);
      }}
      onValueChange={(e) => {
        if (e) setV(e);
        if (onValueChange && e) onValueChange(e);
      }}
      value={v}
      type="single"
    >
      {React.Children.map(children, (child) => {
        return cloneElement(child, {
          selected: child.props.value === v && !!selectable,
        });
      })}
    </ButtonGroupPrimitive.Root>
  );
};

Root.Button = Button;
Root.IconButton = IconButton;

const ButtonGroup = {
  Root,
  Button,
  IconButton,
};

export default ButtonGroup;
