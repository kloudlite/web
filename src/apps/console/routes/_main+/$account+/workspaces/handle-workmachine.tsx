import { NumberInput, TextArea } from '@kloudlite/design-system/atoms/input';
import Radio from '@kloudlite/design-system/atoms/radio';
import Select from '@kloudlite/design-system/atoms/select';
import Popup from '@kloudlite/design-system/molecule/popup';
import Banner from '@kloudlite/design-system/molecule/banner';
import { IDialogBase } from '~/console/components/types.d';
import { IClusterMSvs } from '~/console/server/gql/queries/cluster-managed-services-queries';
import { ExtractNodeType } from '~/console/server/r-utils/common';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { useReload } from '~/root/lib/client/helpers/reloader';
import { useOutletContext } from '@remix-run/react';
import { IAccountContext } from '../_layout';
import { toast } from '@kloudlite/design-system/molecule/toast';
import { handleError } from '~/root/lib/utils/common';
import { IWM } from '~/console/server/gql/queries/workspace-queries';

type IDialog = IDialogBase<ExtractNodeType<IWM>>;

const machineSizes = [
  {
    label: '2 cores, 8GB RAM',
    value: '2_4',
    amd: 'm6a.large',
    arm: 'm6g.large',
  },
  {
    label: '4 cores, 16GB RAM',
    value: '4_16',
    amd: 'm6a.xlarge',
    arm: 'm6g.xlarge',
  },
  {
    label: '8 cores, 32GB RAM',
    value: '8_32',
    amd: 'm6a.2xlarge',
    arm: 'm6g.2xlarge',
  },
  {
    label: '16 cores, 64GB RAM',
    value: '16_64',
    amd: 'm6a.4xlarge',
    arm: 'm6g.4xlarge',
  },
];

const architecture = [
  { label: 'ARM', value: 'ARM' },
  { label: 'AMD', value: 'AMD' },
];

export const findMachineType = (instanceType: string) => {
  return machineSizes.find((f) => [f.amd, f.arm].includes(instanceType));
};

const findArchitecture = (instanceType: string) => {
  const amd = machineSizes.find((f) => f.amd === instanceType);
  return !!amd ? 'AMD' : 'ARM';
};

const Root = (props: IDialog) => {
  const { isUpdate, setVisible } = props;

  const api = useConsoleApi();
  const reloadPage = useReload();
  const { account, user } = useOutletContext<IAccountContext>();

  const { handleChange, handleSubmit, values, errors, isLoading, resetValues } =
    useForm({
      initialValues: isUpdate
        ? {
            machineSize: findMachineType(
              props.data.spec?.aws.instanceType || '',
            )?.value,
            architecture: findArchitecture(
              props.data.spec?.aws.instanceType || '',
            ),
            storage: props.data.spec?.aws.externalVolumeSize || '60',
            sshPublicKeys: props.data.spec?.sshPublicKeys.join('/n'),
          }
        : {
            machineSize: '4_16',
            architecture: 'ARM',
            storage: '60',
            sshPublicKeys: '',
          },
      validationSchema: Yup.object({}),
      onSubmit: async (val) => {
        const mS = machineSizes.find((f) => f.value === val.machineSize);
        const instanceType = val.architecture === 'ARM' ? mS?.arm : mS?.amd;
        console.log('herr', mS, instanceType);
        if (!instanceType) {
          throw Error('Invalid instance type');
        }

        const sshPublicKeys = (val.sshPublicKeys || '').trim();

        try {
          if (!isUpdate) {
            const { errors: e } = await api.createWorkmachine({
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
            toast.success('Workmachine created successfully');
          } else {
            const { errors: e } = await api.updateWorkmachine({
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
            toast.success('Workmachine created successfully');
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
          <Select
            placeholder="Machine size"
            error={!!errors.machineSize}
            message={errors.machineSize}
            value={values.machineSize}
            label="Machine size"
            onChange={(_, value) => {
              handleChange('machineSize')(dummyEvent(value));
            }}
            options={async () => machineSizes}
          />
          <div className="flex flex-col gap-md">
            <div className="bodyMd-medium text-text-default h-4xl">
              Architecture
            </div>
            <Radio.Root
              value={values.architecture}
              onChange={(v) => handleChange('architecture')(dummyEvent(v))}
              direction="horizontal"
            >
              {architecture.map((mt) => (
                <Radio.Item key={mt.value} value={mt.value}>
                  {mt.label}
                </Radio.Item>
              ))}
            </Radio.Root>
          </div>
          <NumberInput
            label="Storage"
            min={20}
            value={values.storage}
            onChange={handleChange('storage')}
            suffix="GB"
          />
          <TextArea
            label="Authorized keys"
            value={values.sshPublicKeys}
            onChange={handleChange('sshPublicKeys')}
          />
          <Banner
            type="info"
            title="Machine publickey"
            body="sdfljalsfjdaslfjljadskljflksajfl"
          />
        </div>
      </Popup.Content>
      <Popup.Footer>
        <Popup.Button type="button" variant="basic" content="Cancel" closable />
        <Popup.Button
          loading={isLoading}
          type="submit"
          content="Update"
          variant="primary"
        />
      </Popup.Footer>
    </Popup.Form>
  );
};

const HandleWorkmachine = (props: IDialog) => {
  const { isUpdate, setVisible, visible } = props;
  return (
    <Popup.Root show={visible} onOpenChange={(v) => setVisible(v)}>
      <Popup.Header>
        {isUpdate ? 'Edit Workmachine' : 'Setup Workmachine'}
      </Popup.Header>
      {(!isUpdate || (isUpdate && props.data)) && <Root {...props} />}
    </Popup.Root>
  );
};

export default HandleWorkmachine;
