import classNames from 'classnames';

export { v4 as uuid } from 'uuid';

type cnProps = (string | { [key: string]: boolean } | undefined)[];

export const cn = (...props: cnProps) => {
  return classNames(...props);
};

export const _false = false;
