import { NumberInput } from '~/components/atoms/input';

export default {
  title: 'Atoms/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {},
};

export const DefaultTextInput = {
  args: {
    label: 'Default',
    defaultValue: 4,
    disabled: false,
  },
};
