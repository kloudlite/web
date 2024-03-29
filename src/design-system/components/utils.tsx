import classNames from 'classnames';
import { useMemo } from 'react';

export { v4 as uuid } from 'uuid';

type cnProps = (string | { [key: string]: boolean } | undefined)[];

export const cn = (...props: cnProps) => {
  return classNames(...props);
};

export const _false = false;

export function mapper<A, B>(
  array: A[],
  transform: (value: A, index: number) => B
): B[] {
  let _;
  return array.map(transform);
}

export function useMapper<A, B>(
  array: A[],
  transform: (value: A, index: number) => B
): B[] {
  return useMemo(() => array.map(transform), [array]);
}

export function useAppend<A, B>(arrayA: A[], arrayB: B[]) {
  return useMemo(() => [...arrayA, ...arrayB], [arrayA, arrayB]);
}

export function useSort<A>(array: A[], transform: (a: A, b: A) => number): A[] {
  return useMemo(() => array.sort(transform), [array, transform]);
}

export function titleCase(string: string) {
  if (!string) return string;
  if (typeof string !== 'string')
    throw Error(`Cannot titleCase ${string}: Cause it is not string.`);
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const generateKey = (...items: Array<string | number>) =>
  items.join('-');
