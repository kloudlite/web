import Profile from 'kl-design-system/molecule/profile';
import { ReactNode } from 'react';
import consts from '~/app/utils/const';
import { Block } from '../../commons';
import Slider from '../../slider';
import { GraphItem } from '../../graph';

const MessageCard = ({
  title,
  subtitle,
  company,
  message,
}: {
  title: string;
  subtitle: string;
  company: ReactNode;
  message: ReactNode;
}) => {
  return (
    <div className="wb-flex wb-flex-col wb-gap-3xl wb-p-3xl wb-bg-surface-basic-default dark:wb-bg-surface-darktheme-basic-default wb-min-h-[224px]">
      <div className="wb-flex wb-flex-row wb-items-center wb-gap-3xl">
        <span className="wb-flex-1 dark:wb-hidden">
          <Profile
            responsive={false}
            name={title}
            subtitle={subtitle}
            color="one"
            size="md"
          />
        </span>
        <span className="wb-flex-1 wb-hidden dark:wb-block">
          <Profile
            responsive={false}
            name={title}
            subtitle={subtitle}
            color="dark"
            size="md"
          />
        </span>
        <span className="wb-text-text-default dark:wb-text-icon-darktheme-soft">
          {company}
        </span>
      </div>
      <p className="wb-bodyLg wb-text-text-soft dark:wb-text-text-darktheme-soft">
        {message}
      </p>
    </div>
  );
};

const _DontBelieve = () => {
  return (
    <Block title="Don't believe? Read for yourself..">
      <div className="wb-block md:wb-hidden">
        <Slider>
          {consts.home.messages.map((message) => (
            <MessageCard key={message.title} {...message} />
          ))}
        </Slider>
      </div>

      <div className="wb-hidden md:wb-grid wb-grid-cols-1 md:wb-grid-cols-3 wb-gap-3xl lg:wb-gap-5xl">
        {consts.home.messages.map((message) => (
          <GraphItem key={message.message}>
            <MessageCard {...message} />
          </GraphItem>
        ))}
      </div>
    </Block>
  );
};
