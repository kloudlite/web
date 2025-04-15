import Popup from '@kloudlite/design-system/molecule/popup';
import { toast } from '@kloudlite/design-system/molecule/toast';
import { useParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { CopyContentToClipboard } from '~/console/components/common-console-components';
import { ListItem } from '~/console/components/console-list-components';
import ListV2 from '~/console/components/listV2';
import { LoadingPlaceHolder } from '~/console/components/loading';
import MultiStep, { useMultiStep } from '~/console/components/multi-step';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { ExtractNodeType } from '~/console/server/r-utils/common';
import { ensureAccountClientSide } from '~/console/server/utils/auth-utils';
import useCustomSwr from '~/root/lib/client/hooks/use-custom-swr';

type BaseType = ExtractNodeType<{ name: string }>;

export const ViewExports = ({
  show,
  setShow,
  item,
}: {
  show: boolean;
  setShow: () => void;
  item: BaseType;
}) => {
  const api = useConsoleApi();
  const [onClick, setOnClick] = useState(false);
  const params = useParams();
  ensureAccountClientSide(params);
  const { data, isLoading, error } = useCustomSwr(
    () => (onClick ? `secret_${item.name}` : null),
    async () => {
      if (!item.name) {
        toast.error('Exports not found');
        throw new Error('Exports not found');
      } else {
        return api.getSecret({
          envName: '',
          name: item.name,
        });
      }
    },
  );

  const dataSecret = () => {
    if (isLoading) {
      return <LoadingPlaceHolder />;
    }
    if (error) {
      return (
        <span className="bodyMd-medium text-text-strong">
          Error while fetching exports
        </span>
      );
    }
    if (!data?.stringData) {
      return (
        <span className="bodyMd-medium text-text-strong">No secret found</span>
      );
    }

    return (
      <ListV2.Root
        data={{
          headers: [
            {
              render: () => 'Key',
              name: 'key',
              className: 'min-w-[170px]',
            },
            {
              render: () => 'Value',
              name: 'value',
              className: 'flex-1 min-w-[345px] max-w-[345px] w-[345px]',
            },
          ],
          rows: Object.entries(data.stringData || {}).map(([key, value]) => {
            const v = value as string;
            return {
              columns: {
                key: {
                  render: () => <ListItem data={key} />,
                },
                value: {
                  render: () => (
                    <CopyContentToClipboard
                      content={v}
                      toastMessage={`${key} copied`}
                    />
                  ),
                },
              },
            };
          }),
        }}
      />
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const { onNext, currentStep } = useMultiStep({
    defaultStep: 0,
    totalSteps: 2,
  });
  return (
    <Popup.Root show={show} onOpenChange={setShow}>
      <Popup.Header>
        {currentStep === 0 ? <div>Confirmation</div> : <div>Exports</div>}
      </Popup.Header>
      <Popup.Content>
        <MultiStep.Root currentStep={currentStep}>
          <MultiStep.Step step={0}>
            <div>
              <p>{`Are you sure you want to view the exports of '${item.name}'?`}</p>
            </div>
          </MultiStep.Step>
          <MultiStep.Step step={1}>{dataSecret()}</MultiStep.Step>
        </MultiStep.Root>
      </Popup.Content>
      <Popup.Footer>
        {currentStep === 0 ? (
          <Popup.Button
            content="Yes"
            onClick={() => {
              onNext();
              setOnClick(true);
            }}
          />
        ) : null}
      </Popup.Footer>
    </Popup.Root>
  );
};
