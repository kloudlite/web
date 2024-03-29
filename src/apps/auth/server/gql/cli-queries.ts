/* eslint-disable camelcase */
import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';
import { vpnQueries } from './queries/device-queries';

export const cliQueries = (executor: IExecutor) => ({
  ...vpnQueries(executor),

  cli_coreCheckNameAvailability: executor(
    gql`
      query Core_checkNameAvailability(
        $resType: ConsoleResType!
        $name: String!
      ) {
        core_checkNameAvailability(resType: $resType, name: $name) {
          result
          suggestedNames
        }
      }
    `,
    {
      transformer: (data: any) => data.core_checkNameAvailability,
      vars: (_: any) => {},
    }
  ),

  cli_getMresKeys: executor(
    gql`
      query Core_getManagedResouceOutputKeyValues(
        $projectName: String!
        $envName: String!
        $name: String!
      ) {
        core_getManagedResouceOutputKeys(
          projectName: $projectName
          envName: $envName
          name: $name
        )
      }
    `,
    {
      transformer: (data: any) => data.core_getManagedResouceOutputKeys,
      vars: (_: any) => {},
    }
  ),

  cli_listMreses: executor(
    gql`
      query Core_listManagedResources(
        $projectName: String!
        $envName: String!
        $pq: CursorPaginationIn
      ) {
        core_listManagedResources(
          projectName: $projectName
          envName: $envName
          pq: $pq
        ) {
          edges {
            node {
              displayName
              metadata {
                name
                namespace
              }
            }
          }
        }
      }
    `,
    {
      transformer: (data: any) => data.core_listManagedResources,
      vars: (_: any) => {},
    }
  ),

  cli_getMresConfigsValues: executor(
    gql`
      query Core_getManagedResouceOutputKeyValues(
        $keyrefs: [ManagedResourceKeyRefIn]
        $envName: String!
        $projectName: String!
      ) {
        core_getManagedResouceOutputKeyValues(
          keyrefs: $keyrefs
          envName: $envName
          projectName: $projectName
        ) {
          key
          mresName
          value
        }
      }
    `,
    {
      transformer: (data: any) => data,
      vars: (_: any) => {},
    }
  ),

  cli_infraCheckNameAvailability: executor(
    gql`
      query Infra_checkNameAvailability(
        $resType: ResType!
        $name: String!
        $clusterName: String
      ) {
        infra_checkNameAvailability(
          resType: $resType
          name: $name
          clusterName: $clusterName
        ) {
          result
          suggestedNames
        }
      }
    `,
    {
      transformer: (data: any) => data.infra_checkNameAvailability,
      vars: (_: any) => {},
    }
  ),

  cli_getConfigSecretMap: executor(
    gql`
      query Core_getConfigValues(
        $projectName: String!
        $envName: String!
        $configQueries: [ConfigKeyRefIn]
        $secretQueries: [SecretKeyRefIn!]
        $mresQueries: [ManagedResourceKeyRefIn]
      ) {
        configs: core_getConfigValues(
          projectName: $projectName
          envName: $envName
          queries: $configQueries
        ) {
          configName
          key
          value
        }
        secrets: core_getSecretValues(
          projectName: $projectName
          envName: $envName
          queries: $secretQueries
        ) {
          key
          secretName
          value
        }
        mreses: core_getManagedResouceOutputKeyValues(
          keyrefs: $mresQueries
          envName: $envName
          projectName: $projectName
        ) {
          key
          mresName
          value
        }
      }
    `,
    {
      transformer: (data: any) => {
        return {
          configs: data.configs,
          secrets: data.secrets,
          mreses: data.mreses,
        };
      },
      vars: (_: any) => {},
    }
  ),
  cli_interceptApp: executor(
    gql`
      mutation Core_interceptApp(
        $projectName: String!
        $envName: String!
        $appname: String!
        $deviceName: String!
        $intercept: Boolean!
      ) {
        core_interceptApp(
          projectName: $projectName
          envName: $envName
          appname: $appname
          deviceName: $deviceName
          intercept: $intercept
        )
      }
    `,
    {
      transformer: (data: any) => data.core_interceptApp,
      vars: (_: any) => {},
    }
  ),
  cli_getEnvironment: executor(
    gql`
      query Core_getEnvironment($projectName: String!, $name: String!) {
        core_getEnvironment(projectName: $projectName, name: $name) {
          spec {
            targetNamespace
          }
        }
      }
    `,
    {
      transformer: (data: any) => data.core_getEnvironment,
      vars: (_: any) => {},
    }
  ),
  cli_getSecret: executor(
    gql`
      query Core_getSecret(
        $projectName: String!
        $envName: String!
        $name: String!
      ) {
        core_getSecret(
          projectName: $projectName
          envName: $envName
          name: $name
        ) {
          displayName
          metadata {
            name
            namespace
          }
          stringData
        }
      }
    `,
    {
      transformer: (data: any) => data.core_getSecret,
      vars: (_: any) => {},
    }
  ),
  cli_getConfig: executor(
    gql`
      query Core_getConfig(
        $projectName: String!
        $envName: String!
        $name: String!
      ) {
        core_getConfig(
          projectName: $projectName
          envName: $envName
          name: $name
        ) {
          data
          displayName
          metadata {
            name
            namespace
          }
        }
      }
    `,
    {
      transformer: (data: any) => data.core_getConfig,
      vars: (_: any) => {},
    }
  ),

  cli_listApps: executor(
    gql`
      query Core_listApps($projectName: String!, $envName: String!) {
        core_listApps(projectName: $projectName, envName: $envName) {
          edges {
            cursor
            node {
              displayName
              environmentName
              markedForDeletion
              metadata {
                annotations
                name
                namespace
              }
              projectName
              spec {
                displayName
                containers {
                  args
                  command
                  env {
                    key
                    optional
                    refKey
                    refName
                    type
                    value
                  }
                  envFrom {
                    refName
                    type
                  }
                  image
                  name
                }
                intercept {
                  enabled
                  toDevice
                }
                nodeSelector
                replicas
                serviceAccount
                services {
                  name
                  port
                  targetPort
                  type
                }
              }
              status {
                checks
                isReady
                message {
                  RawMessage
                }
              }
            }
          }
        }
      }
    `,
    {
      transformer: (data: any) => data.core_listApps,
      vars: (_: any) => {},
    }
  ),
  cli_listConfigs: executor(
    gql`
      query Core_listConfigs($projectName: String!, $envName: String!) {
        core_listConfigs(projectName: $projectName, envName: $envName) {
          totalCount
          edges {
            node {
              data
              displayName
              metadata {
                name
                namespace
              }
            }
          }
        }
      }
    `,
    {
      transformer: (data: any) => data.core_listConfigs,
      vars: (_: any) => {},
    }
  ),
  cli_listSecrets: executor(
    gql`
      query Core_listSecrets(
        $projectName: String!
        $envName: String!
        $pq: CursorPaginationIn
      ) {
        core_listSecrets(
          projectName: $projectName
          envName: $envName
          pq: $pq
        ) {
          edges {
            cursor
            node {
              displayName
              markedForDeletion
              metadata {
                name
                namespace
              }
              stringData
            }
          }
        }
      }
    `,
    {
      transformer: (data: any) => data.core_listSecrets,
      vars: (_: any) => {},
    }
  ),

  cli_listEnvironments: executor(
    gql`
      query Core_listEnvironments(
        $projectName: String!
        $pq: CursorPaginationIn
      ) {
        core_listEnvironments(projectName: $projectName, pq: $pq) {
          edges {
            cursor
            node {
              displayName
              markedForDeletion
              metadata {
                name
                namespace
              }
              spec {
                projectName
                targetNamespace
              }
              status {
                isReady
                message {
                  RawMessage
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          totalCount
        }
      }
    `,
    {
      transformer: (data: any) => data.core_listEnvironments,
      vars: (_: any) => {},
    }
  ),

  cli_listProjects: executor(
    gql`
      query Core_listProjects($pq: CursorPaginationIn) {
        core_listProjects(pq: $pq) {
          edges {
            node {
              displayName
              markedForDeletion
              metadata {
                name
                namespace
              }
              status {
                isReady
                message {
                  RawMessage
                }
              }
            }
          }
        }
      }
    `,
    {
      transformer: (data: any) => data.core_listProjects,
      vars: (_: any) => {},
    }
  ),

  cli_getKubeConfig: executor(
    gql`
      query Infra_getCluster($name: String!) {
        infra_getCluster(name: $name) {
          adminKubeconfig {
            encoding
            value
          }
          status {
            isReady
          }
        }
      }
    `,
    {
      transformer: (data: any) => data.infra_getCluster,
      vars: (_: any) => {},
    }
  ),
  cli_listClusters: executor(
    gql`
      query Node($pagination: CursorPaginationIn) {
        infra_listClusters(pagination: $pagination) {
          edges {
            node {
              displayName
              metadata {
                name
              }
              status {
                isReady
              }
            }
          }
        }
      }
    `,
    {
      transformer: (data: any) => data.infra_listClusters,
      vars: (_: any) => {},
    }
  ),
  cli_listAccounts: executor(
    gql`
      query Accounts_listAccounts {
        accounts_listAccounts {
          metadata {
            name
          }
          displayName
        }
      }
    `,
    {
      transformer: (data: any) => data.accounts_listAccounts,
      vars: (_: any) => {},
    }
  ),
  cli_getCurrentUser: executor(
    gql`
      query Auth_me {
        auth_me {
          id
          email
          name
        }
      }
    `,
    {
      transformer: (data: any) => data.auth_me,
      vars: (_: any) => {},
    }
  ),

  cli_createRemoteLogin: executor(
    gql`
      mutation Auth_createRemoteLogin($secret: String) {
        auth_createRemoteLogin(secret: $secret)
      }
    `,
    {
      transformer: (data: any) => data.auth_createRemoteLogin,
      vars: (_: any) => {},
    }
  ),

  cli_getRemoteLogin: executor(
    gql`
      query Auth_getRemoteLogin($loginId: String!, $secret: String!) {
        auth_getRemoteLogin(loginId: $loginId, secret: $secret) {
          authHeader
          status
        }
      }
    `,
    {
      transformer: (data: any) => data.auth_getRemoteLogin,
      vars: (_: any) => {},
    }
  ),
});
