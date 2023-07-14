import { Checkbox } from '../../components/atoms/checkbox';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {},
};

export const Checked = {
  args: {
    label: 'Checked',
    checked: true,
    onChange: (e) => console.log(e),
  },
};

export const DisabledChecked = {
  args: {
    label: 'Disabled Checked',
    disabled: true,
    checked: true,
  },
};

export const DisabledUnchecked = {
  args: {
    label: 'Disabled Unchecked',
    disabled: true,
    checked: false,
  },
};

export const Indeterminate = {
  args: {
    label: 'Indeterminate',
    checked: 'indeterminate',
    indeterminate: true,
  },
};

export const Critical = {
  args: {
    label: 'Critical',
    checked: true,
    error: true,
  },
};
