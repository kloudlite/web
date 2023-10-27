import { ChevronRight } from '@jengaicons/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PageMapItem } from 'nextra';
import { MouseEventHandler, ReactNode, useState } from 'react';
import { cn } from '../utils/commons';
import { Collapse } from './collapse';

interface CustomMeta {
  type: 'folder' | 'page';
  title: string;
  display?: boolean;
}

interface IMenuItem {
  to: string;
  active?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  block?: boolean;
}
export const MenuItem = ({
  to,
  children,
  onClick,
  active,
  block = false,
}: IMenuItem) => {
  return (
    <Link
      onClick={onClick}
      href={to}
      className={cn(
        'flex flex-row items-center rounded py-lg px-2xl transition-all',
        {
          'bodyMd-medium text-text-primary bg-surface-basic-active': !!active,
          'bodyMd text-text-soft': !active,
          'w-full': block,
        }
      )}
    >
      {children}
    </Link>
  );
};

interface ISidebar {
  data: PageMapItem[];
  parent?: { route: string; title: string; level: number } | null;
}

const Sidebar = ({ data, parent }: ISidebar) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const isActive = (path: string) => router.pathname === path;

  const generateKey = (...items: Array<string | number>) => items.join('-');

  return (
    <li
      className={cn('flex flex-col capitalize', {
        'ml-md': !!parent && parent.level > 0,
      })}
    >
      {parent && (
        <div className="flex flex-row items-center">
          {isActive(`/${parent.route}`) && parent.level > 0 && (
            <motion.div
              layoutId="line"
              className="absolute left-[-1px] flex h-[36px] rounded w-xs bg-surface-primary-default"
            />
          )}
          <MenuItem
            block
            active={isActive(`/${parent.route}`)}
            onClick={(e) => {
              if (isActive(`/${parent.route}`)) {
                e.preventDefault();
                setOpen((prev) => !prev);
              }
            }}
            to={`/${parent.route}`}
          >
            <div className="flex-1 flex flex-row items-center justify-between">
              <span>{parent.title}</span>
              <motion.span
                animate={{
                  rotate: open ? 90 : 0,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen((prev) => !prev);
                }}
              >
                <ChevronRight size={16} />
              </motion.span>
            </div>
          </MenuItem>
        </div>
      )}
      <Collapse isOpen={open} className="pt-md">
        <div
          className={cn('flex flex-row items-center', {
            'pl-3xl': !!parent,
          })}
        >
          {data.map((d, index) => {
            if (d.kind === 'Meta') {
              return (
                <ul
                  key={generateKey(index)}
                  className={cn('flex flex-col w-full relative gap-md', {
                    'border-l border-border-default': !!parent,
                  })}
                >
                  {Object.entries(d.data).map(([key, value]) => {
                    const v = value as CustomMeta;
                    if (v?.type === 'folder') {
                      const child = data.find(
                        (dd) => dd.kind === 'Folder' && dd.name === key
                      );
                      if (child?.kind === 'Folder') {
                        return (
                          <Sidebar
                            key={key}
                            data={child.children}
                            parent={{
                              route: `${
                                parent ? `${parent.route}/` : ''
                              }${key}`,
                              title: key,
                              level: parent ? parent.level + 1 : 0,
                            }}
                          />
                        );
                      }
                      return null;
                    }
                    return v.display === false ? null : (
                      <li
                        className={cn('list-none flex flex-row items-center', {
                          'ml-md': !!parent,
                        })}
                        key={key}
                      >
                        {parent &&
                          isActive(
                            `${parent ? `/${parent?.route}` : ''}${
                              key === 'index' ? '/' : `/${key}`
                            }`
                          ) && (
                            <motion.div
                              layoutId="line"
                              className="absolute left-[-1px] flex h-[36px] rounded w-xs bg-surface-primary-default"
                            />
                          )}
                        <MenuItem
                          block
                          active={isActive(
                            `${parent ? `/${parent?.route}` : ''}${
                              key === 'index' ? '/' : `/${key}`
                            }`
                          )}
                          to={`${parent ? `/${parent?.route}` : ''}${
                            key === 'index' ? '/' : `/${key}`
                          }`}
                        >
                          {v.title}
                        </MenuItem>
                      </li>
                    );
                  })}
                </ul>
              );
            }
            return null;
          })}
        </div>
      </Collapse>
    </li>
  );
};

export default Sidebar;
