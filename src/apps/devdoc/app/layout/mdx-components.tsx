/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/heading-has-content */

import { Table, Td, Th, Tr } from 'nextra/components';
import type { Components } from 'nextra/mdx';
import type { ComponentProps, ReactElement } from 'react';
import { useEffect, useRef } from 'react';
import {
  useIntersectionObserver,
  useSetActiveAnchor,
  useSlugs,
} from '../utils/active-anchor';
import { Anchor, AnchorProps } from '../components/anchor';
import { cn } from '../utils/commons';

// Anchor links
function HeadingLink({
  tag: Tag,
  context,
  children,
  id,
  className,
  ...props
}: ComponentProps<'h2'> & {
  tag: `h${2 | 3 | 4 | 5 | 6}`;
  context: { index: number };
}): ReactElement {
  const setActiveAnchor = useSetActiveAnchor();
  const slugs = useSlugs();
  const observer = useIntersectionObserver();
  const obRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!id) return;
    const heading = obRef.current;
    if (!heading) return;
    slugs.set(heading, [id, (context.index += 1)]);
    observer?.observe(heading);
    return () => {
      observer?.disconnect();
      slugs.delete(heading);
      setActiveAnchor((f) => {
        const ret = { ...f };
        delete ret[id];
        return ret;
      });
    };
  }, [id, context, slugs, observer, setActiveAnchor]);

  return (
    <>
      <Tag
        className={cn(
          'wb-text-text-default wb-group',
          {
            h2: 'wb-heading2xl-marketing wb-sticky wb-top-0 wb-bg-surface-basic-subdued  wb-mt-[30px] wb-py-[10px]',
            h3: 'wb-headingXl-marketing wb-mt-6xl',
            h4: 'wb-headingLg-marketing wb-mt-6xl',
            h5: 'wb-mt-6xl',
            h6: 'wb-mt-6xl',
          }[Tag],
        )}
        {...props}
      >
        {children}
        {/* {id && ( */}
        {/*   <a */}
        {/*     href={`#${id}`} */}
        {/*     id={id} */}
        {/*     className="subheading-anchor wb-invisible group-hover:wb-visible wb-transition-all" */}
        {/*     aria-label="Permalink for this section" */}
        {/*   /> */}
        {/* )} */}
      </Tag>
      {id && (
        <a
          href={`#${id}`}
          id={id}
          className="subheading-anchor wb-invisible group-hover:wb-visible wb-transition-all"
          aria-label="Permalink for this section"
          aria-hidden
          ref={obRef}
        />
      )}
    </>
  );
}

const EXTERNAL_HREF_REGEX = /https?:\/\//;

export const Link = ({ href = '', className, ...props }: AnchorProps) => (
  <Anchor
    href={href}
    newWindow={EXTERNAL_HREF_REGEX.test(href)}
    className={cn('', className)}
    {...props}
  />
);

const A = ({ href = '', ...props }) => (
  <Anchor href={href} newWindow={EXTERNAL_HREF_REGEX.test(href)} {...props} />
);

export const createComponents = ({
  components,
  isRawLayout,
  isBlog,
}: {
  components?: any;
  isRawLayout?: boolean;
  isBlog?: boolean;
}): Components => {
  if (isRawLayout) {
    return {
      a: A,
      ul: (props) => {
        let cs = props.className;
        if (!cs) {
          cs = 'wb-list-disc wb-pl-[14px]';
        }

        return <ul {...props} className={cs} />;
      },
      ol: (props) => {
        let cs = props.className;
        if (!cs) {
          cs = 'wb-list-decimal wb-pl-[18px]';
        }

        return <ol {...props} className={cs} />;
      },
      li: (props) => {
        let cs = props.className;
        if (!cs) {
          cs = 'wb-pb-lg custom-li';
        }

        return <li {...props} className={cs} />;
      },
    };
  }
  const context = { index: 0 };
  return {
    h1: (props) => (
      <h1
        className="wb-heading4xl-marketing wb-mt-sm wb-text-text-default wb-pb-lg"
        {...props}
      />
    ),
    h2: (props) => <HeadingLink tag="h2" context={context} {...props} />,
    h3: (props) => <HeadingLink tag="h3" context={context} {...props} />,
    h4: (props) => <HeadingLink tag="h4" context={context} {...props} />,
    h5: (props) => <HeadingLink tag="h5" context={context} {...props} />,
    h6: (props) => <HeadingLink tag="h6" context={context} {...props} />,
    ul: (props) => (
      <ul
        className={cn(
          'wb-list-disc wb-pl-[18px] wb-list-outside wb-text-text-strong',
          isBlog ? 'wb-bodyXl' : 'wb-bodyLg',
        )}
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className={cn(
          'wb-list-decimal wb-pl-[24px] wb-list-outside wb-text-text-strong',
          isBlog ? 'wb-bodyXl' : 'wb-bodyLg',
        )}
        {...props}
      />
    ),
    li: (props) => <li className="wb-mt-3xl" {...props} />,
    blockquote: (props) => (
      <blockquote
        className={cn(
          "blockquote wb-mt-3xl wb-rounded-md wb-p-xl wb-bg-surface-primary-selected before:wb-content-[''] before:wb-w-md before:wb-bg-border-primary before:wb-flex before:wb-shrink-0 wb-flex wb-gap-3xl",
          isBlog ? 'wb-bodyXl' : 'wb-bodyLg',
        )}
        {...props}
      />
    ),
    hr: (props) => <hr className="" {...props} />,
    a: Link,
    table: (props) => <Table className="" {...props} />,
    p: (props) => (
      <p
        className={cn(
          'wb-mt-3xl rounded-image wb-text-text-strong wb-break-words !wb-leading-[28px]',
          isBlog ? 'wb-bodyXl' : 'wb-bodyLg',
        )}
        {...props}
      />
    ),
    tr: Tr,
    th: Th,
    td: Td,
    // details: Details,
    // summary: Summary,
    pre: (props) => (
      <pre
        {...props}
        className="wb-mt-3xl wb-bg-surface-basic-input wb-border wb-border-border-default wb-rounded wb-p-xl"
      />
    ),
    // code: Code,
    ...components,
  };
};
