import { useState } from 'react';
import { ArrowDown, ArrowUp, Search } from '~/components/icons';
import { Button } from '../../components/atoms/button';
import OptionList from '../../components/atoms/option-list';
import Profile from '../../components/molecule/profile';

export default {
  title: 'Molecules/OptionList',
  component: OptionList,
  tags: ['autodocs'],
  argTypes: {},
};

const OptionListHook = () => {
  const [open, setOpen] = useState(false);
  const [radioValue, setRadioValue] = useState('one');
  const [apple, setApple] = useState(false);
  const [orange, setOrange] = useState(false);
  return (
    <OptionList.Root open={open} onOpenChange={setOpen}>
      <OptionList.Trigger>
        <Button content="menu" variant="basic" selected={open} />
      </OptionList.Trigger>
      <OptionList.Content>
        <OptionList.TextInput placeholder="Filter" prefixIcon={<Search />} />
        {/* <OptionList.Separator /> */}
        <OptionList.Item>This is test Item 1</OptionList.Item>
        <OptionList.Item>This is test Item 2</OptionList.Item>
        <OptionList.Separator />
        <OptionList.CheckboxItem
          checked={apple}
          onValueChange={setApple}
          onClick={(e) => e.preventDefault()}
        >
          Apple
        </OptionList.CheckboxItem>
        <OptionList.CheckboxItem
          checked={orange}
          onValueChange={setOrange}
          onClick={(e) => e.preventDefault()}
        >
          Orange
        </OptionList.CheckboxItem>
        <OptionList.Separator />
        <OptionList.RadioGroup value={radioValue} onValueChange={setRadioValue}>
          <OptionList.RadioGroupItem
            value="one"
            onClick={(e) => e.preventDefault()}
          >
            One
          </OptionList.RadioGroupItem>
          <OptionList.RadioGroupItem
            value="two"
            onClick={(e) => e.preventDefault()}
          >
            Two
          </OptionList.RadioGroupItem>
          <OptionList.RadioGroupItem
            value="three"
            onClick={(e) => e.preventDefault()}
          >
            Three
          </OptionList.RadioGroupItem>
        </OptionList.RadioGroup>
        <OptionList.Separator />
        <OptionList.RadioGroup value={radioValue} onValueChange={setRadioValue}>
          <OptionList.RadioGroupItem
            showIndicator={false}
            value="one"
            onClick={(e) => e.preventDefault()}
          >
            <ArrowUp size={16} />
            One
          </OptionList.RadioGroupItem>
          <OptionList.RadioGroupItem
            value="two"
            showIndicator={false}
            onClick={(e) => e.preventDefault()}
          >
            <ArrowDown size={16} />
            Two
          </OptionList.RadioGroupItem>
        </OptionList.RadioGroup>
      </OptionList.Content>
    </OptionList.Root>
  );
};

const ProfileOptionListHook = () => {
  const [open, setOpen] = useState(false);
  const [radioValue, setRadioValue] = useState('one');
  const [apple, setApple] = useState(false);
  const [orange, setOrange] = useState(false);
  return (
    <OptionList.Root open={open} onOpenChange={setOpen}>
      <OptionList.Trigger>
        <Profile name="this is profile" />
      </OptionList.Trigger>
      <OptionList.Content>
        <OptionList.TextInput placeholder="Filter" prefixIcon={<Search />} />
        {/* <OptionList.Separator /> */}
        <OptionList.Item>This is test Item 1</OptionList.Item>
        <OptionList.Item>This is test Item 2</OptionList.Item>
        <OptionList.Separator />
        <OptionList.CheckboxItem
          checked={apple}
          onValueChange={setApple}
          onClick={(e) => e.preventDefault()}
        >
          Apple
        </OptionList.CheckboxItem>
        <OptionList.CheckboxItem
          checked={orange}
          onValueChange={setOrange}
          onClick={(e) => e.preventDefault()}
        >
          Orange
        </OptionList.CheckboxItem>
        <OptionList.Separator />
        <OptionList.RadioGroup value={radioValue} onValueChange={setRadioValue}>
          <OptionList.RadioGroupItem
            value="one"
            onClick={(e) => e.preventDefault()}
          >
            One
          </OptionList.RadioGroupItem>
          <OptionList.RadioGroupItem
            value="two"
            onClick={(e) => e.preventDefault()}
          >
            Two
          </OptionList.RadioGroupItem>
          <OptionList.RadioGroupItem
            value="three"
            onClick={(e) => e.preventDefault()}
          >
            Three
          </OptionList.RadioGroupItem>
        </OptionList.RadioGroup>
        <OptionList.Separator />
        <OptionList.RadioGroup value={radioValue} onValueChange={setRadioValue}>
          <OptionList.RadioGroupItem
            showIndicator={false}
            value="one"
            onClick={(e) => e.preventDefault()}
          >
            <ArrowUp size={16} />
            One
          </OptionList.RadioGroupItem>
          <OptionList.RadioGroupItem
            value="two"
            showIndicator={false}
            onClick={(e) => e.preventDefault()}
          >
            <ArrowDown size={16} />
            Two
          </OptionList.RadioGroupItem>
        </OptionList.RadioGroup>
      </OptionList.Content>
    </OptionList.Root>
  );
};

export const DefaultOptionList = {
  render: () => <OptionListHook />,
};

export const ProfileOptionList = {
  render: () => <ProfileOptionListHook />,
};
