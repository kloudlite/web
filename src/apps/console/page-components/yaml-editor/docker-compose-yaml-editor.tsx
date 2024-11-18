import { useCallback, useEffect, useState } from 'react';
import { Button, IconButton } from '~/components/atoms/button';
import Popup from '~/components/molecule/popup';
import { toast } from '~/components/molecule/toast';
import { Box } from '~/console/components/common-console-components';
import { yamlDump, yamlParse } from '~/console/components/diff-viewer';
import { X } from '~/console/components/icons';
import CodeEditorClient from '~/root/lib/client/components/editor-client';
import { useReload } from '~/root/lib/client/helpers/reloader';
import { useUnsavedChanges } from '~/root/lib/client/hooks/use-unsaved-changes';

const DockerComposeYamlEditor = ({
  item,
  onCloseButtonClick,
  onCommit,
}: {
  item: any;
  onCloseButtonClick?: () => void;
  onCommit?: ({ yamlData }: { yamlData: any }) => Promise<boolean>;
}) => {
  const { setHasChanges, hasChanges } = useUnsavedChanges();
  const ymlSpec = useCallback(() => {
    if (!item) {
      return '';
    }

    return yamlDump(item);
  }, [item])();

  const reload = useReload();

  const [initialState, setState] = useState(ymlSpec);
  const [loading, setLoading] = useState(false);

  const [closeEditor, setcloseEditor] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);

  //   useEffect(() => {
  //     const { data: spec, error } = yamlParse(initialState);
  //     if (error) {
  //       setErrors([error]);

  //       return;
  //     }

  //     try {
  //       const res = validateType(
  //         {
  //           ...item,
  //           spec,
  //         },
  //         'AppIn'
  //       );

  //       setErrors(res);
  //     } catch (e) {
  //       const er = e as Error;
  //       setErrors([er.message]);
  //     }
  //   }, [initialState]);

  useEffect(() => {
    try {
      const { data: _, error } = yamlParse(initialState);

      if (error) {
        setErrors([error]);
      } else {
        setErrors([]);
      }
    } catch (e) {
      const er = e as Error;
      setErrors([er.message]);
    }
  }, [initialState]);

  useEffect(() => {
    setHasChanges(initialState !== ymlSpec);
  }, [initialState]);

  return (
    <Box
      className="!shadow-none h-full !border-none"
      title={
        <div className="flex justify-between">
          <span>Write your docker compose file</span>
          <IconButton
            variant="plain"
            onClick={() => {
              if (hasChanges) {
                setcloseEditor(true);
              } else {
                onCloseButtonClick?.();
              }
            }}
            icon={<X />}
          />
        </div>
      }
    >
      <div className="h-full flex flex-col overflow-hidden">
        <CodeEditorClient
          height="calc(70vh - 20px)" ///
          value={initialState}
          onChange={(v) => {
            if (v) {
              setState(v);
            }
          }}
          lang="yaml"
        />
        <div className="p-xl overflow-y-auto h-[16vh] border-l border-b border-r border-border-default rounded-b-lg transition-all">
          <pre className=" text-text-critical">
            {errors.map((r) => {
              return <pre key={r}>{r}</pre>;
            })}
          </pre>
        </div>
      </div>
      <div className="flex gap-lg justify-end">
        {hasChanges && (
          <Button
            disabled={!hasChanges || loading}
            content="Discard Changes"
            variant="outline"
            onClick={() => {
              setState(ymlSpec);
            }}
          />
        )}
        <Button
          disabled={!hasChanges || (!!errors && errors.length > 0)}
          content={loading ? 'Committing changes.' : 'Commit Changes'}
          loading={loading}
          onClick={async () => {
            try {
              const parseSpec = yamlParse(initialState);
              if (!parseSpec.error) {
                setLoading(true);
                const res = await onCommit?.({ yamlData: parseSpec.data });
                if (res) {
                  setHasChanges(false);
                  setLoading(false);
                  reload();
                }
              } else {
                throw new Error(parseSpec.error);
              }
            } catch (error) {
              toast.error('error while parsing yaml');
            }
          }}
        />
      </div>

      <Popup.Root
        show={hasChanges && closeEditor}
        onOpenChange={() => {
          setcloseEditor(false);
        }}
        backdrop={false}
      >
        <Popup.Header>Unsaved changes</Popup.Header>
        <Popup.Content>
          Are you sure you want to discard the changes?
        </Popup.Content>
        <Popup.Footer>
          <Popup.Button content="Cancel" variant="basic" closable />
          <Popup.Button
            content="Discard"
            variant="warning"
            onClick={() => {
              //
              setState(ymlSpec);
              onCloseButtonClick?.();
            }}
          />
        </Popup.Footer>
      </Popup.Root>
    </Box>
  );
};

export default DockerComposeYamlEditor;
