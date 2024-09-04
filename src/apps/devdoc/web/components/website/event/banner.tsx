import { Button } from 'kl-design-system/atoms/button';
import Wrapper from '../../wrapper';
import Link from 'next/link';
import { CalendarBlank, Clock } from '@jengaicons/react';

const Banner = ({
  message,
  date,
  time,
  link,
  linkContent,
}: {
  message: string;
  date?: string;
  time?: string;
  link?: string;
  linkContent?: string;
}) => {
  return (
    <div className="wb-bg-surface-primary-default wb-text-text-on-primary">
      <Wrapper className="wb-flex wb-flex-row wb-items-center wb-gap-8xl wb-h-[68px]">
        <div className="wb-flex wb-flex-row wb-items-center wb-gap-3xl">
          <span className="wb-bodyLg-medium">{message}</span>
          {date && (
            <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
              <CalendarBlank size={16} />
              <span className="wb-bodyMd">{date}</span>
            </div>
          )}
          {time && (
            <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
              <Clock size={16} />
              <span className="wb-bodyMd">{time}</span>
            </div>
          )}
        </div>
        {linkContent && link && (
          <Button
            content={linkContent}
            to={link}
            toLabel="href"
            variant="outline"
            linkComponent={Link}
          />
        )}
      </Wrapper>
    </div>
  );
};

export default Banner;
