import { Info as InfoIcon } from '@jengaicons/react';
import { Badge } from '../../components/atoms/badge';

export default {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {},
};

export const Neutral = {
  args: {
    type: 'neutral',
    children: 'Neutral',
  },
};
export const Danger = {
  args: {
    type: 'critical',
    children: 'critical',
  },
};
export const Info = {
  args: {
    type: 'info',
    children: 'Info',
  },
};
export const Success = {
  args: {
    type: 'success',
    children: 'Success',
    icon: <InfoIcon />,
  },
};
export const Warning = {
  args: {
    type: 'warning',
    children: 'Warning',
  },
};
