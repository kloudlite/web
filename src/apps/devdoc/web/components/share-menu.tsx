import {
  Link,
  LinkedinLogoFill,
  ShareNetwork,
  TwitterNewLogoFill,
} from '@jengaicons/react';
import OptionList from 'kl-design-system/atoms/option-list';
import { useState } from 'react';
import { toast } from 'kl-design-system/molecule/toast';
import { Button } from 'kl-design-system/atoms/button';
import useClipboard from '../utils/use-clipboard';

const openWindow = (url: string) => {
  window.open(url, 'pop', 'width=600, height=600, scrollbars=no');
};

const ShareMenu = ({ frontmatter }: { frontmatter: Record<string, any> }) => {
  const [open, setOpen] = useState(false);
  const { copy } = useClipboard({
    onSuccess: () => {
      toast.info('Link copied');
    },
  });
  return (
    <OptionList.Root open={open} onOpenChange={setOpen}>
      <OptionList.Trigger>
        <Button
          variant="outline"
          className="md:!wb-p-lg"
          content={
            <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
              <span>
                <ShareNetwork size={16} />
              </span>
              <span className="md:wb-hidden wb-bodyMd-medium">Share</span>
            </div>
          }
        />
      </OptionList.Trigger>
      <OptionList.Content>
        <OptionList.Item
          onClick={() => {
            copy(window.location.href);
          }}
        >
          <div className="wb-flex wb-flex-row wb-gap-xl">
            <span>
              <Link size={20} />
            </span>
            <span>Copy link</span>
          </div>
        </OptionList.Item>
        <OptionList.Separator />
        <OptionList.Item
          onClick={() => {
            openWindow(
              `https://x.com/intent/post?text=${
                frontmatter.title
              }%0A${encodeURIComponent(window.location.href)}`
            );
          }}
        >
          <div className="wb-flex wb-flex-row wb-gap-xl">
            <span>
              <TwitterNewLogoFill size={20} />
            </span>
            <span>Share on X</span>
          </div>
        </OptionList.Item>
        <OptionList.Item
          onClick={() => {
            openWindow(
              `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                window.location.href
              )}`
            );
          }}
        >
          <div className="wb-flex wb-flex-row wb-gap-xl">
            <span>
              <LinkedinLogoFill size={20} />
            </span>
            <span>Share on LinkedIn</span>
          </div>
        </OptionList.Item>
        {/* <OptionList.Item */}
        {/*   onClick={() => { */}
        {/*     window.open( */}
        {/*       `https://www.facebook.com/dialog/share?&display=popup`, */}
        {/*       'pop', */}
        {/*       'width=600, height=400, scrollbars=no' */}
        {/*     ); */}
        {/*   }} */}
        {/* > */}
        {/*   <div className="wb-flex wb-flex-row wb-gap-xl"> */}
        {/*     <span> */}
        {/*       <FacebookLogoFill size={20} /> */}
        {/*     </span> */}
        {/*     <span>Share on Facebook</span> */}
        {/*   </div> */}
        {/* </OptionList.Item> */}
      </OptionList.Content>
    </OptionList.Root>
  );
};

export default ShareMenu;
