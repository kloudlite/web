import { ReactNode, useCallback, useMemo } from 'react';
import AnimateHide from '@kloudlite/design-system/atoms/animate-hide';
import { Button, IconButton } from '@kloudlite/design-system/atoms/button';
import { NumberInput, TextInput } from '@kloudlite/design-system/atoms/input';
import { cn, uuid } from '@kloudlite/design-system/utils';
import { MinusCircle, Plus } from '~/console/components/icons';

interface IKeyValuePair {
  onChange?: (itemArray: Array<Record<string, any>>) => void;
  value?: Array<Record<string, any>>;
  label?: ReactNode;
  message?: ReactNode;
  error?: boolean;
  size?: 'lg' | 'md';
  addText?: string;
  keyLabel?: string;
  valueLabel?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  type?: 'number' | 'text';
  ids: string[];
  onIdChange: (ids: string[]) => void;
}
const KeyValuePair = ({
  onChange,
  value = [],
  label,
  message,
  error,
  size,
  addText,
  keyLabel = 'key',
  valueLabel = 'value',
  keyPlaceholder = 'key',
  valuePlaceholder = 'value',
  type = 'text',
  ids,
  onIdChange,
}: IKeyValuePair) => {
  const newItem = useMemo(() => [{ [keyLabel]: '', [valueLabel]: '' }], []);

  const handleChange = useCallback(
    (_value: string | number, id: string | number, target: string = '') => {
      const tempItems = ids.map((_, index) => {
        let v = value[index];
        if (!v) {
          v = newItem[0];
        }
        if (index === id) {
          switch (target) {
            case 'key':
              return { ...v, [keyLabel]: _value };
            case 'value':
            default:
              return { ...v, [valueLabel]: _value };
          }
        }
        return v;
      });

      if (onChange) onChange(Array.from(tempItems));
    },
    [value, ids],
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col gap-md">
          {label && (
            <span className="text-text-default bodyMd-medium">{label}</span>
          )}
          <div className="grid grid-cols-[minmax(0,1fr),minmax(0,1fr),36px] gap-xl bodyXs w-full">
            <span className="capitalize">{keyLabel}</span>
            <span className="capitalize">{valueLabel}</span>
          </div>
          {ids.map((item, index) => {
            let v = value[index];
            if (!v) {
              v = newItem[0];
            }
            return (
              <div
                key={item}
                className="grid grid-cols-[minmax(0,1fr),minmax(0,1fr),36px] gap-xl items-start"
              >
                <div className="flex-1">
                  {type === 'text' && (
                    <TextInput
                      size={size || 'md'}
                      error={error}
                      placeholder={keyPlaceholder}
                      value={v[keyLabel]}
                      onChange={({ target }) =>
                        handleChange(target.value, index, 'key')
                      }
                    />
                  )}
                  {type === 'number' && (
                    <NumberInput
                      size={size || 'md'}
                      error={error}
                      placeholder={keyPlaceholder}
                      value={v[keyLabel]}
                      onChange={({ target }) =>
                        handleChange(parseInt(target.value, 10), index, 'key')
                      }
                    />
                  )}
                </div>
                <div className="flex-1">
                  {type === 'text' && (
                    <TextInput
                      size={size || 'md'}
                      error={error}
                      placeholder={valuePlaceholder}
                      value={v[valueLabel]}
                      onChange={({ target }) =>
                        handleChange(target.value, index, 'value')
                      }
                    />
                  )}
                  {type === 'number' && (
                    <NumberInput
                      size={size || 'md'}
                      error={error}
                      placeholder={valuePlaceholder}
                      value={v[valueLabel]}
                      onChange={({ target }) =>
                        handleChange(parseInt(target.value, 10), index, 'value')
                      }
                    />
                  )}
                </div>
                <div className="self-center">
                  <IconButton
                    icon={<MinusCircle />}
                    variant="plain"
                    disabled={value.length < 2}
                    onClick={() => {
                      onChange?.(value.filter((_, i) => i !== index));
                      onIdChange(ids.filter((_, i) => i !== index));
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <AnimateHide show={!!message}>
          <div
            className={cn(
              'bodySm pulsable',
              {
                'text-text-critical': !!error,
                'text-text-default': !error,
              },
              'pt-md',
            )}
          >
            {message}
          </div>
        </AnimateHide>
        <div className="pt-xl">
          <Button
            variant="basic"
            content={addText || 'Add'}
            size="sm"
            prefix={<Plus />}
            onClick={() => {
              const id = uuid();
              onIdChange([...ids, id]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default KeyValuePair;
