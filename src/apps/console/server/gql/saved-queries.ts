import { ExecuteQueryWithContext } from '~/root/lib/server/helpers/execute-query-with-context';
import { IGQLServerProps } from '~/root/lib/types/common';
import { accessQueries } from './queries/access-queries';
import { accountQueries } from './queries/account-queries';
import { appQueries } from './queries/app-queries';
import { baseQueries } from './queries/base-queries';
import { buildQueries } from './queries/build-queries';
import { buildCachesQueries } from './queries/build-caches-queries';
import { buildRunQueries } from './queries/build-run-queries';
import { clusterQueries } from './queries/cluster-queries';
import { configQueries } from './queries/config-queries';
import { crQueries } from './queries/cr-queries';
import { domainQueries } from './queries/domain-queries';
import { environmentQueries } from './queries/environment-queries';
import { gitQueries } from './queries/git-queries';
import { nodepoolQueries } from './queries/nodepool-queries';
import { projectQueries } from './queries/project-queries';
import { providerSecretQueries } from './queries/provider-secret-queries';
import { repoQueries } from './queries/repo-queries';
import { routerQueries } from './queries/router-queries';
import { secretQueries } from './queries/secret-queries';
import { tagsQueries } from './queries/tags-queries';
import { vpnQueries } from './queries/vpn-queries';
import { pvcQueries } from './queries/pvc-queries';
import { clusterManagedServicesQueries } from './queries/cluster-managed-services-queries';
import { managedTemplateQueries } from './queries/managed-templates-queries';
import { helmChartQueries } from './queries/helm-chart-queries';

export const GQLServerHandler = ({ headers, cookies }: IGQLServerProps) => {
  const executor = ExecuteQueryWithContext(headers, cookies);
  return {
    ...baseQueries(executor),
    ...accountQueries(executor),
    ...projectQueries(executor),
    ...clusterQueries(executor),
    ...providerSecretQueries(executor),
    ...nodepoolQueries(executor),
    ...environmentQueries(executor),
    ...appQueries(executor),
    ...routerQueries(executor),
    ...configQueries(executor),
    ...secretQueries(executor),
    ...vpnQueries(executor),
    ...accessQueries(executor),
    ...crQueries(executor),
    ...repoQueries(executor),
    ...tagsQueries(executor),
    ...gitQueries(executor),
    ...domainQueries(executor),
    ...buildQueries(executor),
    ...buildCachesQueries(executor),
    ...pvcQueries(executor),
    ...buildRunQueries(executor),
    ...clusterManagedServicesQueries(executor),
    ...managedTemplateQueries(executor),
    ...helmChartQueries(executor),
  };
};

export type ConsoleApiType = ReturnType<typeof GQLServerHandler>;
