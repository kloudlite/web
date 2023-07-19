import * as Radio from '../../components/atoms/radio';

export default {
  title: 'Atoms/RadioGroup',
  component: Radio.RadioGroup,
  tags: ['autodocs'],
  argTypes: {},
};

export const DefaultRadioGroup = {
  args: {
    value: 'lion',
    label: 'Wild animals',
    children: (
      <>
        <Radio.RadioItem
          label="Tiger"
          value="tiger"
          key="1"
          withBounceEffect={false}
        />
        <Radio.RadioItem
          label="Lion"
          value="lion"
          key="2"
          disabled
          withBounceEffect={false}
        />
        <Radio.RadioItem
          label="Zebra"
          value="zebra"
          key="3"
          withBounceEffect={false}
        />
        <Radio.RadioItem
          label="Giraffe"
          value="giraffe"
          key="4"
          disabled
          withBounceEffect={false}
        />
      </>
    ),
  },
};
