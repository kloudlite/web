import { useSearchParams } from '@remix-run/react';
import { ReactNode, useMemo } from 'react';
import CommonTools from '~/console/components/common-tools';

const Tools = ({ extra }: { extra?: ReactNode }) => {
  const [searchParams] = useSearchParams();

  const options = useMemo(() => [], [searchParams]);

  return <CommonTools {...{ options }} extra={extra} />;
};

export default Tools;
