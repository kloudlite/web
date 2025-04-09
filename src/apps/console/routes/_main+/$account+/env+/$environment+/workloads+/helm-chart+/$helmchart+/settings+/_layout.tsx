import { Outlet, useOutletContext } from '@remix-run/react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@kloudlite/design-system/atoms/button';
import Popup from '@kloudlite/design-system/molecule/popup';
import { cn } from '@kloudlite/design-system/utils';
import { DiffViewer, yamlDump } from '~/console/components/diff-viewer';
import SidebarLayout from '~/console/components/sidebar-layout';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { useReload } from '~/lib/client/helpers/reloader';
import useForm from '~/lib/client/hooks/use-form';
import {
  DISCARD_ACTIONS,
  UnsavedChangesProvider,
  useUnsavedChanges,
} from '~/lib/client/hooks/use-unsaved-changes';
import Yup from '~/lib/server/helpers/yup';
import { IHelmChartContext } from '../_layout';
import { parseName } from '~/console/server/r-utils/common';
import { handleError } from '~/root/lib/utils/common';
import HelmChartContextProvider, {
  useHelmChartState,
} from '~/console/hooks/helm-utils/useHelmChartContext';

const navItems = [
  { label: 'General', value: 'general' },
  { label: 'Advance', value: 'advance' },
  { label: 'Values', value: 'values' },
];

const Layout = () => {
  const rootContext = useOutletContext<IHelmChartContext>();
  const { setHasChanges, performAction, setPerformAction, loading } =
    useUnsavedChanges();

  const { helmChart, setHelmChart, setReadOnlyHelmChart, readOnlyHelmChart } =
    useHelmChartState();

  const { environment } = useOutletContext<IHelmChartContext>();

  const [showDiff, setShowDiff] = useState(false);

  const api = useConsoleApi();
  const reload = useReload();

  const { isLoading, submit } = useForm({
    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: async () => {
      try {
        const { errors } = await api.updateHelmChart({
          envName: parseName(environment),
          helmchart: {
            displayName: helmChart.displayName,
            metadata: {
              name: parseName(helmChart),
              annotations: helmChart.metadata?.annotations,
            },
            spec: helmChart.spec,
          },
        });

        if (errors) {
          throw errors[0];
        }
        setPerformAction(DISCARD_ACTIONS.INIT);
        reload();
      } catch (error) {
        handleError(error);
      }
    },
  });

  useEffect(() => {
    if (loading) {
      return;
    }
    const isNotSame =
      JSON.stringify(helmChart) !== JSON.stringify(rootContext.helmchart);

    if (isNotSame) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [helmChart, rootContext.helmchart]);

  const reset = () => {
    setHelmChart(rootContext.helmchart);
    setReadOnlyHelmChart(rootContext.helmchart);
    setPerformAction('');
  };

  useEffect(() => {
    if (performAction === DISCARD_ACTIONS.DISCARD_CHANGES) {
      reset();
    }
  }, [performAction]);

  useEffect(() => {
    if (
      JSON.stringify(rootContext.helmchart) !==
      JSON.stringify(readOnlyHelmChart)
    ) {
      reset();
    }
  }, [rootContext]);

  return (
    <SidebarLayout navItems={navItems} parentPath="/settings">
      <Popup.Root
        className={cn('w-[90vw] max-w-[1440px]', {
          'min-w-[1000px]': showDiff,
          'min-w-[500px]': !showDiff,
        })}
        show={performAction === DISCARD_ACTIONS.VIEW_CHANGES}
        onOpenChange={(v) => setPerformAction(v)}
      >
        <Popup.Header>Commit Changes</Popup.Header>
        <Popup.Content>
          <div className="flex flex-col gap-md">
            <span className="bodyMd-medium text-text-strong">
              Please confirm if you want to update this app. This action will
              overwrite existing app details.
            </span>
            <Button
              size="sm"
              content={
                <span className="truncate text-left">
                  {showDiff
                    ? 'Hide Changes?'
                    : 'Click here to review changes before proceeding.'}
                </span>
              }
              variant="primary-plain"
              className="truncate"
              onClick={() => {
                setShowDiff(!showDiff);
              }}
            />
          </div>
          {showDiff && (
            <>
              <DiffViewer
                oldValue={yamlDump(rootContext.helmchart).toString()}
                newValue={yamlDump(helmChart).toString()}
                leftTitle="Previous State"
                rightTitle="New State"
                splitView
              />
            </>
          )}
        </Popup.Content>

        <Popup.Footer>
          <Popup.Button
            loading={isLoading}
            onClick={() => {
              submit();
            }}
            content="Commit Changes"
          />
        </Popup.Footer>
      </Popup.Root>
      <Outlet context={{ ...rootContext }} />
    </SidebarLayout>
  );
};

const Settings = () => {
  const rootContext = useOutletContext<IHelmChartContext>();
  const { environment, account } = useOutletContext<IHelmChartContext>();

  const helmChart = useMemo(() => rootContext.helmchart, []);

  return (
    <HelmChartContextProvider initialHelmChartState={helmChart}>
      <UnsavedChangesProvider
        onProceed={({ setPerformAction }) => {
          setPerformAction?.(DISCARD_ACTIONS.DISCARD_CHANGES);
        }}
        ignorePaths={navItems.map(
          (ni) =>
            `/${parseName(account)}/env/${parseName(environment)}/workloads/helm-chart/${parseName(rootContext.helmchart)}/settings/${ni.value}`,
        )}
      >
        <Layout />
      </UnsavedChangesProvider>
    </HelmChartContextProvider>
  );
};

export default Settings;
