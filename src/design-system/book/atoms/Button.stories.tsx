import { CalendarCheckFill, CaretDownFill } from '~/components/icons';
import { Button } from '../../components/atoms/button';

export default {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
};

export const BaseButton = {
  args: {
    variant: 'basic',
    content: 'Button',
    prefix: <CalendarCheckFill />,
    suffix: <CaretDownFill />,
  },
};

export const OutlineButton = {
  args: {
    variant: 'outline',
    content: 'Button',
  },
};

export const PlainButton = {
  args: {
    variant: 'plain',
    content: 'Button',
  },
};
