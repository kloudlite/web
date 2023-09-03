import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { ChildrenProps } from './types';

interface IHeaderLink extends ChildrenProps {
  to?: string;
}

const HeaderLink = (props: IHeaderLink) => {
  const { to = '', children } = props;
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={classnames(
        'flex transition-all hover:text-text-default font-medium headingSm items-center',
        {
          'text-text-default': isActive,
          'text-text-soft': !isActive,
        },
        'px-1'
      )}
    >
      {children}
    </Link>
  );
};

export const NavBar = () => {
  return (
    <div className="flex flex-row justify-between p-4">
      <Link className="p-1" to="/">
        Kloudlite Draft
      </Link>
      <div className="flex gap-x-8">
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/features">Features</HeaderLink>
        <HeaderLink to="/pricing">Pricing</HeaderLink>
        <HeaderLink to="/resources">Resources</HeaderLink>
        {/* <HeaderLink to={"/"}>Blog</HeaderLink> */}
        {/* <HeaderLink to={"/"}>Support</HeaderLink> */}
        <HeaderLink to="/about">About Us</HeaderLink>
        <HeaderLink to="#">Login / Sign Up</HeaderLink>
      </div>
    </div>
  );
};
