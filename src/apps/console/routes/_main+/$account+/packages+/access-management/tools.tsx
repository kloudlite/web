import { ReactNode, useMemo } from 'react';
import CommonTools from '~/console/components/common-tools';

const Tools = ({ extra }: { extra?: ReactNode }) => {
  const options = useMemo(() => [], []);

  return <CommonTools {...{ options }} extra={extra} />;
};

export default Tools;
