import { WorkspacesLogo } from '~/components/branding/workspace-logo';

export default {
  title: 'Branding/WorkspacesLogo',
  component: WorkspacesLogo,
  tags: ['autodocs'],
  argTypes: {},
};

export const BasicLogo = {
  args: {},
};

export const DetailedLogo = {
  args: {
    detailed: true,
  },
};
