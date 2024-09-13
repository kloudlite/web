import { Button } from 'kl-design-system/atoms/button';
import Wrapper from '../../wrapper';
import Link from 'next/link';
import { CalendarBlank, Clock } from '@jengaicons/react';
import { ReactNode } from 'react';

const Banner = ({
  message,
  date,
  time,
  link,
  linkContent,
}: {
  message: ReactNode;
  date?: string;
  time?: string;
  link?: string;
  linkContent?: string;
}) => {
  return (
    <div className="wb-sticky wb-top-0 wb-z-[9999] wb-bg-surface-primary-default wb-text-text-on-primary">
      <Wrapper className="wb-flex wb-flex-col md:wb-flex-row md:wb-items-center wb-justify-center md:wb-justify-between wb-gap-xl md:wb-gap-3xl lg:wb-gap-8xl xl:wb-gap-6xl 2xl:wb-gap-8xl wb-h-[120px] md:wb-h-[68px]">
        <div className="wb-flex wb-flex-row wb-items-center justify-between wb-gap-lg lg:wb-gap-3xl md:wb-flex-1 xl:wb-flex-none">
          <span className="wb-bodyLg-medium wb-flex-1">{message}</span>
          <div className="wb-flex wb-flex-col md:wb-flex-row gap-lg lg:wb-gap-3xl">
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
        </div>
        {linkContent && link && (
          <>
            <div className="md:wb-hidden">
              <Button
                content={
                  <span className="wb-text-text-primary">{linkContent}</span>
                }
                to={link}
                toLabel="href"
                variant="basic"
                linkComponent={Link}
                block
              />
            </div>
            <div className="wb-hidden md:wb-block">
              <Button
                content={
                  <span className="wb-text-text-primary">{linkContent}</span>
                }
                to={link}
                toLabel="href"
                variant="basic"
                linkComponent={Link}
              />
            </div>
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default Banner;
