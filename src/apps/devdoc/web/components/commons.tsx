import { ReactNode } from 'react';
import Chips from 'kl-design-system/atoms/chips';
import SectionWrapper from './website/section-wrapper';
import { GraphExtended, GraphItem } from './graph';
import { cn } from '../utils/commons';
import HoverItem from './hover-item';
import Button from './button';
import Wrapper from './wrapper';

interface IDetailCard {
  icon: any;
  title: ReactNode;
  content: ReactNode;
  compact?: boolean;
  to?: string;
}
export const DetailCard = ({
  icon: Icon,
  title,
  content,
  compact,
  to,
}: IDetailCard) => {
  return (
    <GraphItem>
      <HoverItem enable={!!to}>
        <div
          className={cn(
            'flex flex-col bg-surface-basic-default h-full',
            compact ? 'gap-4xl p-4xl' : 'gap-5xl p-5xl',
          )}
        >
          <div
            className={cn(
              'rounded-full w-fit flex items-center justify-center aspect-square p-2xl bg-icon-primary text-text-on-primary',
              compact ? 'h-8xl' : 'h-10xl mb-[28px]',
            )}
          >
            {/* @ts-ignore */}
            <Icon size={compact ? 32 : 48} />
          </div>
          <div className="flex flex-col gap-xl">
            <div
              className={cn(
                'text-text-default',
                compact ? 'heading2xl-marketing' : 'heading3xl-marketing',
              )}
            >
              {title}
            </div>
            <div className="bodyXl text-text-strong">{content}</div>
          </div>
        </div>
      </HoverItem>
    </GraphItem>
  );
};

export const TitleBlock = ({
  title,
  desc,
  titleContainerClass,
  titleClass,
  descClass,
}: {
  title: ReactNode;
  desc?: ReactNode;
  titleClass?: string;
  titleContainerClass?: string;
  descClass?: string;
}) => {
  return (
    <div
      className={cn(
        'wb-flex wb-flex-col wb-gap-3xl wb-text-center',
        titleContainerClass,
      )}
    >
      <div className="flex flex-col gap-md">
        <h2
          className={cn(
            'wb-heading3xl-marketing md:wb-heading4xl-marketing lg:wb-heading5xl-marketing wb-text-text-default',
            titleClass,
          )}
        >
          {title}
        </h2>
      </div>
      {desc && (
        <p
          className={cn(
            'wb-bodyLg md:wb-bodyXl lg:wb-bodyXXl wb-text-text-soft wb-max-w-[784px] wb-m-auto',
            descClass,
          )}
        >
          {desc}
        </p>
      )}
    </div>
  );
};

export const TitleBlockV2 = ({
  title,
  desc,
  titleContainerClass,
  titleClass,
  descClass,
}: {
  title: ReactNode;
  desc?: ReactNode;
  titleClass?: string;
  titleContainerClass?: string;
  descClass?: string;
}) => {
  return (
    <div
      className={cn(
        'wb-flex wb-flex-col wb-gap-3xl wb-text-center',
        titleContainerClass,
      )}
    >
      <div className="flex flex-col gap-md">
        <h2
          className={cn(
            'wb-heading3xl-marketing md:wb-heading4xl-marketing wb-text-text-default',
            titleClass,
          )}
        >
          {title}
        </h2>
      </div>
      {desc && (
        <p
          className={cn(
            'wb-bodyLg md:wb-bodyXl wb-text-text-soft wb-max-w-[784px] wb-m-auto',
            descClass,
          )}
        >
          {desc}
        </p>
      )}
    </div>
  );
};

export const Block = ({
  title,
  desc,
  className,
  children,
  titleClass,
  titleContainerClass,
  descClass,
  hasGraph = true,
  graphClass,
}: {
  title: ReactNode;
  desc?: ReactNode;
  className?: string;
  children?: ReactNode;
  titleClass?: string;
  titleContainerClass?: string;
  descClass?: string;
  hasGraph?: boolean;
  graphClass?: string;
}) => {
  return (
    <SectionWrapper className={cn('wb-flex-col', className)}>
      <TitleBlock
        title={title}
        desc={desc}
        titleContainerClass={titleContainerClass}
        titleClass={titleClass}
        descClass={descClass}
      />
      {hasGraph ? (
        <GraphExtended className={graphClass}>{children}</GraphExtended>
      ) : (
        children
      )}
    </SectionWrapper>
  );
};

