import { useState } from 'react';
import { ArrowsDownUp, Check } from '~/components/icons';
import ActionList from '../../components/atoms/action-list';

export default {
  title: 'Atoms/ActionList',
  component: ActionList.Root,
  tags: ['autodocs'],
  argTypes: {},
};

const ActionListHook = () => {
  const [value, setValue] = useState('general');
  const items = [
    {
      label: 'General',
      value: 'general',
      LeftIconComp: ArrowsDownUp,
      RightIconComp: Check,
      href: '#',
    },
    {
      label: 'Invoices',
      value: 'invoices',
      href: '#',
    },
    {
      label: 'Billing',
      value: 'billing',
      href: '#',
    },
    {
      label: 'User Management',
      value: 'usermanagement',
      href: '#',
    },
    {
      label: 'Security & Privacy',
      value: 'securityandprivacy',
      href: '#',
    },
  ];
  return (
    <div>
      <ActionList.Root value={value} onChange={setValue}>
        {items.map((item) => (
          <ActionList.Item value={item.value} key={item.value}>
            {item.label}
          </ActionList.Item>
        ))}
      </ActionList.Root>
    </div>
  );
};

export const DangerActionList = {
  render: () => <ActionListHook />,
};
