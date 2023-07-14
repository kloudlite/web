import { ProgressTracker } from '../../components/organisms/progress-tracker';

export default {
  title: 'Organisms/Progress Tracker',
  component: ProgressTracker,
  tags: ['autodocs'],
  argTypes: {},
};

export const DeafultProgressTracker = {
  args: {
    items: [
      {
        label: 'Item 1',
        active: true,
        key: 1,
      },
      {
        label: 'Item 2',
        active: true,
        key: 2,
      },
      {
        label: 'Item 3',
        active: false,
        key: 3,
      },
      {
        label: 'Item 4',
        active: false,
        key: 4,
      },
      {
        label: 'Item 5',
        active: false,
        key: 5,
      },
    ],
  },
};
