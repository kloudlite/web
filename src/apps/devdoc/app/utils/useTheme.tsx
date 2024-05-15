import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ITheme = 'dark' | 'light' | 'system';
const ThemeContext = createContext<{
  theme: ITheme;
  binaryTheme: Omit<ITheme, 'system'>;
  setTheme: (t: ITheme) => void;
}>({ theme: 'system', setTheme() {}, binaryTheme: 'light' });

const getTheme = () => {
  const { theme } = localStorage;
  if (theme === 'dark' || theme === 'light') {
    return theme;
  }
  return 'system';
};

const saveTheme = (theme: ITheme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('wb-dark', 'dark');
    document
      .querySelector('html')
      ?.classList.remove('wb-bg-surface-basic-subdued');
    document
      .querySelector('html')
      ?.classList.add('wb-bg-surface-darktheme-basic-subdued');
  } else if (theme === 'system') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('wb-dark', 'dark');
      document
        .querySelector('html')
        ?.classList.remove('wb-bg-surface-basic-subdued');
      document
        .querySelector('html')
        ?.classList.add('wb-bg-surface-darktheme-basic-subdued');
    } else {
      document
        .querySelector('html')
        ?.classList.add('wb-bg-surface-basic-subdued');
      document
        .querySelector('html')
        ?.classList.remove('wb-bg-surface-darktheme-basic-subdued');
      document.documentElement.classList.remove('wb-dark', 'dark');
    }
  } else {
    document.documentElement.classList.remove('wb-dark', 'dark');
    document
      .querySelector('html')
      ?.classList.add('wb-bg-surface-basic-subdued');
    document
      .querySelector('html')
      ?.classList.remove('wb-bg-surface-darktheme-basic-subdued');
  }
  if (theme === 'system') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', theme);
  }
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, _setTheme] = useState<ITheme>('system');
  const [binaryTheme, setBinaryTheme] =
    useState<Omit<ITheme, 'system'>>('light');

  useEffect(() => {
    _setTheme(getTheme());
  }, []);

  const setTheme = (t: ITheme) => {
    _setTheme(t);
    saveTheme(t);
  };

  const gTheme = () => {
    try {
      if (theme === 'dark') {
        return theme;
      }
      if (theme === 'system' && window !== undefined) {
        if (window?.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
        return 'light';
      }
      return 'light';
    } catch {
      return 'light';
    }
  };

  useEffect(() => {
    setBinaryTheme(gTheme());
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({ theme, binaryTheme, setTheme }),
        [theme, binaryTheme, setTheme]
      )}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
