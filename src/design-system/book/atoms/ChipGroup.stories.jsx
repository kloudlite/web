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
    { key: 2, label: 'Mango', type: 'REMOVABLE' },
    { key: 3, label: 'Dog', type: 'REMOVABLE' },
    { key: 4, label: 'Cat', type: 'REMOVABLE' },
  ]);
  return (
    <Chips.ChipGroup onRemove={(e) => setChips(chips.filter((c) => c !== e))}>
      {chips.map(({ key, label, type }) => (
        <Chips.Chip
          key={key}
          {...{ label, type, item: { key, label, type } }}
        />
      ))}
    </Chips.ChipGroup>
  );
};

const ChipGroupBasicHook = () => {
  const [chips, _setChips] = useState([
    { id: 0, label: 'Apple', type: 'BASIC' },
    { id: 1, label: 'Orange', type: 'BASIC' },
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
    { id: 5, label: 'Volleyball', type: 'CLICKABLE' },
    { id: 6, label: 'Football', type: 'CLICKABLE' },
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
