import { Search } from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import { TextInput } from 'kl-design-system/atoms/input';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import { HeaderLink } from './frequents';

const Header = () => {
  return (
    <div className="flex flex-row sticky top-0 left-0 right-0 p-2 bg-surface-basic-default border-b border-border-default min-h-[76px] z-50">
      <nav className="max-w-[1440px] flex-1 m-auto px-4xl flex flex-row items-center gap-6xl">
        <div className="w-[224px]">
          <BrandLogo detailed size={28} />
        </div>
        <ul className="flex-1 flex flex-row items-center gap-4xl list-none">
          <li className="list-none">
            <HeaderLink to="">DevOps</HeaderLink>
          </li>
          <li className="list-none">
            <HeaderLink to="#hello-world">InfraOps</HeaderLink>
          </li>
          <li className="list-none">
            <HeaderLink to="">Distribution</HeaderLink>
          </li>
        </ul>
        <div className="flex flex-row items-center gap-xl">
          <TextInput prefixIcon={<Search />} placeholder="Search" />
          <Button content="Get started" variant="primary" />
        </div>
      </nav>
    </div>
  );
};

export default Header;
