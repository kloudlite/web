import { TooltipProvider } from '@radix-ui/react-tooltip';
import Tooltip from '~/components/atoms/tooltip';
import { Button } from '../../components/atoms/button';

export default {
  title: 'Atoms/Tooltip',
  component: Tooltip.Root,
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={150}>
        <Story />
      </TooltipProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
};

export const InitialAvatar = {
  args: {
    content: 'tooltip',
    children: <Button content="tooltip" />,
  },
};
