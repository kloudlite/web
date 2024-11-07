import { useOutletContext, useParams } from '@remix-run/react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSocketWatch } from '~/root/lib/client/helpers/socket/useWatch';
import useDebounce from '~/root/lib/client/hooks/use-debounce';
import { ChildrenProps } from '@kloudlite/design-system/types';
import { usePulsableLoading } from '~/root/lib/client/components/pulsable';
import logger from '~/root/lib/client/helpers/log';
import { IAccountContext } from '../routes/_main+/$account+/_layout';
import { useConsoleApi } from '../server/gql/api-provider';
import { clustersStatusMap } from '../server/gql/queries/cluster-queries';

// export const findClusterStatusv3 = findClusterStatus;

const ctx = createContext<{
  addToWatchList: (clusterNames: string[]) => void;
  removeFromWatchList: (clusterNames: string[]) => void;
}>({
  // clusters: {},
  // setClusters: () => {},
  addToWatchList: () => {},
  removeFromWatchList: () => {},
});

const ClusterStatusProvider = ({
  children,
  clustersMap,
  setClustersMap,
}: ChildrenProps & {
  clustersMap: clustersStatusMap;
  setClustersMap: React.Dispatch<React.SetStateAction<clustersStatusMap>>;
}) => {
  const [watchList, setWatchList] = useState<{
    [key: string]: number;
  }>({});

  const addToWatchList = (clusterNames: string[]) => {
    setWatchList((s) => {
      const resp = clusterNames.reduce((acc, curr) => {
        if (!curr) {
          return acc;
        }
        if (acc[curr]) {
          acc[curr] += acc[curr];
        } else {
          acc[curr] = 1;
        }

        return acc;
      }, s);

      return resp;
    });
  };

  const api = useConsoleApi();

  const caller = (wl: { [key: string]: number }) => {
    const keys = Object.keys(wl);

    if (!keys.length) {
      return;
    }

    (async () => {
      try {
        const { data: clustersStatus } = await api.listClusterStatus({
          pagination: {
            first: 100,
          },
          search: {
            allClusters: {
              exact: true,
              matchType: 'exact',
            },
            text: {
              array: keys,
              matchType: 'array',
            },
          },
        });

        setClustersMap((s) => {
          return {
            ...s,
            ...clustersStatus,
          };
        });
      } catch (e) {
        console.log('error', e);
      }
    })();
  };

  useEffect(() => {
    const t = setInterval(() => {
      caller(watchList);
    }, 30 * 1000);

    return () => {
      clearInterval(t);
    };
  }, [watchList]);

  const { account } = useParams();

  const topic = useCallback(() => {
    return Object.keys(clustersMap).map(
      (c) => `account:${account}.cluster:${c}`
    );
  }, [clustersMap])();

  useSocketWatch(() => {
    caller(watchList);
  }, topic);

  const removeFromWatchList = (clusterNames: string[]) => {
    setWatchList((s) => {
      const resp = clusterNames.reduce((acc, curr) => {
        if (!curr) {
          return acc;
        }

        if (acc[curr] && acc[curr] >= 1) {
          acc[curr] -= acc[curr];
        }

        if (acc[curr] === 0) {
          delete acc[curr];
        }

        return acc;
      }, s);

      return resp;
    });
  };
  return (
    <ctx.Provider
      value={useMemo(
        () => ({
          addToWatchList,
          removeFromWatchList,
        }),
        []
      )}
    >
      {children}
    </ctx.Provider>
  );
};

export default ClusterStatusProvider;

export const useClusterStatusV3 = ({
  clusterName,
  clusterNames,
}: {
  clusterName?: string;
  clusterNames?: string[];
}) => {
  const cCtx = useOutletContext<IAccountContext>();

  logger.trace('useClusterStatusV3', cCtx);
  const { clustersMap } = cCtx || {};

  const { addToWatchList, removeFromWatchList: _ } = useContext(ctx);
  const isLoading = usePulsableLoading();

  useDebounce(
    () => {
      if (isLoading) {
        return () => {};
      }

      if (!clusterName && !clusterNames) {
        return () => {};
      }

      if (clusterName) {
        addToWatchList([clusterName]);
      } else if (clusterNames) {
        addToWatchList(clusterNames);
      }

      return () => {
        // if (clusterName) {
        //   removeFromWatchList([clusterName]);
        // } else if (clusterNames) {
        //   removeFromWatchList(clusterNames);
        // }
      };
    },
    100,
    [clusterName, clusterNames]
  );

  return {
    clustersMap,
  };
};
