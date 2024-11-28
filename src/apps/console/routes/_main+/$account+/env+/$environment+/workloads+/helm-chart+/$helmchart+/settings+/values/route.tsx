import { Box, BoxPrimitive } from '~/console/components/common-console-components';
import HelmChartLayout from '../helm-chart-layout';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import { useHelmChartState } from '../../useHelmChartContext';
import ExtendedFilledTab from '~/console/components/extended-filled-tab';
import CodeEditorClient from '~/root/lib/client/components/editor-client';
import useFetchHelmValue from '../../../../helm-charts/helm-utils/use-fetch-helmvalues';
import { keyconstants } from '~/console/server/r-utils/key-constants';
import yaml from 'js-yaml';
import { useEffect, useRef } from 'react';
import { LoadingPlaceHolder } from '~/console/components/loading';
import Yup from '~/root/lib/server/helpers/yup';
import { DISCARD_ACTIONS, useUnsavedChanges } from '~/root/lib/client/hooks/use-unsaved-changes';


const SettingValues = () => {
  const { performAction } = useUnsavedChanges();

  const editorRef = useRef<any>();

  const { helmChart, readOnlyHelmChart, setHelmChart } = useHelmChartState()

  const { values: helmValues, isLoading } =
    useFetchHelmValue({
      packageId: helmChart?.metadata?.annotations?.[
        keyconstants.helmChartRepoPackageId
      ]
      ,
      version: helmChart.spec?.chartVersion,
    });


  const { values, handleChange, submit, resetValues } = useForm({
    initialValues: {
      activeTab: 'defaults',
      values:
        Object.keys(helmChart.spec?.values).length > 0
          ? yaml.dump(helmChart.spec?.values)
          : '',

    },
    validationSchema: Yup.object({}),
    onSubmit(val) {
      setHelmChart({
        ...helmChart,
        spec: {
          chartName: helmChart.spec?.chartName || "",
          chartRepoURL: helmChart.spec?.chartRepoURL || "",
          chartVersion: helmChart.spec?.chartVersion || "",
          values: val.values
            ? yaml.load(val.values, { json: true })
            : {}
        }
      })
    }
  })


  useEffect(() => {
    submit();
  }, [values]);


  const reset = () => {
    resetValues({
      values:
        Object.keys(readOnlyHelmChart.spec?.values).length > 0
          ? yaml.dump(readOnlyHelmChart.spec?.values)
          : '',

    });
  }

  useEffect(() => {
    if (performAction === DISCARD_ACTIONS.DISCARD_CHANGES) {
      reset()
    }
  }, [performAction]);



  const valueEditorProps = {
    height: '400px',
    options: {
      fontSize: 14,
      padding: {
        top: 20,
        bottom: 20,
      },
      tabSize: 2,
      minimap: {
        enabled: false,
      },
    },
  };

  return (
    <HelmChartLayout title="Values">
      <BoxPrimitive>
        <div className="basis-full flex flex-col">
          {isLoading ? (
            <LoadingPlaceHolder height={400} />
          ) : helmChart.spec?.chartVersion ? (
            <div className="flex flex-col gap-3xl h-full">
              <ExtendedFilledTab
                value={values.activeTab || 'defaults'}
                onChange={(e) => {
                  handleChange('activeTab')(dummyEvent(e));
                }}
                items={[
                  { label: 'Defaults', value: 'defaults' },
                  {
                    label: 'Values',
                    value: 'values',
                  },
                ]}
              />
              <CodeEditorClient
                {...valueEditorProps}
                options={{
                  ...valueEditorProps.options,
                  readOnly: values.activeTab === 'defaults',
                }}
                value={
                  values.activeTab === 'defaults' ? helmValues : values.values
                }
                lang="yaml"
                onChange={(e) => {
                  const path = editorRef.current.getModel().uri.path;

                  if (
                    values.activeTab === 'values' &&
                    path === '/values.yaml'
                  ) {
                    handleChange('values')(dummyEvent(e));
                  }
                }}
                path={
                  values.activeTab === 'defaults'
                    ? 'defaults.yaml'
                    : 'values.yaml'
                }
                onMount={(e) => {
                  editorRef.current = e;
                }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center bodyMd flex-col h-full">
              Select chart name and version
            </div>
          )}
        </div>

      </BoxPrimitive>
    </HelmChartLayout>
  );
};
export default SettingValues;
