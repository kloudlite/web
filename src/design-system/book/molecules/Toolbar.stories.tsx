import { useState } from 'react';
import OptionList from '~/components/atoms/option-list';
import Toolbar from '~/components/atoms/toolbar';
import { ArrowDown, ArrowUp, InfoFill, Search } from '~/components/icons';

export default {
  title: 'Molecules/Toolbar',
  component: Toolbar.Root,
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
        <Toolbar.ButtonGroup.Button
          value=""
          content="menu"
          variant="basic"
          selected={open}
        />
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

export const DefaultToolbar = {
  render: () => (
    <Toolbar.Root>
      <Toolbar.TextInput placeholder="filter" />
      <Toolbar.ButtonGroup.Root value="hello">
        <Toolbar.ButtonGroup.Button value="button1" content="button1" />
        <Toolbar.ButtonGroup.Button value="button2" content="button2" />
        <OptionListHook />
        <Toolbar.ButtonGroup.IconButton value="button3" icon={<InfoFill />} />
      </Toolbar.ButtonGroup.Root>
      <Toolbar.Button content="this is a button" />
    </Toolbar.Root>
  ),
};
