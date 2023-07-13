import { useState } from "react";
import ChipGroup from "../../components/atoms/chip-group";

export default {
  title: 'Atoms/ChipGroup',
  component: ChipGroup,
  tags: ['autodocs'],
  argTypes: {},
};

const ChipGroupRemovableHook = () => {
  const [chips, setChips] = useState([
    { id: 2, label: "Mango", type: ChipGroup.ChipType.REMOVABLE },
    { id: 3, label: "Dog", type: ChipGroup.ChipType.REMOVABLE },
    { id: 4, label: "Cat", type: ChipGroup.ChipType.REMOVABLE },
  ])
  return <ChipGroup onRemove={(e) => setChips(chips.filter((c) => c.id != e))}>
    {chips.map((chip, index) => <ChipGroup.Chip {...chip} key={index} />)}
  </ChipGroup>
}

const ChipGroupBasicHook = () => {
  const [chips, setChips] = useState([
    { id: 0, label: "Apple", type: ChipGroup.ChipType.BASIC },
    { id: 1, label: "Orange", type: ChipGroup.ChipType.BASIC },
  ])
  return <ChipGroup>
    {chips.map((chip, index) => <ChipGroup.Chip {...chip} key={index} />)}
  </ChipGroup>
}

const ChipGroupClickableHook = () => {
  const [chips, setChips] = useState([
    { id: 5, label: "Volleyball", type: ChipGroup.ChipType.CLICKABLE },
    { id: 5, label: "Football", type: ChipGroup.ChipType.CLICKABLE },
  ])
  return <ChipGroup>
    {chips.map((chip, index) => <ChipGroup.Chip {...chip} key={index} />)}
  </ChipGroup>
}

export const BasicChipGroup = {
  render: () => <ChipGroupBasicHook />
};

export const RemovableChipGroup = {
  render: () => <ChipGroupRemovableHook />
};

export const ClickableChipGroup = {
  render: () => <ChipGroupClickableHook />
};

