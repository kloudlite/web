import { ReactNode } from 'react';

interface ILabel {
  children?: ReactNode;
  label: ReactNode;
}
const Label = ({ children, label }: ILabel) => {
  return (
    <div className="flex flex-col gap-md">
      <span>{label}</span>
      {children}
    </div>
  );
};

export default Label;
