import { useNavigate, useOutletContext } from '@remix-run/react';
import MultiStepProgress, {
  useMultiStepProgress,
} from '~/console/components/multi-step-progress';
import MultiStepProgressWrapper from '~/console/components/multi-step-progress-wrapper';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import {
  BottomNavigation,
  ReviewComponent,
} from '~/console/components/commons';
import { NameIdView } from '~/console/components/name-id-view';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import Select from '@kloudlite/design-system/atoms/select';
import { ReactNode, useState } from 'react';
import useDebounce from '~/root/lib/client/hooks/use-debounce';
import { CircleWavyCheckFill } from '@jengaicons/react';
import { cn } from '@kloudlite/design-system/utils';
import axios from 'axios';
import { toast } from '@kloudlite/design-system/molecule/toast';
import yaml from 'js-yaml';
import Pulsable from 'react-pulsable';
import ExtendedFilledTab from '~/console/components/extended-filled-tab';
import { TextArea } from '@kloudlite/design-system/atoms/input';
import { keyconstants } from '~/console/server/r-utils/key-constants';
import { IEnvironmentContext } from '../../_layout';
import { parseName } from '~/console/server/r-utils/common';
import { handleError } from '~/root/lib/utils/common';

const LOGO_URL = 'https://artifacthub.io/image/';

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
  // const { msvtemplates, cluster, account } =
  //   useOutletContext<IClusterContext>();

  const [hemlCharts, setHelmCharts] = useState<
    Array<{ label: string; value: string; item: IHelmDoc['entries']['key'] }>
  >([]);

  const [chartVersions, setChartVersions] = useState<
    IHelmDoc['entries']['key']
  >([]);

  const [helmChartsLoading, setHelmChartsLoading] = useState(false);
  const [isRepoCreatable, setIsRepoCreatable] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<string>('');
  const [repoErrors, setRepoErrors] = useState(false);

  const [repoSearchText, setRepoSearchText] = useState('');
  const [repos, setRepos] = useState<
    {
      label: string;
      value: string;
      repoUrl: string;
      render: () => ReactNode;
    }[]
  >([]);

  const [reposLoading, setReposLoading] = useState(false);
  const [chartName, setChartName] = useState<
    { label: string; value: string } | undefined
  >(undefined);
  const [chartVersion, setChartVersion] = useState<
    { label: string; value: string } | undefined
  >(undefined);
  const [helmValues, setHelmValues] = useState('');
  const [activeTab, setActiveTab] = useState('defaults');

  const { environment } = useOutletContext<IEnvironmentContext>();
  const navigate = useNavigate();
  const api = useConsoleApi();

  // const rootUrl = `/${parseName(account)}/infra/${parseName(
  //   account
  // )}/managed-services`;

  const rootUrl = `../helm-charts`;

  const { currentStep, jumpStep, nextStep } = useMultiStepProgress({
    defaultStep: 1,
    totalSteps: 4,
  });

  const fetchValues = async ({
    packageId,
    version,
  }: {
    packageId: string;
    version: string;
  }) => {
    try {
      const r = await axios({
        method: 'get',
        url: `/artifacthub-values-api`,
        params: {
          packageId,
          version,
        },
      });
      setHelmValues(r.data);
    } catch (err) {
      toast.error('Error fetching chart values');
    }
  };

  /* useEffect(() => {
    setChartName(undefined);
    setChartVersions([]);
  }, [hemlCharts]);

  useEffect(() => {
    setChartVersion(undefined);
  }, [chartVersions]); */

  const fetchHelmCharts = async (repoUrl: string) => {
    try {
      setRepoErrors(false);
      setHelmChartsLoading(true);
      const res = await axios.get(`/helmchart-api?url=${repoUrl}`);
      const repos = yaml.load(res.data, { json: true }) as IHelmDoc;
      setHelmCharts(
        Object.entries(repos.entries).map(([key, value]) => ({
          label: key,
          value: key,
          item: value,
        })),
      );
    } catch (error) {
      console.log(error);
      setRepoErrors(true);
    } finally {
      setHelmChartsLoading(false);
    }
  };

  const searchRepos = async (text: string) => {
    setChartVersions([]);
    if (text) {
      try {
        const r = await axios({
          method: 'get',
          url: '/artifacthub-api',
          params: {
            offset: 0,
            limit: 10,
            kind: 0,
            ts_query_web: text,
          },
        });

        setRepos(
          r.data.packages.map(
            (hc: {
              name: string;
              package_id: string;
              logo_image_id: string;
              repository: {
                url: string;
                name: string;
                verified_publisher: boolean;
                organization_display_name?: string;
                user_alias?: string;
              };
            }) => ({
              label: hc.name,
              value: hc.package_id,
              repoUrl: hc.repository.url,
              render: () => (
                <div className="flex flex-row gap-xl items-center">
                  <Pulsable isLoading={!hc.logo_image_id}>
                    <span className=" pulsable pulsable-img">
                      <img
                        className={cn({
                          'w-4xl aspect-square object-contain': true,
                        })}
                        src={`${LOGO_URL}${hc.logo_image_id}`}
                        alt={hc.name}
                      />
                    </span>
                  </Pulsable>
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-row gap-lg items-center">
                      <div className="flex-1">{hc.name}</div>
                      <div className="text-icon-primary mt-sm">
                        {hc.repository.verified_publisher && (
                          <CircleWavyCheckFill size={12} />
                        )}
                      </div>
                    </div>
                    <div className="bodySm text-text-disabled flex flex-row gap-md lowercase">
                      <span>
                        {hc.repository.organization_display_name ? (
                          <span>
                            ORG:{' '}
                            <span className="bodySm-semibold">
                              {hc.repository.organization_display_name}
                            </span>
                          </span>
                        ) : (
                          <span>
                            USER:{' '}
                            <span className="bodySm-semibold">
                              {hc.repository.user_alias}
                            </span>
                          </span>
                        )}
                      </span>{' '}
                      |{' '}
                      <span>
                        REPO:{' '}
                        <span className="bodySm-semibold">
                          {hc.repository.name}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ),
            }),
          ),
        );
      } catch {
        setRepoErrors(true);
      } finally {
        setReposLoading(false);
      }
    } else {
      //
      setReposLoading(false);
      setRepos([]);
    }
  };

  useDebounce(
    async () => {
      if (!repoSearchText.startsWith('https://')) {
        searchRepos(repoSearchText);
        setIsRepoCreatable(false);
      } else {
        setIsRepoCreatable(true);
        setReposLoading(false);
        setRepos([]);
      }
    },
    200,
    [repoSearchText],
  );

  const { values, errors, handleSubmit, handleChange, isLoading, resetValues } =
    useForm({
      initialValues: {
        displayName: '',
        name: '',
        chartName: '',
        chartRepoURL: '',
        chartVersion: '',
        values: '',
        isNameError: false,
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
                    [keyconstants.helmChartRepoPackageId]: selectedRepo,
                  },
                },
                spec: {
                  chartName: val.chartName,
                  chartRepoURL: val.chartRepoURL,
                  chartVersion: val.chartVersion,
                  values: val.values
                    ? yaml.load(val.values, { json: true })
                    : {},
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

  useDebounce(
    () => {
      if (values.chartRepoURL) {
        fetchHelmCharts(values.chartRepoURL);
      }
    },
    300,
    [values.chartRepoURL],
  );

  return (
    <MultiStepProgressWrapper
      title="Let’s create new helm chart."
      subTitle="Simplify Collaboration and Enhance Productivity with Kloudlite teams"
      backButton={{
        content: 'Back to Helm charts',
        to: rootUrl,
      }}
    >
      <MultiStepProgress.Root currentStep={currentStep} jumpStep={jumpStep}>
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
              resType="environment"
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
              // open
              showclear={!!values.chartRepoURL}
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
                } else {
                  handleChange('chartRepoURL')(dummyEvent(value.value));
                }
                setSelectedRepo(value.value);
                setHelmCharts([]);
              }}
              onSearch={(text) => {
                setRepoSearchText(text);
                setReposLoading(true);
              }}
              valueRender={repoRenderer}
              loading={reposLoading}
              noOptionMessage={
                <div className="p-2xl bodyMd text-center">
                  Search for or enter the repo url
                </div>
              }
              error={repoErrors}
              message={repoErrors ? 'Error loading helm charts.' : ''}
            />
            <Select
              label="Chart name"
              placeholder="Chart name"
              searchable
              size="lg"
              disabled={
                hemlCharts.length === 0 ||
                reposLoading ||
                repoErrors ||
                !selectedRepo
              }
              //@ts-ignore
              value={chartName?.value}
              options={async () => hemlCharts}
              loading={!repoErrors && helmChartsLoading}
              onChange={(val) => {
                handleChange('chartName')(dummyEvent(val.value));
                setChartName(val);
                setChartVersions(filterUniqueVersions(val.item));
              }}
              onSearch={() => true}
            />
            <Select
              searchable
              label="Chart version"
              size="lg"
              placeholder="Chart version"
              disabled={
                reposLoading ||
                helmChartsLoading ||
                repoErrors ||
                !values.chartName
              }
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
                setHelmValues('');
                fetchValues({ packageId: selectedRepo, version: val.value });
              }}
              onSearch={() => true}
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
                    value={activeTab}
                    onChange={setActiveTab}
                    items={[
                      { label: 'Defaults', value: 'defaults' },
                      {
                        label: 'Values',
                        value: 'values',
                      },
                    ]}
                  />
                  <TextArea
                    containerClassName="h-full"
                    className="h-[500px]"
                    textFieldClassName={cn(
                      '!font-mono whitespace-pre break-normal overflow-x-scroll',
                    )}
                    placeholder={
                      activeTab === 'defaults'
                        ? 'Default values'
                        : 'Helm Values'
                    }
                    onChange={(e) => {
                      if (activeTab === 'values') {
                        handleChange('values')(e);
                      }
                    }}
                    error={!!errors.values}
                    message={errors.values}
                    value={(() => {
                      if (activeTab === 'defaults') {
                        return helmValues;
                      }
                      if (activeTab === 'values') {
                        return values.values;
                      }
                      return '';
                    })()}
                    name="helm-chart-values"
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
              {values.values && (
                <ReviewComponent
                  title="Values"
                  onEdit={() => {
                    jumpStep(3);
                  }}
                >
                  <div className="flex flex-col gap-xl p-xl rounded border border-border-default divide-y divide-border-default">
                    <p className="whitespace-pre-wrap line-clamp-[10]">
                      {values.values}
                    </p>
                  </div>
                </ReviewComponent>
              )}
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
