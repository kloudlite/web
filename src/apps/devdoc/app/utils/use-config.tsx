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

export interface IHeaderSecondary {
  items: {
    title: string;
    to: string;
    type: 'popup' | 'normal';
    render?: () => ReactNode;
  }[];
  extra?: ReactNode;
}

type IProviders = {
  githubLoginUrl: string | null;
  gitlabLoginUrl: string | null;
  googleLoginUrl: string | null;
};

type IUser = {
  name: string;
  email: string;
  id: string;
  verified: boolean;
  approved: boolean;
};

export interface IConfig {
  oathProviders?: IProviders | null;
  user?: IUser | null;
  userApiLoading?: boolean;
  siteTitle?: string;
  logo?: ReactNode;
  footer?:
    | {
        brand?: ReactNode;
        extra?: ReactNode;
        menu: {
          title: string;
          className?: string;
          items: { title: string; to: string }[];
          showExtra?: boolean;
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
  headerSecondary?: IHeaderSecondary;
  urls?: {
    auth?: string;
    console?: string;
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
  pageOpts?: PageOpts;
  config: IConfig;
}) => {
  const [config, setConfig] = useState<IConfig>(
    pageOpts
      ? { ...c, pageOpts, userApiLoading: true }
      : { ...c, userApiLoading: true }
  );
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
