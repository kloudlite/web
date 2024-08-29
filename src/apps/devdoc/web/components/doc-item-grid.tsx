import Link from 'next/link';
import { cn } from '../utils/commons';

type IDocItem = {
  icon: any;
  title: string;
  desc?: string;
  to: string;
};

type IDocItemGrid = {
  items: IDocItem[];
  className?: string;
};

const DocItem = ({ icon: Icon, title, desc, to }: IDocItem) => {
  return (
    <Link href={to || '#'}>
      <div className="wb-cursor-pointer wb-rounded wb-border wb-border-border-default wb-p-3xl wb-flex wb-gap-xl wb-flex-col wb-headingMd wb-text-text-default hover:wb-text-text-primary wb-bg-surface-basic-subdued hover:wb-bg-surface-basic-hovered">
        <div className="wb-flex wb-flex-row wb-items-center wb-gap-xl">
          {Icon && <Icon size={20} />}
          <span>{title}</span>
        </div>
        {desc && <p className="wb-text-text-default wb-bodyMd">{desc}</p>}
      </div>
    </Link>
  );
};

const DocItemGrid = ({ items = [], className }: IDocItemGrid) => {
  return (
    <div
      className={cn(
        'wb-grid wb-grid-cols-1 md:wb-grid-cols-2 wb-gap-3xl wb-mb-3xl',
        className,
      )}
    >
      {items.map((item) => {
        return (
          <DocItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            desc={item.desc}
            to={item.to}
          />
        );
      })}
    </div>
  );
};

export default DocItemGrid;
