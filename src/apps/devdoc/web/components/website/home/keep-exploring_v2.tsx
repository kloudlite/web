import { ReactNode, useState } from 'react';
import { Button } from 'kl-design-system/atoms/button';
import consts from '~/app/utils/const';
import { ArrowRight } from '~/app/icons/icons';
import { Block, BlockV2 } from '../../commons';
import Slider from '../../slider';
import { GraphItem } from '../../graph';
import { Anchor } from '../../anchor';
import ResponsiveContainer from '../../responsive-container';
import ResponsiveImage from '../responsive-image';

export const ExploringItem = ({
  label,
  desc,
  imgs,
  to,
}: {
  label: ReactNode;
  desc: ReactNode;
  imgs: any;
  to?: string;
}) => {
  return (
    <Anchor
      href={to}
      className="wb-bg-surface-basic-default wb-h-full wb-flex wb-flex-col wb-ring-offset-0 wb-ring-border-focus wb-outline-none focus-visible:wb-ring-2 wb-group"
    >
      <ResponsiveImage
        className="wb-w-full wb-object-top wb-object-cover wb-h-full md:wb-h-[224px]"
        alt={''}
        rmobile={imgs.rmobile}
        rmobileDark={imgs.rmobile}
        r768={imgs.r768}
        r768Dark={imgs.r768Dark}
        r1024={imgs.r1024}
        r1024Dark={imgs.r1024Dark}
        r1280={imgs.r1280}
        r1280Dark={imgs.r1280Dark}
        r1440={imgs.r1440}
        r1440Dark={imgs.r1440Dark}
        r1920={imgs.r1920}
        r1920Dark={imgs.r1920Dark}
      />
      <div className="wb-bg-surface-basic-default wb-flex wb-flex-col wb-gap-lg md:wb-gap-3xl wb-p-3xl md:group-hover:-wb-translate-y-[50px] wb-transition-all wb-duration-300 wb-ease-in-out">
        <h3 className="wb-headingLg-marketing md:wb-headingXl wb-text-text-default">
          {label}
        </h3>
        <p className="wb-bodyLg wb-text-text-strong">{desc}</p>
      </div>
      <div className="wb-block md:wb-absolute md:wb-bottom-0 wb-px-3xl 2xl:wb-px-4xl md:wb-pt-xl wb-pb-3xl md:wb-opacity-0 group-hover:wb-opacity-100 wb-transition-[padding,opacity] group-hover:wb-pb-3xl 2xl:group-hover:wb-pb-4xl group-hover:wb-will-change-[opacity,padding] group-focus-within::wb-pb-3xl 2xl:group-focus-within:wb-pb-4xl group-focus-within:wb-opacity-100 group-focus-within:wb-will-change-[opacity,padding] wb-duration-300 wb-ease-in-out">
        <Button
          content={<span className="wb-bodyLg">Read more</span>}
          suffix={<ArrowRight />}
          variant="primary-plain"
          className="!wb-pl-0"
        />
      </div>
    </Anchor>
  );
};

const KeepExploring = () => {
  const [active, setActive] = useState(0);
  return (
    <BlockV2
      title="Unveil the untold - Keep exploring"
      graphClass="xl:[clip-path:inset(24px_1.5px_24px_1.5px)] 3xl:[clip-path:inset(1.5px)]"
    >
      <div className="wb-block md:wb-hidden">
        <Slider autoPlay active={`${active}`} onMove={(e) => setActive(e)}>
          {consts.homeNew.exploring.map((message) => (
            <ExploringItem key={message.label} {...message} />
          ))}
        </Slider>
      </div>

      <ResponsiveContainer>
        <div className="wb-hidden md:wb-grid wb-grid-cols-1 md:wb-grid-cols-3 wb-gap-3xl lg:wb-gap-5xl">
          {consts.homeNew.exploring.map((e) => {
            return (
              <GraphItem key={e.label}>
                <ExploringItem {...e} />
              </GraphItem>
            );
          })}
        </div>
      </ResponsiveContainer>
    </BlockV2>
  );
};

export default KeepExploring;
