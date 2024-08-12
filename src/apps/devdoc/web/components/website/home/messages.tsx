/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable @typescript-eslint/no-unused-vars */
/** eslint-disable no-unused-vars */
import Profile from 'kl-design-system/molecule/profile';
import { ReactNode, useState } from 'react';
import consts from '~/app/utils/const';
import { Block } from '../../commons';
import { GraphItem } from '../../graph';
import Slider from '../../slider';
import { IAvatar } from 'kl-design-system/atoms/avatar';

const TitleItem = ({ title }: { title: ReactNode }) => {
  return (
    <span className="wb-headingLg-marketing wb-headingXl-marketing">
      {title}
    </span>
  );
};

const SubTitleItem = ({ title }: { title: ReactNode }) => {
  return <span className="wb-bodyLg">{title}</span>;
};

const ProfileItem = ({
  title,
  subtitle,
  size = 'md',
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  size?: IAvatar['size'];
}) => {
  return (
    <div>
      <span className="wb-flex-1 dark-hidden">
        <Profile
          responsive={false}
          name={<TitleItem title={title} />}
          subtitle={<SubTitleItem title={subtitle} />}
          color="one"
          size={size}
          tabIndex={-1}
        />
      </span>
      <span className="wb-flex-1 wb-hidden dark-block">
        <Profile
          responsive={false}
          name={<TitleItem title={title} />}
          subtitle={<SubTitleItem title={subtitle} />}
          color="dark"
          size={size}
          tabIndex={-1}
        />
      </span>
    </div>
  );
};

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
    <div className="xl:wb-min-h-[480px] 2xl:wb-max-h-[416px] 3xl:wb-min-h-[352px] wb-flex wb-flex-col wb-gap-3xl wb-p-3xl wb-h-full wb-bg-surface-basic-default wb-min-h-[224px]">
      <div className="wb-flex md:wb-hidden xl:wb-flex wb-flex-row wb-items-center wb-gap-3xl">
        <ProfileItem subtitle={subtitle} title={title} />
      </div>
      <div className="wb-hidden md:wb-flex xl:wb-hidden wb-flex-col wb-gap-3xl">
        <ProfileItem size="lg" />
        <div className="wb-flex wb-flex-col wb-gap-lg">
          <TitleItem title={title} />
          <SubTitleItem title={subtitle} />
        </div>
      </div>
      <p className="wb-bodyLg lg:wb-bodyXl wb-text-text-soft">{message}</p>
    </div>
  );
};

const DontBelieve = () => {
  const [active, setActive] = useState(0);
  return (
    <Block title="Don't believe? Read for yourself..">
      <div className="wb-block md:wb-hidden">
        <Slider autoPlay active={`${active}`} onMove={(e) => setActive(e)}>
          {consts.homeNew.messages.map((message) => (
            <MessageCard key={message.title} {...message} />
          ))}
        </Slider>
      </div>
      <div className="wb-h-full wb-hidden md:wb-grid wb-grid-cols-1 md:wb-grid-cols-3 wb-gap-3xl lg:wb-gap-5xl">
        {consts.homeNew.messages.map((message) => (
          <GraphItem key={message.title}>
            <MessageCard {...message} />
          </GraphItem>
        ))}
      </div>
    </Block>
  );
};

export default DontBelieve;
