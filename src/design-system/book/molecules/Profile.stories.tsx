import Profile from '~/components/molecule/profile';

export default {
  title: 'Molecules/Profile',
  component: Profile,
  tags: ['autodocs'],
  argTypes: {},
};

export const ProfileAvatar = {
  args: {
    name: 'Karthik Th',
    subtitle: 'subtitle',
    color: 'one',
  },
};
