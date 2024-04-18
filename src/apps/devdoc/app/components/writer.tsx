import {
  MDXEditor,
  headingsPlugin,
  UndoRedo,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

const ToolbarContent = () => (
  <DiffSourceToggleWrapper>
    <UndoRedo />
  </DiffSourceToggleWrapper>
);
const Writer = () => {
  return (
    <MDXEditor
      markdown="# Hello World"
      onChange={(e) => {
        console.log(e);
      }}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => <ToolbarContent />,
        }),
        headingsPlugin(),
        diffSourcePlugin({
          viewMode: 'rich-text',
          diffMarkdown: 'boo',
        }),
      ]}
    />
  );
};

export default Writer;
