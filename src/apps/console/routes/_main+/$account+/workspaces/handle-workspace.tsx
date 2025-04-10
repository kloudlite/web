import { TextInput } from '@kloudlite/design-system/atoms/input';
import Popup from '@kloudlite/design-system/molecule/popup';
import { useOutletContext } from '@remix-run/react';
import { NameIdView } from '~/console/components/name-id-view';
import { IDialogBase } from '~/console/components/types.d';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { ExtractNodeType } from '~/console/server/r-utils/common';
import { useReload } from '~/root/lib/client/helpers/reloader';
import useForm from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { IAccountContext } from '../_layout';
import {
  IWM,
  IWorkspaces,
} from '~/console/server/gql/queries/workspace-queries';
import { toast } from '@kloudlite/design-system/molecule/toast';
import { handleError } from '~/root/lib/utils/common';

type IDialog = IDialogBase<{
  ws?: ExtractNodeType<IWorkspaces>;
  wm: IWM | null;
}>;

const Root = (props: IDialog) => {
  const { isUpdate, setVisible } = props;

  const api = useConsoleApi();
  const reloadPage = useReload();
  const { account } = useOutletContext<IAccountContext>();

  const { handleChange, handleSubmit, values, errors, isLoading, resetValues } =
    useForm({
      initialValues: {
        displayName: '',
        name: '',
        isNameError: false,
      },
      validationSchema: Yup.object({}),
      onSubmit: async (val) => {
        if (!props?.data?.wm || !props.data.wm.metadata) {
          throw Error('Invalid workmachine.');
        }

        try {
          if (!isUpdate) {
            const { errors: e } = await api.createWorkspace({
              clusterName: `cls-${account.metadata?.name}`,
              workmachineName: props.data.wm.metadata?.name,
              workspace: {
                displayName: val.displayName,
                metadata: {
                  name: val.name,
                },
              },
            });
            if (e) {
              throw e[0];
            }
            toast.success('Workspace created successfully');
          } else {
            /* const { errors: e } = await api.updateWorkmachine({
            clusterName: `cls-${account.metadata?.name}`,
            workmachine: {
              displayName: `${user.id}-workmachine`.toUpperCase(),
              metadata: {
                name: `${user.id}-workmachine`.toUpperCase(),
              },
              spec: {
                aws: {
                  ami: 'ami-0429d68a1c41ca80',
                  availabilityZone: 'ap-south-1a',
                  externalVolumeSize: val.storage,
                  instanceType,
                },
                sshPublicKeys: sshPublicKeys
                  ? sshPublicKeys.trim().split('/n')
                  : [],
                state: 'ON',
              },
            },
          });
          if (e) {
            throw e[0];
          }
          toast.success('Workmachine created successfully'); */
          }
          reloadPage();
          setVisible(false);
          resetValues();
        } catch (err) {
          handleError(err);
        }
      },
    });
  return (
    <Popup.Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Popup.Content className="!min-h-[500px] !max-h-[500px]">
        <div className="flex flex-col gap-3xl">
          <NameIdView
            displayName={values.displayName}
            name={values.name}
            label="Name"
            placeholder="Enter workspace name"
            errors={errors.name}
            handleChange={handleChange}
            nameErrorLabel="isNameError"
            isUpdate={isUpdate}
            resType="environment"
          />
          <TextInput label="Git url (optional)" placeholder="Git url" />
        </div>
      </Popup.Content>
      <Popup.Footer>
        <Popup.Button type="button" variant="basic" content="Cancel" closable />
        <Popup.Button
          loading={isLoading}
          type="submit"
          content={isUpdate ? 'Update' : 'Add'}
          variant="primary"
        />
      </Popup.Footer>
    </Popup.Form>
  );
};

const HandleWorkspace = (props: IDialog) => {
  const { isUpdate, setVisible, visible } = props;
  return (
    <Popup.Root show={visible} onOpenChange={(v) => setVisible(v)}>
      <Popup.Header>
        {isUpdate ? 'Edit Workspace' : 'Add Workspace'}
      </Popup.Header>
      {(!isUpdate || (isUpdate && props.data)) && <Root {...props} />}
    </Popup.Root>
  );
};

export default HandleWorkspace;
