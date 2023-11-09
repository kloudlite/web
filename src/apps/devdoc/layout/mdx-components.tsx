/* eslint-disable consistent-return */
import { Components } from 'nextra/mdx';
import { ComponentProps, useEffect, useRef } from 'react';
import {
  useIntersectionObserver,
  useSetActiveAnchor,
  useSlugs,
} from '~/utiltities/active-anchor';
import { cn } from '~/utiltities/commons';

const H1 = ({ children, ...props }: ComponentProps<'h1'>) => {
  return (
    <h1 className="heading4xl-marketing text-text-strong mt-sm" {...props}>
      {children}
    </h1>
  );
};

const Heading = ({
  tag: Tag,
  children,
  id,
  context,
  ...props
}: ComponentProps<'h2'> & {
  tag: `h${2 | 3 | 4 | 5 | 6}`;
  context: { index: number };
}) => {
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
      className={cn('text-text-default group mt-6xl', {
        'heading2xl-marketing': Tag === 'h2',
        'headingXl-marketing': Tag === 'h3',
      })}
      {...props}
      id={id}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="subheading-anchor invisible group-hover:visible transition-all"
          aria-label="Permalink for this section"
          ref={obRef}
        >
          #
        </a>
      )}
    </Tag>
  );
};

const P = ({ children, ...props }: ComponentProps<'p'>) => {
  return (
    <p className="bodyLg text-text-strong mt-3xl" {...props}>
      {children}
    </p>
  );
};

const createComponents = ({ components }: any): Components => {
  const context = { index: 0 };
  return {
    h1: H1,
    h2: (props) => <Heading tag="h2" context={context} {...props} />,
    h3: (props) => <Heading tag="h3" context={context} {...props} />,
    p: P,
    ...components,
  };
};

export default createComponents;
