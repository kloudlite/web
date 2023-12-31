import { useCallback, useEffect } from 'react';
import { PasswordInput, TextInput } from '~/components/atoms/input';
import Radio from '~/components/atoms/radio';
import Slider from '~/components/atoms/slider';
import ExtendedFilledTab from '~/console/components/extended-filled-tab';
import { TitleBox } from '~/console/components/raw-wrapper';
import { useAppState } from '~/console/page-components/app-states';
import { keyconstants } from '~/console/server/r-utils/key-constants';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';

import { InfoLabel } from '~/console/components/commons';
import { FadeIn, parseValue } from '~/console/page-components/util';
import { IcpuMode, plans } from '../../../../new-app/datas';

const SettingCompute = () => {
  const { app, setApp, getContainer } = useAppState();
  const { values, errors, handleChange, submit } = useForm({
    initialValues: {
      imageUrl: getContainer(0)?.image || '',
      pullSecret: 'TODO',
      cpuMode: app.metadata?.annotations?.[keyconstants.cpuMode] || 'shared',
      selectedPlan:
        app.metadata?.annotations?.[keyconstants.selectedPlan] || '4',
      cpu: parseValue(getContainer(0)?.resourceCpu?.max, 250),
    },
    validationSchema: Yup.object({
      imageUrl: Yup.string().required(),
      pullSecret: Yup.string(),
      cpuMode: Yup.string().required(),
      selectedPlan: Yup.string().required(),
      cpu: Yup.number().required().min(100).max(8000),
    }),
    onSubmit: (val) => {
      setApp((s) => ({
        ...s,
        metadata: {
          ...s.metadata!,
          annotations: {
            ...(s.metadata?.annotations || {}),
            [keyconstants.cpuMode]: val.cpuMode,
            [keyconstants.selectedPlan]: val.selectedPlan,
          },
        },
        spec: {
          ...s.spec,
          containers: [
            {
              ...(s.spec.containers?.[0] || {}),
              image: val.imageUrl,
              name: 'container-0',
              resourceCpu: {
                min: `${val.cpu}m`,
                max: `${val.cpu}m`,
              },
              resourceMemory: {
                min: `${val.cpu}Mi`,
                max: `${(
                  (values.cpu || 1) * parseValue(values.selectedPlan, 4)
                ).toFixed(2)}Mi`,
              },
            },
          ],
        },
      }));
    },
  });

  // const getActivePlan = useCallback(() => {
  //   return plans[values.cpuMode as IcpuMode].find(
  //     (v) => v.memoryPerCpu === parseValue(values.selectedPlan, 4)
  //   );
  // }, [values.cpuMode, values.selectedPlan]);

  useEffect(() => {
    submit();
  }, [values]);

  return (
    <FadeIn
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TitleBox
        title="Compute"
        subtitle="Compute refers to the processing power and resources used for data
          manipulation and calculations in a system."
      />
      <div className="flex flex-col gap-3xl">
        <TextInput
          label={
            <InfoLabel info="some usefull information" label="Image Url" />
          }
          size="lg"
          value={values.imageUrl}
          onChange={handleChange('imageUrl')}
          error={!!errors.imageUrl}
          message={errors.imageUrl}
        />
        <PasswordInput
          label={
            <InfoLabel info="some usefull information" label="Pull Secret" />
          }
          size="lg"
          value={values.pullSecret}
          // error={!!errors.pullSecret}
          // message={errors.pullSecret}
          // onChange={handleChange('pullSecret')}
        />
      </div>
      {/* <div className="flex flex-col border border-border-default bg-surface-basic-default rounded overflow-hidden">
        <div className="p-2xl gap-2xl flex flex-row items-center border-b border-border-disabled bg-surface-basic-subdued">
          <div className="flex-1 bodyMd-medium text-text-default">
            Select plan
          </div>
          <ExtendedFilledTab
            size="sm"
            items={[
              {
                value: 'shared',
                label: (
                  <InfoLabel label="Shared" info="some usefull information" />
                ),
              },

              {
                value: 'dedicated',
                label: (
                  <InfoLabel
                    label="Dedicated"
                    info="some usefull information"
                  />
                ),
              },
            ]}
            value={values.cpuMode}
            onChange={(v) => {
              handleChange('cpuMode')(dummyEvent(v));
            }}
          />
        </div>

        <div className="flex flex-row">
          <div className="flex-1 flex flex-col border-r border-border-disabled">
            <Radio.Root
              withBounceEffect={false}
              className="gap-y-0"
              value={values.selectedPlan}
              onChange={(v) => {
                handleChange('selectedPlan')(dummyEvent(v));
              }}
            >
              {[...(plans[values.cpuMode as IcpuMode] || [])].map(
                ({ name, memoryPerCpu, description }) => {
                  return (
                    <Radio.Item
                      key={`${memoryPerCpu}`}
                      className="p-2xl"
                      value={`${memoryPerCpu}`}
                    >
                      <div className="flex flex-col pl-xl">
                        <div className="headingMd text-text-default">
                          {name}
                        </div>
                        <div className="bodySm text-text-soft">
                          {description}
                        </div>
                      </div>
                    </Radio.Item>
                  );
                }
              )}
            </Radio.Root>
          </div>
          {getActivePlan() ? (
            <div className="flex-1 py-2xl">
              <div className="flex flex-row items-center gap-lg py-lg px-2xl">
                <div className="bodyMd-medium text-text-strong flex-1">
                  {getActivePlan()?.name}
                </div>
                <div className="bodyMd text-text-soft">{values.cpuMode}</div>
              </div>
              <div className="flex flex-row items-center gap-lg py-lg px-2xl">
                <div className="bodyMd-medium text-text-strong flex-1">
                  Compute
                </div>
                <div className="bodyMd text-text-soft">{1}vCPU</div>
              </div>
              <div className="flex flex-row items-center gap-lg py-lg px-2xl">
                <div className="bodyMd-medium text-text-strong flex-1">
                  Memory
                </div>
                <div className="bodyMd text-text-soft">
                  {getActivePlan()?.memoryPerCpu}GB
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 py-2xl">
              <div className="flex flex-row items-center gap-lg py-lg px-2xl">
                <div className="bodyMd-medium text-text-strong flex-1">
                  Please Select any plan
                </div>
              </div>
            </div>
          )}
        </div>
      </div> */}
      <div className="flex flex-col gap-md p-2xl rounded border border-border-default bg-surface-basic-default">
        <div className="flex flex-row gap-lg items-center">
          <div className="bodyMd-medium text-text-default">Select CPU</div>
          <code className="bodySm text-text-soft flex-1 text-end">
            {((values.cpu || 1) / 1000).toFixed(2)}vCPU &{' '}
            {(
              ((values.cpu || 1) * parseValue(values.selectedPlan, 4)) /
              1000
            ).toFixed(2)}
            GB Memory
          </code>
        </div>
        <Slider
          step={25}
          min={100}
          max={8000}
          value={values.cpu}
          onChange={(value) => {
            handleChange('cpu')(dummyEvent(value));
          }}
        />
      </div>
    </FadeIn>
  );
};
export default SettingCompute;
