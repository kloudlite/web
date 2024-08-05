import { Monitor, Moon, Sun } from '@jengaicons/react';
import { useTheme } from '../utils/useTheme';
import ButtonGroup from 'kl-design-system/atoms/button-group';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <ButtonGroup.Root
      variant="outline"
      selectable
      value={theme}
      onValueChange={(v: any) => {
        setTheme(v);
      }}
    >
      <ButtonGroup.IconButton value="light" icon={<Sun />} />
      <ButtonGroup.IconButton value="dark" icon={<Moon />} />
      <ButtonGroup.IconButton value="system" icon={<Monitor />} />
    </ButtonGroup.Root>
  );
};

export default ThemeSwitcher;
