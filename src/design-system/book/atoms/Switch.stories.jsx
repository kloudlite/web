import logger from '~/root/lib/client/helpers/log';
import { Switch } from '../../components/atoms/switch';

export default {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {},
};

export const On = {
  args: {
    checked: true,
  },
};

export const Off = {
  args: {
    checked: false,
    onChange: (e) => logger.log(e),
  },
};

export const SwitchDisabled = {
  args: {
    checked: true,
    disabled: true,
  },
};
