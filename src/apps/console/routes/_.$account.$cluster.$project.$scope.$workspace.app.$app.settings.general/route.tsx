import { CopySimple } from '@jengaicons/react';
import { useOutletContext } from '@remix-run/react';
import { useEffect } from 'react';
import { TextInput } from '~/components/atoms/input';
import { Box } from '~/console/components/common-console-components';
import { useAppState } from '~/console/page-components/app-states';
import { keyconstants } from '~/console/server/r-utils/key-constants';
import useForm from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { IAppContext } from '../_.$account.$cluster.$project.$scope.$workspace.app.$app/route';

const SettingGeneral = () => {
  const { app, setApp } = useAppState();
  const { workspace } = useOutletContext<IAppContext>();

  const { values, errors, handleChange, submit } = useForm({
    initialValues: {
      name: app.metadata.name,
      displayName: app.displayName,
      description: app.metadata.annotations?.[keyconstants.description] || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      displayName: Yup.string().required(),
      description: Yup.string(),
    }),

    onSubmit: async (val) => {
      setApp((a) => {
        return {
          ...a,
          metadata: {
            ...a.metadata,
            name: val.name,
            namespace: workspace.spec?.targetNamespace,
            annotations: {
              ...(a.metadata.annotations || {}),
              [keyconstants.description]: val.description,
            },
          },
          displayName: val.displayName,
        };
      });
    },
  });

  useEffect(() => {
    submit();
  }, [values]);

  return (
    <Box title="Application detail">
      <div className="flex flex-row items-center gap-3xl">
        <div className="flex-1">
          <TextInput
            label="Application name"
            error={!!errors.displayName}
            message={errors.displayName}
            onChange={handleChange('displayName')}
            value={values.displayName}
          />
        </div>
        <div className="flex-1">
          <TextInput
            label="Application ID"
            value={values.name}
            suffixIcon={<CopySimple />}
            disabled
          />
        </div>
      </div>
      <TextInput
        label="Description"
        error={!!errors.description}
        message={errors.description}
        value={values.description}
        onChange={handleChange('description')}
      />
    </Box>
  );
};
export default SettingGeneral;