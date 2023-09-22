import { useEffect, useState } from 'react';
import * as Chips from '~/components/atoms/chips';
import { PasswordInput, TextInput } from '~/components/atoms/input';
import Select from '~/components/atoms/select-primitive';
import Popup from '~/components/molecule/popup';
import { toast } from '~/components/molecule/toast';
import { IdSelector } from '~/console/components/id-selector';
import { IDialog } from '~/console/components/types.d';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { IProviderSecret } from '~/console/server/gql/queries/provider-secret-queries';
import {
  parseName,
  validateCloudProvider,
} from '~/console/server/r-utils/common';
import { DIALOG_TYPE } from '~/console/utils/commons';
import { useReload } from '~/root/lib/client/helpers/reloader';
import useForm from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { handleError } from '~/root/lib/utils/common';

const HandleProvider = ({
  show,
  setShow,
}: IDialog<IProviderSecret | null, null>) => {
  const api = useConsoleApi();
  const reloadPage = useReload();

  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      displayName: Yup.string().required(),
      name: Yup.string().required(),
      provider: Yup.string().required(),
      accessKey: Yup.string().required(),
      accessSecret: Yup.string().required(),
    })
  );

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    isLoading,
    resetValues,
    setValues,
  } = useForm({
    initialValues: {
      displayName: '',
      name: '',
      provider: 'aws',
      accessKey: '',
      accessSecret: '',
    },
    validationSchema,

    onSubmit: async (val) => {
      try {
        if (show?.type === DIALOG_TYPE.ADD) {
          const { errors: e } = await api.createProviderSecret({
            secret: {
              displayName: val.displayName,
              metadata: {
                name: val.name,
              },
              stringData: {
                accessKey: val.accessKey,
                accessSecret: val.accessSecret,
              },
              cloudProviderName: validateCloudProvider(val.provider),
            },
          });
          if (e) {
            throw e[0];
          }
          toast.success('provider secret created successfully');
        } else {
          const { errors: e } = await api.updateProviderSecret({
            secret: {
              metadata: show?.data?.metadata,
              stringData: {
                accessKey: val.accessKey,
                accessSecret: val.accessSecret,
              },
              cloudProviderName: val.provider,
            },
          });
          if (e) {
            throw e[0];
          }
        }
        reloadPage();
        setShow(null);
        resetValues();
      } catch (err) {
        handleError(err);
      }
    },
  });

  useEffect(() => {
    if (show && show.data && show.type === DIALOG_TYPE.EDIT) {
      setValues((v) => ({
        ...v,
        accessSecret: show.data?.stringData?.accessSecret || '',
        accessKey: show.data?.stringData?.accessKey || '',
      }));
      setValidationSchema(
        // @ts-ignore
        Yup.object({
          displayName: Yup.string().trim().required(),
          accessSecret: Yup.string().trim().required(),
          accessKey: Yup.string().trim().required(),
          provider: Yup.string().required(),
        })
      );
    }
  }, [show]);

  return (
    <Popup.Root
      show={!!show}
      onOpenChange={(e) => {
        if (!e) {
          resetValues();
        }
        setShow(e);
      }}
    >
      <Popup.Header>
        {show?.type === DIALOG_TYPE.ADD
          ? 'Add new cloud provider'
          : 'Edit cloud provider'}
      </Popup.Header>
      <form onSubmit={handleSubmit}>
        <Popup.Content>
          <div className="flex flex-col gap-2xl">
            {show?.type === DIALOG_TYPE.EDIT && (
              <Chips.Chip
                {...{
                  item: { id: parseName(show.data) },
                  label: parseName(show.data),
                  prefix: 'Id:',
                  disabled: true,
                  type: 'BASIC',
                }}
              />
            )}

            <TextInput
              label="Name"
              onChange={handleChange('displayName')}
              error={!!errors.displayName}
              message={errors.displayName}
              value={values.displayName}
              name="provider-secret-name"
            />
            {show?.type === DIALOG_TYPE.ADD && (
              <IdSelector
                name={values.displayName}
                resType="providersecret"
                onChange={(id) => {
                  handleChange('name')({ target: { value: id } });
                }}
              />
            )}
            {show?.type === DIALOG_TYPE.ADD && (
              <Select.Root
                error={!!errors.provider}
                message={errors.provider}
                value={values.provider}
                label="Provider"
                onChange={handleChange('provider')}
              >
                <Select.Option value="aws">Amazon Web Services</Select.Option>
              </Select.Root>
            )}
            <PasswordInput
              name="accessKey"
              onChange={handleChange('accessKey')}
              error={!!errors.accessKey}
              message={errors.accessKey}
              value={values.accessKey}
              label="Access Key ID"
            />
            <PasswordInput
              name="accessSecret"
              label="Access Key Secret"
              onChange={handleChange('accessSecret')}
              error={!!errors.accessSecret}
              message={errors.accessSecret}
              value={values.accessSecret}
            />
          </div>
        </Popup.Content>
        <Popup.Footer>
          <Popup.Button content="Cancel" variant="basic" closable />
          <Popup.Button
            loading={isLoading}
            type="submit"
            content={show?.type === DIALOG_TYPE.ADD ? 'Add' : 'Update'}
            variant="primary"
          />
        </Popup.Footer>
      </form>
    </Popup.Root>
  );
};

export default HandleProvider;