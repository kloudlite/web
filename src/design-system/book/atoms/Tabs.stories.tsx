import Tabs from '~/components/atoms/tabs';

export default {
  title: 'Atoms/Tabs',
  component: Tabs.Root,
  tags: ['autodocs'],
};

export const PrimaryTabs = {
  args: {
    value: 'projects',
    layoutId: 'projects',
    variant: 'plain',
    children: [
      {
        label: 'Projects',
        href: '#',
        value: 'projects',
      },
      {
        label: 'Cluster',
        href: '#',
        value: 'cluster',
      },
      {
        label: 'Cloud provider',
        href: '#',
        value: 'cloudprovider',
      },
      {
        label: 'Domains',
        href: '#',
        value: 'domains',
      },
      {
        label: 'Container registry',
        href: '#',
        value: 'containerregistry',
      },
      {
        label: 'VPN',
        href: '#',
        value: 'vpn',
      },
      {
        label: 'Settings',
        href: '#',
        value: 'settings',
      },
    ].map((item) => (
      <Tabs.Tab label={item.label} value={item.value} key={item.value} />
    )),
  },
};
