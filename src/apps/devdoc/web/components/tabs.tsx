import { Key, ReactNode, useCallback, useState } from 'react';
import Tabs from 'kl-design-system/atoms/tabs';
import { cn } from '../utils/commons';

type NonNullableString = string & NonNullable<undefined>;

export interface IExtendedFilledTab {
  value: string;
  size?: 'md' | 'sm' | NonNullableString;
}
const ExtendedFilledTab = ({
  value: _,
  size = 'md',
  children,
}: IExtendedFilledTab & {
  children: ReactNode;
}) => {
  const childArray = useCallback(() => {
    if (Array.isArray(children)) {
      return children;
    }

    return [children];
  }, [children])();

  const tabs = useCallback(() => {
    return childArray.map((item) => {
      const { value } = item.props || {};
      return value;
    });
  }, [childArray])();

  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div
        className={cn('bg-surface-basic-active rounded inline-block w-fit', {
          'p-lg shadow-button border border-border-default': size === 'md',
          'p-md': size === 'sm',
        })}
      >
        <Tabs.Root
          size="sm"
          variant="filled"
          value={tabs[selected]}
          onChange={(v) => {
            setSelected(tabs.indexOf(v));
          }}
        >
          {childArray.map((ch) => {
            const { label, value } = ch.props;
            return (
              <Tabs.Tab
                key={value as Key}
                label={label}
                value={value}
                // prefix={item.prefix}
              />
            );
          })}
        </Tabs.Root>
      </div>

      {childArray.length > selected && selected >= 0 && (
        <div>{childArray[selected].props.children}</div>
      )}
    </div>
  );
};

export default ExtendedFilledTab;

export const TabContent = (_: {
  value: string;
  children: ReactNode;
  label: string;
}) => {
  return null;
};
