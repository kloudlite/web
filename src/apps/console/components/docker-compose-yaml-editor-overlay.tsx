import DockerComposeYamlEditor from '../page-components/yaml-editor/docker-compose-yaml-editor';
import OverlaySideDialog from './overlay-side-dialog';

const DockerComposeYamlEditorOverlay = ({
  item,
  showDialog,
  setShowDialog,
  onCommit,
}: {
  item: any;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onCommit: ({ yamlData }: { yamlData: any }) => Promise<boolean>;
}) => {
  return (
    <OverlaySideDialog show={showDialog} onOpenChange={() => {}}>
      <DockerComposeYamlEditor
        item={item}
        onCloseButtonClick={() => {
          setShowDialog(false);
        }}
        onCommit={onCommit}
      />
    </OverlaySideDialog>
  );
};

export default DockerComposeYamlEditorOverlay;
