import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';
import { NN } from '~/root/lib/types/common';
import {
  ConsoleCreateHelmChartMutation,
  ConsoleCreateHelmChartMutationVariables,
  ConsoleDeleteHelmChartMutation,
  ConsoleDeleteHelmChartMutationVariables,
  ConsoleGetHelmChartQuery,
  ConsoleGetHelmChartQueryVariables,
  ConsoleListHelmChartsQuery,
  ConsoleListHelmChartsQueryVariables,
  ConsoleUpdateHelmChartMutation,
  ConsoleUpdateHelmChartMutationVariables,
} from '~/root/src/generated/gql/server';

export type IHelmCharts = NN<ConsoleListHelmChartsQuery['core_listHelmCharts']>;
export type IHelmChart = NN<ConsoleGetHelmChartQuery['core_getHelmChart']>;

export const helmChartQueries = (executor: IExecutor) => ({
  getHelmChart: executor(
    gql`
      query Core_getHelmChart($envName: String!, $name: String!) {
        core_getHelmChart(envName: $envName, name: $name) {
          createdBy {
            userEmail
            userId
            userName
          }
          creationTime
          displayName
          environmentName
          lastUpdatedBy {
            userEmail
            userId
            userName
          }
          markedForDeletion
          metadata {
            annotations
            creationTimestamp
            deletionTimestamp
            generation
            labels
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
            releaseNotes
            releaseStatus
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
        }
      }
    `,
    {
      transformer(data: ConsoleGetHelmChartQuery) {
        return data.core_getHelmChart;
      },
      vars(_: ConsoleGetHelmChartQueryVariables) {},
    }
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
                annotations
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
      transformer: (data: ConsoleListHelmChartsQuery) =>
        data.core_listHelmCharts,
      vars(_: ConsoleListHelmChartsQueryVariables) {},
    }
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
    }
  ),
  updateHelmChart: executor(
    gql`
      mutation Core_updateHelmChart(
        $envName: String!
        $helmchart: HelmChartIn!
      ) {
        core_updateHelmChart(envName: $envName, helmchart: $helmchart) {
          id
        }
      }
    `,
    {
      transformer(data: ConsoleUpdateHelmChartMutation) {
        return data.core_updateHelmChart;
      },
      vars(_: ConsoleUpdateHelmChartMutationVariables) {},
    }
  ),
  deleteHelmChart: executor(
    gql`
      mutation Core_deleteHelmChart(
        $envName: String!
        $helmChartName: String!
      ) {
        core_deleteHelmChart(envName: $envName, helmChartName: $helmChartName)
      }
    `,
    {
      transformer(data: ConsoleDeleteHelmChartMutation) {
        return data.core_deleteHelmChart;
      },
      vars(_: ConsoleDeleteHelmChartMutationVariables) {},
    }
  ),
});
