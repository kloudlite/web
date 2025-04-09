/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
import { NumberInput, TextInput } from '@kloudlite/design-system/atoms/input';
import Select from '@kloudlite/design-system/atoms/select';
import { Switch } from '@kloudlite/design-system/atoms/switch';
import { titleCase, uuid } from '@kloudlite/design-system/utils';
import { useNavigate, useOutletContext } from '@remix-run/react';
import yaml from 'js-yaml';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
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
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { IMSvPlugin } from '~/console/server/gql/queries/managed-templates-queries';
import { parseName } from '~/console/server/r-utils/common';
import { keyconstants } from '~/console/server/r-utils/key-constants';
import { flatM, flatMapValidations } from '~/console/utils/commons';
import CodeEditorClient from '~/root/lib/client/components/editor-client';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { handleError } from '~/root/lib/utils/common';
import TolerationsKeyValuePair from '~/console/components/tolerations-fields';
import KeyValuePair from '~/console/components/key-value-pair-node-selector';
import useFetchHelmValue from '~/console/hooks/helm-utils/use-fetch-helmvalues';
import useHelmRepoSearch from '~/console/hooks/helm-utils/use-helm-repo-search';
import useFetchHelmCharts from '~/console/hooks/helm-utils/use-fetch-helmcharts';
import { IAccountContext } from '../../_layout';

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

  const [repoSearchText, setRepoSearchText] = useState('');

  const [chartName, setChartName] = useState<
    { label: string; value: string } | undefined
  >(undefined);
  const [chartVersion, setChartVersion] = useState<
    { label: string; value: string } | undefined
  >(undefined);

  const { values: helmValues, isLoading: helmValuesLoading } =
    useFetchHelmValue({
      packageId: values.helmPackageId,
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
                options={async () => [
                  ...(values.helmPackageItem ? [values.helmPackageItem] : []),
                  ...repos,
                ]}
                value={values.helmPackageId}
                onChange={(value) => {
                  if (!repoSearchText.startsWith('https://')) {
                    onChange(`res.${field.input}`)(dummyEvent(value.repoUrl));
                  } else {
                    onChange(`res.${field.input}`)(dummyEvent(value.value));
                  }
                  onChange('helmPackageId')(dummyEvent(value.value));
                  onChange('helmPackageItem')(dummyEvent(value));
                  /* setHelmCharts([]); */
                  resetFields();
                }}
                onSearch={(text) => {
                  setRepoSearchText(text);
                  resetFields();
                  onChange('helmPackageId')(dummyEvent(''));
                  onChange(`res.${field.input}`)(dummyEvent(''));
                  onChange('helmPackageItem')(dummyEvent(null));
                }}
                valueRender={repoRenderer}
                loading={repoLoading}
                noOptionMessage={
                  <div className="p-2xl bodyMd text-center">
                    Search for or enter the repo url
                  </div>
                }
                error={!!errors[field.input]}
                message={errors[field.input] ? 'Chart url is required' : null}
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
                  helmCharts.length === 0 ||
                  repoLoading ||
                  !values.helmPackageId
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
                error={!!errors[field.input]}
                message={errors[field.input] ? 'Chart name is required' : null}
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
                error={!!errors[field.input]}
                message={
                  errors[field.input] ? 'Chart version is required' : null
                }
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

const RenderAdvanceFields = ({
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
  const [advance, setAdvance] = useState(false);
  return (
    <div className="flex flex-col gap-3xl items-start">
      <button
        className="text-text-primary"
        onClick={() => setAdvance((p) => !p)}
        type="button"
      >
        Advance options
      </button>
      {advance ? (
        <div className="flex flex-col gap-3xl">
          {fields.map((field) => {
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
                onChange={onChange}
                value={x}
                errors={errors}
                fieldKey={k}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

const FieldView = ({
  selectedPlugin,
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
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameRef.current?.focus();
  }, [nameRef.current]);

  const getRenderField = () => {
    console.log(selectedPlugin);
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
      default: {
        const inputs = selectedPlugin?.plugin?.spec?.services[0].inputs || [];
        const yamlInputs = inputs.filter((f) =>
          ['tolerations', 'nodeSelector'].includes(f.input),
        );
        const otherInputs = inputs.filter(
          (f) => !['tolerations', 'nodeSelector'].includes(f.input),
        );
        return (
          <>
            {otherInputs.map((field) => {
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
            <RenderAdvanceFields
              values={values}
              fields={yamlInputs}
              onChange={handleChange}
              errors={errors}
            />
          </>
        );
      }
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
        placeholder="Enter helm chart name"
        label="Name"
        resType="cluster_managed_service"
        name={values.name}
        displayName={values.displayName}
        errors={errors.name}
        handleChange={handleChange}
        nameErrorLabel="isNameError"
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

const Exports = ({
  handleSubmit,
  values,
  handleChange,
  errors,
  isLoading,
}: {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  values: Record<string, any>;
  errors: Record<string, any>;
  isLoading: boolean;
  handleChange: (key: string) => (e: { target: { value: any } }) => void;
}) => {
  const [ids, setIDs] = useState<string[]>([uuid()]);
  console.log(ids);
  return (
    <form className="flex flex-col gap-3xl" onSubmit={handleSubmit}>
      <div className="bodyMd text-text-soft">Exports</div>
      <KeyValuePair
        ids={ids}
        error={errors.exports}
        value={Object.entries(values.exports || {}).map(([key, value]) => ({
          key,
          value,
        }))}
        onChange={(e) => {
          handleChange(`exports`)(
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

export const ManagedServiceLayoutV2 = () => {
  const { account, msvPlugins } = useOutletContext<IAccountContext>();
  const navigate = useNavigate();
  const api = useConsoleApi();

  const rootUrl = `/${parseName(account)}/common-services/helm-charts`;

  const { currentStep, jumpStep, nextStep } = useMultiStepProgress({
    defaultStep: 1,
    totalSteps: 3,
  });

  const { values, errors, handleSubmit, handleChange, isLoading, setValues } =
    useForm({
      initialValues: {
        name: '',
        displayName: '',
        res: {},
        helmPackageId: '',
        helmPackageItem: '',
        selectedPlugin: null,
        exports: {},
        isNameError: false,
        nodepoolName: '',
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().test('required', 'Name is required', (v) => {
          return !(currentStep === 1 && !v);
        }),
        displayName: Yup.string().test('required', 'Name is required', (v) => {
          return !(currentStep === 1 && !v);
        }),
        selectedPlugin: Yup.object({}).required('Plugin is required.'),
        // @ts-ignore
        res: Yup.object({}).test({
          name: 'res',
          skipAbsent: true,
          test(value, ctx) {
            // eslint-disable-next-line react/no-this-in-sfc
            const selfValue = this.parent;

            let vs = Yup.object({});

            if (selfValue.selectedPlugin && currentStep === 1) {
              const v = flatMapValidations(
                selfValue.selectedPlugin.plugin.spec?.services[0]?.inputs.reduce(
                  (acc: any, curr: any) => {
                    return { ...acc, [curr.input]: curr };
                  },
                  {},
                ),
              );
              console.log('v........', v);
              vs = Yup.object(v);
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
        console.log('exports....', val);
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
                clusterName: `cls-${account.metadata?.name}`,
                spec: {
                  msvcSpec: {
                    plugin: {
                      apiVersion: selectedPlugin.plugin.spec.apiVersion,
                      kind: selectedPlugin.plugin.spec.services[0].kind,
                      export: {
                        viaSecret: JSON.stringify(val.exports),
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
            await submit();
            break;
          default:
            break;
        }
      },
    });

  useEffect(() => {
    const helmPlugin = msvPlugins.filter((f) => !f.category)?.[0].items?.[0];
    if (!helmPlugin) {
      return;
    }
    handleChange('selectedPlugin')(
      dummyEvent({ plugin: helmPlugin } as ISelectedPlugin),
    );
    if (helmPlugin.spec?.services[0]?.inputs) {
      setValues((v) => ({
        ...v,
        res: {
          ...flatM(
            helmPlugin.spec.services[0].inputs.reduce((acc, curr) => {
              return { ...acc, [curr.input]: curr };
            }, {}),
          ),
        },
      }));
    }
  }, [msvPlugins]);

  return (
    <MultiStepProgressWrapper
      title="Let’s create new helm chart."
      subTitle="Simplify Collaboration and Enhance Productivity with Kloudlite teams"
      backButton={{
        content: 'Back to helm charts',
        to: rootUrl,
      }}
    >
      <MultiStepProgress.Root currentStep={currentStep} jumpStep={jumpStep}>
        <MultiStepProgress.Step label="Configure helm chart" step={1}>
          <FieldView
            selectedPlugin={values.selectedPlugin}
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </MultiStepProgress.Step>
        <MultiStepProgress.Step label="Manage helm exports" step={2}>
          <Exports
            errors={errors}
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
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
