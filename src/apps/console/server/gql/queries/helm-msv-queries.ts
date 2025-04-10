import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';
import { NN } from '~/root/lib/types/common';
import {
  ConsoleGetClusterMSvQuery,
  ConsoleListHelmMsVsQuery,
  ConsoleUpdateClusterMSvMutationVariables,
  ConsoleListHelmMsVsQueryVariables,
} from '~/root/src/generated/gql/server';

export type IHelmMSv = NN<
  ConsoleGetClusterMSvQuery['infra_getClusterManagedService']
>;
export type IHelmMSvs = NN<
  ConsoleListHelmMsVsQuery['infra_listHelmTypeClusterManagedServices']
>;

export type InHelmMSvs = ConsoleUpdateClusterMSvMutationVariables;

export const helmManagedServicesQueries = (executor: IExecutor) => ({
  listHelmMSVs: executor(
    gql`
      query Infra_listHelmTypeClusterManagedServices(
        $search: SearchClusterManagedService
        $pagination: CursorPaginationIn
      ) {
        infra_listHelmTypeClusterManagedServices(
          search: $search
          pagination: $pagination
        ) {
          edges {
            cursor
            node {
              clusterName
              createdBy {
                userEmail
                userId
                userName
              }
              creationTime
              displayName
              lastUpdatedBy {
                userEmail
                userId
                userName
              }
              markedForDeletion
              metadata {
                name
                namespace
              }
              spec {
                msvcSpec {
                  plugin {
                    apiVersion
                    export {
                      template
                      viaSecret
                    }
                    kind
                    spec
                  }
                  serviceTemplate {
                    apiVersion
                    kind
                    spec
                  }
                }
                targetNamespace
              }
              status {
                checkList {
                  debug
                  description
                  hide
                  name
                  title
                }
                checks
                isReady
                lastReadyGeneration
                lastReconcileTime
                resources {
                  apiVersion
                  kind
                  name
                  namespace
                }
              }
              syncStatus {
                action
                error
                lastSyncedAt
                recordVersion
                state
                syncScheduledAt
              }
              updateTime
              isArchived
              recordVersion
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPrevPage
            startCursor
          }
          totalCount
        }
      }
    `,
    {
      transformer: (data: ConsoleListHelmMsVsQuery) =>
        data.infra_listHelmTypeClusterManagedServices,
      vars(_: ConsoleListHelmMsVsQueryVariables) {},
    },
  ),
});
