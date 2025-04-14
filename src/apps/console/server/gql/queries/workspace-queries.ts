import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';
import { NN } from '~/root/lib/types/common';
import {
  ConsoleListWorkspacesQuery,
  ConsoleListWorkspacesQueryVariables,
  ConsoleGetWorkmachineQuery,
  ConsoleGetWorkmachineQueryVariables,
  ConsoleCreateWorkmachineMutationVariables,
  ConsoleCreateWorkmachineMutation,
  ConsoleUpdateWorkmachineMutation,
  ConsoleUpdateWorkmachineMutationVariables,
  ConsoleUpdateWorkmachineStatusMutation,
  ConsoleUpdateWorkmachineStatusMutationVariables,
  ConsoleCreateWorkspaceMutation,
  ConsoleCreateWorkspaceMutationVariables,
  ConsoleUpdateWorkspaceMutation,
  ConsoleDeleteWorkspaceMutationVariables,
  ConsoleUpdateWorkspaceMutationVariables,
  ConsoleDeleteWorkspaceMutation,
} from '~/root/src/generated/gql/server';

export type IWorkspaces = NN<
  ConsoleListWorkspacesQuery['infra_listWorkspaces']
>;

export type IWM = NN<ConsoleGetWorkmachineQuery['infra_getWorkmachine']>;

export const workspaceQueries = (executor: IExecutor) => ({
  listWorkspaces: executor(
    gql`
      query Infra_listWorkspaces(
        $workmachineName: String!
        $clusterName: String!
        $search: SearchWorkspaces
        $pagination: CursorPaginationIn
      ) {
        infra_listWorkspaces(
          workmachineName: $workmachineName
          clusterName: $clusterName
          search: $search
          pagination: $pagination
        ) {
          edges {
            cursor
            node {
              createdBy {
                userEmail
                userId
                userName
              }
              clusterName
              creationTime
              displayName
              lastUpdatedBy {
                userEmail
                userId
                userName
              }
              markedForDeletion
              metadata {
                annotations
                name
                namespace
              }
              spec {
                enableCodeServer
                enableJupyterNotebook
                enableTTYD
                enableVSCodeServer
                imagePullPolicy
                nodeName
                router {
                  backendProtocol
                  basicAuth {
                    enabled
                    secretName
                    username
                  }
                  cors {
                    allowCredentials
                    enabled
                    origins
                  }
                  domains
                  https {
                    clusterIssuer
                    enabled
                    forceRedirect
                  }
                  ingressClass
                  maxBodySizeInMB
                  rateLimit {
                    connections
                    enabled
                    rpm
                    rps
                  }
                  routes {
                    app
                    path
                    port
                    rewrite
                  }
                }
                serviceAccountName
                state
              }
              updateTime
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
      transformer: (data: ConsoleListWorkspacesQuery) =>
        data.infra_listWorkspaces,
      vars(_: ConsoleListWorkspacesQueryVariables) {},
    },
  ),
  createWorkspace: executor(
    gql`
      mutation Infra_createWorkspace(
        $workmachineName: String!
        $clusterName: String!
        $workspace: WorkspaceIn!
      ) {
        infra_createWorkspace(
          workmachineName: $workmachineName
          clusterName: $clusterName
          workspace: $workspace
        ) {
          id
        }
      }
    `,
    {
      transformer: (data: ConsoleCreateWorkspaceMutation) =>
        data.infra_createWorkspace,
      vars(_: ConsoleCreateWorkspaceMutationVariables) {},
    },
  ),
  updateWorkspace: executor(
    gql`
      mutation Infra_updateWorkspace(
        $workmachineName: String!
        $clusterName: String!
        $workspace: WorkspaceIn!
      ) {
        infra_updateWorkspace(
          workmachineName: $workmachineName
          clusterName: $clusterName
          workspace: $workspace
        ) {
          id
        }
      }
    `,
    {
      transformer: (data: ConsoleUpdateWorkspaceMutation) =>
        data.infra_updateWorkspace,
      vars(_: ConsoleUpdateWorkspaceMutationVariables) {},
    },
  ),
  deleteWorkspace: executor(
    gql`
      mutation Infra_deleteWorkspace(
        $workmachineName: String!
        $clusterName: String!
        $name: String!
      ) {
        infra_deleteWorkspace(
          workmachineName: $workmachineName
          clusterName: $clusterName
          name: $name
        )
      }
    `,
    {
      transformer: (data: ConsoleDeleteWorkspaceMutation) =>
        data.infra_deleteWorkspace,
      vars(_: ConsoleDeleteWorkspaceMutationVariables) {},
    },
  ),
  getWorkmachine: executor(
    gql`
      query Infra_getWorkmachine($clusterName: String!, $name: String!) {
        infra_getWorkmachine(clusterName: $clusterName, name: $name) {
          id
          metadata {
            name
          }
          clusterName
          spec {
            aws {
              ami
              availabilityZone
              externalVolumeSize
              externalVolumeType
              rootVolumeType
              iamInstanceProfileRole
              instanceType
              region
              rootVolumeSize
            }
            sshPublicKeys
            state
          }
        }
      }
    `,
    {
      transformer: (data: ConsoleGetWorkmachineQuery) =>{
        return data.infra_getWorkmachine
      },
      vars(_: ConsoleGetWorkmachineQueryVariables) {},
    },
  ),
  createWorkmachine: executor(
    gql`
      mutation Infra_createWorkMachine(
        $clusterName: String!
        $workmachine: WorkmachineIn!
      ) {
        infra_createWorkMachine(
          clusterName: $clusterName
          workmachine: $workmachine
        ) {
          id
        }
      }
    `,
    {
      transformer: (data: ConsoleCreateWorkmachineMutation) =>
        data.infra_createWorkMachine,
      vars(_: ConsoleCreateWorkmachineMutationVariables) {},
    },
  ),
  updateWorkmachine: executor(
    gql`
      mutation Infra_updateWorkMachine(
        $clusterName: String!
        $workmachine: WorkmachineIn!
      ) {
        infra_updateWorkMachine(
          clusterName: $clusterName
          workmachine: $workmachine
        ) {
          id
        }
      }
    `,
    {
      transformer: (data: ConsoleUpdateWorkmachineMutation) =>
        data.infra_updateWorkMachine,
      vars(_: ConsoleUpdateWorkmachineMutationVariables) {},
    },
  ),
  updateWorkmachineStatus: executor(
    gql`
      mutation Infra_updateWorkMachineStatus(
        $clusterName: String!
        $status: Boolean!
        $name: String!
      ) {
        infra_updateWorkMachineStatus(
          clusterName: $clusterName
          status: $status
          name: $name
        )
      }
    `,
    {
      transformer: (data: ConsoleUpdateWorkmachineStatusMutation) =>
        data.infra_updateWorkMachineStatus,
      vars(_: ConsoleUpdateWorkmachineStatusMutationVariables) {},
    },
  ),
});
