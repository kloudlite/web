import { ReactNode } from 'react';

export const Headings = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={
        'wb-bodyMd-medium wb-text-text-default dark:wb-text-text-darktheme-default ' +
        className
      }
    >
      {children}
    </h2>
  );
};

export const SubList = ({ children }: { children?: ReactNode }) => {
  return (
    //@ts-ignore
    <ul className="wb-list-[circle] wb-pl-[16px]">{children.props.children}</ul>
  );
};

export const ListRoman = ({ children }: { children?: ReactNode }) => {
  return (
    <ol
      type="a"
      className="wb-list-[lower-alpha] wb-pl-[18px] wb-flex wb-flex-col wb-gap-md marker:!wb-font-normal"
    >
      {/*@ts-ignore*/}
      {children.props.children}
    </ol>
  );
};

export const ListDecimalBold = ({ children }: { children?: ReactNode }) => {
  return (
    <ol
      type="1"
      className="wb-list-[decimal] wb-pl-[18px] wb-flex wb-flex-col wb-gap-md marker:wb-font-bold"
    >
      {/*@ts-ignore*/}
      {children.props.children}
    </ol>
  );
};
