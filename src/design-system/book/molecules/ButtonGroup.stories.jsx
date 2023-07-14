import {
  ArrowDown,
  ArrowUp,
  GearFill,
  HamburgerFill,
  InfoFill,
  Search,
} from '@jengaicons/react';
import { useState } from 'react';
import ButtonGroup from '../../components/atoms/button-group';
import OptionList from '../../components/atoms/option-list';

export default {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {},
};

const OptionListHook = ({ isIconButton }) => {
  const [open, setOpen] = useState(false);
  const [radioValue, setRadioValue] = useState('one');
  const [apple, setApple] = useState(false);
  const [orange, setOrange] = useState(false);
  return (
    <OptionList open={open} onOpenChange={setOpen}>
      {!isIconButton && (
        <OptionList.Trigger>
          <ButtonGroup.Button content="menu" variant="basic" selected={open} />
        </OptionList.Trigger>
      )}
      {isIconButton && (
        <OptionList.Trigger>
          <ButtonGroup.IconButton
            icon={HamburgerFill}
            variant="basic"
            selected={open}
          />
        </OptionList.Trigger>
      )}
      <OptionList.Content>
        <OptionList.TextInput placeholder="Filter" prefixIcon={Search} />
        {/* <OptionList.Separator /> */}
        <OptionList.Item>This is test Item 1</OptionList.Item>
        <OptionList.Item>This is test Item 2</OptionList.Item>
        <OptionList.Separator />
        <OptionList.CheckboxItem
          checked={apple}
          onValueChange={setApple}
          onSelect={(e) => e.preventDefault()}
        >
          Apple
        </OptionList.CheckboxItem>
        <OptionList.CheckboxItem
          checked={orange}
          onValueChange={setOrange}
          onSelect={(e) => e.preventDefault()}
        >
          Orange
        </OptionList.CheckboxItem>
        <OptionList.Separator />
        <OptionList.RadioGroup value={radioValue} onValueChange={setRadioValue}>
          <OptionList.RadioGroupItem
            value="one"
            onSelect={(e) => e.preventDefault()}
          >
            One
          </OptionList.RadioGroupItem>
          <OptionList.RadioGroupItem
            value="two"
            onSelect={(e) => e.preventDefault()}
          >
            Two
          </OptionList.RadioGroupItem>
          <OptionList.RadioGroupItem
            value="three"
            onSelect={(e) => e.preventDefault()}
          >
            Three
          </OptionList.RadioGroupItem>
        </OptionList.RadioGroup>
        <OptionList.Separator />
        <OptionList.RadioGroup value={radioValue} onValueChange={setRadioValue}>
          <OptionList.RadioGroupItem
            showIndicator={false}
            value="one"
            onSelect={(e) => e.preventDefault()}
          >
            <ArrowUp size={16} />
            One
          </OptionList.RadioGroupItem>
          <OptionList.RadioGroupItem
            value="two"
            showIndicator={false}
            onSelect={(e) => e.preventDefault()}
          >
            <ArrowDown size={16} />
            Two
          </OptionList.RadioGroupItem>
        </OptionList.RadioGroup>
      </OptionList.Content>
    </OptionList>
  );
};

export const DefaultButtonGroup = {
  render: () => (
    <ButtonGroup>
      <ButtonGroup.Button content="button1" />
      <ButtonGroup.Button content="button2" />
      <OptionListHook isIconButton={false} />
    </ButtonGroup>
  ),
};

export const DefaultButtonGroupIcon = {
  render: () => (
    <ButtonGroup>
      <ButtonGroup.IconButton icon={InfoFill} />
      <ButtonGroup.IconButton icon={GearFill} />
      <OptionListHook isIconButton />
    </ButtonGroup>
  ),
};

export const DefaultButtonGroupSelectableIcon = {
  render: () => (
    <ButtonGroup selectable value="1">
      <ButtonGroup.IconButton icon={InfoFill} value="0" />
      <ButtonGroup.IconButton icon={GearFill} value="1" />
      <ButtonGroup.IconButton icon={HamburgerFill} value="2" />
    </ButtonGroup>
  ),
};
