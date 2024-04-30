import { ReactNode, useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';
import CommonTools, { IModeProps } from '~/console/components/common-tools';

const Tools = ({ extra }: IModeProps & { extra?: ReactNode }) => {
  const [searchParams] = useSearchParams();

  const options = useMemo(
    () => [
      {
        name: 'Status',
        type: 'text',
        search: false,
        dataFetcher: async () => {
          return [
            { content: 'Active', value: 'active' },
            { content: 'Freezed', value: 'freezed' },
            { content: 'Archived', value: 'archived' },
          ];
        },
      },
    ],
    [searchParams]
  );

  return <CommonTools {...{ options, extra }} />;
};

export default Tools;
