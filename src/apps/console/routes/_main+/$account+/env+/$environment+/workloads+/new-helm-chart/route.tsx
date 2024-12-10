import Select from '@kloudlite/design-system/atoms/select';
import { toast } from '@kloudlite/design-system/molecule/toast';
import { cn } from '@kloudlite/design-system/utils';
import { useNavigate, useOutletContext } from '@remix-run/react';
import yaml from 'js-yaml';
import { useRef, useState } from 'react';
import FillerHelm from '~/console/assets/filler-helm';
import {
  BottomNavigation,
  ReviewComponent,
} from '~/console/components/commons';
import ExtendedFilledTab from '~/console/components/extended-filled-tab';
import MultiStepProgress, {
  useMultiStepProgress,
} from '~/console/components/multi-step-progress';
import MultiStepProgressWrapper from '~/console/components/multi-step-progress-wrapper';
import { NameIdView } from '~/console/components/name-id-view';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { parseName } from '~/console/server/r-utils/common';
import { keyconstants } from '~/console/server/r-utils/key-constants';
import CodeEditorClient from '~/root/lib/client/components/editor-client';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { handleError } from '~/root/lib/utils/common';
import { IEnvironmentContext } from '../../_layout';
import useFetchHelmCharts from '../helm-charts/helm-utils/use-fetch-helmcharts';
import useFetchHelmValue from '../helm-charts/helm-utils/use-fetch-helmvalues';
import useHelmRepoSearch from '../helm-charts/helm-utils/use-helm-repo-search';

type IHelmDoc = {
  apiVersion: string;
  entries: {
    [key: string]: { version: string }[];
  };
  generated: string;
};

const repoRenderer = ({
  value,
  repoUrl,
}: {
  value: string;
  repoUrl: string;
}) => {
  return (
    <div className="flex flex-row gap-xl items-center bodyMd text-text-default">
      <span>{!repoUrl ? value : repoUrl}</span>
    </div>
  );
};

const filterUniqueVersions = (versions: IHelmDoc['entries']['keys']) => {
  return versions.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.version === obj.version),
  );
};

