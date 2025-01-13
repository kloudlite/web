/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
import { NumberInput, TextInput } from '@kloudlite/design-system/atoms/input';
import Select from '@kloudlite/design-system/atoms/select';
import { Switch } from '@kloudlite/design-system/atoms/switch';
import { titleCase, uuid } from '@kloudlite/design-system/utils';
import { useNavigate, useOutletContext, useParams } from '@remix-run/react';
import yaml from 'js-yaml';
import {
  FormEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import {
  BottomNavigation,
  ReviewComponent,
} from '~/console/components/commons';
import ExtendedFilledTab from '~/console/components/extended-filled-tab';
import { LoadingPlaceHolder } from '~/console/components/loading';
import MultiStepProgress, {
  useMultiStepProgress,
} from '~/console/components/multi-step-progress';
import MultiStepProgressWrapper from '~/console/components/multi-step-progress-wrapper';
import { NameIdView } from '~/console/components/name-id-view';
import { useClusterStatusV3 } from '~/console/hooks/use-cluster-status-v3';
import { ClusterSelectItem } from '~/console/page-components/handle-environment';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import {
  IMSvPlugin,
  IMsvPlugins,
} from '~/console/server/gql/queries/managed-templates-queries';
import { parseName, parseNodes } from '~/console/server/r-utils/common';
import { keyconstants } from '~/console/server/r-utils/key-constants';
import { ensureAccountClientSide } from '~/console/server/utils/auth-utils';
import { flatM, flatMapValidations } from '~/console/utils/commons';
import CodeEditorClient from '~/root/lib/client/components/editor-client';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { handleError } from '~/root/lib/utils/common';
import { IAccountContext } from '../_layout';
import useFetchHelmCharts from '../env+/$environment+/workloads+/helm-charts/helm-utils/use-fetch-helmcharts';
import useFetchHelmValue from '../env+/$environment+/workloads+/helm-charts/helm-utils/use-fetch-helmvalues';
import useHelmRepoSearch from '../env+/$environment+/workloads+/helm-charts/helm-utils/use-helm-repo-search';
import TolerationsKeyValuePair from '~/console/components/tolerations-fields';
import KeyValuePair from '~/console/components/key-value-pair-node-selector';

// type IDialog = IDialogBase<ExtractNodeType<IHelmCharts>>;

type IHelmDoc = {
  apiVersion: string;
  entries: {
    [key: string]: { version: string }[];
  };
  generated: string;
};

const helmValueEditorProps = {
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

const valueEditorProps = {
  height: '200px',
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

const valueRender = ({ label, icon }: { label: string; icon: string }) => {
  return (
    <div className="flex flex-row gap-lg items-center">
      <span>
        <img alt={label} src={icon} className="w-2xl h-w-2xl" />
      </span>
      <div>{label}</div>
    </div>
  );
};

const RenderHelmFields = ({
  values,
  onChange,
  errors,
  fields,
}: {
  onChange: (e: string) => (e: { target: { value: any } }) => void;
  values: any;
  errors: {
    [key: string]: string;
  };
  fields: IMSvPlugin['spec']['services'][0]['inputs'];
}) => {
  const [activeTab, setActiveTab] = useState('defaults');

  const editorRef = useRef<any>();

  const [chartVersions, setChartVersions] = useState<
    IHelmDoc['entries']['key']
  >([]);

  const [selectedRepo, setSelectedRepo] = useState<string>('');

  const [repoSearchText, setRepoSearchText] = useState('');

  const [chartName, setChartName] = useState<
    { label: string; value: string } | undefined
  >(undefined);
  const [chartVersion, setChartVersion] = useState<
    { label: string; value: string } | undefined
  >(undefined);

  const { values: helmValues, isLoading: helmValuesLoading } =
    useFetchHelmValue({
      packageId: selectedRepo,
      version: chartVersion?.value,
    });

  const {
    repos,
    isRepoCreatable,
    loading: repoLoading,
  } = useHelmRepoSearch({ searchText: repoSearchText });

  const { helmCharts, loading: helmChartsLoading } = useFetchHelmCharts({
    repoUrl: values.res.chart.url,
  });

  const resetFields = () => {
    onChange('res.chart.name')(dummyEvent(''));
    onChange('res.chart.version')(dummyEvent(''));
    setChartName(undefined);
    setChartVersion(undefined);
    setChartVersions([]);
  };

  return (
    <div className="flex flex-col gap-3xl">
      {fields.map((field) => {
        switch (field.input) {
          case 'chart.url':
            return (
              <Select
                size="lg"
                label={field.label}
                placeholder="Search for or enter the repo url"
                searchable
                creatable={isRepoCreatable}
                options={async () => repos}
                value={selectedRepo}
                onChange={(value) => {
                  if (!repoSearchText.startsWith('https://')) {
                    onChange(`res.${field.input}`)(dummyEvent(value.repoUrl));
                  } else {
                    onChange(`res.${field.input}`)(dummyEvent(value.value));
                  }
                  setSelectedRepo(value.value);
                  onChange('helmPackageId')(dummyEvent(value.value));
                  /* setHelmCharts([]); */
                  resetFields();
                }}
                onSearch={(text) => {
                  setRepoSearchText(text);
                  resetFields();
                  setSelectedRepo('');
                  onChange(`res.${field.input}`)(dummyEvent(''));
                }}
                valueRender={repoRenderer}
                loading={repoLoading}
                noOptionMessage={
                  <div className="p-2xl bodyMd text-center">
                    Search for or enter the repo url
                  </div>
                }
                // error={!!errors[fieldKey]}
                // message={errors[fieldKey]}
              />
            );
          case 'chart.name':
            return (
              <Select
                label={field.label}
                placeholder="Chart name"
                searchable
                size="lg"
                disabled={
                  helmCharts.length === 0 || repoLoading || !selectedRepo
                }
                // @ts-ignore
                disableWhileLoading
                value={chartName?.value}
                options={async () => helmCharts}
                loading={!errors.chartVersion && helmChartsLoading}
                onChange={(val) => {
                  onChange(`res.${field.input}`)(dummyEvent(val.value));
                  setChartName(val);
                  setChartVersion(undefined);
                  onChange(`res.chart.version`)(dummyEvent(''));
                  setChartVersions(filterUniqueVersions(val.item));
                }}
                onSearch={() => true}
                error={!!errors.chartName}
                message={errors.chartName}
              />
            );
          case 'chart.version':
            return (
              <Select
                searchable
                size="lg"
                label="Chart version"
                placeholder="Chart version"
                disableWhileLoading
                disabled={chartVersions.length === 0 || helmChartsLoading}
                value={chartVersion?.value}
                options={async () => [
                  ...chartVersions.map((cv) => ({
                    label: cv.version,
                    value: cv.version,
                  })),
                ]}
                loading={helmChartsLoading}
                onChange={(val) => {
                  onChange(`res.${field.input}`)(dummyEvent(val.value));
                  setChartVersion(val);
                }}
                onSearch={() => true}
              />
            );
          case 'helmValues':
            return (
              <div className="basis-full flex flex-col">
                {helmValuesLoading ? (
                  <LoadingPlaceHolder height={466} />
                ) : (
                  chartVersion && (
                    <div className="flex flex-col gap-3xl h-full">
                      <ExtendedFilledTab
                        value={activeTab || 'defaults'}
                        onChange={(e) => {
                          // onChange('activeTab')(dummyEvent(e));
                          setActiveTab(e);
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
                        {...helmValueEditorProps}
                        options={{
                          ...helmValueEditorProps.options,
                          readOnly: activeTab === 'defaults',
                        }}
                        value={
                          activeTab === 'defaults'
                            ? helmValues
                            : values.res.helmValues
                        }
                        lang="yaml"
                        onChange={(e) => {
                          const { path } = editorRef.current.getModel().uri;

                          if (
                            activeTab === 'values' &&
                            path === '/values.yaml'
                          ) {
                            onChange('res.helmValues')(dummyEvent(e));
                          }
                        }}
                        path={
                          activeTab === 'defaults'
                            ? 'defaults.yaml'
                            : 'values.yaml'
                        }
                        onMount={(e) => {
                          editorRef.current = e;
                        }}
                      />
                    </div>
                  )
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

const Tolerations = ({
  label,
  value,
  input,
  onChange,
}: {
  label: string;
  value: Record<string, any>[];
  input: string;
  onChange: (e: string) => (e: { target: { value: any } }) => void;
}) => {
  const [ids, setIDs] = useState<string[]>([uuid()]);
  return (
    <div className="flex flex-col gap-2xl">
      <div className="bodyMd-medium text-text-default">{label}</div>
      <TolerationsKeyValuePair
        ids={ids}
        value={value}
        onChange={(e) => {
          onChange(`res.${input}`)(dummyEvent(e));
        }}
        onIdChange={(idss) => setIDs(idss)}
      />
    </div>
  );
};

const NodeSelector = ({
  label,
  value,
  input,
  onChange,
}: {
  label: string;
  value: Record<string, any>[];
  input: string;
  onChange: (e: string) => (e: { target: { value: any } }) => void;
}) => {
  const [ids, setIDs] = useState<string[]>([uuid()]);
  return (
    <div className="flex flex-col gap-2xl">
      <div className="bodyMd-medium text-text-default">{label}</div>
      <KeyValuePair
        ids={ids}
        value={Object.entries(value || {}).map(([key, value]) => ({
          key,
          value,
        }))}
        onChange={(e) => {
          onChange(`res.${input}`)(
            dummyEvent(
              e.reduce((prev, curr) => {
                prev[curr.key] = curr.value;
                return prev;
              }, {}),
            ),
          );
        }}
        onIdChange={(idss) => setIDs(idss)}
      />
    </div>
  );
};

const RenderField = ({
  field,
  value,
  onChange,
  errors,
  fieldKey,
}: {
  //   field: IMSvTemplate['fields'][number];
  field: IMSvPlugin['spec']['services'][0]['inputs'][number];
  onChange: (e: string) => (e: { target: { value: any } }) => void;
  value: any;
  errors: {
    [key: string]: string;
  };
  fieldKey: string;
}) => {
  const [qos, setQos] = useState(false);
  // const editorRef = useRef<any>();

  if (field.type === 'Number') {
    return (
      <NumberInput
        error={!!errors[fieldKey]}
        message={errors[fieldKey]}
        label={`${field.label}${field.required ? ' *' : ''}`}
        placeholder={field.label}
        value={parseFloat(value) / (field.multiplier || 1) || ''}
        size="lg"
        onChange={({ target }) => {
          onChange(`res.${field.input}`)(
            dummyEvent(
              `${parseFloat(target.value) * (field.multiplier || 1)}${
                field.unit
              }`,
            ),
          );
        }}
        suffix={field.displayUnit}
      />
    );
  }

  if (field.type === 'String') {
    return (
      <TextInput
        label={field.label}
        value={value || ''}
        onChange={onChange(`res.${field.input}`)}
        suffix={field.displayUnit}
        error={!!errors[fieldKey]}
        message={errors[fieldKey]}
        size="lg"
      />
    );
  }

  if (field.type === 'text/yaml' && field.input === 'nodeSelector') {
    return (
      <NodeSelector
        label={field.label}
        value={value}
        input={field.input}
        onChange={onChange}
      />
    );
  }

  if (field.type === 'text/yaml' && field.input === 'tolerations') {
    return (
      <Tolerations
        label={field.label}
        value={value}
        input={field.input}
        onChange={onChange}
      />
    );
  }

  if (field.type === 'int-range') {
    return (
      <div className="flex flex-col gap-md">
        <div className="bodyMd-medium text-text-default">
          {`${field.label}${field.required ? ' *' : ''}`} ({field.displayUnit})
        </div>
        <div className="flex flex-row gap-xl items-center">
          <div className="flex flex-row gap-xl items-end flex-1 ">
            <div className="flex-1">
              <NumberInput
                size="lg"
                error={!!errors[`${fieldKey}.min`]}
                message={errors[`${fieldKey}.min`]}
                placeholder={`${field.label} min`}
                value={parseFloat(value.min) / (field.multiplier || 1)}
                onChange={({ target }) => {
                  onChange(`res.${field.input}.min`)(
                    dummyEvent(
                      `${parseFloat(target.value) * (field.multiplier || 1)}${
                        field.unit
                      }`,
                    ),
                  );
                  if (qos) {
                    onChange(`res.${field.input}.max`)(
                      dummyEvent(
                        `${parseFloat(target.value) * (field.multiplier || 1)}${
                          field.unit
                        }`,
                      ),
                    );
                  }
                }}
                suffix={
                  <div className="flex items-center gap-md">
                    <span className="text-sm text-text-soft">min</span>
                  </div>
                }
              />
            </div>

            <div className="flex-1">
              <NumberInput
                size="lg"
                error={!!errors[`${fieldKey}.max`]}
                message={errors[`${fieldKey}.max`]}
                placeholder={`${field.label} max`}
                value={parseFloat(value.max) / (field.multiplier || 1)}
                onChange={({ target }) => {
                  onChange(`res.${field.input}.max`)(
                    dummyEvent(
                      `${parseFloat(target.value) * (field.multiplier || 1)}${
                        field.unit
                      }`,
                    ),
                  );
                }}
                suffix={
                  <div className="flex items-center gap-md">
                    <span className="text-sm text-text-soft">max</span>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (field.type === 'Resource') {
    return (
      <div className="flex flex-col gap-md">
        <div className="bodyMd-medium text-text-default">{`${field.label}${
          field.required ? ' *' : ''
        }`}</div>
        <div className="flex flex-row gap-xl items-center">
          <div className="flex flex-row gap-xl items-end flex-1 ">
            <div className="flex-1">
              <NumberInput
                size="lg"
                error={!!errors[`${fieldKey}.min`]}
                message={errors[`${fieldKey}.min`]}
                placeholder={qos ? field.label : `${field.label} min`}
                value={parseFloat(value.min) / (field.multiplier || 1)}
                onChange={({ target }) => {
                  onChange(`res.${field.input}.min`)(
                    dummyEvent(
                      `${parseFloat(target.value) * (field.multiplier || 1)}${
                        field.unit
                      }`,
                    ),
                  );
                  if (qos) {
                    onChange(`res.${field.input}.max`)(
                      dummyEvent(
                        `${parseFloat(target.value) * (field.multiplier || 1)}${
                          field.unit
                        }`,
                      ),
                    );
                  }
                }}
                suffix={field.displayUnit}
              />
            </div>
            {!qos && (
              <div className="flex-1">
                <NumberInput
                  size="lg"
                  error={!!errors[`${fieldKey}.max`]}
                  message={errors[`${fieldKey}.max`]}
                  placeholder={`${field.label} max`}
                  value={parseFloat(value.max) / (field.multiplier || 1)}
                  onChange={({ target }) => {
                    onChange(`res.${field.input}.max`)(
                      dummyEvent(
                        `${parseFloat(target.value) * (field.multiplier || 1)}${
                          field.unit
                        }`,
                      ),
                    );
                  }}
                  suffix={field.displayUnit}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-md min-w-[115px]">
            <Switch
              label="Guaranteed"
              checked={qos}
              onChange={(_value) => {
                setQos(_value);
                if (_value) {
                  onChange(`res.${field.input}.max`)(
                    dummyEvent(`${value.min}`),
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  return <div>unknown input type {field.type}</div>;
};

type ISelectedPlugin = {
  category: string;
  categoryDisplayName: string;
  plugin: IMSvPlugin;
};

const TemplateView = ({
  handleSubmit,
  values,
  handleChange,
  errors,
  plugins,
  isLoading,
}: {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  values: Record<string, any>;
  errors: Record<string, any>;
  plugins: IMsvPlugins;
  isLoading: boolean;
  handleChange: (key: string) => (e: { target: { value: any } }) => void;
}) => {
  return (
    <form className="flex flex-col gap-3xl" onSubmit={handleSubmit}>
      <div className="bodyMd text-text-soft">Create your managed services.</div>
      <Select
        label="Managed service templates"
        size="lg"
        placeholder="Select templates"
        value={values.selectedPlugin?.category}
        valueRender={valueRender}
        searchable
        error={!!errors.selectedPlugin}
        message={errors.selectedPlugin}
        onChange={({ item }) => {
          handleChange('selectedPlugin')(dummyEvent(item));
        }}
        options={async () =>
          plugins.map((mt) => ({
            label: mt.category,
            options: mt.items.map((mti) => ({
              label: mti.plugin,
              value: mti.plugin,
              icon: mti.meta?.logo || '',
              item: {
                categoryDisplayName: mti.plugin,
                category: mti.plugin,
                plugin: mti,
              },
              render: () => (
                <div className="flex flex-row items-center gap-xl">
                  <span>
                    <img
                      alt={mti.plugin}
                      src={mti.meta?.logo}
                      className="w-2xl h-w-2xl"
                    />
                  </span>
                  <div>{mti.plugin}</div>
                </div>
              ),
            })),
          }))
        }
      />
      <BottomNavigation
        primaryButton={{
          type: 'submit',
          loading: isLoading,
          content: 'Next',
        }}
      />
    </form>
  );
};

const FieldView = ({
  selectedPlugin,
  clusters,
  values,
  handleSubmit,
  handleChange,
  errors,
}: {
  handleChange: (key: string) => (e: { target: { value: any } }) => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  values: Record<string, any>;
  errors: Record<string, any>;
  selectedPlugin: ISelectedPlugin | null;
  clusters: {
    label: string;
    value: string;
    ready?: boolean;
    render: () => ReactNode;
  }[];
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameRef.current?.focus();
  }, [nameRef.current]);

  const getRenderField = () => {
    switch (selectedPlugin?.plugin?.plugin) {
      case 'HelmChart':
        return (
          <RenderHelmFields
            values={values}
            fields={selectedPlugin?.plugin?.spec?.services[0].inputs}
            onChange={handleChange}
            errors={errors}
          />
        );
      default:
        return (
          <>
            {selectedPlugin?.plugin?.spec?.services[0].inputs.map((field) => {
              const k = field.input;
              const x = k.split('.').reduce((acc, curr) => {
                if (!acc) {
                  return values.res?.[curr] || '';
                }
                return acc[curr];
              }, null);
              return (
                <RenderField
                  field={field}
                  key={field.input}
                  onChange={handleChange}
                  value={x}
                  errors={errors}
                  fieldKey={k}
                />
              );
            })}
          </>
        );
    }
  };

  return (
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
      <NameIdView
        ref={nameRef}
        placeholder="Enter managed service name"
        label="Name"
        resType="cluster_managed_service"
        name={values.name}
        displayName={values.displayName}
        errors={errors.name}
        handleChange={handleChange}
        nameErrorLabel="isNameError"
      />

      <Select
        label="Select Cluster"
        size="lg"
        value={values.clusterName}
        placeholder="Select a Cluster"
        options={async () => clusters}
        // options={async () => [
        //   ...((clusters &&
        //     clusters.filter((c) => {
        //       return c.ready;
        //     })) ||
        //     []),
        // ]}
        onChange={({ value }) => {
          handleChange('clusterName')(dummyEvent(value));
          handleChange('nodepoolName')(dummyEvent(''));
        }}
        showclear
        error={!!errors.clusterName}
        message={errors.clusterName}
        // loading={cIsLoading || byokCIsLoading}
      />
      {getRenderField()}

      <BottomNavigation
        primaryButton={{
          type: 'submit',
          content: 'Next',
        }}
      />
    </form>
  );
};

const ReviewView = ({
  handleSubmit,
  values,
  isLoading,
  onEdit,
}: {
  values: Record<string, any>;
  onEdit: (step: number) => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isLoading?: boolean;
}) => {
  const renderFieldView = () => {
    const fields = Object.entries(values.res).filter(
      ([k, _v]) => !['resources'].includes(k),
    );
    console.log('fields', fields);
    if (fields.length > 0) {
      return (
        <ReviewComponent
          title="Fields"
          onEdit={() => {
            onEdit(2);
          }}
        >
          <div className="flex flex-col p-xl  gap-lg rounded border border-border-default flex-1 overflow-hidden">
            {fields?.map(([key, value]) => {
              const k = key as string;
              const v = value;
              if (key === 'helmValues') {
                return null;
              }
              const getValueRenderer = () => {
                if (Array.isArray(v)) {
                  return (
                    <div className="flex flex-col gap-lg bodySm text-text-soft">
                      {v.map((vi) => (
                        <div key={vi.key}>
                          <span>{vi.key}</span>
                          {' : '}
                          {vi.value}
                        </div>
                      ))}
                    </div>
                  );
                }
                if (typeof v === 'object') {
                  return (
                    <div className="flex flex-col gap-lg bodySm text-text-soft">
                      {Object.entries(v || {}).map(([pKey, pValue]) => (
                        <div key={pKey}>
                          <span>{pKey}</span>
                          {' : '}
                          {pValue}
                        </div>
                      ))}
                    </div>
                  );
                }
                if (typeof v === 'string') {
                  return <div className="bodySm text-text-soft">{v}</div>;
                }
                return null;
              };
              return (
                <div
                  key={k}
                  className="flex flex-col gap-md  [&:not(:last-child)]:pb-lg   [&:not(:last-child)]:border-b border-border-default"
                >
                  <div className="bodyMd-medium text-text-default">
                    {titleCase(k)}
                  </div>
                  {getValueRenderer()}
                </div>
              );
            })}
          </div>
        </ReviewComponent>
      );
    }
    return null;
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3xl">
      <div className="flex flex-col gap-xl">
        <ReviewComponent
          title="Basic detail"
          onEdit={() => {
            onEdit(2);
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
          title="Service details"
          onEdit={() => {
            onEdit(1);
          }}
        >
          <div className="flex flex-col gap-xl p-xl rounded border border-border-default">
            <div className="flex flex-col gap-lg pb-xl border-b border-border-default">
              <div className="flex-1 bodyMd-medium text-text-default">
                {values?.selectedPlugin?.categoryDisplayName}
              </div>
              <div className="text-text-soft bodyMd">
                {values?.selectedPlugin?.categoryDisplayName}
              </div>
            </div>
            <div className="flex flex-col gap-lg ">
              <div className="flex-1 bodyMd-medium text-text-default">
                Cluster Name
              </div>
              <div className="text-text-soft bodyMd">{values.clusterName}</div>
            </div>
          </div>
        </ReviewComponent>

        {renderFieldView()}
        {values?.res?.resources && (
          <ReviewComponent
            title="Fields"
            onEdit={() => {
              onEdit(2);
            }}
          >
            <div className="flex flex-col p-xl  gap-lg rounded border border-border-default flex-1 overflow-hidden">
              {Object.entries(values?.res?.resources).map(([key, value]) => {
                console.log(value);
                if (typeof value === 'string') {
                  return (
                    <div
                      key={key}
                      className="flex flex-col gap-md  [&:not(:last-child)]:pb-lg   [&:not(:last-child)]:border-b border-border-default"
                    >
                      <div className="bodyMd-medium text-text-default">
                        {titleCase(key)}
                      </div>
                      <div className="bodySm text-text-soft">{value}</div>
                    </div>
                  );
                }
                return (
                  <div
                    key={key}
                    className="flex flex-col gap-md  [&:not(:last-child)]:pb-lg   [&:not(:last-child)]:border-b border-border-default"
                  >
                    <div className="bodyMd-medium text-text-default">
                      {titleCase(key)}
                    </div>
                    <div className="bodySm text-text-soft">
                      {Object.entries(value || {}).map(([pKey, pValue]) => (
                        <div key={pKey}>
                          {pKey}
                          {' : '}
                          {pValue}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </ReviewComponent>
        )}
      </div>
      <BottomNavigation
        primaryButton={{
          type: 'submit',
          loading: isLoading,
          content: 'Create',
        }}
      />
    </form>
  );
};

// const ClusterSelectItem = ({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) => {
//   return (
//     <div>
//       <div className="flex flex-col">
//         <div>{label}</div>
//         <div className="bodySm text-text-soft">{value}</div>
//       </div>
//     </div>
//   );
// };

export const ManagedServiceLayoutV2 = () => {
  const { account, msvPlugins } = useOutletContext<IAccountContext>();
  const navigate = useNavigate();
  const api = useConsoleApi();

  // const rootUrl = `/${parseName(account)}/infra/${parseName(
  //   account
  // )}/managed-services`;

  const rootUrl = `/${parseName(account)}/managed-services`;

  const { currentStep, jumpStep, nextStep } = useMultiStepProgress({
    defaultStep: 1,
    totalSteps: 3,
  });

  const [clusterList, setClusterList] = useState<any[]>([]);
  const params = useParams();

  const { clustersMap } = useClusterStatusV3({});

  const getClusters = useCallback(async () => {
    ensureAccountClientSide(params);
    try {
      const { data: cl, errors } = await api.listAllClusters({});
      if (errors) {
        throw errors[0];
      }

      const data = parseNodes(cl).map((c) => {
        const n = parseName(c);
        let cs = clustersMap[n];
        return {
          label: c.displayName,
          value: n,
          ready: cs?.isOnline,
          disabled: () => !cs?.isOnline,
          render: ({ disabled }: { disabled: boolean }) => (
            <ClusterSelectItem
              label={c.displayName}
              value={n}
              disabled={disabled}
            />
          ),
        };
      });

      setClusterList(data);
    } catch (err) {
      handleError(err);
    }
  }, []);

  useEffect(() => {
    getClusters();
  }, []);

  const { values, errors, handleSubmit, handleChange, isLoading, setValues } =
    useForm({
      initialValues: {
        name: '',
        displayName: '',
        res: {},
        helmPackageId: '',
        // selectedTemplate: null,
        selectedPlugin: null,
        isNameError: false,
        clusterName: '',
        nodepoolName: '',
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().test('required', 'Name is required', (v) => {
          return !(currentStep === 2 && !v);
        }),
        displayName: Yup.string().test('required', 'Name is required', (v) => {
          return !(currentStep === 2 && !v);
        }),
        clusterName: Yup.string().test(
          'required',
          'Cluster name is required',
          (v) => {
            return !(currentStep === 2 && !v);
          },
        ),
        selectedPlugin: Yup.object({}).required('Plugin is required.'),
        // @ts-ignore
        res: Yup.object({}).test({
          name: 'res',
          skipAbsent: true,
          test(value, ctx) {
            // eslint-disable-next-line react/no-this-in-sfc
            const selfValue = this.parent;

            let vs = Yup.object({});

            if (selfValue.selectedTemplate && currentStep === 2) {
              vs = Yup.object(
                flatMapValidations(
                  selfValue.selectedTemplate?.template?.fields.reduce(
                    (acc: any, curr: any) => {
                      return { ...acc, [curr.name]: curr };
                    },
                    {},
                  ),
                ),
              );
            }

            const res = vs.validateSync(value, {
              abortEarly: false,
              context: ctx,
            });

            return res;
          },
        }),
      }),
      onSubmit: async (val) => {
        const selectedPlugin = val.selectedPlugin as unknown as ISelectedPlugin;
        const submit = async () => {
          try {
            if (
              !selectedPlugin.plugin.spec.apiVersion ||
              !selectedPlugin?.plugin?.spec.services[0].kind
            ) {
              throw new Error('Service apiversion or kind error.');
            }
            const res = { ...val.res };
            if (selectedPlugin.plugin.plugin === 'HelmChart') {
              // @ts-ignore
              res.helmValues = res.helmValues ? yaml.dump(res.helmValues) : '';
            }
            const { errors: e } = await api.createClusterMSv({
              service: {
                displayName: val.displayName,
                metadata: {
                  name: val.name,
                  annotations: {
                    [keyconstants.helmChartRepoPackageId]: values.helmPackageId,
                  },
                },
                clusterName: val.clusterName,
                spec: {
                  msvcSpec: {
                    plugin: {
                      apiVersion: selectedPlugin.plugin.spec.apiVersion,
                      kind: selectedPlugin.plugin.spec.services[0].kind,
                      export: {
                        viaSecret: '',
                      },
                      spec: {
                        ...val.res,
                      },
                    },
                  },
                },
              },
            });
            if (e) {
              throw e[0];
            }
            toast.success('Managed service created successfully');
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
            await submit();
            break;
          default:
            break;
        }
      },
    });

  useEffect(() => {
    const selectedPlugin = values.selectedPlugin as unknown as ISelectedPlugin;
    if (selectedPlugin?.plugin?.spec?.services[0]?.inputs) {
      setValues((v) => ({
        ...v,
        res: {
          ...flatM(
            selectedPlugin.plugin?.spec.services[0].inputs.reduce(
              (acc, curr) => {
                return { ...acc, [curr.input]: curr };
              },
              {},
            ),
          ),
        },
      }));
    }
  }, [values.selectedPlugin]);

  useEffect(() => {
    setValues((v) => ({
      ...v,
      clusterName:
        clusterList.length > 0
          ? clusterList.find((c) => c.ready)?.value || ''
          : '',
    }));
  }, [clusterList]);

  return (
    <MultiStepProgressWrapper
      title="Let’s create new managed service."
      subTitle="Simplify Collaboration and Enhance Productivity with Kloudlite teams"
      backButton={{
        content: 'Back to Managed services',
        to: rootUrl,
      }}
    >
      <MultiStepProgress.Root currentStep={currentStep} jumpStep={jumpStep}>
        <MultiStepProgress.Step label="Select Managed Service" step={1}>
          <TemplateView
            isLoading={isLoading}
            plugins={msvPlugins}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            values={values}
          />
        </MultiStepProgress.Step>
        <MultiStepProgress.Step label="Configure managed service" step={2}>
          <FieldView
            selectedPlugin={values.selectedPlugin}
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // nodepools={statefulNodepools}
            // nodepoolIsLoading={nodepoolIsLoading}
            clusters={clusterList}
          />
        </MultiStepProgress.Step>
        <MultiStepProgress.Step label="Review" step={3}>
          <ReviewView
            onEdit={jumpStep}
            values={values}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </MultiStepProgress.Step>
      </MultiStepProgress.Root>
    </MultiStepProgressWrapper>
  );
};
