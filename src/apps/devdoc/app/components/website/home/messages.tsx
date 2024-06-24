/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable no-unused-vars */
import Profile from 'kl-design-system/molecule/profile';
import { ReactNode, useState } from 'react';
import consts from '~/app/utils/const';
import { Block } from '../../commons';
import { GraphItem } from '../../graph';
import Slider from '../../slider';

const MessageCard = ({
  title,
  subtitle,
  message,
}: {
  title: string;
  subtitle: string;
  message: ReactNode;
}) => {
  return (
    <div className="xl:wb-min-h-[320px] 2xl:wb-max-h-[288px] 3xl:wb-min-h-[256px] wb-flex wb-flex-col wb-gap-3xl wb-p-3xl wb-h-full wb-bg-surface-basic-default wb-min-h-[224px]">
      <div className="wb-flex wb-flex-row wb-items-center wb-gap-3xl">
        <span className="wb-flex-1 dark-hidden">
          <Profile
            responsive={false}
            name={<span className="wb-bodyLg-medium">{title}</span>}
            subtitle={<span className="wb-bodyMd">{subtitle}</span>}
            color="one"
            size="md"
            noImage
            tabIndex={-1}
          />
        </span>
        <span className="wb-flex-1 wb-hidden dark-block">
          <Profile
            responsive={false}
            name={<span className="wb-bodyLg-medium">{title}</span>}
            subtitle={<span className="wb-bodyMd">{subtitle}</span>}
            color="dark"
            size="md"
            tabIndex={-1}
            noImage
          />
        </span>
      </div>
      <p className="wb-bodyLg wb-text-text-soft">{message}</p>
    </div>
  );
};

const DontBelieve = () => {
  const [active, setActive] = useState(0);
  return (
    <Block title="Don't believe? Read for yourself..">
      <div className="wb-block md:wb-hidden">
        <Slider autoPlay active={`${active}`} onMove={(e) => setActive(e)}>
          {consts.home.messages.map((message) => (
            <MessageCard key={message.title} {...message} />
          ))}
        </Slider>
      </div>

      <div className="wb-h-full wb-hidden md:wb-grid wb-grid-cols-1 md:wb-grid-cols-3 wb-gap-3xl lg:wb-gap-5xl">
        {consts.home.messages.map((message) => (
          <GraphItem key={message.title}>
            <MessageCard {...message} />
          </GraphItem>
        ))}
      </div>
    </Block>
  );
};

export default DontBelieve;
