import { ReactNode } from 'react';

const ListTrack = ({ items }: { items: { title: ReactNode }[] }) => {
  return (
    <div className="flex flex-col gap-2xl relative">
      <div className="w-sm bg-border-dark absolute -top-md -bottom-md left-[8px]" />
      {items.map((i, index) => {
        const k = index;
        return (
          <div key={k} className="flex flex-row items-center gap-2xl">
            <span className="w-[18px] h-[18px] bg-icon-primary rotate-45" />
            <span>{i.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ListTrack;
