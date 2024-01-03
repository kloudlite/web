import { PageOpts } from 'nextra';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface IConfig {
  siteTitle?: string;
  logo?: ReactNode;
  footer?:
    | {
        brand?: ReactNode;
        menu: {
          title: string;
          className?: string;
          items: { title: string; to: string }[];
        }[];
      }
    | ReactNode;
  scrollToTop?: boolean;
  breadcrum?: boolean;
  toc?: boolean;
  gitRepoUrl?: string;
  feedback?: {
    feedbackLabels: string;
    feedbackTitle?: string;
    linkTitle: string;
  };
  readonly pageOpts?: PageOpts;
  headerPrimary?: {
    items: {
      title: string;
      to: string;
    }[];
    extra?: ReactNode;
  };
  headerSecondary?: {
    items: {
      title: string;
      to: string;
    }[];
    extra?: ReactNode;
  };
}

const ConfigContext = createContext<{
  config: IConfig;
  setConfig: Dispatch<SetStateAction<IConfig>>;
}>({ config: {}, setConfig() {} });

export const ConfigProvider = ({
  children,
  pageOpts,
  config: c,
}: {
  children: ReactNode;
  pageOpts: PageOpts;
  config: IConfig;
}) => {
  const [config, setConfig] = useState<IConfig>({ ...c, pageOpts });
  return (
    <ConfigContext.Provider
      value={useMemo(() => ({ config, setConfig }), [config, setConfig])}
    >
      {children}
    </ConfigContext.Provider>
  );
};

const useConfig = () => {
  return useContext(ConfigContext);
};

export default useConfig;
