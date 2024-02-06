/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/heading-has-content */

import { Table, Td, Th, Tr } from "nextra/components";
import type { Components } from "nextra/mdx";
import type { ComponentProps, ReactElement } from "react";
import { useEffect, useRef } from "react";
import {
  useIntersectionObserver,
  useSetActiveAnchor,
  useSlugs,
} from "../utils/active-anchor";
import { Anchor, AnchorProps } from "../components/anchor";
import { cn } from "../utils/commons";
// Anchor links
function HeadingLink({
  tag: Tag,
  context,
  children,
  id,
  className,
  ...props
}: ComponentProps<"h2"> & {
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
        "text-text-default group",
        {
          h2: "heading2xl-marketing py-xl",
          h3: "headingXl-marketing py-xl",
          h4: "",
          h5: "",
          h6: "",
        }[Tag]
      )}
      {...props}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          id={id}
          className="subheading-anchor invisible group-hover:visible transition-all"
          aria-label="Permalink for this section"
          ref={obRef}
        />
      )}
    </Tag>
  );
}

const EXTERNAL_HREF_REGEX = /https?:\/\//;

export const Link = ({ href = "", className, ...props }: AnchorProps) => (
  <Anchor
    href={href}
    newWindow={EXTERNAL_HREF_REGEX.test(href)}
    className={cn("", className)}
    {...props}
  />
);

const A = ({ href = "", ...props }) => (
  <Anchor href={href} newWindow={EXTERNAL_HREF_REGEX.test(href)} {...props} />
);

export const createComponents = ({
  components,
  isRawLayout,
}: {
  components?: any;
  isRawLayout?: boolean;
}): Components => {
  if (isRawLayout) {
    return {
      a: A,
      ul: (props) => {
        let cs = props.className;
        if (!cs) {
          cs = "list-disc pl-5xl";
        }

        return <ul {...props} className={cs} />;
      },
      ol: (props) => {
        let cs = props.className;
        if (!cs) {
          cs = "list-decimal pl-5xl";
        }

        return <ol {...props} className={cs} />;
      },
      li: (props) => {
        let cs = props.className;
        if (!cs) {
          cs = "pb-lg custom-li";
        }

        return <li {...props} className={cs} />;
      },
    };
  }
  console.log("raw", isRawLayout);
  const context = { index: 0 };
  return {
    h1: (props) => (
      <h1 className="heading4xl-marketing text-text-strong mt-sm" {...props} />
    ),
    h2: (props) => <HeadingLink tag="h2" context={context} {...props} />,
    h3: (props) => <HeadingLink tag="h3" context={context} {...props} />,
    h4: (props) => <HeadingLink tag="h4" context={context} {...props} />,
    h5: (props) => <HeadingLink tag="h5" context={context} {...props} />,
    h6: (props) => <HeadingLink tag="h6" context={context} {...props} />,
    ul: (props) => <ul className="list-disc" {...props} />,
    ol: (props) => <ol className="" {...props} />,
    li: (props) => <li className="py-lg" {...props} />,
    blockquote: (props) => (
      <blockquote
        className={cn("border-l-2 border-l-border-dark pl-4xl italic my-lg")}
        {...props}
      />
    ),
    hr: (props) => <hr className="" {...props} />,
    a: Link,
    table: (props) => <Table className="" {...props} />,
    p: (props) => <p className="bodyLg text-text-strong py-lg" {...props} />,
    tr: Tr,
    th: Th,
    td: Td,
    // details: Details,
    // summary: Summary,
    pre: (props) => <pre {...props} className="mt-3xl" />,
    // code: Code,
    ...components,
  };
};
