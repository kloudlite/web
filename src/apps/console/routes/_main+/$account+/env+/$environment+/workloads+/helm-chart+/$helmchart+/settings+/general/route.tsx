import { Box, BoxPrimitive } from '~/console/components/common-console-components';
import HelmChartLayout from '../helm-chart-layout';
import useForm from '~/root/lib/client/hooks/use-form';
import { TextInput } from '@kloudlite/design-system/atoms/input';
import { useHelmChartState } from '../../useHelmChartContext';
import { useEffect } from 'react';
import Yup from '~/root/lib/server/helpers/yup';
import { DISCARD_ACTIONS, useUnsavedChanges } from '~/root/lib/client/hooks/use-unsaved-changes';

const SettingGeneral = () => {
  const { performAction } = useUnsavedChanges();

  const { helmChart, setHelmChart, readOnlyHelmChart } = useHelmChartState()

  const { values, errors, handleChange, submit, resetValues } = useForm({
    initialValues: {
      displayName: helmChart?.displayName
    },
    validationSchema: Yup.object({
      displayName: Yup.string().required()
    }),
    onSubmit(val) {
      setHelmChart({ ...helmChart, displayName: val.displayName })
    }
  })

  useEffect(() => {
    submit();
  }, [values]);


  const reset = () => {
    resetValues({
      displayName: readOnlyHelmChart.displayName
    });
  }
  useEffect(() => {
    if (performAction === DISCARD_ACTIONS.DISCARD_CHANGES) {
      reset()
    }
  }, [performAction]);


  return (
    <HelmChartLayout title="General">
      <BoxPrimitive>
        <TextInput
          value={values.displayName}
          error={!!errors.displayName}
          message={errors.displayName}
          label="Name"
          size="lg"
          onChange={handleChange('displayName')}
        />

      </BoxPrimitive>
    </HelmChartLayout>
  );
};
export default SettingGeneral;
