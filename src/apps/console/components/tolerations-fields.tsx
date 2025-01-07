import { ReactNode, useCallback, useMemo } from 'react';
import AnimateHide from '@kloudlite/design-system/atoms/animate-hide';
import { Button, IconButton } from '@kloudlite/design-system/atoms/button';
import { TextInput } from '@kloudlite/design-system/atoms/input';
import { cn, uuid } from '@kloudlite/design-system/utils';
import { MinusCircle, Plus } from '~/console/components/icons';
import Select from '@kloudlite/design-system/atoms/select';

interface ITolerationsKeyValuePair {
  onChange?(itemArray: Array<Record<string, any>>): void;
  value?: Array<Record<string, any>>;
  label?: ReactNode;
  message?: ReactNode;
  error?: boolean;
  size?: 'lg' | 'md';
  addText?: string;
  ids: string[];
  onIdChange: (ids: string[]) => void;
}

const effects = async () => [{ label: 'NoExecute', value: 'NoExecute' }];
const operators = async () => [{ label: 'Equal', value: 'Equal' }];

const TolerationsKeyValuePair = ({
  onChange,
  value = [],
  ids = [],
  label,
  message,
  error,
  size,
  addText,
  onIdChange,
}: ITolerationsKeyValuePair) => {
  const newItem = useMemo(
    () => [{ key: '', value: '', effect: 'NoExecute', operator: 'Equal' }],
    [],
  );
  const handleChange = useCallback(
    (_value: string | number, id: string | number, target: string = '') => {
      const tempItems = ids.map((_, index) => {
        let v = value[index];
        if (!v) {
          v = newItem[0];
        }
        if (index === id) {
          switch (target) {
            case 'effect':
              return { ...v, effect: _value };
            case 'operator':
              return { ...v, operator: _value };
            case 'key':
              return { ...v, key: _value };
            case 'value':
            default:
              return { ...v, value: _value };
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
          <div className="grid grid-cols-[minmax(0,1fr),minmax(0,1fr),minmax(0,1fr),minmax(0,1fr),36px] gap-xl bodyXs w-full">
            <span>Effects</span>
            <span>Key</span>
            <span>Operator</span>
            <span>Value</span>
          </div>
          {ids.map((item, index) => {
            let v = value[index];
            if (!v) {
              v = newItem[0];
            }
            return (
              <div
                key={item}
                className="grid grid-cols-[minmax(0,1fr),minmax(0,1fr),minmax(0,1fr),minmax(0,1fr),36px] gap-xl items-start"
              >
                <div className="flex-1">
                  <Select
                    size={size || 'md'}
                    value={v.effect}
                    options={effects}
                    onChange={(_, val) => {
                      handleChange(val, index, 'effect');
                    }}
                  />
                </div>
                <div className="flex-1">
                  <TextInput
                    size={size || 'md'}
                    error={error}
                    placeholder={'Key'}
                    value={v.key}
                    onChange={({ target }) =>
                      handleChange(target.value, index, 'key')
                    }
                  />
                </div>
                <div className="flex-1">
                  <Select
                    size={size || 'md'}
                    value={v.operator}
                    options={operators}
                    onChange={(_, val) => {
                      handleChange(val, index, 'operator');
                    }}
                  />
                </div>
                <div className="flex-1">
                  <TextInput
                    size={size || 'md'}
                    error={error}
                    placeholder={'Value'}
                    value={v.value}
                    onChange={({ target }) =>
                      handleChange(target.value, index, 'value')
                    }
                  />
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

export default TolerationsKeyValuePair;
