import { TextInput, TextArea } from 'kl-design-system/atoms/input';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { supportEmail } from '~/app/utils/config';
import Wrapper from '../wrapper';
import Button from '../button';

const SupportIcon = (props: ComponentProps<'svg'>) => {
  const { height, width } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={height}
      height={width}
      viewBox="0 0 79 70"
      fill="none"
      {...props}
    >
      <path
        d="M28.6782 29.5001H50.6782"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.6782 40.4999H50.6782"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.6782 68C33.8517 68 28.3779 66.49 23.6267 63.84C23.5142 63.7772 23.3821 63.7594 23.2572 63.7911L7.47607 67.7975C7.11253 67.8897 6.78058 67.5638 6.86626 67.1986L10.6659 51.0049C10.694 50.885 10.6767 50.7589 10.6182 50.6504C9.73081 49.0062 8.9789 47.278 8.37742 45.481M60.3341 60.7374C65.1352 56.8793 68.834 51.7054 70.8832 45.763M70.8895 24.2552C66.4321 11.305 54.1418 2 39.6782 2C25.1855 2 12.8748 11.3425 8.44013 24.3335"
        stroke="currentColor"
        strokeWidth={3}
      />
      <circle
        cx={56.6284}
        cy={62.2809}
        r={4}
        stroke="currentColor"
        strokeWidth={3}
      />
      <rect
        x={2}
        y={24.4597}
        width={9.35681}
        height={21.0806}
        rx={2}
        stroke="currentColor"
        strokeWidth={3}
      />
      <rect
        x={68}
        y={24.4597}
        width={9.35681}
        height={21.0806}
        rx={2}
        stroke="currentColor"
        strokeWidth={3}
      />
    </svg>
  );
};

const ContactRoot = () => {
  return (
    <Wrapper className="relative flex flex-col items-center py-6xl md:!py-8xl lg:!py-10xl gap-6xl md:!gap-8xl xl:!gap-10xl">
      <div className="flex flex-col gap-3xl text-center">
        <h1 className="heading4xl-marketing md:!heading5xl-marketing lg:!heading6xl-marketing text-text-default dark:text-text-darktheme-default">
          Contact us
        </h1>
        <p className="bodyLg-medium md:!bodyXl-medium text-text-soft dark:text-text-darktheme-soft">
          Get in touch and let us know how we can help.
        </p>
      </div>
      <div className="gap-5xl md:!gap-8xl xl:!gap-10xl flex flex-col lg:!flex-row w-full">
        <form
          action="/api/request-demo"
          className="flex flex-col gap-5xl flex-1 p-3xl md:!p-6xl border border-border-default dark:border-border-darktheme-default rounded-lg"
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
        <div className="h-xs lg:!h-auto lg:!w-xs bg-border-default dark:bg-border-darktheme-default" />
        <div className="flex-1 flex flex-col md:!flex-row lg:!flex-col gap-7xl md:!gap-10xl justify-center md:!justify-between lg:!max-w-[300px]">
          <div className="flex flex-col p-5xl gap-6xl border border-border-default dark:border-border-darktheme-default rounded-lg">
            <div className="text-icon-primary dark:text-icon-darktheme-primary">
              <SupportIcon height={66} width={66} />
            </div>
            <div className="flex flex-col gap-xl">
              <div className="flex flex-col gap-lg">
                <span className="headingXl text-text-default dark:text-text-darktheme-default">
                  Reach us to
                </span>
                <span className="bodyXl text-text-soft dark:text-text-darktheme-soft">
                  We’re here to help with any questions you may have.
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
