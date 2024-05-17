import { ReactNode, useState } from 'react';
import consts from '~/app/utils/const';
import { Block } from '../../commons';
import Slider from '../../slider';
import { GraphItem } from '../../graph';

const ExploringItem = ({
  label,
  desc,
  img,
}: {
  label: ReactNode;
  desc: ReactNode;
  img: string;
}) => {
  return (
    <div className="wb-h-full wb-flex wb-flex-col wb-bg-surface-basic-default dark:wb-bg-surface-darktheme-basic-default 2xl:wb-min-h-[176px]">
      <img
        className="wb-h-[200px] wb-object-cover 2xl:wb-h-[192px] 3xl:wb-h-[264px]"
        src={img}
      />
      <div className="wb-flex wb-flex-col wb-gap-lg md:wb-gap-xl wb-p-3xl 2xl:wb-p-4xl">
        <h3 className="wb-headingLg-marketing md:wb-headingXl-marketing lg:wb-heading3xl-marketing wb-text-text-default dark:wb-text-text-darktheme-default">
          {label}
        </h3>
        <p className="wb-bodyLg lg:wb-bodyXl wb-text-text-strong dark:wb-text-text-darktheme-strong">
          {desc}
        </p>
      </div>
    </div>
  );
};

const KeepExploring = () => {
  const [active, setActive] = useState(0);
  return (
    <Block title="Unveil the untold - Keep exploring">
      <div className="wb-block md:wb-hidden">
        <Slider autoPlay active={`${active}`} onMove={(e) => setActive(e)}>
          {consts.homeNew.exploring.map((message) => (
            <ExploringItem key={message.label} {...message} />
          ))}
        </Slider>
      </div>

      <div className="wb-hidden md:wb-grid wb-grid-cols-1 md:wb-grid-cols-3 wb-gap-3xl lg:wb-gap-5xl">
        {consts.homeNew.exploring.map((e) => {
          return (
            <GraphItem key={e.label}>
              <ExploringItem {...e} />
            </GraphItem>
          );
        })}
      </div>
    </Block>
  );
};

export default KeepExploring;
