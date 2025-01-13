/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable guard-for-in */
/* eslint-disable react/destructuring-assignment */
import {
  ITextInputBase,
  NumberInput,
  TextInput,
} from '@kloudlite/design-system/atoms/input';
import Select from '@kloudlite/design-system/atoms/select';
import { Switch } from '@kloudlite/design-system/atoms/switch';
import Popup from '@kloudlite/design-system/molecule/popup';
import { useEffect, useRef, useState } from 'react';
import ExtendedFilledTab from '~/console/components/extended-filled-tab';
import { LoadingPlaceHolder } from '~/console/components/loading';
import { NameIdView } from '~/console/components/name-id-view';
import { IDialogBase } from '~/console/components/types.d';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { IClusterMSvs } from '~/console/server/gql/queries/cluster-managed-services-queries';
import {
  IMSvPlugin,
  IMsvPlugins,
  IMSvTemplates,
} from '~/console/server/gql/queries/managed-templates-queries';
import { ExtractNodeType, parseName } from '~/console/server/r-utils/common';
import { keyconstants } from '~/console/server/r-utils/key-constants';
import { getManagedTemplate } from '~/console/utils/commons';
import CodeEditorClient from '~/root/lib/client/components/editor-client';
import { useReload } from '~/root/lib/client/helpers/reloader';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { NN } from '~/root/lib/types/common';
import { handleError } from '~/root/lib/utils/common';
import useFetchHelmCharts from '../env+/$environment+/workloads+/helm-charts/helm-utils/use-fetch-helmcharts';
import useFetchHelmValue from '../env+/$environment+/workloads+/helm-charts/helm-utils/use-fetch-helmvalues';
import KeyValuePair from '~/console/components/key-value-pair-node-selector';
import { uuid } from '@kloudlite/design-system/utils';
import TolerationsKeyValuePair from '~/console/components/tolerations-fields';
import { useUnsavedChanges } from '~/root/lib/client/hooks/use-unsaved-changes';

type IDialog = IDialogBase<ExtractNodeType<IClusterMSvs>> & {
  templates: IMSvTemplates;
};

type IHelmDoc = {
  apiVersion: string;
  entries: {
    [key: string]: { version: string }[];
  };
  generated: string;
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

const filterUniqueVersions = (versions: IHelmDoc['entries']['keys']) => {
  return versions.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.version === obj.version),
  );
};

type ISelectedService = {
  category: {
    name: string;
    displayName: string;
  };

  service?: NN<IMSvTemplates>[number]['items'][number];
} | null;

type ISelectedServicePlugins = {
  category: {
    name: string;
    displayName: string;
  };

  service?: NN<IMsvPlugins>[number]['items'][number];
} | null;

