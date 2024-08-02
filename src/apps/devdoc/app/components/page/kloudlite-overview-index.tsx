import OptionList from 'kl-design-system/atoms/option-list';
import { GraphExtended, GraphItem } from '../graph';
import * as Accordion from '@radix-ui/react-accordion';
import consts from '~/app/utils/const';
import { useEffect, useRef, useState } from 'react';
import { CollapseItem, autoSize } from '~/app/utils/commons';
import Select from 'kl-design-system/atoms/select';

type IItem = keyof typeof consts.helpandsupport.kloudliteOverviewFaqs;
const KOverviewIndex = () => {
  const [selected, setSelected] = useState<IItem>('general');

  const ref = useRef<HTMLDivElement>(null);

  const items = Object.entries(consts.helpandsupport.kloudliteOverviewFaqs);

  useEffect(() => {
    if (ref.current?.parentElement)
      autoSize(ref.current?.parentElement, 'animationend');
  }, [ref.current]);
  return (
    <div className="wb-flex wb-flex-col">
      <div className="wb-flex wb-flex-col wb-gap-2xl wb-mt-5xl">
        <span className="wb-heading3xl-marketing md:wb-heading4xl-marketing wb-text-text-strong">
          Kloudlite overview
        </span>
        <span className="wb-bodyLg md:wb-bodyXl wb-text-text-strong">
          Learn about Kloudlite and how it can help you.
        </span>
      </div>
      <GraphExtended>
        <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-[288px_auto] wb-gap-5xl">
          <GraphItem className="wb-flex md:wb-hidden wb-text-text-default wb-bg-surface-basic-subdued wb-flex-col wb-gap-lg">
            <Select
              className="wb-px-lg wb-cursor-pointer !wb-h-[36px] !wb-border-none wb-outline-none"
              value={selected}
              onChange={(_, v: IItem) => setSelected(v)}
              searchable={false}
              options={async () =>
                items.map(([key, value]) => {
                  return { label: value.label, value: key };
                })
              }
            />
          </GraphItem>
          <GraphItem className="wb-hidden md:wb-flex wb-text-text-default wb-bg-surface-basic-subdued wb-p-2xl wb-flex-col wb-gap-lg">
            {items.map(([key, val]) => {
              return (
                <div key={key} onClick={() => setSelected(key)}>
                  <OptionList.OptionItemRaw
                    active={selected === key}
                    className="wb-rounded-md"
                  >
                    {val.label}
                  </OptionList.OptionItemRaw>
                </div>
              );
            })}
          </GraphItem>
          <GraphItem className="wb-text-text-default wb-bg-surface-basic-subdued">
            <Accordion.Root collapsible type="single" ref={ref}>
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
      </GraphExtended>
    </div>
  );
};

export default KOverviewIndex;
