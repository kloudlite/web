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
    <Tag
      className={cn(
        'wb-text-text-default dark:wb-text-text-darktheme-default wb-group wb-mt-6xl',
        {
          h2: 'wb-heading2xl-marketing',
          h3: 'wb-headingXl-marketing',
          h4: 'wb-headingLg-marketing',
          h5: '',
          h6: '',
        }[Tag]
      )}
      {...props}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          id={id}
          className="subheading-anchor wb-invisible group-hover:wb-visible wb-transition-all"
          aria-label="Permalink for this section"
          ref={obRef}
        />
      )}
    </Tag>
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
}: {
  components?: any;
  isRawLayout?: boolean;
}): Components => {
  console.log('coomponents', components);
  if (isRawLayout) {
    return {
      a: A,
      ul: (props) => {
        let cs = props.className;
        if (!cs) {
          cs = 'wb-list-disc wb-pl-xl';
        }

        return <ul {...props} className={cs} />;
      },
      ol: (props) => {
        let cs = props.className;
        if (!cs) {
          cs = 'wb-list-decimal wb-pl-5xl';
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
        className="wb-heading4xl-marketing wb-mt-sm wb-text-text-strong dark:wb-text-text-darktheme-strong"
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
        className="wb-list-disc wb-bodyLg wb-pl-5xl wb-text-text-strong dark:wb-text-text-darktheme-strong"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="wb-bodyLg wb-list-decimal wb-pl-5xl wb-text-text-strong dark:wb-text-text-darktheme-strong"
        {...props}
      />
    ),
    li: (props) => <li className="wb-mt-3xl" {...props} />,
    blockquote: (props) => <blockquote className="" {...props} />,
    hr: (props) => <hr className="" {...props} />,
    a: Link,
    table: (props) => <Table className="" {...props} />,
    p: (props) => (
      <p
        className="wb-bodyLg wb-mt-3xl rounded-image wb-text-text-strong dark:wb-text-text-darktheme-strong"
        {...props}
      />
    ),
    tr: Tr,
    th: Th,
    td: Td,
    // details: Details,
    // summary: Summary,
    pre: (props) => <pre {...props} className="wb-mt-3xl" />,
    // code: Code,
    ...components,
  };
};
