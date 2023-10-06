import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';
import { NN } from '~/root/lib/types/common';
import {
  ConsoleGetLoginsQuery,
  ConsoleGetLoginsQueryVariables,
  ConsoleListGithubInstalltionsQuery,
  ConsoleListGithubInstalltionsQueryVariables,
  ConsoleListGithubReposQuery,
  ConsoleListGithubReposQueryVariables,
  ConsoleLoginUrlsQuery,
  ConsoleLoginUrlsQueryVariables,
} from '~/root/src/generated/gql/server';

export type IGithubRepos = NN<
  ConsoleListGithubReposQuery['cr_listGithubRepos']
>;
export type IGithubInstallations = NN<
  ConsoleListGithubInstalltionsQuery['cr_listGithubInstallations']
>;
// export type IProject = NN<Console['core_getProject']>;

export const gitQueries = (executor: IExecutor) => ({
  getLogins: executor(
    gql`
      query Auth_me {
        auth_me {
          providerGithub
          providerGitlab
        }
      }
    `,
    {
      transformer(data: ConsoleGetLoginsQuery) {
        return data.auth_me;
      },
      vars(_: ConsoleGetLoginsQueryVariables) {},
    }
  ),

  loginUrls: executor(
    gql`
      query Query {
        githubLoginUrl: oAuth_requestLogin(
          provider: "github"
          state: "redirect:add-provider"
        )
        gitlabLoginUrl: oAuth_requestLogin(
          provider: "gitlab"
          state: "redirect:add-provider"
        )
      }
    `,
    {
      transformer: (data: ConsoleLoginUrlsQuery) => data,
      vars(_: ConsoleLoginUrlsQueryVariables) {},
    }
  ),

  listGithubRepos: executor(
    gql`
      query Cr_listGithubRepos(
        $installationId: Int!
        $pagination: PaginationIn
      ) {
        cr_listGithubRepos(
          installationId: $installationId
          pagination: $pagination
        ) {
          repositories {
            archived
            cloneUrl
            createdAt
            defaultBranch
            description
            disabled
            fullName
            gitignoreTemplate
            gitUrl
            htmlUrl
            id
            language
            masterBranch
            mirrorUrl
            name
            node_id
            permissions
            private
            pushedAt
            size
            team_id
            updatedAt
            url
            visibility
          }
          totalCount
        }
      }
    `,
    {
      transformer: (data: ConsoleListGithubReposQuery) =>
        data.cr_listGithubRepos,
      vars(_: ConsoleListGithubReposQueryVariables) {},
    }
  ),
  listGithubInstalltions: executor(
    gql`
      query Cr_listGithubInstallations($pagination: PaginationIn) {
        cr_listGithubInstallations(pagination: $pagination) {
          account {
            avatarUrl
            id
            login
            nodeId
            type
          }
          appId
          id
          nodeId
          repositoriesUrl
          targetId
          targetType
        }
      }
    `,
    {
      transformer: (data: ConsoleListGithubInstalltionsQuery) =>
        data.cr_listGithubInstallations,
      vars(_: ConsoleListGithubInstalltionsQueryVariables) {},
    }
  ),
});