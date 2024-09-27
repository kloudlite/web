import { ChevronUpDown } from '~/components/icons';
import { ReactNode, useRef, useState } from 'react';
import { Button } from '../atoms/button';
import OptionList from '../atoms/option-list';
import { cn } from '../utils';

interface IItem {
  type: 'plain';
  content: ReactNode;
}

interface IItemAdvance {
  type: 'advance';
  prefix?: JSX.Element;
  path: string;
  optionContent?: ReactNode;
  optionValue: string;
}

interface ISeparator {
  type: 'separator';
}

const Separator = () => {
  return <div className="bodyMd text-icon-disabled">/</div>;
};

const Item = ({ children }: { children?: ReactNode }) => {
  return (
    <Button
      variant="plain"
      content={children}
      size="sm"
      className="!px-lg bodyMd-medium"
    />
  );
};
const ItemAdvance = ({
  path,
  prefix,
  optionContent,
  optionValue,
}: Omit<IItemAdvance, 'type'>) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <span className="bodyXs text-text-disabled px-lg">{path}</span>
      <div className="flex flex-row items-center">
        <Button
          variant="plain"
          size="sm"
          content={optionValue}
          prefix={prefix}
          className="!px-lg !bodyMd-medium"
        />

        {optionContent && (
          <OptionList.Root open={open} onOpenChange={setOpen} modal={false}>
            <OptionList.Trigger>
              <button
                ref={buttonRef}
                aria-label="accounts"
                className={cn(
                  'outline-none rounded py-lg px-md mx-md',
                  open || isMouseOver ? 'bg-surface-basic-pressed' : ''
                )}
                onMouseOver={() => {
                  setIsMouseOver(true);
                }}
                onMouseOut={() => {
                  setIsMouseOver(false);
                }}
                onFocus={() => {
                  //
                }}
                onBlur={() => {
                  //
                }}
              >
                <div className="flex flex-row items-center gap-md">
                  <ChevronUpDown size={16} />
                </div>
              </button>
            </OptionList.Trigger>
            <OptionList.Content className="!pt-0 !pb-md" align="end">
              {optionContent}
            </OptionList.Content>
          </OptionList.Root>
        )}
      </div>
    </div>
  );
};

type IRoot = {
  items: (IItem | IItemAdvance | ISeparator)[];
};

const Header = ({ items }: IRoot) => {
  const itemAlignEnd = items.find((i) => i.type === 'advance');
  return (
    <div
      className={cn(
        'px-3xl h-[60px] py-lg bg-surface-basic-subdued border-b border-border-default w-full flex flex-row sticky top-0 z-20',
        itemAlignEnd ? 'items-end' : 'items-center'
      )}
    >
      {(items || []).map((i, key) => {
        const k = key;
        if (i.type === 'plain') {
          return <Item key={k}>{i.content}</Item>;
        }
        if (i.type === 'advance') {
          return <ItemAdvance key={k} {...i} />;
        }
        return <Separator key={k} />;
      })}
    </div>
  );
};

export default Header;
