import { useEffect, useState } from 'react';
import useCustomSwr from '~/root/lib/client/hooks/use-custom-swr';
import { useIotConsoleApi } from '../server/gql/api-provider';
import { parseValue } from '../page-components/util';

export type IGIT_PROVIDERS = 'gitlab' | 'github';

const useDebounceText = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

type IGit = {
  retryWithOtherGitProvider?: boolean;
  defaultFetch?: boolean;
  provider?: IGIT_PROVIDERS;
  repo?: string;
  branch?: string;
  onChange?: (value: {
    branch: string;
    repo: string;
    provider: IGIT_PROVIDERS;
  }) => void;
};
const useGit = ({
  retryWithOtherGitProvider,
  defaultFetch,
  onChange,
  provider: initialProvider,
  repo: initialRepo,
  branch: initialBranch,
}: IGit) => {
  const [provider, setProvider] = useState<IGIT_PROVIDERS>(
    initialProvider || 'github'
  );
  const [searchText, setSearchText] = useState('');
  const [repo, setRepo] = useState(initialRepo || '');
  const [org, setOrg] = useState<{
    value: string;
    label: string;
  } | null>();
  const [branch, setBranch] = useState(initialBranch || '');
  const api = useIotConsoleApi();
  const [loading, setLoading] = useState(true);
  const [_revalidate, setRevalidate] = useState(0);

  useEffect(() => {
    setRevalidate((prev) => (defaultFetch ? prev + 1 : prev));
  }, [defaultFetch]);

  const data = {
    github: {
      key: 'api/github-installations',
      repoKey: 'api/github-repos',
      branchKey: 'api/github-branches',
      api: api.listGithubInstalltions,
      repoApi: api.searchGithubRepos,
      listRepoApi: api.listGithubRepos,
      branchApi: api.listGithubBranches,
    },
    gitlab: {
      key: 'api/gitlab-installations',
      repoKey: 'api/gitlab-repos',
      branchKey: 'api/gitlab-branches',
      api: api.listGitlabGroups,
      repoApi: api.listGitlabRepos,
      branchApi: api.listGitlabBranches,
    },
  };

  useEffect(() => {
    if (_revalidate === 0) {
      setRevalidate((prev) => prev + 1);
    }
  }, [provider]);

  const revalidate = (prov?: IGIT_PROVIDERS) => {
    if (prov) {
      if (provider === prov) {
        setRevalidate((prev) => prev + 1);
      }
      setProvider(prov);
    } else {
      setRevalidate((prev) => prev + 1);
    }
  };

  const debouncedSearch = useDebounceText(searchText, 500);

  const forceFetchInstallations = async (prov: IGIT_PROVIDERS) =>
    data[prov].api({});

  const installations = useCustomSwr(
    () => (_revalidate > 0 ? `${data[provider].key}_${_revalidate}` : null),
    async () => data[provider].api({})
  );

  const repos = useCustomSwr(
    () => (org ? `repos_${org.value}_${debouncedSearch}` : null),
    async () => {
      switch (provider) {
        case 'gitlab':
          return data.gitlab.repoApi({
            groupId: org?.value || '',
            query: debouncedSearch,
            pagination: {
              page: 1,
              per_page: 5,
            },
          });

        case 'github':
        default:
          return searchText
            ? data.github.repoApi({
                organization: org?.label || '',
                search: debouncedSearch,
                pagination: {
                  page: 1,
                  per_page: 5,
                },
              })
            : data.github.listRepoApi({
                installationId: parseValue(org?.value, 0),
                pagination: {
                  page: 1,
                  per_page: 5,
                },
              });
      }
    }
  );
  const branches = useCustomSwr(
    () => (repo ? `branches_${repo}` : null),
    async () => {
      switch (provider) {
        case 'github':
          return data.github.branchApi({
            repoUrl: repo,
          });
        case 'gitlab':
          return data.gitlab.branchApi({
            repoId: repo,
          });
        default:
          return data.github.branchApi({
            repoUrl: repo,
          });
      }
    }
  );

  // trigger our loading
  useEffect(() => {
    if (installations.isLoading || installations.isValidating) {
      setLoading(true);
    }
  }, [installations.isLoading, installations.isValidating]);

  // fetch repos for first organization
  useEffect(() => {
    if (installations.data && installations.data.length > 0) {
      switch (provider) {
        case 'gitlab':
          setOrg(installations.data[0]);
          break;
        case 'github':
          setOrg(installations.data[0]);
          break;
        default:
          break;
      }
      setLoading(false);
    } else if (installations.error && !!retryWithOtherGitProvider) {
      setProvider('gitlab');
      if (provider !== 'github') {
        setLoading(false);
      }
    }
  }, [installations.data, installations.isValidating]);

  // fetch branches for first repo
  useEffect(() => {
    if (repos.data && repos.data.length > 0) {
      setRepo(repos.data[0].url);
    }
  }, [repos.data, repos.isValidating]);

  // fetch branches for first repo
  useEffect(() => {
    if (branches.data && branches.data.length > 0) {
      setBranch(branches.data[0].name || '');
    }
  }, [branches.data, branches.isValidating]);

  useEffect(() => {
    if (branch && repo && provider)
      onChange?.({
        branch,
        repo,
        provider,
      });
  }, [branch, repo]);

  useEffect(() => {
    if (installations.isLoading || repos.isLoading || branches.isLoading) {
      setBranch('');
    }
  }, [installations.isLoading, repos.isLoading, branches.isLoading]);

  return {
    provider,
    setProvider,
    searchText,
    setSearchText,
    setRepo,
    setOrg,
    org,
    repo,
    installations,
    repos,
    branches,
    branch,
    setBranch,
    isLoading: loading,
    forceFetchInstallations,
    revalidate,
  };
};

export default useGit;
