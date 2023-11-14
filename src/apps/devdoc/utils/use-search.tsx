import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const SearchContext = createContext<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}>({ show: false, setShow() {} });

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);
  return (
    <SearchContext.Provider
      value={useMemo(() => ({ show, setShow }), [show, setShow])}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  return useContext(SearchContext);
};

export default useSearch;
