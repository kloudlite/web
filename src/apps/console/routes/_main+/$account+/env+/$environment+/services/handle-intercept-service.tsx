/* eslint-disable react/destructuring-assignment */
import Popup from '@kloudlite/design-system/molecule/popup';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { handleError } from '~/root/lib/utils/common';
import {
  ExtractNodeType,
  parseName,
  parseNodes,
} from '~/console/server/r-utils/common';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import useCustomSwr from '~/root/lib/client/hooks/use-custom-swr';
import { useCallback, useEffect, useState } from 'react';
import Select from '@kloudlite/design-system/atoms/select';
import { mapper } from '@kloudlite/design-system/utils';
import { useOutletContext } from '@remix-run/react';
import { ISetState } from '~/console/page-components/app-states';
import { useReload } from '~/root/lib/client/helpers/reloader';
import { IEnvironmentContext } from '../_layout';
import { toast } from '@kloudlite/design-system/molecule/toast';
import { IServiceBinding } from '~/console/server/gql/queries/service-binding-queries';
import { NN } from '~/root/lib/types/common';
import { Github__Com___Kloudlite___Operator___Apis___Crds___V1__SvcInterceptPortMappingsIn as InterceptServiceIn } from '~/root/src/generated/gql/server';
import ExposedPortList from './exposed-service';

type IDialog = {
  service?: ExtractNodeType<IServiceBinding>;
  visible: boolean;
  setVisible: ISetState<boolean>;
};

export type exposedPortsType = NN<InterceptServiceIn>;

const Root = (props: IDialog) => {
  const { visible, setVisible, service } = props;

  const api = useConsoleApi();
  const { environment } = useOutletContext<IEnvironmentContext>();
  const { data: dData, isLoading: dIsLoading } = useCustomSwr(
    'devices',
    async () =>
      api.listGlobalVpnDevices({
        gvpn: 'default',
        pagination: {
          first: 100,
        },
      }),
    true,
  );

  const devices = useCallback(() => parseNodes(dData), [dData])();

  const [ports, setPorts] = useState<exposedPortsType[]>([]);

  useEffect(() => {
    if (service) {
      setPorts(
        service.spec?.ports?.map((s) => {
          return {
            devicePort: s.port,
            servicePort:
              service.interceptStatus?.portMappings?.find(
                (f) => f.devicePort === s.port,
              )?.servicePort || s.port,
          };
        }) || [],
      );
    }
  }, [service]);

  const reloadPage = useReload();

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    isLoading,
    resetValues,
    setValues,
  } = useForm({
    initialValues: service
      ? {
          deviceName: '',
        }
      : {},
    validationSchema: Yup.object({
      deviceName: Yup.string().required(),
    }),

    onSubmit: async (val) => {
      if (!val.deviceName) {
        return;
      }

      const serviceName = service?.spec?.serviceRef?.name;
      if (!serviceName) {
        toast.error('service is not provided');
        return;
      }
      try {
        const { errors: e } = await api.interceptService({
          envName: parseName(environment),
          serviceName,
          interceptTo: `${values.deviceName}.device.local`,
          portMappings: ports,
        });
        if (e) {
          throw e[0];
        }

        reloadPage();
        setVisible(false);
        toast.success('Service Intercepted successfully');
      } catch (err) {
        handleError(err);
      }
    },
  });

  useEffect(() => {
    if (devices.length) {
      console.log(devices.length);
      setValues((v) => ({ ...v, deviceName: parseName(devices[0]) }));
    }
  }, [dData]);

  useEffect(() => {
    if (!visible) {
      resetValues();
    }
  }, [visible]);

  return (
    <Popup.Form onSubmit={handleSubmit}>
      <Popup.Content>
        <div className="flex flex-col gap-2xl">
          <Select
            label="Select Device"
            size="lg"
            value={values.deviceName}
            disabled={dIsLoading}
            placeholder="select a device"
            options={async () =>
              mapper(devices, (d) => {
                return {
                  ...d,
                  value: parseName(d),
                  label: parseName(d),
                };
              })
            }
            onChange={(_, value) => {
              handleChange('deviceName')(dummyEvent(value));
            }}
            error={!!errors.clusterName}
            message={errors.clusterName}
            loading={dIsLoading}
          />

          <ExposedPortList setExposedPorts={setPorts} exposedPorts={ports} />
        </div>
      </Popup.Content>
      <Popup.Footer>
        <Popup.Button closable content="Cancel" variant="basic" />
        <Popup.Button
          loading={isLoading}
          type="submit"
          content="Intercept"
          variant="primary"
        />
      </Popup.Footer>
    </Popup.Form>
  );
};

const HandleIntercept = (props: IDialog) => {
  const { setVisible, visible } = props;

  return (
    <Popup.Root show={visible} onOpenChange={(v) => setVisible(v)}>
      <Popup.Header>Intercept Service</Popup.Header>
      <Root {...props} />
    </Popup.Root>
  );
};

export default HandleIntercept;
