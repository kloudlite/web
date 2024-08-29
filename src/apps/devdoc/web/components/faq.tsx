import { CollapseItem, autoSize } from '../utils/commons';
import { Block } from './commons';
import { GraphItem } from './graph';
import OptionList from 'kl-design-system/atoms/option-list';
import * as Accordion from '@radix-ui/react-accordion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Select from 'kl-design-system/atoms/select';

const valueRenderFaq = (value: any) => (
  <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
    <span>{value?.item?.icon ? <value.item.icon size={16} /> : null}</span>
    <span className="wb-bodyMd">{value.label}</span>
  </div>
);

interface IItem {
  [key: string]: {
    label: string;
    icon: any;
    items: {
      title: string;
      desc: ReactNode;
    }[];
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
          <Select
            className="wb-px-lg wb-cursor-pointer !wb-h-[36px] !wb-border-none wb-outline-none"
            value={selected}
            onChange={(_, v) => setSelected(v)}
            searchable={false}
            valueRender={valueRenderFaq}
            options={async () =>
              itemsTemp.map(([key, value]) => {
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
