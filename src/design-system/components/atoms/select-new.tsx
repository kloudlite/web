import RSelect, {
  ControlProps,
  GroupBase,
  InputProps,
  PropsValue,
  components,
} from 'react-select';
import RCreatable from 'react-select/creatable';
import AsyncSelect from 'react-select/async';

interface IOptionBase {
  label: string;
  value: string;
}

type IOption<T> = T & IOptionBase;

interface IGroupOption<T> {
  label: string;
  options: IOption<T>[];
}
interface ISelect<T> {
  label?: string;
  size?: 'md' | 'lg';
  options: (IOption<T> | IGroupOption<T>)[];
  value: PropsValue<IOption<T>> | undefined;
  creatable?: boolean;
  async?: boolean;
  onChange?: (value: T) => void;
}
const Control = <T,>(
  props: ControlProps<IOption<T>, false> & { label?: string }
) => {
  const { label } = props;
  return (
    <div className="flex flex-col gap-md">
      {label && <div className="bodyMd-medium text-text-default">{label}</div>}
      <components.Control {...props} />
    </div>
  );
};

const Input = <T,>(
  props: InputProps<IOption<T>, false, GroupBase<IOption<T>>>
) => {
  return <components.Input {...props} />;
};

export const Select = <T,>({
  label,
  size = 'md',
  options,
  value,
  creatable = false,
  async = false,
  onChange,
}: ISelect<T>) => {
  let Component = creatable ? RCreatable : RSelect;
  Component = async ? AsyncSelect : Component;

  return (
    <Component
      options={options}
      value={value}
      onChange={onChange as any}
      components={{
        Control: (props) => Control({ ...props, label }),
        Input: (props) => Input(props),
      }}
    />
  );
};
