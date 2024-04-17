import { TextInput, TextArea } from 'kl-design-system/atoms/input';
import Link from 'next/link';
import { supportEmail } from '~/app/utils/config';
import Wrapper from '../wrapper';
import Button from '../button';

const ContactRoot = () => {
  return (
    <Wrapper className="relative flex flex-col items-center py-6xl md:!py-8xl lg:!py-10xl gap-6xl md:!gap-8xl xl:!gap-10xl">
      <div className="flex flex-col gap-3xl text-center">
        <h1 className="heading4xl-marketing md:!heading5xl-marketing lg:!heading6xl-marketing text-text-default">
          Contact us
        </h1>
        <p className="bodyLg-medium md:!bodyXl-medium text-text-soft">
          Get in touch and let us know how we can help.
        </p>
      </div>
      <div className="gap-5xl md:!gap-8xl xl:!gap-10xl flex flex-col lg:!flex-row w-full">
        <form
          action="/api/request-demo"
          className="flex flex-col gap-5xl flex-1 md:px-8xl lg:!px-0 3xl:!p-5xl"
        >
          <div className="flex flex-col gap-3xl">
            <TextInput label="Full name" size="lg" />
            <div className="flex flex-col md:!flex-row gap-3xl">
              <div className="basis-full">
                <TextInput label="Company name" size="lg" />
              </div>
              <div className="basis-full">
                <TextInput label="Email" size="lg" />
              </div>
            </div>
            <div className="flex flex-col md:!flex-row gap-3xl">
              <div className="basis-full">
                <TextInput label="Country" size="lg" />
              </div>
              <div className="basis-full">
                <TextInput label="Mobile" size="lg" />
              </div>
            </div>
            <TextArea label="Message" />
          </div>
          <div className="w-full md:!w-fit">
            <Button type="submit" content="Request demo" size="lg" block />
          </div>
        </form>
        <div className="h-xs lg:!h-auto lg:!w-xs bg-border-default" />
        <div className="flex-1 flex flex-col md:!flex-row lg:!flex-col gap-7xl md:!gap-10xl justify-center md:!justify-between lg:!justify-center lg:!max-w-[300px]">
          <div className="flex flex-col gap-2xl">
            <div className="flex flex-col gap-lg">
              <span className="headingLg text-text-default">
                Sales & Support
              </span>
              <span className="bodyLg text-text-soft">
                We’d love to talk about how we can work together.
              </span>
            </div>
            <Button
              variant="plain"
              content={supportEmail}
              LinkComponent={Link}
              to={`mailto:${supportEmail}`}
              toLabel="href"
            />
          </div>
          {/* <div className="flex flex-col gap-2xl"> */}
          {/*   <div className="flex flex-col gap-lg"> */}
          {/*     <span className="headingLg text-text-default">Support</span> */}
          {/*     <span className="bodyLg text-text-soft"> */}
          {/*       We’re here to help with any questions you may have. */}
          {/*     </span> */}
          {/*   </div> */}
          {/*   <Button */}
          {/*     variant="plain" */}
          {/*     content="launch@kloudlite.io" */}
          {/*     LinkComponent={Link} */}
          {/*     to="mailto:launch@kloudlite.io" */}
          {/*     toLabel="href" */}
          {/*   /> */}
          {/* </div> */}
        </div>
      </div>
    </Wrapper>
  );
};

export default ContactRoot;
