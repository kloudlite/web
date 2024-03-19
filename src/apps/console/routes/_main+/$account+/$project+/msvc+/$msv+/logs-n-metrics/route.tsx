import { useOutletContext } from '@remix-run/react';
import axios from 'axios';
import Chart from '~/console/components/charts/charts-client';
import useDebounce from '~/lib/client/hooks/use-debounce';
import { useState } from 'react';
import { dayjs } from '~/components/molecule/dayjs';
import { parseValue } from '~/console/page-components/util';
import { ApexOptions } from 'apexcharts';
import { useDataState } from '~/console/page-components/common-state';
import { observeUrl } from '~/lib/configs/base-url.cjs';
import LogComp from '~/lib/client/components/logger';
import LogAction from '~/console/page-components/log-action';
import { IProjectManagedServiceContext } from '~/console/routes/_main+/$account+/$project+/msvc+/$msv+/_layout';
import { IProjectContext } from '~/console/routes/_main+/$account+/$project+/_layout';
import { IAccountContext } from '~/console/routes/_main+/$account+/_layout';
import { parseName } from '~/console/server/r-utils/common';

const LogsAndMetrics = () => {
  console.log('Inside route');
  const { account } = useOutletContext<IAccountContext>();
  const { project } = useOutletContext<IProjectContext>();
  const { managedService } = useOutletContext<IProjectManagedServiceContext>();
  const [cpuData, setCpuData] = useState<number[]>([]);
  const [memoryData, setMemoryData] = useState<number[]>([]);

  const xAxisFormatter = (_: string, __?: number) => {
    // return dayjs((val || 0) * 1000).format('hh:mm A');
    return '';
  };

  const tooltipXAixsFormatter = (val: number) =>
    dayjs(val * 1000).format('DD/MM/YY hh:mm A');

  const getAnnotations = ({
    min = '',
    max = '',
  }: {
    min?: string;
    max?: string;
  }) => {
    const tmin = parseValue(min, 0);
    const tmax = parseValue(max, 0);

    // if (tmin === tmax) {
    //   return {};
    // }

    const k: ApexOptions['annotations'] = {
      yaxis: [
        {
          y: tmin,
          y2: tmax,
          fillColor: '#33f',
          borderColor: '#33f',
          opacity: 0.1,
          strokeDashArray: 0,
          borderWidth: 1,
          label: {},
        },
      ],
    };

    return k;
  };

  useDebounce(
    () => {
      (async () => {
        try {
          const resp = await axios({
            url: `${observeUrl}/observability/metrics/cpu?cluster_name=${project.clusterName}&tracking_id=${managedService.id}`,
            method: 'GET',
            withCredentials: true,
          });

          setCpuData(resp?.data?.data?.result[0]?.values || []);
        } catch (err) {
          console.error(err);
        }
      })();
      (async () => {
        try {
          const resp = await axios({
            url: `${observeUrl}/observability/metrics/memory?cluster_name=${project.clusterName}&tracking_id=${managedService.id}`,
            method: 'GET',
            withCredentials: true,
          });
          console.log('logs1 ', resp);
          setMemoryData(resp?.data?.data?.result[0]?.values || []);
        } catch (err) {
          console.error('error1 ', err);
        }
      })();
    },
    1000,
    []
  );

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      redrawOnWindowResize: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },

    xaxis: {
      type: 'datetime',
      labels: {
        show: false,
        formatter: xAxisFormatter,
      },
    },
  };

  const { state } = useDataState<{
    linesVisible: boolean;
    timestampVisible: boolean;
  }>('logs');

  return (
    <div className="flex flex-col gap-6xl pt-6xl">
      <div className="gap-6xl items-center flex-col grid sm:grid-cols-2 lg:grid-cols-4">
        <Chart
          title="CPU Usage"
          options={{
            ...chartOptions,
            series: [
              {
                color: '#1D4ED8',
                name: 'CPU',
                data: cpuData,
              },
            ],
            tooltip: {
              x: {
                formatter: tooltipXAixsFormatter,
              },
              y: {
                formatter(val) {
                  return `${val.toFixed(2)} m`;
                },
              },
            },

            annotations: getAnnotations(
              // managedService.spec.containers[0].resourceCpu || {}
              { min: '0', max: '10' }
            ),

            yaxis: {
              min: 0,
              max: parseValue(
                // managedService.spec.containers[0].resourceCpu?.max,
                { min: '0', max: '10' },
                0
              ),

              floating: false,
              labels: {
                formatter: (val) => `${val} m`,
              },
            },
          }}
        />

        <Chart
          title="Memory Usage"
          options={{
            ...chartOptions,
            series: [
              {
                color: '#1D4ED8',
                name: 'Memory',
                data: memoryData,
              },
            ],

            annotations: getAnnotations(
              // managedService.spec.containers[0].resourceMemory || {}
              { min: '0', max: '10' }
            ),

            yaxis: {
              min: 0,
              max: parseValue(
                // managedService.spec.containers[0].resourceMemory?.max,
                { min: '0', max: '10' },
                0
              ),

              floating: false,
              labels: {
                formatter: (val) => `${val} MB`,
              },
            },
            tooltip: {
              x: {
                formatter: tooltipXAixsFormatter,
              },
              y: {
                formatter(val) {
                  return `${val.toFixed(2)} MB`;
                },
              },
            },
          }}
        />
      </div>

      <div className="flex-1">
        <LogComp
          {...{
            hideLineNumber: !state.linesVisible,
            hideTimestamp: !state.timestampVisible,
            dark: true,
            width: '100%',
            height: '70vh',
            title: 'Logs',
            actionComponent: <LogAction />,
            websocket: {
              account: parseName(account),
              cluster: project.clusterName || '',
              trackingId: managedService.id,
              recordVersion: managedService.recordVersion,
            },
          }}
        />
      </div>
    </div>
  );
};

export default LogsAndMetrics;
