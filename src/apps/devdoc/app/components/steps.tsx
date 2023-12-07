import { ReactNode } from 'react';

interface IStep {
  children?: ReactNode;
}
const Steps = ({ children }: IStep) => {
  return <div className="kl-steps">{children}</div>;
};

export default Steps;
