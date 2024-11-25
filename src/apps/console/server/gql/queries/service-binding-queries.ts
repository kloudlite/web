import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';
import { NN } from '~/root/lib/types/common';
import {
  ConsoleListServiceBindingQuery,
  ConsoleListServiceBindingQueryVariables,
} from '~/root/src/generated/gql/server';

export type IServiceBinding = NN<
  ConsoleListServiceBindingQuery['core_listServiceBindings']
>;

export const serviceBindingQueries = (executor: IExecutor) => ({
  listServiceBinding: executor(
    gql`
      query Core_listServiceBindings(
        $envName: String!
        $pagination: CursorPaginationIn
      ) {
        core_listServiceBindings(envName: $envName, pagination: $pagination) {
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
              environmentName
              creationTime
              interceptStatus {
                intercepted
                portMappings {
                  containerPort
                  servicePort
                }
              }
              kind
              markedForDeletion
              metadata {
                name
              }
              recordVersion
              spec {
                globalIP
                hostname
                ports {
                  appProtocol
                  name
                  nodePort
                  port
                  protocol
                  targetPort {
                    IntVal
                    StrVal
                    Type
                  }
                }
                serviceIP
                serviceRef {
                  name
                  namespace
                }
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
              updateTime
            }
          }
        }
      }
    `,
    {
      transformer: (data: ConsoleListServiceBindingQuery) =>
        data.core_listServiceBindings,
      vars(_: ConsoleListServiceBindingQueryVariables) {},
    },
  ),
});
