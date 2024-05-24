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
    <Wrapper className="wb-relative wb-flex wb-flex-col wb-items-center wb-py-6xl md:wb-py-8xl lg:wb-py-10xl wb-gap-6xl md:wb-gap-8xl xl:wb-gap-10xl">
      <div className="wb-flex wb-flex-col wb-gap-3xl wb-text-center">
        <h1 className="wb-heading4xl-marketing md:wb-heading5xl-marketing lg:wb-heading6xl-marketing wb-text-text-default dark:wb-text-text-darktheme-default">
          Contact us
        </h1>
        <p className="wb-bodyLg-medium md:wb-bodyXl-medium wb-text-text-soft dark:wb-text-text-darktheme-soft">
          Get in touch and let us know how we can help.
        </p>
      </div>
      <div className="wb-gap-5xl md:wb-gap-8xl xl:wb-gap-10xl wb-flex wb-flex-col lg:wb-flex-row w-full">
        <form
          action="/api/request-demo"
          className="wb-flex wb-flex-col wb-gap-5xl wb-flex-1 wb-p-3xl md:wb-p-6xl wb-border wb-border-border-default dark:wb-border-border-darktheme-default wb-rounded-lg"
        >
          <div className="wb-flex wb-flex-col wb-gap-3xl">
            <TextInput label="Full name" size="lg" />
            <div className="wb-flex wb-flex-col md:wb-flex-row wb-gap-3xl">
              <div className="wb-basis-full">
                <TextInput label="Company name" size="lg" />
              </div>
              <div className="wb-basis-full">
                <TextInput label="Email" size="lg" />
              </div>
            </div>
            <div className="wb-flex wb-flex-col md:wb-flex-row wb-gap-3xl">
              <div className="wb-basis-full">
                <TextInput label="Country" size="lg" />
              </div>
              <div className="wb-basis-full">
                <TextInput label="Mobile" size="lg" />
              </div>
            </div>
            <TextArea label="Message" />
          </div>
          <div className="wb-w-full md:wb-w-fit">
            <Button type="submit" content="Request demo" size="lg" block />
          </div>
        </form>
        <div className="wb-h-xs lg:wb-h-auto lg:wb-w-xs wb-bg-border-default dark:wb-bg-border-darktheme-default" />
        <div className="wb-flex-1 wb-flex wb-flex-col md:wb-flex-row lg:wb-flex-col wb-gap-7xl md:wb-gap-10xl wb-justify-center md:wb-justify-between lg:wb-max-w-[300px]">
          <div className="wb-flex wb-flex-col wb-p-5xl wb-gap-6xl wb-border wb-border-border-default dark:wb-border-border-darktheme-default wb-rounded-lg">
            <div className="wb-text-icon-primary dark:wb-text-icon-darktheme-primary">
              <SupportIcon height={66} width={66} />
            </div>
            <div className="wb-flex wb-flex-col wb-gap-xl">
              <div className="wb-flex wb-flex-col wb-gap-lg">
                <span className="wb-headingXl wb-text-text-default dark:wb-text-text-darktheme-default">
                  Reach us to
                </span>
                <span className="wb-bodyXl wb-text-text-soft dark:wb-text-text-darktheme-soft">
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
