/* eslint-disable react/destructuring-assignment */
import { TextInput } from '@kloudlite/design-system/atoms/input';
import Popup from '@kloudlite/design-system/molecule/popup';
import { IDialogBase } from '~/console/components/types.d';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { IHelmCharts } from '~/console/server/gql/queries/helm-chart-queries';
import { ExtractNodeType, parseName } from '~/console/server/r-utils/common';
import { useReload } from '~/root/lib/client/helpers/reloader';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { handleError } from '~/root/lib/utils/common';
import yaml from 'js-yaml';
import { useOutletContext } from '@remix-run/react';

import { useEffect, useRef, useState } from 'react';
import Select from '@kloudlite/design-system/atoms/select';
import { NameIdView } from '~/console/components/name-id-view';

import ExtendedFilledTab from '~/console/components/extended-filled-tab';
import { keyconstants } from '~/console/server/r-utils/key-constants';

import { IEnvironmentContext } from '../../_layout';
import CodeEditorClient from '~/root/lib/client/components/editor-client';
import { LoadingPlaceHolder } from '~/console/components/loading';
import useFetchHelmCharts from './helm-utils/use-fetch-helmcharts';
import useFetchHelmValue from './helm-utils/use-fetch-helmvalues';

type IDialog = IDialogBase<ExtractNodeType<IHelmCharts>>;

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

const Root = (props: IDialog) => {
  const { isUpdate, setVisible } = props;
  const api = useConsoleApi();
  const reloadPage = useReload();
  const editorRef = useRef<any>();

  const { environment } = useOutletContext<IEnvironmentContext>();

  const [chartVersions, setChartVersions] = useState<
    IHelmDoc['entries']['key']
  >([]);

  const [chartName, setChartName] = useState<
    { label: string; value: string } | undefined
  >(undefined);
  const [chartVersion, setChartVersion] = useState<
    { label: string; value: string } | undefined
  >(undefined);

  const { values: helmValues, isLoading: helmValuesLoading } =
    useFetchHelmValue({
      packageId: isUpdate
        ? props.data.metadata?.annotations?.[
            keyconstants.helmChartRepoPackageId
          ]
        : '',
      version: chartVersion?.value,
    });

  useEffect(() => {
    if (isUpdate) {
      if (chartVersions && chartVersions.length > 0) {
        setChartVersion({
          label: props.data.spec?.chartVersion || '',
          value: props.data.spec?.chartVersion || '',
        });
      }
    }
  }, [chartVersions]);

  const { values, errors, handleSubmit, handleChange, isLoading, resetValues } =
    useForm({
      initialValues: !isUpdate
        ? {}
        : {
            isNameError: false,
            displayName: props.data.displayName,
            name: props.data.metadata?.name || '',
            values:
              Object.keys(props.data.spec?.values).length > 0
                ? yaml.dump(props.data.spec?.values)
                : '',
            chartName: props.data.spec?.chartName,
            chartRepoURL: props.data.spec?.chartRepoURL,
            activeTab: 'defaults',
          },
      validationSchema: Yup.object({
        displayName: Yup.string().required(),
        name: Yup.string().required(),
        chartRepoURL: Yup.string(),
      }),

      onSubmit: async (val) => {
        if (!val.name) {
          throw new Error('This helm chart has no name');
        }
        if (!chartName?.value || !chartVersion?.value) {
          return;
        }
        try {
          if (isUpdate) {
            if (!props.data || !props.data.spec) {
              throw new Error('No spec found');
            }
            const { errors } = await api.updateHelmChart({
              envName: parseName(environment),
              helmchart: {
                displayName: val.displayName,
                metadata: {
                  name: val.name,
                  annotations: {
                    [keyconstants.helmChartRepoPackageId]:
                      props.data.metadata?.annotations?.[
                        keyconstants.helmChartRepoPackageId
                      ],
                  },
                },
                spec: {
                  chartName: props.data.spec?.chartName,
                  chartVersion: chartVersion?.value,
                  chartRepoURL: val.chartRepoURL!,
                  values: val.values
                    ? yaml.load(val.values, { json: true })
                    : {},
                },
              },
            });

            if (errors) {
              throw errors[0];
            }
          }
          reloadPage();
          setVisible(false);
          resetValues();
        } catch (error) {
          handleError(error);
        }
      },
    });

  console.log('here');
  const { helmCharts, loading: helmChartsLoading } = useFetchHelmCharts({
    repoUrl: isUpdate ? props.data.spec?.chartRepoURL : '',
  });

  useEffect(() => {
    if (isUpdate) {
      if (helmCharts && helmCharts.length > 0) {
        setChartVersions(
          filterUniqueVersions(
            helmCharts.find((v) => v.value === props.data.spec?.chartName)
              ?.item || [],
          ),
        );
        setChartName({
          label: props.data.spec?.chartName || '',
          value: props.data.spec?.chartName || '',
        });
      }
    }
  }, [helmCharts]);

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
    <Popup.Form
      onSubmit={(e) => {
        if (!values.isNameError) {
          handleSubmit(e);
        } else {
          e.preventDefault();
        }
      }}
    >
      <Popup.Content className="!w-[900px]">
        <div className="flex flex-row gap-2xl ">
          <div className="flex flex-col gap-2xl basis-full border-border-default border-r pr-2xl min-h-[466px] max-w-[350px]">
            <NameIdView
              resType="helm_chart"
              displayName={values.displayName}
              name={values.name}
              label="Name"
              placeholder="Enter helm chart name"
              errors={errors.name}
              handleChange={handleChange}
              nameErrorLabel="isNameError"
              isUpdate={true}
            />

            <TextInput
              value={values.chartRepoURL}
              disabled
              label="Chart repo url"
            />
            <TextInput
              value={chartName?.value}
              disabled
              label="Chart name"
              placeholder="Chart name"
            />
            <Select
              searchable
              label="Chart version"
              placeholder="Chart version"
              disabled={
                (!isUpdate &&
                  (chartVersions.length === 0 || helmChartsLoading)) ||
                (isUpdate && helmChartsLoading)
              }
              value={chartVersion?.value}
              options={async () => [
                ...chartVersions.map((cv) => ({
                  label: cv.version,
                  value: cv.version,
                })),
              ]}
              loading={isUpdate && helmChartsLoading}
              onChange={(val) => {
                setChartVersion(val);
              }}
              onSearch={() => true}
            />
          </div>
          <div className="basis-full flex flex-col">
            {helmValuesLoading ? (
              <LoadingPlaceHolder height={200} />
            ) : chartVersion ? (
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
        </div>
      </Popup.Content>
      <Popup.Footer>
        <Popup.Button content="Cancel" variant="basic" closable />
        <Popup.Button
          loading={isLoading}
          type="submit"
          content={isUpdate ? 'Update' : 'Install'}
          variant="primary"
        />
      </Popup.Footer>
    </Popup.Form>
  );
};

const HandleHelmChart = (props: IDialog) => {
  const { isUpdate, setVisible, visible } = props;

  return (
    <Popup.Root
      show={visible}
      onOpenChange={(v) => setVisible(v)}
      className="!w-[900px]"
    >
      <Popup.Header>
        {isUpdate ? 'Edit helm chart' : 'Install helm chart'}
      </Popup.Header>
      {(!isUpdate || (isUpdate && props.data)) && <Root {...props} />}
    </Popup.Root>
  );
};

export default HandleHelmChart;
