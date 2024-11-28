import { Box, BoxPrimitive } from '~/console/components/common-console-components';
import HelmChartLayout from '../helm-chart-layout';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import { TextInput } from '@kloudlite/design-system/atoms/input';
import { useHelmChartState } from '../../useHelmChartContext';
import Select from '@kloudlite/design-system/atoms/select';
import { useEffect, useState } from 'react';
import useFetchHelmCharts from '../../../../helm-charts/helm-utils/use-fetch-helmcharts';
import Yup from '~/root/lib/server/helpers/yup';
import { DISCARD_ACTIONS, useUnsavedChanges } from '~/root/lib/client/hooks/use-unsaved-changes';

type IHelmDoc = {
  apiVersion: string;
  entries: {
    [key: string]: { version: string }[];
  };
  generated: string;
};

const filterUniqueVersions = (versions: IHelmDoc['entries']['keys']) => {
  return versions.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.version === obj.version),
  );
};


const SettingAdvance = () => {
  const { performAction } = useUnsavedChanges();

  const { helmChart, setHelmChart, readOnlyHelmChart } = useHelmChartState()
  const [chartVersions, setChartVersions] = useState<
    IHelmDoc['entries']['key']
  >([]);


  const { values, handleChange, submit, errors, resetValues } = useForm({
    initialValues: {
      chartName: helmChart.spec?.chartName,
      chartRepoURL: helmChart.spec?.chartRepoURL,
      chartVersion: helmChart.spec?.chartVersion
    },
    validationSchema: Yup.object({
      chartRepoURL: Yup.string().required(),
      chartName: Yup.string().required(),
      chartVersion: Yup.string().required()
    }),
    onSubmit(val) {
      setHelmChart({
        ...helmChart,
        spec: {
          chartName: helmChart.spec?.chartName || "",
          chartRepoURL: helmChart.spec?.chartRepoURL || "",
          chartVersion: val.chartVersion || "",
          values: helmChart.spec?.values
        }
      })
    }
  })

  const { helmCharts, loading: helmChartsLoading } = useFetchHelmCharts({
    repoUrl: helmChart?.spec?.chartRepoURL || ""
  });

  useEffect(() => {
    if (helmCharts && helmCharts.length > 0) {
      setChartVersions(
        filterUniqueVersions(
          helmCharts.find((v) => v.value === helmChart?.spec?.chartName)
            ?.item || [],
        ),
      );
    }
  }, [helmCharts]);

  useEffect(() => {
    submit();
  }, [values]);

  const reset = () => {
    resetValues({
      chartName: readOnlyHelmChart.spec?.chartName,
      chartRepoURL: readOnlyHelmChart.spec?.chartRepoURL,
      chartVersion: readOnlyHelmChart.spec?.chartVersion
    });
  }

  useEffect(() => {
    if (performAction === DISCARD_ACTIONS.DISCARD_CHANGES) {
      reset()
    }
  }, [performAction]);


  return (
    <HelmChartLayout title="Advance">
      <BoxPrimitive>
        <TextInput
          value={values.chartName}
          error={!!errors.chartName}
          message={errors.chartName}
          label="Chart name"
          size="lg"
          onChange={handleChange('chartName')}
          disabled
        />
        <TextInput
          value={values.chartRepoURL}
          error={!!errors.chartRepoURL}
          message={errors.chartRepoURL}
          label="Chart repo url"
          size="lg"
          onChange={handleChange('chartRepoURL')}
          disabled
        />
        <Select
          searchable
          label="Chart version"
          placeholder="Chart version"
          disabled={
            helmChartsLoading
          }
          error={!!errors.chartVersion}
          message={errors.chartVersion}
          value={values.chartVersion}
          options={async () => [
            ...chartVersions.map((cv) => ({
              label: cv.version,
              value: cv.version,
            })),
          ]}
          loading={helmChartsLoading}
          onChange={(val) => {
            handleChange('chartVersion')(dummyEvent(val.value))
          }}
          onSearch={() => true}
        />

      </BoxPrimitive>
    </HelmChartLayout>
  );
};
export default SettingAdvance;
