import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';
import { NN } from '~/root/lib/types/common';
import {
  ConsoleCreateSecretVariableMutation,
  ConsoleCreateSecretVariableMutationVariables,
  ConsoleDeleteSecretVariableMutation,
  ConsoleDeleteSecretVariableMutationVariables,
  ConsoleGetSecretVariableQuery,
  ConsoleGetSecretVariableQueryVariables,
  ConsoleListSecretVariablesQuery,
  ConsoleListSecretVariablesQueryVariables,
  ConsoleUpdateSecretVariableMutation,
  ConsoleUpdateSecretVariableMutationVariables,
} from '~/root/src/generated/gql/server';

export type ISecretVariable = NN<
  ConsoleGetSecretVariableQuery['core_getSecretVariable']
>;
export type ISecretVariables = NN<
  ConsoleListSecretVariablesQuery['core_listSecretVariables']
>;

export const secretVariableQueries = (executor: IExecutor) => ({
  listSecretVariables: executor(
    gql`
      query Core_listSecretVariables(
        $pq: CursorPaginationIn
        $search: SearchSecretVariables
      ) {
        core_listSecretVariables(pq: $pq, search: $search) {
          totalCount
          edges {
            node {
              id
              accountName
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
              name
              recordVersion
              stringData
              updateTime
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPrevPage
            startCursor
          }
        }
      }
    `,
    {
      transformer: (data: ConsoleListSecretVariablesQuery) =>
        data.core_listSecretVariables,
      vars(_: ConsoleListSecretVariablesQueryVariables) {},
    }
  ),
  createSecretVariable: executor(
    gql`
      mutation Core_createSecretVariable($secretVariable: SecretVariableIn!) {
        core_createSecretVariable(secretVariable: $secretVariable) {
          id
        }
      }
    `,
    {
      transformer: (data: ConsoleCreateSecretVariableMutation) =>
        data.core_createSecretVariable,
      vars(_: ConsoleCreateSecretVariableMutationVariables) {},
    }
  ),

  getSecretVariable: executor(
    gql`
      query Core_getSecretVariable($name: String!) {
        core_getSecretVariable(name: $name) {
          accountName
          createdBy {
            userEmail
            userId
            userName
          }
          creationTime
          displayName
          id
          lastUpdatedBy {
            userEmail
            userId
            userName
          }
          markedForDeletion
          name
          recordVersion
          stringData
          updateTime
        }
      }
    `,
    {
      transformer: (data: ConsoleGetSecretVariableQuery) =>
        data.core_getSecretVariable,
      vars(_: ConsoleGetSecretVariableQueryVariables) {},
    }
  ),
  updateSecretVariable: executor(
    gql`
      mutation Core_updateSecretVariable($secretVariable: SecretVariableIn!) {
        core_updateSecretVariable(secretVariable: $secretVariable) {
          id
        }
      }
    `,
    {
      transformer: (data: ConsoleUpdateSecretVariableMutation) => data,
      vars(_: ConsoleUpdateSecretVariableMutationVariables) {},
    }
  ),
  deleteSecretVariable: executor(
    gql`
      mutation Core_deleteSecretVariable($name: String!) {
        core_deleteSecretVariable(name: $name)
      }
    `,
    {
      transformer: (data: ConsoleDeleteSecretVariableMutation) => data,
      vars(_: ConsoleDeleteSecretVariableMutationVariables) {},
    }
  ),
});
