import { useParams, useSearchParams } from '@remix-run/react';
import { ReactNode, useMemo } from 'react';
import CommonTools from '~/console/components/common-tools';
import { FilterType } from '~/console/components/filters';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { parseName, parseNodes } from '~/console/server/r-utils/common';
import { ensureAccountClientSide } from '~/console/server/utils/auth-utils';
import { isValidRegex } from '~/console/server/utils/common';

const Tools = ({ extra }: { extra?: ReactNode }) => {
  const [searchParams] = useSearchParams();

  const params = useParams();

  const api = useConsoleApi();

  const options: FilterType[] = useMemo(
    () => [
      {
        name: 'Cluster',
        type: 'text',
        search: true,
        dataFetcher: async (s) => {
          ensureAccountClientSide(params);
          const { data, errors } = await api.listClusters(
            isValidRegex(s)
              ? {
                  search: {
                    text: {
                      matchType: 'regex',
                      regex: s || '',
                    },
                  },
                }
              : {}
          );

          if (errors) {
            throw errors[0];
          }

          const datas = parseNodes(data);
          return datas.map((item) => {
            return {
              content: item.displayName,
              value: parseName(item),
            };
          });
        },
      },
    ],
    [searchParams]
  );

  return <CommonTools {...{ options }} extra={extra} />;
};

export default Tools;
