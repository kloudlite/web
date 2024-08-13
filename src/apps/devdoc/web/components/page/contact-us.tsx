import { TextInput, TextArea } from 'kl-design-system/atoms/input';
import Select from 'kl-design-system/atoms/select';
import Link from 'next/link';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { addDoc, collection, getFirestore } from '@firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { Controller, useForm } from 'react-hook-form';
import { useFirebase } from '~/app/utils/useFirebase';
import { supportEmail } from '~/app/utils/config';
import Wrapper from '../wrapper';
import Button from '../button';
import countries from '~/app/utils/countries.json';
import { GraphItem } from '../graph';
import { CollapseItem, autoSize } from '~/app/utils/commons';
import consts from '~/app/utils/const';
import OptionList from 'kl-design-system/atoms/option-list';
import * as Accordion from '@radix-ui/react-accordion';
import { getCookie, setCookie } from 'cookies-next';
import { Block } from '../commons';

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

const addContact = async (
  app: FirebaseApp | null,
  data: {
    email: string;
    fullname: string;
    companyName: string;
    mobile: string;
    country: string;
    message: string;
  },
) => {
  if (!app) {
    return;
  }
  const firestore = getFirestore(app);
  const col = collection(firestore, 'web-contact-form');
  const contactData = {
    ...data,
    createdAt: new Date(),
  };

  await addDoc(col, contactData);
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

const valueRenderCountryCode = (value: any) => (
  <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg wb-bodyMd">
    <span>{value?.country?.dial_code}</span>
  </div>
);

const valueRenderFaq = (value: any) => (
  <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
    <span>{value?.item?.icon ? <value.item.icon size={16} /> : null}</span>
    <span className="wb-bodyMd">{value.label}</span>
  </div>
);

type IItem = keyof typeof consts.helpandsupport.kloudliteOverviewFaqs;

const FAQSection = () => {
  const [selected, setSelected] = useState<IItem>('general');
  const [defaultOpen, setDefaultOpen] = useState(
    consts.helpandsupport.kloudliteOverviewFaqs.general.items[0].title,
  );

  const ref = useRef<HTMLDivElement>(null);

  const items = Object.entries(consts.helpandsupport.kloudliteOverviewFaqs);

  useEffect(() => {
    if (ref.current?.parentElement && window.innerWidth >= 768)
      autoSize(ref.current?.parentElement, 'animationend');
  }, [ref.current]);
  return (
    <Block title="Frequently Asked Questions">
      <div className="wb-grid wb-grid-cols-1 lg:wb-grid-cols-[270px_auto] lg:wb-grid-cols-[288px_auto] 3xl:wb-grid-cols-[352px_auto] wb-gap-5xl">
        <GraphItem className="wb-flex md:wb-hidden wb-text-text-default wb-bg-surface-basic-subdued wb-flex-col wb-gap-lg">
          <Select
            className="wb-px-lg wb-cursor-pointer !wb-h-[36px] !wb-border-none wb-outline-none"
            value={selected}
            onChange={(_, v: IItem) => setSelected(v)}
            searchable={false}
            valueRender={valueRenderFaq}
            options={async () =>
              items.map(([key, value]) => {
                return {
                  label: value.label,
                  value: key,
                  item: value,
                  render: () => (
                    <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
                      <span>
                        <value.icon size={16} />
                      </span>
                      <span className="wb-bodyMd">{value.label}</span>
                    </div>
                  ),
                };
              })
            }
          />
        </GraphItem>
        <GraphItem className="wb-hidden md:wb-flex wb-text-text-default wb-bg-surface-basic-subdued wb-flex-col">
          {items.map(([key, val]) => {
            return (
              <div
                key={key}
                onClick={() => {
                  setSelected(key as IItem);
                  setDefaultOpen(val.items[0].title);
                }}
              >
                <OptionList.OptionItemRaw
                  active={selected === key}
                  className="!wb-p-3xl"
                >
                  <div className="wb-flex wb-flex-row wb-items-center wb-gap-xl !wb-bodyLg">
                    <span>
                      <val.icon size={16} />
                    </span>
                    <span>{val.label}</span>
                  </div>
                </OptionList.OptionItemRaw>
              </div>
            );
          })}
        </GraphItem>
        <GraphItem className="wb-text-text-default wb-bg-surface-basic-subdued">
          <Accordion.Root
            value={defaultOpen}
            collapsible
            type="single"
            ref={ref}
            onValueChange={(e) => {
              setDefaultOpen(e);
            }}
          >
            {consts.helpandsupport.kloudliteOverviewFaqs[selected].items.map(
              (f, i) => (
                <CollapseItem
                  index={i}
                  mode="desktop"
                  key={f.title}
                  label={f.title}
                  value={f.title}
                >
                  {f.desc}
                </CollapseItem>
              ),
            )}
          </Accordion.Root>
        </GraphItem>
      </div>
    </Block>
  );
};

const FormSection = () => {
  const { firebaseApp } = useFirebase();
  const [loading, setLoading] = useState(false);

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
  }, []);

  return (
    <div>
      {hasFormSubmitted ? (
        <div className="wb-flex wb-flex-col wb-items-center wb-justify-center wb-heading2xl-marketing md:wb-heading4xl-marketing wb-text-text-default wb-text-center">
          Thanks for sending message we will contact you soon.
        </div>
      ) : (
        <Block
          title="Contact us"
          desc="Get in touch and let us know how we can help."
        >
          <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-[auto_236px] lg:wb-grid-cols-[auto_288px] 2xl:wb-grid-cols-[auto_352px] 3xl:wb-grid-cols-[auto_415px] wb-gap-3xl md:wb-gap-5xl">
            <GraphItem className="wb-bg-surface-basic-subdued">
              <form
                onSubmit={handleSubmit(async (d) => {
                  setLoading(true);
                  await addContact(firebaseApp, d);
                  setLoading(false);
                  const expiryMinutes = 5;
                  const date = new Date();
                  date.setTime(date.getTime() + expiryMinutes * 60 * 1000);
                  setCookie('contact-form-submitted', true, {
                    expires: date,
                  });
                  setHasFormSubmitted(true);
                  reset();
                })}
                className="wb-flex wb-flex-col wb-gap-5xl wb-flex-1 wb-p-3xl md:wb-p-6xl"
              >
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
                            value:
                              /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                <div className="wb-flex wb-flex-col md:wb-flex-row wb-items-center wb-gap-3xl wb-w-full md:wb-justify-between">
                  <span className="wb-bodyMd md:wb-bodyLg wb-text-text-soft wb-text-center md:wb-text-start">
                    By submitting this, I confirm that I have read and
                    understood the
                    <Link
                      href="/privacy-policy"
                      className="wb-text-text-default"
                    >
                      {' '}
                      Privacy policy.
                    </Link>
                  </span>
                  <Button
                    loading={loading}
                    type="submit"
                    content="Submit"
                    size="md"
                    disabled={loading}
                  />
                </div>
              </form>
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
                </div>
              </div>
            </GraphItem>
          </div>
        </Block>
      )}
    </div>
  );
};

const ContactRoot = () => {
  return (
    <Wrapper>
      <FormSection />
      <FAQSection />
    </Wrapper>
  );
};

export default ContactRoot;
