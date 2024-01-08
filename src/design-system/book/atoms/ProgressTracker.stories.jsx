import ProgressTracker from '~/components/organisms/progress-tracker';

export default {
  title: 'Organisms/Progress Tracker',
  component: ProgressTracker.Root,
  tags: ['autodocs'],
  argTypes: {},
};

const ProgressTrackerHook = () => {
  const items = [
    {
      item: {
        active: true,
        completed: false,
        label: 'Item-1',
      },
      value: 'item-1',
    },
    {
      item: {
        active: false,
        completed: false,
        label: 'Item-2',
      },
      value: 'item-2',
    },
    {
      item: {
        active: false,
        completed: false,
        label: 'Item-3',
      },
      value: 'item-3',
    },
    {
      item: {
        active: false,
        completed: false,
        label: 'Item-4',
      },
      value: 'item-4',
    },
    {
      item: {
        active: false,
        completed: false,
        label: 'Item-5',
      },
      value: 'item-5',
    },
  ];
  return (
    <ProgressTracker.Root items={items}>
      {(item) => (
        <ProgressTracker.Item active={item.active} completed={item.completed}>
          {item.label}
        </ProgressTracker.Item>
      )}
    </ProgressTracker.Root>
  );
};

export const DeafultProgressTracker = {
  render: () => <ProgressTrackerHook />,
};
