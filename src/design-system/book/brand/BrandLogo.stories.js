import { BrandLogo } from '~/components/branding/brand-logo';

export default {
  title: 'Branding/BrandLogo',
  component: BrandLogo,
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
