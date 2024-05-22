import { UndoRedo, DiffSourceToggleWrapper } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

const _ToolbarContent = () => (
  <DiffSourceToggleWrapper>
    <UndoRedo />
  </DiffSourceToggleWrapper>
);

const Writer = () => {
  return (
    // <MDXEditor
    //   markdown="# Hello World"
    //   onChange={(e) => {
    //     console.log(e);
    //   }}
    //   plugins={[
    //     toolbarPlugin({
    //       toolbarContents: ToolbarContent,
    //     }),
    //     headingsPlugin(),
    //     diffSourcePlugin({
    //       viewMode: 'rich-text',
    //       diffMarkdown: 'boo',
    //     }),
    //   ]}
    // />
    <div className="wb-w-full wb-overflow-x-hidden" />
  );
};

export default Writer;
