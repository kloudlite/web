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
export const KeyValuePair = ({
  onChange,
  value = [],
  label,
  message,
  error,
  size = 'md',
  addText = 'Add',
  keyLabel = 'key',
  valueLabel = 'value',
  keyPlaceholder = 'key',
  valuePlaceholder = 'value',
  type = 'text',
  ids,
  onIdChange,
}: IKeyValuePair) => {
  const defaultItem = useMemo(
    () => ({ [keyLabel]: '', [valueLabel]: '' }),
    [keyLabel, valueLabel],
  );

  const handleChange = useCallback(
    (updatedValue: string | number, index: number, target: string) => {
      const newItems = ids.map((_, idx) => {
        const currentItem = value[idx] || defaultItem;
        if (idx === index) {
          return {
            ...currentItem,
            [target === 'key' ? keyLabel : valueLabel]: updatedValue,
          };
        }
        return currentItem;
      });

      onChange?.(newItems);
    },
    [ids, value, onChange, keyLabel, valueLabel, defaultItem],
  );

  const handleRemove = (index: number) => {
    const newValues = value.filter((_, i) => i !== index);
    const newIDs = ids.filter((_, i) => i !== index);
    onChange?.(newValues);
    onIdChange?.(newIDs);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-md">
        {label && (
          <span className="text-text-default bodyMd-medium">{label}</span>
        )}
        <div className="grid grid-cols-[1fr_1fr_36px] gap-xl bodyXs w-full">
          <span className="capitalize">{keyLabel}</span>
          <span className="capitalize">{valueLabel}</span>
        </div>

        {ids.map((id, index) => {
          const item = value[index] || defaultItem;

          return (
            <div
              key={id}
              className="grid grid-cols-[1fr_1fr_36px] gap-xl items-start"
            >
              <div className="flex-1">
                {type === 'text' ? (
                  <TextInput
                    size={size}
                    error={error}
                    placeholder={keyPlaceholder}
                    value={item[keyLabel]}
                    onChange={({ target }) =>
                      handleChange(target.value, index, 'key')
                    }
                  />
                ) : (
                  <NumberInput
                    size={size}
                    error={error}
                    placeholder={keyPlaceholder}
                    value={item[keyLabel]}
                    onChange={({ target }) =>
                      handleChange(parseInt(target.value, 10), index, 'key')
                    }
                  />
                )}
              </div>
              <div className="flex-1">
                {type === 'text' ? (
                  <TextInput
                    size={size}
                    error={error}
                    placeholder={valuePlaceholder}
                    value={item[valueLabel]}
                    onChange={({ target }) =>
                      handleChange(target.value, index, 'value')
                    }
                  />
                ) : (
                  <NumberInput
                    size={size}
                    error={error}
                    placeholder={valuePlaceholder}
                    value={item[valueLabel]}
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
                  disabled={ids.length < 2}
                  onClick={() => handleRemove(index)}
                />
              </div>
            </div>
          );
        })}

        <AnimateHide show={!!message}>
          <div
            className={cn('bodySm pulsable pt-md', {
              'text-text-critical': !!error,
              'text-text-default': !error,
            })}
          >
            {message}
          </div>
        </AnimateHide>

        <div className="pt-xl">
          <Button
            variant="basic"
            content={addText}
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
