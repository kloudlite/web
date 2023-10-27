import { Components } from 'nextra/mdx';
import { ComponentProps } from 'react';

const H1 = ({ children, ...props }: ComponentProps<'h1'>) => {
  return (
    <h1 className="heading4xl-marketing text-text-strong mt-sm" {...props}>
      {children}
    </h1>
  );
};

const H2 = ({ children, id, ...props }: ComponentProps<'h2'>) => {
  return (
    <h2
      className="heading2xl-marketing text-text-default mt-3xl"
      {...props}
      id={id}
    >
      {children}{' '}
      {id && (
        <a
          href={`#${id}`}
          id={id}
          className="subheading-anchor"
          aria-label="Permalink for this section"
        >
          #
        </a>
      )}
    </h2>
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
  return {
    h1: H1,
    h2: H2,
    p: P,
    ...components,
  };
};

export default createComponents;
