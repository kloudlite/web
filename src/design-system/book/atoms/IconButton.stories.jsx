import { CalendarCheckFill } from '~/components/icons';
import { IconButton } from '../../components/atoms/button';

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {},
};

export const BaseButton = {
  args: {
    variant: 'basic',
    icon: <CalendarCheckFill />,
  },
};
