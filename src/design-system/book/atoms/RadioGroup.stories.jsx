import * as Radio from '../../components/atoms/radio';

export default {
  title: 'Atoms/RadioGroup',
  component: Radio.Root,
  tags: ['autodocs'],
  argTypes: {},
};

export const DefaultRadioGroup = {
  args: {
    value: 'lion',
    label: 'Wild animals',
    children: (
      <>
        <Radio.Item value="tiger" key="1" withBounceEffect={false}>
          Tiger
        </Radio.Item>
        <Radio.Item value="lion" key="2" disabled withBounceEffect={false}>
          Lion
        </Radio.Item>
        <Radio.Item value="zebra" key="3" withBounceEffect={false}>
          Zebra
        </Radio.Item>
        <Radio.Item value="giraffe" key="4" disabled withBounceEffect={false}>
          Giraffe
        </Radio.Item>
      </>
    ),
  },
};
