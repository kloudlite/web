import { UndoRedo, DiffSourceToggleWrapper } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import axios from 'axios';
import Button from './button';

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

    <div className="wb-w-full">
      <Button
        content="hello"
        onClick={async () => {
          try {
            axios({
              url: 'https://auth1.dev.kloudlite.io/api',
              method: 'post',
              withCredentials: false,
              data: {
                method: 'loginPageInitUrls',
                args: [{}],
              },
            }).then((e) => {
              console.log(e);
            });
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </div>
  );
};

export default Writer;
