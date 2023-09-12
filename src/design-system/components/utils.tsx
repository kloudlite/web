import classNames from 'classnames';
import { useMemo } from 'react';

export { v4 as uuid } from 'uuid';

type cnProps = (string | { [key: string]: boolean } | undefined)[];

export const cn = (...props: cnProps) => {
  return classNames(...props);
};

export const _false = false;

export function mapper<A, B>(array: A[], transform: (value: A) => B): B[] {
  let _;
  return array.map(transform);
}

export function useMapper<A, B>(array: A[], transform: (value: A) => B): B[] {
  return useMemo(() => array.map(transform), [array]);
}

export function titleCase(string: string) {
  if (typeof string !== 'string')
    throw Error(`Cannot titleCase ${string}: Cause it is not string.`);
  return string.charAt(0).toUpperCase() + string.slice(1);
}
