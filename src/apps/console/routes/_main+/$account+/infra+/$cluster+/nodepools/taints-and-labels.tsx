import { MinusCircle } from '@jengaicons/react';
import { useEffect, useState } from 'react';
import { Button, IconButton } from '~/components/atoms/button';
import { TextInput } from '~/components/atoms/input';
import SelectPrimitive from '~/components/atoms/select-primitive';
import { uuid } from '~/components/utils';
import { taintsData } from './nodepool-utils';

type ILabelValue = {
  key: string;
  value: string;
  id: string;
};

type ITaintValue = {
  taint: string;
  type: string;
  value: string;
  id: string;
};

interface ILabelOrTaints<T> {
  onChange: (items: T[]) => void;
  value: T[];
}

export const Labels = ({
  onChange,
  value = [],
}: ILabelOrTaints<ILabelValue>) => {
  const newItem = [{ key: '', value: '', id: uuid() }];
  const [items, setItems] = useState(newItem);

  const handleChange = (_value = '', id = '', target = {}) => {
    setItems(
      items.map((i) => {
        if (i.id === id) {
          switch (target) {
            case 'key':
              return { ...i, key: _value };
            case 'value':
            default:
              return { ...i, value: _value };
          }
        }
        return i;
      })
    );
  };

  useEffect(() => {
    if (onChange) onChange(Array.from(items));
  }, [items]);

  useEffect(() => {
    if (value.length > 0) {
      setItems(Array.from(value));
    }
  }, []);

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-col gap-md">
        <span className="text-text-default bodyMd-medium">Labels</span>
        {items.map((item) => (
          <div key={item.id} className="flex flex-row gap-xl items-end">
            <div className="flex-1">
              <TextInput
                placeholder="Key"
                value={item.key}
                onChange={({ target }) =>
                  handleChange(target.value, item.id, 'key')
                }
              />
            </div>
            <div className="flex-1">
              <TextInput
                placeholder="Value"
                value={item.value}
                onChange={({ target }) =>
                  handleChange(target.value, item.id, 'value')
                }
              />
            </div>
            <IconButton
              icon={<MinusCircle />}
              variant="plain"
              disabled={items.length < 2}
              onClick={() => {
                setItems(items.filter((i) => i.id !== item.id));
              }}
            />
          </div>
        ))}
      </div>
      <Button
        variant="basic"
        content="Add label"
        size="sm"
        onClick={() => {
          setItems([...items, { ...newItem[0], id: uuid() }]);
        }}
      />
    </div>
  );
};

export const Taints = ({
  onChange,
  value = [],
}: ILabelOrTaints<ITaintValue>) => {
  const newItem = { taint: '', type: '', value: '', id: uuid() };
  const [items, setItems] = useState([newItem]);
  const [taints, _setTaints] = useState(taintsData);

  const handleChange = (_value = '', id = '', target = '') => {
    setItems(
      items.map((i) => {
        if (i.id === id) {
          switch (target) {
            case 'type':
              return { ...i, type: _value };
            case 'value':
              return { ...i, value: _value };
            case 'taint':
            default:
              return { ...i, taint: _value };
          }
        }
        return i;
      })
    );
  };

  useEffect(() => {
    if (onChange) onChange(Array.from(items));
  }, [items]);

  useEffect(() => {
    if (value.length > 0) {
      setItems(Array.from(value));
    }
  }, []);

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-col gap-md">
        <span className="text-text-default bodyMd-medium">Taints</span>
        {items.map((item) => (
          <div key={item.id} className="flex flex-row gap-xl items-end">
            <div className="flex-1">
              <SelectPrimitive.Root
                value={item.taint}
                onChange={(e: any) => {
                  handleChange(e, item.id, 'taint');
                }}
              >
                <SelectPrimitive.Option value="">
                  --Select--
                </SelectPrimitive.Option>
                {taints.map((tts) => (
                  <SelectPrimitive.Option key={tts.id} value={tts.value}>
                    {tts.label}
                  </SelectPrimitive.Option>
                ))}
              </SelectPrimitive.Root>
            </div>
            <div className="flex-1">
              <TextInput
                placeholder="Type"
                value={item.type}
                onChange={({ target }) =>
                  handleChange(target.value, item.id, 'type')
                }
              />
            </div>
            <div className="flex-1">
              <TextInput
                placeholder="Value"
                value={item.value}
                onChange={({ target }) =>
                  handleChange(target.value, item.id, 'value')
                }
              />
            </div>
            <IconButton
              icon={<MinusCircle />}
              variant="plain"
              disabled={items.length < 2}
              onClick={() => {
                setItems(items.filter((i) => i.id !== item.id));
              }}
            />
          </div>
        ))}
      </div>
      <Button
        variant="basic"
        content="Add taint"
        size="sm"
        onClick={() => {
          setItems([...items, { ...newItem, id: uuid() }]);
        }}
      />
    </div>
  );
};
