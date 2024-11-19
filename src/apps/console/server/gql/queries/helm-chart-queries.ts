import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';
import { NN } from '~/root/lib/types/common';
import {
  ConsoleListHelmChartQuery,
  ConsoleGetHelmChartQueryVariables,
  ConsoleListHelmChartQueryVariables,
  ConsoleGetHelmChartQuery,
  ConsoleCreateHelmChartMutation,
  ConsoleCreateHelmChartMutationVariables,
  ConsoleUpdateHelmChartMutation,
  ConsoleUpdateHelmChartMutationVariables,
  ConsoleDeleteHelmChartMutation,
  ConsoleDeleteHelmChartMutationVariables,
} from '~/root/src/generated/gql/server';

export type IHelmCharts = NN<ConsoleListHelmChartQuery['core_listHelmCharts']>;

export const helmChartQueries = (executor: IExecutor) => ({
  getHelmChart: executor(
    gql`
      query Infra_getHelmRelease($clusterName: String!, $name: String!) {
        infra_getHelmRelease(clusterName: $clusterName, name: $name) {
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
            chartName
            chartRepoURL
            chartVersion
            values
          }
          status {
            checks
            checkList {
              description
              debug
              title
              name
            }
            isReady
            lastReadyGeneration
            lastReconcileTime
            message {
              RawMessage
            }
            releaseNotes
            releaseStatus
            resources {
              apiVersion
              kind
              name
              namespace
            }
          }
          updateTime
        }
      }
    `,
    {
      transformer(data: ConsoleGetHelmChartQuery) {
        return data.infra_getHelmRelease;
      },
      vars(_: ConsoleGetHelmChartQueryVariables) {},
    },
  ),
  listHelmCharts: executor(
    gql`
      query Core_listHelmCharts($envName: String!) {
        core_listHelmCharts(envName: $envName) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
            hasPrevPage
            startCursor
          }
          edges {
            cursor
            node {
              createdBy {
                userEmail
                userId
                userName
              }
              creationTime
              displayName
              environmentName
              markedForDeletion
              recordVersion
              updateTime
              lastUpdatedBy {
                userEmail
                userId
                userName
              }
              metadata {
                name
              }
              spec {
                chartName
                chartRepoURL
                chartVersion
                values
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
                message {
                  RawMessage
                }
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
            }
          }
        }
      }
    `,
    {
      transformer: (data: ConsoleListHelmChartQuery) =>
        data.core_listHelmCharts,
      vars(_: ConsoleListHelmChartQueryVariables) {},
    },
  ),
  createHelmChart: executor(
    gql`
      mutation Core_createHelmChart(
        $envName: String!
        $helmchart: HelmChartIn!
      ) {
        core_createHelmChart(envName: $envName, helmchart: $helmchart) {
          id
        }
      }
    `,
    {
      transformer: (data: ConsoleCreateHelmChartMutation) =>
        data.core_createHelmChart,
      vars(_: ConsoleCreateHelmChartMutationVariables) {},
    },
  ),
  updateHelmChart: executor(
    gql`
      mutation Infra_updateHelmRelease(
        $clusterName: String!
        $release: HelmReleaseIn!
      ) {
        infra_updateHelmRelease(clusterName: $clusterName, release: $release) {
          id
        }
      }
    `,
    {
      transformer(data: ConsoleUpdateHelmChartMutation) {
        return data.infra_updateHelmRelease;
      },
      vars(_: ConsoleUpdateHelmChartMutationVariables) {},
    },
  ),
  deleteHelmChart: executor(
    gql`
      mutation Infra_deleteHelmRelease(
        $clusterName: String!
        $releaseName: String!
      ) {
        infra_deleteHelmRelease(
          clusterName: $clusterName
          releaseName: $releaseName
        )
      }
    `,
    {
      transformer(data: ConsoleDeleteHelmChartMutation) {
        return data.infra_deleteHelmRelease;
      },
      vars(_: ConsoleDeleteHelmChartMutationVariables) {},
    },
  ),
});
