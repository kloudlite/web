import classNames from 'classnames';

type cnProps = (string | { [key: string]: boolean } | undefined)[];

export const cn = (...props: cnProps) => {
  return classNames(...props);
};
