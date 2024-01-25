import Container from '~/app/components/container';
import { Button } from 'kl-design-system/atoms/button';
import { TextInput, TextArea } from 'kl-design-system/atoms/input';

const ContactRoot = () => {
  return (
    <Container className="relative flex flex-col items-center">
      <div className="px-3xl md:!px-5xl lg:!px-8xl xl:!px-11xl 2xl:px-12xl pt-6xl md:!pt-8xl xl:!pt-10xl flex flex-col gap-3xl text-center">
        <h1 className="heading4xl-marketing md:!heading5xl-marketing lg:!heading6xl-marketing text-text-default">
          Contact us
        </h1>
        <p className="bodyLg-medium md:!bodyXl-medium text-text-soft">
          Get in touch and let us know how we can help.
        </p>
      </div>
      <div className="px-3xl md:!px-5xl lg:!px-8xl xl:!px-11xl 2xl:px-12xl py-6xl md:!py-8xl xl:!py-10xl gap-5xl md:!gap-8xl xl:!gap-10xl flex flex-col lg:!flex-row w-full">
        <div className="flex flex-col gap-5xl flex-1 md:px-8xl lg:!px-0">
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
            <Button content="Request demo" size="lg" block />
          </div>
        </div>
        <div className="h-xs lg:!h-auto lg:!w-xs bg-border-default" />
        <div className="flex-1 flex flex-col md:!flex-row lg:!flex-col gap-7xl md:!gap-10xl justify-center md:!justify-between lg:!justify-center lg:!max-w-[300px]">
          <div className="flex flex-col gap-2xl">
            <div className="flex flex-col gap-lg">
              <span className="headingLg text-text-default">Sales</span>
              <span className="bodyLg text-text-soft">
                We’d love to talk about how we can work together.
              </span>
            </div>
            <Button variant="plain" content="example@kloudlite.io" />
          </div>
          <div className="flex flex-col gap-2xl">
            <div className="flex flex-col gap-lg">
              <span className="headingLg text-text-default">Support</span>
              <span className="bodyLg text-text-soft">
                We’re here to help with any questions you may have.
              </span>
            </div>
            <Button variant="plain" content="example@kloudlite.io" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactRoot;
