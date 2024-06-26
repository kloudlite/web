import { ExecuteQueryWithContext } from '~/root/lib/server/helpers/execute-query-with-context';
import { IGQLServerProps } from '~/root/lib/types/common';
import { accessQueries } from './queries/access-queries';
import { accountQueries } from './queries/account-queries';
import { baseQueries } from './queries/base-queries';
import { iotProjectQueries } from './queries/iot-project-queries';
import { iotDeviceBlueprintQueries } from './queries/iot-device-blueprint-queries';
import { iotDeploymentQueries } from './queries/iot-deployment-queries';
import { iotAppQueries } from './queries/iot-app-queries';
import { iotDeviceQueries } from './queries/iot-device-queries';
import { iotRepoQueries } from './queries/iot-repo-queries';
import { iotTagsQueries } from './queries/iot-tags-queries';
import { iotConfigQueries } from './queries/iot-config-queries';
import { iotSecretQueries } from './queries/iot-secret-queries';
import { iotCrQueries } from './queries/iot-cr-queries';
import { iotGitQueries } from './queries/iot-git-queries';
import { iotBuildQueries } from './queries/iot-build-queries';
import { iotBuildRunQueries } from './queries/iot-build-run-queries';

export const GQLServerHandler = ({ headers, cookies }: IGQLServerProps) => {
  const executor = ExecuteQueryWithContext(headers, cookies);
  return {
    ...baseQueries(executor),
    ...accountQueries(executor),
    ...iotProjectQueries(executor),
    ...iotDeviceBlueprintQueries(executor),
    ...iotDeploymentQueries(executor),
    ...iotAppQueries(executor),
    ...iotDeviceQueries(executor),
    ...iotRepoQueries(executor),
    ...iotTagsQueries(executor),
    ...iotConfigQueries(executor),
    ...iotSecretQueries(executor),
    ...iotCrQueries(executor),
    ...iotGitQueries(executor),
    ...iotBuildQueries(executor),
    ...iotBuildRunQueries(executor),
    ...accessQueries(executor),
  };
};

export type ConsoleApiType = ReturnType<typeof GQLServerHandler>;
