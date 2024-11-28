import { useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';
import CommonTools, { IModeProps } from '~/console/components/common-tools';

const Tools = ({ viewMode, setViewMode }: IModeProps) => {
  const [searchParams] = useSearchParams();

  const options = useMemo(() => [], [searchParams]);

  return <CommonTools {...{ viewMode, setViewMode, options }} />;
};

export default Tools;
