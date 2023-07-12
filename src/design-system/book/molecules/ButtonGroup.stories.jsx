import { GearFill, HamburgerFill, Info, InfoFill } from "@jengaicons/react";
import ButtonGroup from "../../components/atoms/button-group";
import OptionList from "../../components/atoms/option-list";


export default {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {},
};


export const DefaultButtonGroup = {
  render: () => <ButtonGroup>
    <ButtonGroup.Button content={"button1"} />
    <ButtonGroup.Button content={"button2"} />
    <OptionList>
      <OptionList.Trigger>
        <ButtonGroup.Button content={"menu"} />
      </OptionList.Trigger>
      <OptionList.Content>
        <OptionList.CheckboxItem>
          hello
        </OptionList.CheckboxItem>
      </OptionList.Content>
    </OptionList>
  </ButtonGroup>
};


export const DefaultButtonGroupIcon = {
  render: () => <ButtonGroup>
    <ButtonGroup.IconButton icon={InfoFill} />
    <ButtonGroup.IconButton icon={GearFill} />
    <OptionList>
      <OptionList.Trigger>
        <ButtonGroup.IconButton icon={HamburgerFill} />
      </OptionList.Trigger>
      <OptionList.Content>
        <OptionList.CheckboxItem>
          hello
        </OptionList.CheckboxItem>
      </OptionList.Content>
    </OptionList>
  </ButtonGroup>
};


export const DefaultButtonGroupSelectableIcon = {
  render: () => <ButtonGroup selectable value="1">
    <ButtonGroup.IconButton icon={InfoFill} value="0" />
    <ButtonGroup.IconButton icon={GearFill} value="1" />
    <ButtonGroup.IconButton icon={HamburgerFill} value="2" />
  </ButtonGroup>
};
