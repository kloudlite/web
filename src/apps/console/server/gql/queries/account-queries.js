import gql from 'graphql-tag';
import { ExecuteQueryWithContext } from '~/root/lib/server/helpers/execute-query-with-context';

export const accountQueries = (executor = ExecuteQueryWithContext({})) => ({
  createAccount: executor(
    gql`
      mutation Accounts_createAccount($account: AccountIn!) {
        accounts_createAccount(account: $account) {
          displayName
        }
      }
    `,
    {
      dataPath: 'accounts_createAccount',
    }
  ),

  listAccounts: executor(
    gql`
      query Accounts_listAccounts {
        accounts_listAccounts {
          id
          metadata {
            name
            annotations
          }
          updateTime
          displayName
        }
      }
    `,
    {
      dataPath: 'accounts_listAccounts',
    }
  ),

  getAccount: executor(
    gql`
      query Accounts_getAccount($accountName: String!) {
        accounts_getAccount(accountName: $accountName) {
          metadata {
            name
            annotations
          }
          updateTime
          contactEmail
          displayName
        }
      }
    `,
    {
      dataPath: 'accounts_getAccount',
    }
  ),

  inviteUser: executor(gql`
    mutation Finance_inviteUser(
      $accountName: String!
      $email: String!
      $role: String!
    ) {
      finance_inviteUser(accountName: $accountName, email: $email, role: $role)
    }
  `),

  listUsers: executor(gql`
    query Finance_listInvitations($accountName: String!) {
      finance_listInvitations(accountName: $accountName) {
        accepted
        user {
          id
          name
          verified
          email
          avatar
        }
        role
      }
    }
  `),
});