const HelmChartLayout = () => {
  const { environment } = useOutletContext<IEnvironmentContext>();
  const navigate = useNavigate();
  const api = useConsoleApi();

  const rootUrl = `../helm-charts`;

  const editorRef = useRef<any>();

  const [chartVersions, setChartVersions] = useState<
    IHelmDoc['entries']['key']
  >([]);

  const [selectedRepo, setSelectedRepo] = useState<string>('');
  const [packageId, setPackageId] = useState<string>('');

  const [repoSearchText, setRepoSearchText] = useState('');

  const [chartName, setChartName] = useState<
    { label: string; value: string } | undefined
  >(undefined);
  const [chartVersion, setChartVersion] = useState<
    { label: string; value: string } | undefined
  >(undefined);

  const { currentStep, jumpStep, nextStep } = useMultiStepProgress({
    defaultStep: 1,
    totalSteps: 4,
  });

  const { values: helmValues } = useFetchHelmValue({
    packageId,
    version: chartVersion?.value,
  });

  const {
    repos,
    isRepoCreatable,
    loading: repoLoading,
  } = useHelmRepoSearch({ searchText: repoSearchText });

  const { values, errors, handleSubmit, handleChange, isLoading } = useForm({
    initialValues: {
      displayName: '',
      name: '',
      chartName: '',
      chartRepoURL: '',
      chartVersion: '',
      values: '',
      isNameError: false,
      activeTab: 'values',
    },
    validationSchema: Yup.object({
      displayName: Yup.string().required(),
      name: Yup.string().required(),
      chartName: Yup.string().test(
        'required',
        'Chart Name is required',
        (v) => {
          return !(currentStep === 2 && !v);
        },
      ),
      chartRepoURL: Yup.string().test(
        'required',
        'Chart Repo Url is required',
        (v) => {
          return !(currentStep === 2 && !v);
        },
      ),
      chartVersion: Yup.string().test(
        'required',
        'Chart Version is required',
        (v) => {
          return !(currentStep === 2 && !v);
        },
      ),
    }),

    onSubmit: async (val) => {
      const submit = async () => {
        try {
          const { errors } = await api.createHelmChart({
            envName: parseName(environment),
            helmchart: {
              displayName: val.displayName,
              metadata: {
                name: val.name,
                annotations: {
                  [keyconstants.helmChartRepoPackageId]: packageId,
                },
              },
              spec: {
                chartName: val.chartName,
                chartRepoURL: val.chartRepoURL,
                chartVersion: val.chartVersion,
                values: val.values ? yaml.load(val.values, { json: true }) : {},
              },
            },
          });

          if (errors) {
            throw errors[0];
          }

          toast.success('Helm chart created successfully');
          navigate(rootUrl);
        } catch (err) {
          handleError(err);
        }
      };

      switch (currentStep) {
        case 1:
          nextStep();
          break;
        case 2:
          nextStep();
          break;
        case 3:
          nextStep();
          break;
        case 4:
          await submit();
          break;
        default:
          break;
      }
    },
  });

  const { helmCharts, loading: helmChartsLoading } = useFetchHelmCharts({
    repoUrl: values.chartRepoURL,
  });

  const resetHelmFields = () => {
    handleChange('chartName')(dummyEvent(''));
    handleChange('chartVersion')(dummyEvent(''));
    setChartName(undefined);
    setChartVersion(undefined);
    setChartVersions([]);
    setSelectedRepo('');
    handleChange('chartRepoURL')(dummyEvent(''));
  };

  const valueEditorProps = {
    height: '500px',
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
    <MultiStepProgressWrapper
      title="Let’s create new helm chart."
      subTitle="Simplify Collaboration and Enhance Productivity with Kloudlite teams"
      backButton={{
        content: 'Back to Helm charts',
        to: rootUrl,
      }}
      className="!max-w-[none]"
      fillerImage={<FillerHelm />}
    >
      <MultiStepProgress.Root
        currentStep={currentStep}
        jumpStep={jumpStep}
        className={cn({
          'max-w-[568px]': currentStep !== 3,
        })}
      >
        <MultiStepProgress.Step label="Helm chart details" step={1}>
          <form
            className="flex flex-col gap-3xl"
            onSubmit={(e) => {
              if (!values.isNameError) {
                handleSubmit(e);
              } else {
                e.preventDefault();
              }
            }}
          >
            <div className="bodyMd text-text-soft">
              The Helm chart for deploying and managing applications in
              Kubernetes clusters, offering simplified configurations,
              versioning, and scalability.
            </div>
            <NameIdView
              resType="helm_chart"
              displayName={values.displayName}
              name={values.name}
              label="Helm chart name"
              placeholder="Enter helm chart name"
              errors={errors.name}
              handleChange={handleChange}
              nameErrorLabel="isNameError"
            />
            <BottomNavigation
              primaryButton={{
                type: 'submit',
                loading: isLoading,
                content: 'Next',
              }}
            />
          </form>
        </MultiStepProgress.Step>

        <MultiStepProgress.Step label="Advanced details" step={2}>
          <form className="flex flex-col gap-3xl" onSubmit={handleSubmit}>
            <div className="bodyMd text-text-soft">
              Provide advanced chart details for a customized setup.
            </div>
            <Select
              size="lg"
              label="Chart repo url"
              placeholder="Search for or enter the repo url"
              searchable
              creatable={isRepoCreatable}
              options={async () => repos}
              value={selectedRepo}
              onChange={(value) => {
                if (!repoSearchText.startsWith('https://')) {
                  handleChange('chartRepoURL')(dummyEvent(value.repoUrl));
                  setPackageId(value.value);
                } else {
                  handleChange('chartRepoURL')(dummyEvent(value.value));
                }
                setSelectedRepo(value.value);
              }}
              onSearch={(text) => {
                setRepoSearchText(text);
                resetHelmFields();
              }}
              valueRender={repoRenderer}
              loading={repoLoading}
              noOptionMessage={
                <div className="p-2xl bodyMd text-center">
                  Search for or enter the repo url
                </div>
              }
              error={!!errors.chartRepoURL}
              message={errors.chartRepoURL}
            />
            <Select
              label="Chart name"
              placeholder="Chart name"
              searchable
              size="lg"
              disabled={
                helmCharts.length === 0 || repoLoading || !values.chartRepoURL
              }
              // @ts-ignore
              value={chartName?.value}
              options={async () => helmCharts}
              loading={!errors.chartVersion && helmChartsLoading}
              onChange={(val) => {
                handleChange('chartName')(dummyEvent(val.value));
                setChartName(val);
                setChartVersion(undefined);
                handleChange('chartVersion')(dummyEvent(''));
                setChartVersions(filterUniqueVersions(val.item));
              }}
              onSearch={() => true}
              error={!!errors.chartName}
              message={errors.chartName}
            />
            <Select
              searchable
              label="Chart version"
              size="lg"
              placeholder="Chart version"
              disabled={repoLoading || helmChartsLoading || !values.chartName}
              value={chartVersion?.value}
              options={async () => [
                ...chartVersions.map((cv) => ({
                  label: cv.version,
                  value: cv.version,
                })),
              ]}
              loading={helmChartsLoading}
              onChange={(val) => {
                handleChange('chartVersion')(dummyEvent(val.value));
                setChartVersion(val);
              }}
              onSearch={() => true}
              error={!!errors.chartVersion}
              message={errors.chartVersion}
            />
            <BottomNavigation
              primaryButton={{
                type: 'submit',
                loading: isLoading,
                content: 'Next',
              }}
            />
          </form>
        </MultiStepProgress.Step>
        <MultiStepProgress.Step label="Values" step={3}>
          <form className="flex flex-col gap-3xl" onSubmit={handleSubmit}>
            <div className="bodyMd text-text-soft">
              Provide advanced chart details for a customized setup.
            </div>
            <div className="basis-full flex flex-col">
              {chartVersion ? (
                <div className="flex flex-col gap-3xl h-full">
                  <ExtendedFilledTab
                    value={values.activeTab}
                    onChange={(e) => {
                      handleChange('activeTab')(dummyEvent(e));
                    }}
                    items={
                      packageId
                        ? [
                            { label: 'Defaults', value: 'defaults' },
                            {
                              label: 'Values',
                              value: 'values',
                            },
                          ]
                        : [
                            {
                              label: 'Values',
                              value: 'values',
                            },
                          ]
                    }
                  />
                  <CodeEditorClient
                    {...valueEditorProps}
                    options={{
                      ...valueEditorProps.options,
                      readOnly: values.activeTab === 'defaults',
                    }}
                    value={
                      values.activeTab === 'defaults'
                        ? helmValues
                        : values.values
                    }
                    lang="yaml"
                    onChange={(e) => {
                      const { path } = editorRef.current.getModel().uri;

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
            <BottomNavigation
              primaryButton={{
                type: 'submit',
                loading: isLoading,
                content: 'Next',
              }}
            />
          </form>
        </MultiStepProgress.Step>
        <MultiStepProgress.Step label="Review" step={4}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3xl">
            <div className="flex flex-col gap-xl">
              <ReviewComponent
                title="Helm chart detail"
                onEdit={() => {
                  jumpStep(1);
                }}
              >
                <div className="flex flex-col p-xl gap-lg rounded border border-border-default">
                  <div className="flex flex-col gap-md">
                    <div className="bodyMd-semibold text-text-default">
                      {values.displayName}
                    </div>
                    <div className="bodySm text-text-soft">{values.name}</div>
                  </div>
                </div>
              </ReviewComponent>

              <ReviewComponent
                title="Advance details"
                onEdit={() => {
                  jumpStep(2);
                }}
              >
                <div className="flex flex-col gap-xl p-xl rounded border border-border-default divide-y divide-border-default">
                  <div className="flex flex-col gap-lg">
                    <div className="flex-1 bodyMd-medium text-text-default">
                      Chart repo url
                    </div>
                    <div className="text-text-soft bodyMd">
                      {values.chartRepoURL}
                    </div>
                  </div>
                  <div className="flex flex-col gap-lg pt-xl">
                    <div className="flex-1 bodyMd-medium text-text-default">
                      Chart name
                    </div>
                    <div className="text-text-soft bodyMd">
                      {values.chartName}
                    </div>
                  </div>
                  <div className="flex flex-col gap-lg pt-xl">
                    <div className="flex-1 bodyMd-medium text-text-default">
                      Chart version
                    </div>
                    <div className="text-text-soft bodyMd">
                      {values.chartVersion}
                    </div>
                  </div>
                </div>
              </ReviewComponent>
            </div>
            <BottomNavigation
              primaryButton={{
                type: 'submit',
                loading: isLoading,
                content: 'Create helm chart',
              }}
            />
          </form>
        </MultiStepProgress.Step>
      </MultiStepProgress.Root>
    </MultiStepProgressWrapper>
  );
};

const NewHelmChart = () => {
  return <HelmChartLayout />;
};

export const handle = {
  noMainLayout: true,
  noLayout: true,
};

export default NewHelmChart;
