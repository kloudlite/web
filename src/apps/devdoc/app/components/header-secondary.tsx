import { ReactNode } from 'react';
import { PageItem } from 'nextra/normalize-pages';
import { HeaderLink } from './frequents';
import useConfig from '../utils/use-config';

const HeaderSecondary = ({
  items,
  extra,
  activePath,
}: {
  items?: { title: string; to: string }[];
  extra?: ReactNode;
  activePath?: PageItem[];
}) => {
  const { config } = useConfig();

  return (
    <div className="flex flex-row sticky top-0 left-0 right-0 p-2 bg-surface-basic-default border-b border-border-default min-h-[76px] z-50">
      <nav className="w-full md:max-w-[1440px] flex-1 m-auto flex flex-row items-center gap-6xl px-12xl">
        {config.logo}
        <ul className="hidden md:flex flex-1 flex-row items-center justify-end gap-4xl list-none">
          {items?.map((ni) => (
            <li key={ni.to} className="list-none">
              <HeaderLink
                to={ni.to}
                active={!!activePath?.find((ap) => ap.route === ni.to)}
              >
                {ni.title}
              </HeaderLink>
            </li>
          ))}
        </ul>
        {extra}
      </nav>
    </div>
  );
};

export default HeaderSecondary;
