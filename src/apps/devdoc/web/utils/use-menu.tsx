import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const MenuContext = createContext<{
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}>({
  state: false,
  setState() {},
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(false);
  return (
    <MenuContext.Provider
      value={useMemo(() => ({ state, setState }), [state, setState])}
    >
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => {
  return useContext(MenuContext);
};
export default useMenu;
