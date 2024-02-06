import { ReactNode } from 'react';
import { Graph } from '@jengaicons/react';

const GraphCommon = ({ children }: { children?: ReactNode }) => {
  return (
    <Graph className="-mx-11xl 3xl:!-mx-12xl pt-7xl md:!pt-8xl lg:!pt-10xl">
      <div className="px-11xl 3xl:!px-12xl">{children}</div>
    </Graph>
  );
};

export default GraphCommon;
