export const DefaultLinkComp = ({ to, ...props }) => {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={to} {...props} />;
};
