import { useState } from 'react';
import * as Chips from '../../components/atoms/chips';

export default {
  title: 'Atoms/ChipGroup',
  component: Chips.ChipGroup,
  tags: ['autodocs'],
  argTypes: {},
};

const ChipGroupRemovableHook = () => {
  const [chips, setChips] = useState([
    { id: 2, label: 'Mango', type: Chips.ChipType.REMOVABLE },
    { id: 3, label: 'Dog', type: Chips.ChipType.REMOVABLE },
    { id: 4, label: 'Cat', type: Chips.ChipType.REMOVABLE },
  ]);
  return (
    <Chips.ChipGroup onRemove={(e) => setChips(chips.filter((c) => c !== e))}>
      {chips.map((chip) => (
        <Chips.Chip {...chip} item={chip} key={chip.id} />
      ))}
    </Chips.ChipGroup>
  );
};

const ChipGroupBasicHook = () => {
  const [chips, _setChips] = useState([
    { id: 0, label: 'Apple', type: Chips.ChipType.BASIC },
    { id: 1, label: 'Orange', type: Chips.ChipType.BASIC },
  ]);
  return (
    <Chips.ChipGroup>
      {chips.map((chip) => (
        <Chips.Chip {...chip} item={chip} key={chip.id} />
      ))}
    </Chips.ChipGroup>
  );
};

const ChipGroupClickableHook = () => {
  const [chips, _setChips] = useState([
    { id: 5, label: 'Volleyball', type: Chips.ChipType.CLICKABLE },
    { id: 6, label: 'Football', type: Chips.ChipType.CLICKABLE },
  ]);
  return (
    <Chips.ChipGroup>
      {chips.map((chip) => (
        <Chips.Chip {...chip} item={chip} key={chip.id} />
      ))}
    </Chips.ChipGroup>
  );
};

export const BasicChipGroup = {
  render: () => <ChipGroupBasicHook />,
};

export const RemovableChipGroup = {
  render: () => <ChipGroupRemovableHook />,
};

export const ClickableChipGroup = {
  render: () => <ChipGroupClickableHook />,
};
