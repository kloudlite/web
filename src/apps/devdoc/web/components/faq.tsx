import { CollapseItem, autoSize } from '../utils/commons';
import { Block } from './commons';
import { GraphItem } from './graph';
import OptionList from 'kl-design-system/atoms/option-list';
import * as Accordion from '@radix-ui/react-accordion';
import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ChevronDown, ChevronRight } from '@jengaicons/react';
import PopupDevDoc from './popup';

const FaqDocItem = forwardRef(
  (
    {
      children,
      label,
      value,
    }: {
      children: ReactNode;
      label: string;
      value: string;
    },
    ref,
  ) => {
    return (
      <Accordion.Item
        value={value}
        //@ts-ignore
        ref={ref}
        className="wb-rounded-lg wb-border wb-border-border-default wb-overflow-hidden wb-mb-3xl"
      >
        <Accordion.Header asChild>
          <Accordion.Trigger className="wb-group wb-bg-surface-basic-subdued wb-text-text-default wb-flex wb-flex-row wb-items-center wb-justify-between wb-w-full wb-p-2xl md:wb-px-4xl md:wb-py-3xl">
            <span className="wb-flex-1 wb-text-start">{label}</span>
            <span className="wb-transition-transform wb-duration-300 group-data-[state=open]:wb-rotate-90">
              <ChevronRight size={16} />
            </span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="wb-bg-surface-basic-container-bg data-[state=open]:wb-animate-slideDown data-[state=closed]:wb-animate-slideUp wb-overflow-hidden wb-text-text-strong">
          <div className="wb-p-2xl md:wb-px-4xl md:wb-py-3xl">{children}</div>
        </Accordion.Content>
      </Accordion.Item>
    );
  },
);

export const FaqDocList = ({ items = [] }: { items: IItemQuestions }) => {
  return (
    <Accordion.Root type="multiple" className="wb-mt-5xl">
      {items.map((i) => {
        return (
          <FaqDocItem label={i.title} value={i.title}>
            {i.desc}
          </FaqDocItem>
        );
      })}
    </Accordion.Root>
  );
};

const FaqMobilePopup = ({
  items,
  onChange,
  value,
}: {
  items: [string, IItem['']][];
  onChange: (value: string) => void;
  value: string;
}) => {
  const [show, setShow] = useState(false);

  const getButton = useCallback(() => {
    const item = items.find((f) => f[0] === value)?.[1];
    const Icon = item?.icon;
    const label = item?.label;
    return (
      <button
        className="wb-p-2xl wb-flex wb-flex-row wb-items-center wb-gap-xl wb-w-full wb-text-start wb-h-full"
        onClick={() => setShow(true)}
      >
        <Icon size={16} />
        <span>{label}</span>
        <span className="wb-ml-auto">
          <ChevronDown size={16} />{' '}
        </span>
      </button>
    );
  }, [value]);
  return (
    <div className="wb-w-full">
      {getButton()}
      <PopupDevDoc.Root show={show} onOpenChange={(e) => setShow(e)}>
        <PopupDevDoc.Content className="text-text-default !wb-p-0">
          {items.map(([key, val]) => {
            return (
              <div
                key={key}
                onClick={() => {
                  onChange(key);
                  setShow(false);
                }}
              >
                <OptionList.OptionItemRaw
                  className="!wb-p-3xl"
                  active={value === key}
                >
                  <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
                    <val.icon size={16} />
                    <span>{val.label}</span>
                  </div>
                </OptionList.OptionItemRaw>
              </div>
            );
          })}
        </PopupDevDoc.Content>
      </PopupDevDoc.Root>
    </div>
  );
};

type IItemQuestions = {
  title: string;
  desc: ReactNode;
}[];

interface IItem {
  [key: string]: {
    label: string;
    icon: any;
    items: IItemQuestions;
  };
}

type IFAQSection = {
  def: string;
  items: IItem;
  className?: string;
};

const FAQSection = ({ items, def, className }: IFAQSection) => {
  const [selected, setSelected] = useState<string>(def);
  const [defaultOpen, setDefaultOpen] = useState(
    items[Object.keys(items)[0]].items[0].title,
  );

  const ref = useRef<HTMLDivElement>(null);

  const itemsTemp = Object.entries(items);

  useEffect(() => {
    if (ref.current?.parentElement && window.innerWidth >= 768)
      autoSize(ref.current?.parentElement, 'animationend');
  }, [ref.current]);

  return (
    <Block title="Frequently Asked Questions" className={className}>
      <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-[270px_auto] lg:wb-grid-cols-[288px_auto] 3xl:wb-grid-cols-[352px_auto] wb-gap-5xl">
        <GraphItem className="wb-flex md:wb-hidden wb-text-text-default wb-bg-surface-basic-subdued wb-flex-col wb-gap-lg">
          <FaqMobilePopup
            items={itemsTemp}
            onChange={(v) => {
              setSelected(v);
            }}
            value={selected}
          />
        </GraphItem>
        <GraphItem className="wb-hidden md:wb-flex wb-text-text-default wb-bg-surface-basic-subdued wb-flex-col">
          {itemsTemp.map(([key, val]) => {
            return (
              <div
                key={key}
                onClick={() => {
                  setSelected(key);
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
            {items[selected].items.map((f, i) => (
              <CollapseItem
                index={i}
                mode="desktop"
                key={f.title}
                label={f.title}
                value={f.title}
              >
                {f.desc}
              </CollapseItem>
            ))}
          </Accordion.Root>
        </GraphItem>
      </div>
    </Block>
  );
};

export default FAQSection;