const RenderHelmFields = ({
  values,
  onChange,
  errors,
  fields,
  annotations,
}: {
  onChange: (e: string) => (e: { target: { value: any } }) => void;
  values: any;
  errors: {
    [key: string]: string | undefined;
  };
  fields: IMSvPlugin['spec']['services'][0]['inputs'];
  annotations?: { [key: string]: string };
}) => {
  const [activeTab, setActiveTab] = useState('defaults');

  const editorRef = useRef<any>();

  const [chartVersions, setChartVersions] = useState<
    IHelmDoc['entries']['key']
  >([]);

  const { values: helmValues, isLoading: helmValuesLoading } =
    useFetchHelmValue({
      packageId: annotations?.[keyconstants.helmChartRepoPackageId],
      version: values.res.chart.version,
    });

  const { helmCharts, loading: helmChartsLoading } = useFetchHelmCharts({
    repoUrl: values.res.chart.url,
  });

  useEffect(() => {
    if (helmCharts && helmCharts.length > 0) {
      setChartVersions(
        filterUniqueVersions(
          helmCharts.find((v) => v.value === values.res.chart.name)?.item || [],
        ),
      );
    }
  }, [helmCharts]);

  return (
    <div className="flex flex-col gap-3xl">
      {fields.map((field) => {
        switch (field.input) {
          case 'chart.url':
            return (
              <TextInput
                value={values.res.chart.url}
                error={!!errors.chartName}
                message={errors.chartName}
                label="Chart name"
                size="lg"
                disabled
              />
            );
          case 'chart.name':
            return (
              <TextInput
                value={values.res.chart.name}
                error={!!errors.chartName}
                message={errors.chartName}
                label="Chart name"
                size="lg"
                disabled
              />
            );
          case 'chart.version':
            return (
              <Select
                searchable
                size="lg"
                label="Chart version"
                placeholder="Chart version"
                disabled={chartVersions.length === 0 || helmChartsLoading}
                value={values.res.chart.version}
                options={async () => [
                  ...chartVersions.map((cv) => ({
                    label: cv.version,
                    value: cv.version,
                  })),
                ]}
                loading={helmChartsLoading}
                onChange={(val) => {
                  onChange(`res.${field.input}`)(dummyEvent(val.value));
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
                  values.res.chart.version && (
                    <div className="flex flex-col gap-3xl h-full">
                      <ExtendedFilledTab
                        value={activeTab || 'defaults'}
                        onChange={(e) => {
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
                        {...valueEditorProps}
                        options={{
                          ...valueEditorProps.options,
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
  console.log(value);
  const { hasChanges } = useUnsavedChanges();
  const [ids, setIDs] = useState<string[]>([uuid()]);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (initial && Array.isArray(value)) {
      setIDs(value.map(() => uuid()));
    }
    setInitial(false);
  }, [value, initial]);

  useEffect(() => {
    if (!hasChanges && Array.isArray(value)) {
      setIDs(value.map(() => uuid()));
      console.log('here 2');
    }
  }, [hasChanges]);

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
  const { hasChanges } = useUnsavedChanges();
  const [ids, setIDs] = useState<string[]>([uuid()]);
  const [initial, setInitial] = useState(true);
  useEffect(() => {
    if (initial && typeof value === 'object') {
      setIDs(Object.entries(value).map(() => uuid()));
      setInitial(false);
    }
  }, [value, initial]);
  useEffect(() => {
    if (!hasChanges) {
      setIDs(Object.entries(value).map(() => uuid()));
    }
  }, [hasChanges]);
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
  // field: NN<NN<ISelectedService>['service']>['fields'][number];
  field: NN<
    NN<ISelectedServicePlugins>['service']
  >['spec']['services'][0]['inputs'][number];
  onChange: (e: string) => (e: { target: { value: any } }) => void;
  value: any;
  errors: {
    [key: string]: string | undefined;
  };
  fieldKey: string;
}) => {
  const [qos, setQos] = useState(false);

  useEffect(() => {
    if (field.type === 'Resource' && value.max === value.min) {
      setQos(true);
    }
  }, []);

  if (field.type === 'Number') {
    return (
      <NumberInput
        error={!!errors[fieldKey]}
        message={errors[fieldKey]}
        label={`${field.label}${field.required ? ' *' : ''}`}
        placeholder={field.label}
        value={parseFloat(value) / (field.multiplier || 1) || ''}
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
                  console.log(
                    'target.value',
                    value,
                    target.value,
                    `${parseFloat(target.value) * (field.multiplier || 1)}${
                      field.unit
                    }`,
                  );
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

export const Fill = ({
  selectedService,
  selectedServicePlugins,
  values,
  handleChange,
  errors,
  size = 'lg',
  annotations,
}: {
  selectedService: ISelectedService;
  selectedServicePlugins?: ISelectedServicePlugins;
  values: { [key: string]: any };
  handleChange: (key: string) => (e: { target: { value: any } }) => void;
  errors: {
    [key: string]: string | undefined;
  };
  size?: ITextInputBase['size'];
  annotations?: { [key: string]: string };
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameRef.current?.focus();
  }, [nameRef.current]);

  console.log(values);

  const getRenderField = () => {
    switch (selectedServicePlugins?.service?.plugin) {
      case 'HelmChart':
        return (
          <RenderHelmFields
            values={values}
            fields={selectedServicePlugins?.service?.spec?.services[0].inputs}
            onChange={handleChange}
            errors={errors}
            annotations={annotations}
          />
        );
      default:
        return (
          <>
            {selectedServicePlugins?.service?.spec?.services[0].inputs.map(
              (field) => {
                const k = field.input;
                const x = k.split('.').reduce((acc, curr) => {
                  if (!acc) {
                    return values.res?.[curr] || {};
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
              },
            )}
          </>
        );
    }
  };

  return (
    <div className="flex flex-col gap-3xl min-h-[30vh]">
      <NameIdView
        isUpdate
        size={size}
        ref={nameRef}
        placeholder="Enter managed service name"
        label="Name"
        resType="managed_service"
        name={values.name}
        displayName={values.displayName}
        errors={errors.name}
        handleChange={handleChange}
        nameErrorLabel="isNameError"
      />
      {getRenderField()}
    </div>
  );
};

const Root = (props: IDialog) => {
  const { isUpdate, setVisible, templates } = props;

  const api = useConsoleApi();
  const reload = useReload();

  // const { cluster } = useOutletContext<IClusterContext>();

  const { values, errors, handleChange, handleSubmit, isLoading } = useForm({
    initialValues: isUpdate
      ? {
          name: parseName(props.data),
          displayName: props.data.displayName,
          clusterName: props.data.clusterName,
          isNameError: false,
          res: {
            ...props.data.spec?.msvcSpec.serviceTemplate?.spec,
          },
        }
      : {
          name: '',
          displayName: '',
          clusterName: '',
          res: {},
          isNameError: false,
        },
    validationSchema: Yup.object({}),
    onSubmit: async (val) => {
      if (isUpdate) {
        try {
          const { errors: e } = await api.updateClusterMSv({
            service: {
              displayName: val.displayName,
              metadata: {
                name: val.name,
              },
              clusterName: val.clusterName,
              spec: {
                msvcSpec: {
                  serviceTemplate: {
                    apiVersion:
                      props.data.spec?.msvcSpec.serviceTemplate?.apiVersion ||
                      '',
                    kind: props.data.spec?.msvcSpec.serviceTemplate?.kind || '',
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
          setVisible(false);
          reload();
        } catch (err) {
          handleError(err);
        }
      }
    },
  });

  const getService = () => {
    if (isUpdate)
      return getManagedTemplate({
        templates,
        apiVersion: props.data.spec?.msvcSpec.serviceTemplate?.apiVersion || '',
        kind: props.data.spec?.msvcSpec.serviceTemplate?.kind || '',
      });
    return undefined;
  };

  if (!isUpdate) {
    return null;
  }
  return (
    <Popup.Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Popup.Content className="!min-h-[500px] !max-h-[500px]">
        <Fill
          {...{
            templates,
            selectedService: {
              category: { displayName: '', name: '' },
              service: getService(),
            },
            values,
            errors,
            handleChange,
          }}
        />
      </Popup.Content>
      <Popup.Footer>
        <Popup.Button type="button" variant="basic" content="Cancel" closable />
        <Popup.Button
          loading={isLoading}
          type="submit"
          content="Update"
          variant="primary"
        />
      </Popup.Footer>
    </Popup.Form>
  );
};

const HandleBackendService = (props: IDialog) => {
  const { isUpdate, setVisible, visible } = props;
  return (
    <Popup.Root show={visible} onOpenChange={(v) => setVisible(v)}>
      <Popup.Header>
        {isUpdate ? 'Edit managed service' : 'Add managed service'}
      </Popup.Header>
      {(!isUpdate || (isUpdate && props.data)) && <Root {...props} />}
    </Popup.Root>
  );
};

export default HandleBackendService;
