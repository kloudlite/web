import { ArrowRight } from '@jengaicons/react';
import { Button } from '~/components/atoms/button';
import { TextInput } from '~/components/atoms/input';
import { useAppState } from '~/console/page-components/app-states';
import { keyconstants } from '~/console/server/r-utils/key-constants';
import useForm from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { parseName } from '~/console/server/r-utils/common';
import { FadeIn } from '~/console/page-components/util';
import { NameIdView } from '~/console/components/name-id-view';

const AppDetail = () => {
  const { app, setApp, setPage, markPageAsCompleted } = useAppState();

  const { values, errors, handleChange, handleSubmit, isLoading } = useForm({
    initialValues: {
      name: parseName(app),
      displayName: app.displayName,
      description: app.metadata?.annotations?.[keyconstants.description] || '',
      isNameError: false,
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
            annotations: {
              ...(a.metadata?.annotations || {}),
              [keyconstants.description]: val.description || '',
            },
            name: val.name,
          },
          displayName: val.displayName,
        };
      });
      setPage(2);
      markPageAsCompleted(1);
    },
  });

  return (
    <FadeIn
      onSubmit={(e) => {
        if (!values.isNameError) {
          handleSubmit(e);
        } else {
          e.preventDefault();
        }
      }}
    >
      <div className="bodyMd text-text-soft">
        The application streamlines project management through intuitive task
        tracking and collaboration tools.
      </div>
      <div className="flex flex-col gap-3xl">
        <NameIdView
          displayName={values.displayName}
          name={values.name}
          resType="app"
          errors={errors.name}
          label="Application name"
          placeholder="Enter application name"
          handleChange={handleChange}
          nameErrorLabel="isNameError"
        />
        <TextInput
          error={!!errors.description}
          message={errors.description}
          label="Description"
          placeholder="Enter application description"
          size="lg"
          value={values.description}
          onChange={handleChange('description')}
        />
      </div>
      <div className="flex flex-row gap-xl items-center">
        <Button
          loading={isLoading}
          type="submit"
          content="Save & Continue"
          suffix={<ArrowRight />}
          variant="primary"
        />
      </div>
    </FadeIn>
  );
};

export default AppDetail;