export const BlockV2 = ({
  title,
  desc,
  className,
  children,
  titleClass,
  titleContainerClass,
  descClass,
  hasGraph = true,
  graphClass,
}: {
  title: ReactNode;
  desc?: ReactNode;
  className?: string;
  children?: ReactNode;
  titleClass?: string;
  titleContainerClass?: string;
  descClass?: string;
  hasGraph?: boolean;
  graphClass?: string;
}) => {
  return (
    <SectionWrapper className={cn('wb-flex-col', className)}>
      <TitleBlockV2
        title={title}
        desc={desc}
        titleContainerClass={titleContainerClass}
        titleClass={titleClass}
        descClass={descClass}
      />
      {hasGraph ? (
        <GraphExtended className={graphClass}>{children}</GraphExtended>
      ) : (
        children
      )}
    </SectionWrapper>
  );
};

export const Heading = ({
  heading,
  desc,
}: {
  heading: ReactNode;
  desc: ReactNode;
}) => {
  return (
    <>
      <h1 className="heading4xl-marketing md:!heading5xl-marketing lg:!heading6xl-marketing text-text-default">
        {heading}
      </h1>
      <p className="bodyXl lg:!bodyXXl text-text-soft">{desc}</p>
    </>
  );
};

export const Head = ({
  heading,
  desc,
  className,
  tag,
  align = 'center',
}: {
  heading: ReactNode;
  desc: ReactNode;
  className?: string;
  tag?: string;
  align?: 'center' | 'left';
}) => {
  return (
    <div
      className={cn(
        'z-10 flex flex-col gap-6xl  max-w-[870px]',
        align === 'center'
          ? 'lg:!items-center text-center'
          : ' items-center lg:!items-start',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-3xl items-center',
          align === 'center' ? '' : 'lg:!items-start',
        )}
      >
        {tag && (
          <Chips.Chip
            item={tag}
            label={<div className="bodyLg-medium">{tag}</div>}
          />
        )}
        <Heading heading={heading} desc={desc} />
      </div>
      <div
        className={cn(
          'w-full flex md:!flex-row flex-col gap-4xl md:!items-center justify-center',
          align === 'center' ? '' : 'lg:!justify-start',
        )}
      >
        <div>
          <Button
            block
            size="lg"
            content="Start your free trial"
            variant="primary"
          />
        </div>
        <div>
          <Button block size="lg" content="Schedule a demo" variant="basic" />
        </div>
      </div>
    </div>
  );
};

export const HeroTwo = ({
  cover,
  heading,
  tag,
  align,
  headClassName,
  className,
  desc,
  coverClassName,
}: {
  cover: string;
  heading: ReactNode;
  tag: string;
  align: 'center' | 'left';
  headClassName?: string;
  className?: string;
  desc: ReactNode;
  coverClassName?: string;
}) => {
  return (
    <Wrapper
      className={cn(
        'relative flex justify-center lg:justify-start py-6xl md:!py-8xl lg:!py-10xl',
        className,
      )}
    >
      <div className="flex flex-col z-10 w-full">
        <div className="md:absolute inset-0 distribution-cover-graph z-0 w-full" />
        <div className="w-full flex flex-col lg:!flex-row items-center lg:!items-start lg:!gap-10xl z-10 text-center lg:!text-left justify-between 3xl:pr-10xl">
          <Head
            heading={heading}
            desc={desc}
            className={headClassName}
            align={align}
            tag={tag}
          />
          <div
            className={cn(
              'z-10 relative lg:min-w-[400px] xl:min-w-[448px] lg:top-[10%] 2xl:!top-0 pt-6xl md:!pt-6xl lg:!py-0',
              coverClassName,
            )}
          >
            <img src={cover} alt="cover" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
