import { ArrowsDownUp, Check } from '@jengaicons/react';
import { Root } from '../../components/atoms/action-list';

export default {
  title: 'Atoms/ActionList',
  component: Root,
  tags: ['autodocs'],
  argTypes: {},
};

export const DangerActionList = {
  args: {
    value: 'general',
    layoutId: 'danger',
    items: [
      {
        label: 'General',
        value: 'general',
        LeftIconComp: ArrowsDownUp,
        RightIconComp: Check,
        key: '1',
        href: '#',
      },
      {
        label: 'Invoices',
        value: 'invoices',
        key: '2',
        href: '#',
      },
      {
        label: 'Billing',
        key: '3',
        value: 'billing',
        href: '#',
      },
      {
        label: 'User Management',
        key: '4',
        value: 'usermanagement',
        href: '#',
      },
      {
        label: 'Security & Privacy',
        key: '5',
        value: 'securityandprivacy',
        href: '#',
      },
    ],
  },
};
