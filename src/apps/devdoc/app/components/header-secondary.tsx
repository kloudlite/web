import { ReactNode } from 'react';
import { HeaderLink } from './frequents';
import useConfig from '../utils/use-config';

const HeaderSecondary = ({
  items,
  extra,
}: {
  items?: { title: string; to: string }[];
  extra?: ReactNode;
}) => {
  const { config } = useConfig();

  return (
    <div className="flex flex-row sticky top-0 left-0 right-0 p-2 bg-surface-basic-default border-b border-border-default min-h-[76px] z-50">
      <nav className="w-full md:max-w-[1440px] flex-1 m-auto px-4xl flex flex-row items-center gap-6xl">
        {config.logo}
        <ul className="hidden md:flex flex-1 flex-row items-center justify-end gap-4xl list-none">
          {items?.map((ni) => (
            <li key={ni.to} className="list-none">
              <HeaderLink to={ni.to} active={false}>
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
