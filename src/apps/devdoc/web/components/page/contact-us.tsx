import { TextInput, TextArea } from 'kl-design-system/atoms/input';
import Select from 'kl-design-system/atoms/select';
import Link from 'next/link';
import { ComponentProps, ReactNode, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { contactUrl, supportEmail } from '~/app/utils/config';
import Wrapper from '../wrapper';
import Button from '../button';
import countries from '~/app/utils/countries.json';
import { GraphItem } from '../graph';
import consts from '~/app/utils/const';
import { getCookie, setCookie } from 'cookies-next';
import { Block } from '../commons';
import ResponsiveContainer from '../responsive-container';
import FAQSection from '../faq';
import { CircleNotch, JengaIconCommonProps } from '@jengaicons/react';
import axios from 'axios';
import { toast } from 'kl-design-system/molecule/toast';
import grecaptcha from '~/app/utils/g-recaptcha';

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

const addContact = async (data: {
  email: string;
  fullname: string;
  companyName: string;
  mobile: string;
  country: string;
  message: string;
  token: string;
}) => {
  return axios(contactUrl, {
    method: 'post',
    data,
  });
};

type Inputs = {
  fullname: string;
  email: string;
  mobile: string;
  country: string;
  message: string;
  companyName: string;
};

const getContries = (mode?: 'code' | 'normal') => {
  return (countries || []).map((c) => ({
    label: c.name,
    value: c.name,
    render: () => (
      <div className="wb-flex wb-flex-row wb-items-center wb-gap-xl wb-truncate wb-text-text-default">
        <span>{c.emoji}</span>
        {mode === 'code' && <span>{c.dial_code}</span>}
        <span className="wb-truncate">{c.name}</span>
      </div>
    ),
    country: c,
  }));
};

const valueRender = (value: any) => (
  <div className="wb-flex wb-flex-row wb-items-center wb-gap-xl">
    <span>{value.country.emoji}</span>
    <span>{value.label}</span>
  </div>
);

export const Event = ({ size = 48 }: { size?: number }) => (
  <svg
    height={size}
    width={size}
    fill="none"
    viewBox="0 0 50 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.6678 17.3499C20.9217 17.3499 19.5053 18.7662 19.5053 20.5124V24.0002C19.5053 27.0294 21.9698 29.4939 24.999 29.4939C28.0283 29.4939 30.4927 27.0294 30.4927 24.0002V20.5124C30.4927 18.7663 29.0764 17.3499 27.3302 17.3499H22.6678ZM28.7578 20.5124V24.0002C28.7578 26.0693 27.0681 27.759 24.9989 27.759C22.9297 27.759 21.24 26.0693 21.24 24.0002V20.5124C21.24 19.7263 21.8816 19.0847 22.6677 19.0847H27.3279C28.1163 19.0847 28.7578 19.7263 28.7578 20.5124ZM48.1304 39.3246H44.3715V18.2172C44.3715 17.7383 43.983 17.3498 43.5041 17.3498C43.0252 17.3498 42.6366 17.7383 42.6366 18.2172V39.3246H36.2755V37.8044C36.2755 34.1788 33.3253 31.2287 29.6998 31.2287H20.298C16.6724 31.2287 13.7223 34.1789 13.7223 37.8044V39.3246H7.36115V15.8636C7.36115 15.0888 7.99137 14.4585 8.76622 14.4585H22.6856C23.1645 14.4585 23.553 14.0699 23.553 13.5911C23.553 13.1122 23.1645 12.7236 22.6856 12.7236H8.76622C7.03812 12.7236 5.62629 14.1355 5.62629 15.8636V39.3246H1.86743C1.38854 39.3246 1 39.7132 1 40.1921V42.3945C1 44.8455 2.99463 46.8424 5.44783 46.8424H44.5522C47.0031 46.8424 49 44.8477 49 42.3945L48.9977 40.1921C48.9977 39.7132 48.6093 39.3246 48.1304 39.3246ZM15.4572 37.8044C15.4572 35.1321 17.6257 32.9635 20.2981 32.9635H29.7022C32.3745 32.9635 34.5431 35.1321 34.5431 37.8044V39.3246H32.0786C31.934 39.3246 31.7962 39.3359 31.6516 39.354L31.6494 37.8789C31.6494 37.4 31.2608 37.0115 30.7819 37.0115C30.3031 37.0115 29.9145 37.4 29.9145 37.8789V40.1921C29.9145 40.2147 29.9213 40.2327 29.9213 40.2553C29.7248 40.4631 29.5576 40.6958 29.4289 40.9601C29.221 41.3758 28.7986 41.6378 28.3355 41.6378H21.6673C21.1997 41.6378 20.7818 41.3781 20.574 40.9601C20.4407 40.7004 20.2736 40.4632 20.0816 40.2553C20.0816 40.2327 20.0883 40.2147 20.0883 40.1921V37.8789C20.0883 37.4 19.6998 37.0115 19.2209 37.0115C18.742 37.0115 18.3535 37.4 18.3535 37.8789V39.354C18.2157 39.3359 18.0711 39.3246 17.9265 39.3246H15.4575L15.4572 37.8044ZM47.2629 42.3945C47.2629 43.8922 46.0476 45.1075 44.55 45.1075H5.44795C3.9503 45.1075 2.73498 43.8922 2.73498 42.3945V41.0595H17.9219C18.3895 41.0595 18.8074 41.3193 19.0153 41.7372C19.519 42.7424 20.5355 43.3727 21.6627 43.3727H28.3309C29.4581 43.3727 30.4769 42.7492 30.9784 41.7372C31.1862 41.3216 31.6086 41.0595 32.0717 41.0595H47.2633L47.2629 42.3945ZM28.4096 14.4581H31.3598V17.0604C31.3598 17.3902 31.5451 17.6906 31.8387 17.8352C31.9607 17.8984 32.094 17.9278 32.2273 17.9278C32.4125 17.9278 32.5977 17.8691 32.7468 17.7538L37.1427 14.4581H42.4061C43.4881 14.4581 44.3713 13.5794 44.3713 12.4928V3.12284C44.3713 2.04081 43.4926 1.15759 42.4061 1.15759H28.4098C27.3277 1.15759 26.4445 2.0363 26.4445 3.12284V12.4905C26.4445 13.5793 27.3231 14.4581 28.4096 14.4581ZM28.1792 3.12251C28.1792 2.99601 28.2831 2.89209 28.4096 2.89209H42.4036C42.5301 2.89209 42.634 2.99601 42.634 3.12251V12.4902C42.634 12.6167 42.5301 12.7206 42.4036 12.7206H36.8511C36.6659 12.7206 36.4807 12.7838 36.3316 12.8945L33.0945 15.3251V13.5903C33.0945 13.1114 32.7059 12.7228 32.2271 12.7228H28.4094C28.2829 12.7228 28.179 12.6189 28.179 12.4924L28.1792 3.12251ZM34.5473 7.80756C34.5473 7.32866 34.9359 6.94012 35.4147 6.94012H35.4215C35.9004 6.94012 36.289 7.32866 36.289 7.80756C36.289 8.28645 35.9004 8.67499 35.4215 8.67499C34.9404 8.67499 34.5473 8.28645 34.5473 7.80756ZM31.0776 7.80756C31.0776 7.32866 31.4661 6.94012 31.945 6.94012H31.9518C32.4307 6.94012 32.8192 7.32866 32.8192 7.80756C32.8192 8.28645 32.4307 8.67499 31.9518 8.67499C31.4707 8.67499 31.0776 8.28645 31.0776 7.80756ZM38.017 7.80756C38.017 7.32866 38.4056 6.94012 38.8845 6.94012H38.8912C39.3701 6.94012 39.7587 7.32866 39.7587 7.80756C39.7587 8.28645 39.3701 8.67499 38.8912 8.67499C38.4101 8.67499 38.017 8.28645 38.017 7.80756Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
    />
  </svg>
);
export const Docs = ({ size = 48 }: { size?: number }) => (
  <svg
    height={size}
    width={size}
    fill="none"
    viewBox="0 0 48 40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.13655 16.4023C5.13655 15.8389 5.59246 15.383 6.15587 15.383C6.71929 15.383 7.1752 15.8389 7.1752 16.4023V16.7587C7.1752 17.3221 6.71929 17.778 6.15587 17.778C5.59246 17.778 5.13655 17.3221 5.13655 16.7587V16.4023ZM5.13655 19.9978C5.13655 19.4344 5.59246 18.9785 6.15587 18.9785C6.71929 18.9785 7.1752 19.4344 7.1752 19.9978V30.2767C11.5093 30.4837 15.1127 31.1905 17.9816 32.391C20.0063 33.2371 21.6707 34.3321 22.9806 35.6699V9.00848C22.0728 7.46359 20.7409 6.18342 18.985 5.17011V12.4226C18.985 12.986 18.5291 13.4419 17.9657 13.4419C17.5934 13.4419 17.2689 13.2428 17.0917 12.9442L15.0192 10.0794L12.8969 13.0159C12.5704 13.4718 11.9353 13.5733 11.4795 13.2468C11.2047 13.0477 11.0574 12.7372 11.0574 12.4226L11.0534 2.69109C9.84097 2.51789 8.54887 2.39844 7.17518 2.32876V13.1632C7.17518 13.7266 6.71927 14.1825 6.15586 14.1825C5.59244 14.1825 5.13653 13.7266 5.13653 13.1632V7.25821L3.60556 7.16066L2.03875 7.09097V35.0266C5.05096 35.0624 7.79233 34.945 10.2453 34.8414C13.4387 34.7061 16.164 34.5886 18.4438 34.8514C18.0496 34.6443 17.6355 34.4512 17.2015 34.2701C14.3565 33.0796 10.6931 32.4126 6.21212 32.2692L6.15638 32.2712C5.59295 32.2712 5.13705 31.8153 5.13705 31.2519L5.13655 19.9978ZM24.8263 39.3115C24.7248 39.4508 24.6372 39.5225 24.4879 39.6141C24.3326 39.6997 24.1634 39.7395 23.9981 39.7395C23.8329 39.7395 23.6637 39.6997 23.5084 39.6141C23.3611 39.5245 23.2555 39.4409 23.16 39.2975C21.0935 36.4148 16.7474 36.5979 10.3246 36.8727C7.60712 36.9881 4.53539 37.1195 1.08701 37.0419L1.01932 37.0459C0.455893 37.0459 0 36.59 0 36.0266L0.00398198 6.02834C0.0139362 5.46689 0.47781 5.02292 1.03921 5.03291C1.97892 5.05481 2.87083 5.08866 3.70897 5.13445L5.13643 5.22603L5.14042 1.24827C5.15634 0.686824 5.62221 0.244845 6.18364 0.260797C8.34971 0.326498 10.3446 0.507662 12.164 0.810264L12.3233 0.836146C14.4496 1.19849 16.3369 1.72408 17.9816 2.41294L18.4315 2.60804C20.8066 3.67314 22.6641 5.09662 24.0001 6.87845C25.4196 4.98914 27.4244 3.49995 30.0187 2.41294C33.1025 1.12289 37.0347 0.404161 41.8163 0.260793C42.3778 0.244866 42.8436 0.68684 42.8596 1.24826L42.8635 5.22603L44.291 5.13444C45.1013 5.09065 45.9613 5.05879 46.8652 5.0349L46.9807 5.02893C47.5441 5.02893 48 5.48484 48 6.04825V16.584C48 17.1474 47.5441 17.6033 46.9807 17.6033C46.4172 17.6033 45.9614 17.1474 45.9614 16.584V7.09357L44.3946 7.16325L42.8636 7.26081V31.2547C42.8636 31.8181 42.4077 32.274 41.8442 32.274L41.7885 32.272C37.309 32.4134 33.6456 33.0803 30.7992 34.2729C30.3671 34.454 29.953 34.6471 29.5569 34.8542C31.8364 34.5934 34.5619 34.7088 37.7533 34.8442C40.204 34.9477 42.9457 35.0652 45.9598 35.0294V23.4167C45.9598 22.8533 46.4157 22.3974 46.9792 22.3974C47.5426 22.3974 47.9985 22.8533 47.9985 23.4167V36.0268C47.9945 36.5782 47.5545 37.0322 46.9991 37.0421C43.5151 37.1238 40.4153 36.9924 37.6758 36.8749C31.2531 36.6021 26.9051 36.417 24.8405 39.2998L24.8305 39.3137L24.8263 39.3115ZM25.0155 9.00848V35.6699C26.3235 34.3321 27.9918 33.2391 30.0145 32.391C32.8834 31.1905 36.4847 30.4857 40.8209 30.2767V2.32885C36.7775 2.52992 33.4349 3.18493 30.7948 4.28988C28.137 5.40277 26.212 6.9758 25.0155 9.00848ZM16.9445 4.18662C15.7898 3.72274 14.5036 3.3445 13.0901 3.04982V9.28146L14.1831 7.76837C14.2468 7.67679 14.3264 7.59318 14.424 7.52349C14.8799 7.19699 15.515 7.30052 15.8415 7.75443L16.9464 9.27944V4.1868L16.9445 4.18662ZM47.9941 20.1773C47.9941 20.7407 47.5382 21.1966 46.9748 21.1966C46.4114 21.1966 45.9555 20.7407 45.9555 20.1773V19.8209C45.9555 19.2575 46.4114 18.8016 46.9748 18.8016C47.5382 18.8016 47.9941 19.2575 47.9941 19.8209V20.1773Z"
      fill="currentColor"
    />
  </svg>
);

const ThankYouResource = ({
  icon: Icon,
  title,
  desc,
  link,
}: {
  icon: (props: JengaIconCommonProps) => JSX.Element;
  title: ReactNode;
  desc: ReactNode;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className="wb-flex wb-flex-col wb-gap-5xl wb-p-5xl wb-rounded wb-border wb-border-border-default wb-bg-surface-basic-subdued"
    >
      <span className="wb-h-[88px] wb-w-[88px] wb-rounded-full wb-bg-surface-tertiary-default wb-flex wb-items-center wb-justify-center wb-text-icon-on-secondary">
        <Icon size={48} />
      </span>
      <div className="wb-flex wb-flex-col wb-gap-3xl">
        <h4 className="wb-headingXl wb-text-text-default">{title}</h4>
        <p className="wb-bodyMd wb-text-text-strong">{desc}</p>
      </div>
    </Link>
  );
};

const thankYouRes = [
  {
    title: 'Join our upcoming events',
    desc: 'Discover and join upcoming events and webinars tailored to your interests',
    icon: Event,
    link: '/',
  },
  {
    title: 'View our documentation',
    desc: 'Explore our documentation for detailed guides and helpful resources',
    icon: Docs,
    link: '/docs',
  },
];

const ThankYouMessage = () => {
  return (
    <div className="wb-flex wb-flex-col wb-gap-7xl wb-p-6xl">
      <div className="wb-flex wb-flex-col wb-gap-3xl">
        <h3 className="wb-heading4xl wb-text-text-default">Thank you!</h3>
        <p className="wb-bodyXl wb-text-text-default">
          Thank you for contacting Kloudlite. We'll get back to you as soon as
          possible.
        </p>
      </div>
      <div className="wb-flex wb-flex-col wb-gap-4xl">
        <p className="wb-bodyXl wb-text-text-default">
          In the meantime, check out the following resources:
        </p>
        <div className="wb-grid wb-grid-cols-1 lg:wb-grid-cols-2 wb-gap-5xl">
          {thankYouRes.map((ty) => (
            <ThankYouResource key={ty.title} {...ty} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FormSection = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [hasFormSubmitted, setHasFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Inputs>();

  useEffect(() => {
    setHasFormSubmitted(!!getCookie('contact-form-submitted'));

    const timeOut = setTimeout(() => {
      setPageLoading(false);
    }, 50);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const onFormSubmit = handleSubmit(async (d) => {
    setLoading(true);
    const token = await grecaptcha.execute(
      '6LcxXUIqAAAAABtRW-S7Bov6z9PgUHhbNWjTLhND',
      {
        action: 'login',
      },
    );
    if (!token) {
      toast.error('Something went wrong.');
      return;
    }

    try {
      await addContact({ ...d, token });
      setLoading(false);
      const expiryMinutes = consts.contactUs.cookies.cookieTime || 5;
      const date = new Date();
      date.setTime(date.getTime() + expiryMinutes * 60 * 1000);
      setCookie(consts.contactUs.cookies.submitCookie, true, {
        expires: date,
      });
      setHasFormSubmitted(true);
      reset();
    } catch {
      setHasFormSubmitted(false);
      setLoading(false);
      toast.error('Error submitting contact detail.');
    }
  });

  const getFormComponent = () => {
    if (pageLoading) {
      return (
        <div className="wb-bodyXXl wb-text-text-default wb-flex wb-items-center wb-justify-center wb-transition-all wb-min-h-[500px]">
          <span className="wb-animate-spin">
            <CircleNotch size={24} />
          </span>
        </div>
      );
    }

    if (hasFormSubmitted) {
      return <ThankYouMessage />;
    }

    return (
      <form
        onSubmit={onFormSubmit}
        className="wb-flex wb-flex-col wb-gap-5xl wb-flex-1 wb-p-3xl md:wb-p-6xl"
      >
        <div
          id="recaptcha"
          className="g-recaptcha hidden"
          data-sitekey="_your_site_key_"
          data-size="invisible"
        ></div>
        <div className="wb-flex wb-flex-col wb-gap-3xl">
          <TextInput
            label="Full name"
            size="lg"
            {...register('fullname', {
              required: 'Full name is required',
            })}
            error={!!errors.fullname}
            message={errors.fullname?.message}
          />
          <div className="wb-flex wb-flex-col md:wb-flex-row wb-gap-3xl">
            <div className="wb-basis-full">
              <TextInput
                label="Company name"
                size="lg"
                {...register('companyName', {
                  required: 'Company name is required',
                })}
                error={!!errors.companyName}
                message={errors.companyName?.message}
              />
            </div>
            <div className="wb-basis-full">
              <TextInput
                label="Email"
                size="lg"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                  },
                })}
                error={!!errors.email}
                message={errors.email?.message}
              />
            </div>
          </div>
          <div className="wb-flex wb-flex-col md:wb-flex-row wb-gap-3xl">
            <div className="wb-basis-full">
              <Controller
                control={control}
                name="country"
                defaultValue={undefined}
                rules={{
                  required: 'Country is required.',
                }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    size="lg"
                    label="Country"
                    value={value}
                    onChange={(val) => {
                      onChange(val.label);
                    }}
                    options={async () => getContries()}
                    valueRender={valueRender}
                    error={!!errors.country}
                    message={errors.country?.message}
                  />
                )}
              />
            </div>
            <div className="wb-basis-full">
              <TextInput
                label="Mobile"
                size="lg"
                {...register('mobile', {
                  required: 'Mobile is required',
                  pattern: {
                    value: /^[^a-zA-Z]*$/,
                    message: 'Invalid mobile number',
                  },
                })}
                error={!!errors.mobile}
                message={errors.mobile?.message}
              />
            </div>
          </div>
          <TextArea
            label="Message"
            {...register('message', {
              required: 'Message is required',
            })}
            error={!!errors.message}
            message={errors.message?.message}
          />
        </div>
        <div className="wb-flex wb-flex-col gap-xl">
          <div className="wb-bodyMd md:wb-bodyLg wb-text-text-soft wb-text-center md:wb-text-start">
            We value your privacy and promise not to spam you. Your contact
            details are safe with us, and we'll only reach out with relevant and
            important information.
          </div>
          <div className="wb-flex wb-flex-col md:wb-flex-row wb-items-center wb-gap-3xl wb-w-full md:wb-justify-between">
            <span className="wb-bodyMd md:wb-bodyLg wb-text-text-soft wb-text-center md:wb-text-start">
              By submitting this, I confirm that I have read and understood the
              <Link
                href="/privacy-policy"
                className="wb-text-text-default hover:wb-underline"
              >
                {' '}
                Privacy policy.
              </Link>
            </span>
            <div className="md:wb-min-w-[132px] wb-flex wb-justify-end">
              <Button
                loading={loading}
                type="submit"
                content="Submit"
                size="md"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div>
      <Block
        title="Contact us"
        desc="Get in touch and let us know how we can help."
      >
        <ResponsiveContainer className="wb-grid-cols-1 md:wb-grid-cols-[auto_236px] lg:wb-grid-cols-[auto_288px] 2xl:wb-grid-cols-[auto_352px] 3xl:wb-grid-cols-[auto_415px]">
          <GraphItem className="wb-bg-surface-basic-subdued">
            {getFormComponent()}
          </GraphItem>
          <GraphItem className="wb-bg-surface-basic-subdued">
            <div className="wb-flex wb-flex-col wb-p-5xl wb-gap-6xl">
              <div className="wb-text-icon-primary">
                <SupportIcon height={64} width={64} />
              </div>
              <div className="wb-flex wb-flex-col wb-gap-xl">
                <div className="wb-flex wb-flex-col wb-gap-lg">
                  <span className="wb-headingLg wb-text-text-default">
                    Reach us to
                  </span>
                  <span className="wb-bodyLg wb-text-text-soft">
                    We’re here to help with any questions you may have.
                  </span>
                </div>
                <Button
                  variant="plain"
                  content={supportEmail}
                  linkComponent={Link}
                  to={`mailto:${supportEmail}`}
                  toLabel="href"
                />

                <div className="wb-flex wb-flex-col wb-gap-lg wb-mt-xl">
                  <span className="wb-headingLg wb-text-text-default">
                    Address
                  </span>
                  <span className="wb-bodyLg wb-text-text-soft">
                    415, Floor 4, Shaft-1, Tower-B, VRR FORTUNA, Carmelaram,
                    Janatha Colony, Bangalore, Karnataka, India - 560035
                  </span>
                </div>
                <div className="wb-flex wb-flex-col wb-gap-lg wb-mt-xl">
                  <span className="wb-headingLg wb-text-text-default">
                    Contact No
                  </span>
                  <span className="wb-bodyLg wb-text-text-soft">
                    +91 99015 09003
                  </span>
                </div>
              </div>
            </div>
          </GraphItem>
        </ResponsiveContainer>
      </Block>
    </div>
  );
};

const ContactRoot = () => {
  return (
    <Wrapper>
      <FormSection />
      <FAQSection
        className="2xl:!wb-pb-8xl"
        items={consts.helpandsupport.kloudliteOverviewFaqs}
        def="general"
      />
    </Wrapper>
  );
};

export default ContactRoot;
