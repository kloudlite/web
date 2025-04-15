import { Button } from '@kloudlite/design-system/atoms/button';
import { TextInput } from '@kloudlite/design-system/atoms/input';
import { toast } from '@kloudlite/design-system/molecule/toast';
import { useLocation, useNavigate, useOutletContext } from '@remix-run/react';
import { useEffect, useState } from 'react';
import {
  Box,
  DeleteContainer,
} from '~/console/components/common-console-components';
import DeleteDialog from '~/console/components/delete-dialog';
import { CopySimple } from '~/console/components/icons';
import Wrapper from '~/console/components/wrapper';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { parseName } from '~/console/server/r-utils/common';
import { getManagedPlugin } from '~/console/utils/commons';
import { useReload } from '~/root/lib/client/helpers/reloader';
import useClipboard from '~/root/lib/client/hooks/use-clipboard';
import useForm from '~/root/lib/client/hooks/use-form';
import { useUnsavedChanges } from '~/root/lib/client/hooks/use-unsaved-changes';
import Yup from '~/root/lib/server/helpers/yup';
import { handleError } from '~/root/lib/utils/common';
import { Fill } from '~/console/routes/_main+/$account+/common-services+/managed-services/handle-backend-service';
import { IManagedServiceContext } from '../../_layout';

const parseExports = (exports?: string) => {
  try {
    return JSON.parse(exports || '');
  } catch {
    return {};
  }
};

const ClusterManagedServiceSettingGeneral = () => {
  const { account, managedService, msvPlugins } =
    useOutletContext<IManagedServiceContext>();

  const { setHasChanges, resetAndReload } = useUnsavedChanges();
  const [success, setSuccess] = useState(false);
  const [deleteClusterMsvc, setDeleteClusterMsvc] = useState(false);

  const api = useConsoleApi();
  const reload = useReload();
  const navigate = useNavigate();

  const { copy } = useClipboard({
    onSuccess() {
      toast.success('Text copied to clipboard.');
    },
  });

  const getServicePlugin = () => {
    return getManagedPlugin({
      plugins: msvPlugins,
      apiVersion: managedService.spec?.msvcSpec.plugin?.apiVersion || '',
      kind: managedService.spec?.msvcSpec.plugin?.kind || '',
    });
  };

  const { values, handleChange, submit, isLoading, resetValues, errors } =
    useForm({
      initialValues: {
        name: parseName(managedService),
        displayName: managedService.displayName,
        clusterName: managedService.clusterName,
        isNameError: false,
        annotations: managedService.metadata?.annotations,
        exports: parseExports(
          managedService.spec?.msvcSpec.plugin?.export?.template,
        ),
        res: {
          ...managedService.spec?.msvcSpec.plugin?.spec,
        },
      },
      validationSchema: Yup.object({}),
      onSubmit: async (val) => {
        const { errors: e } = await api.updateClusterMSv({
          service: {
            displayName: val.displayName,
            metadata: {
              name: val.name,
              annotations: val.annotations,
            },
            clusterName: val.clusterName,
            spec: {
              msvcSpec: {
                plugin: {
                  ...managedService.spec?.msvcSpec.plugin,
                  apiVersion:
                    managedService.spec?.msvcSpec.plugin?.apiVersion || '',
                  kind: managedService.spec?.msvcSpec.plugin?.kind || '',
                  spec: {
                    ...val.res,
                  },
                },
              },
            },
          },
        });
        if (e) {
          throw e[0];
        }
        toast.success('Integrated service updated successfully');
        setSuccess(true);
        resetAndReload();
      },
    });

  const checkChanges = () => {
    if (
      values.displayName !== managedService.displayName ||
      JSON.stringify(values.res) !==
        JSON.stringify(managedService.spec?.msvcSpec.plugin?.spec) ||
      managedService.spec?.msvcSpec.plugin?.export?.template !==
        JSON.stringify(values.exports)
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setHasChanges(checkChanges());
  }, [values]);

  useEffect(() => {
    resetValues();
  }, [managedService]);

  const location = useLocation();

  useEffect(() => {
    setSuccess(false);
  }, [location]);

  return (
    <div>
      <Wrapper
        secondaryHeader={{
          title: 'General',
          action: checkChanges() && !success && (
            <div className="flex flex-row items-center gap-3xl">
              <Button
                content="Discard"
                variant="basic"
                onClick={() => {
                  resetValues();
                }}
              />
              <Button
                content="Save changes"
                variant="primary"
                onClick={() => {
                  if (!isLoading) submit();
                }}
                loading={isLoading}
              />
            </div>
          ),
        }}
      >
        <Box title="Integrated service details">
          <div className="flex flex-row items-center gap-3xl">
            <div className="flex-1">
              <TextInput
                value={parseName(managedService)}
                label="Integrated service ID"
                message="Used when interacting with the Kloudlite API"
                suffix={
                  <div
                    className="flex justify-center items-center"
                    title="Copy"
                  >
                    <button
                      aria-label="copy"
                      onClick={() => copy(parseName(managedService))}
                      className="outline-none hover:bg-surface-basic-hovered active:bg-surface-basic-active rounded text-text-default"
                      tabIndex={-1}
                    >
                      <CopySimple size={16} />
                    </button>
                  </div>
                }
                disabled
              />
            </div>
          </div>
        </Box>

        <Box title="">
          <Fill
            {...{
              selectedServicePlugins: {
                category: { displayName: '', name: '' },
                service: getServicePlugin(),
              },
              values,
              errors,
              handleChange,
            }}
            size="md"
          />
        </Box>

        <DeleteContainer
          title="Delete Integrated Service"
          action={() => {
            setDeleteClusterMsvc(true);
          }}
        >
          Permanently remove your Integrated service and all of its contents
          from the Kloudlite platform. This action is not reversible — please
          continue with caution.
        </DeleteContainer>
        <DeleteDialog
          resourceName={parseName(managedService)}
          resourceType="Integrated service"
          show={deleteClusterMsvc}
          setShow={setDeleteClusterMsvc}
          onSubmit={async () => {
            try {
              const { errors } = await api.deleteClusterMSv({
                name: parseName(managedService),
              });

              if (errors) {
                throw errors[0];
              }
              reload();
              toast.success(`Integrated service deleted successfully`);
              setDeleteClusterMsvc(false);
              console.log('kind');
              if (managedService.spec?.msvcSpec.plugin?.kind === 'HelmChart') {
                navigate(`/${parseName(account)}/common-services/helm-charts`);
              } else {
                navigate(
                  `/${parseName(account)}/common-services/managed-services`,
                );
              }
            } catch (err) {
              handleError(err);
            }
          }}
        />
      </Wrapper>
    </div>
  );
};
export default ClusterManagedServiceSettingGeneral;
