import { ChevronLeft, ChevronRight } from '@jengaicons/react';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '../atoms/button';
import { cn } from '../utils';

interface IUsePagination<T> {
  items: T;
  itemsPerPage: number;
}

export const usePagination = <T extends Array<any>>({
  items,
  itemsPerPage,
}: IUsePagination<T>) => {
  const [listItems, setListItems] = useState(items);
  const [page, setPage] = useState<typeof items>();
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    if (listItems.length > 0) {
      let tempItems = listItems.slice(
        (pageNumber - 1) * itemsPerPage,
        pageNumber * itemsPerPage
      );

      if (tempItems.length === 0) {
        tempItems = listItems.slice(
          (Math.ceil(listItems.length / itemsPerPage) - 1) * itemsPerPage,
          listItems.length
        );
        setPageNumber((prev) => prev - 1);
      }
      setPage(tempItems as T);
    } else {
      setPageNumber(1);
    }
  }, [listItems]);

  useEffect(() => {
    if (pageNumber * itemsPerPage >= listItems.length) {
      setHasNext(false);
    } else {
      setHasNext(true);
    }

    if (pageNumber * itemsPerPage > itemsPerPage) {
      setHasPrevious(true);
    } else {
      setHasPrevious(false);
    }
  }, [page]);

  const onNext = () => {
    if (pageNumber < Math.ceil(listItems.length / itemsPerPage)) {
      setPage(
        listItems.slice(
          pageNumber * itemsPerPage,
          (pageNumber + 1) * itemsPerPage
        ) as T
      );
      setPageNumber((prev) => prev + 1);
    }
  };

  const onPrev = () => {
    if (pageNumber > 1) {
      setPage(
        listItems.slice(
          (pageNumber - 1 - 1) * itemsPerPage,
          (pageNumber - 1) * itemsPerPage
        ) as T
      );
      setPageNumber((prev) => prev - 1);
    }
  };

  const onPageChange = () => {};

  return {
    page: page || [],
    pageNumber,
    hasNext,
    hasPrevious,
    onNext,
    onPrev,
    onPageChange,
    setItems: setListItems,
  };
};

const ITEMS_PER_PAGE = [
  1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100,
];
// currentPage must be greater than 0

interface IPagination {
  currentPage?: number;
  totalItems: number;

  itemsPerPage?: number;
  onPageChanged?: (count: number) => void;
  onItemsPerPageChanged?: (count: number) => void;
  disabled?: boolean;
  itemPerPageDisabled?: boolean;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  isNextDisabled?: boolean;
  isPrevDisabled?: boolean;
  showNumbers?: boolean;
  showItemsPerPage?: boolean;
}

const Pagination = ({
  currentPage = 3,
  totalItems = 90,
  itemsPerPage = 15,
  onPageChanged = () => {},
  onItemsPerPageChanged = () => {},
  disabled = false,
  itemPerPageDisabled = false,
  onClickNext = () => {},
  onClickPrev = () => {},
  isNextDisabled = false,
  isPrevDisabled = false,
  showNumbers = true,
  showItemsPerPage = true,
}: IPagination) => {
  const [focusItem, setFocusItem] = useState<null | number>(null);
  const [focusCallback, setFocusCallback] = useState(false);

  const [itemsPerPageValue, setItemsPerPageValue] = useState(itemsPerPage);

  const [startPages, setStartPages] = useState<number[]>([]);
  const [middlePages, setMiddlePages] = useState<number[]>([]);
  const [endPages, setEndPages] = useState<number[]>([]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const itemsPerPageId = useId();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsPerPageChanged) onItemsPerPageChanged(itemsPerPageValue);
  }, [itemsPerPageValue]);

  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChanged(totalPages);
    }
    if (totalPages < 7) {
      setStartPages(
        new Array(totalPages).fill(0).map((value, index) => index + 1)
      );
      setMiddlePages([]);
      setEndPages([]);
      return;
    }

    if (currentPage <= 3) {
      setStartPages([1, 2, 3, 4]);
      setMiddlePages([]);
      setEndPages([totalPages]);
    } else if (currentPage > 3 && currentPage <= totalPages - 3) {
      setStartPages([1]);
      setMiddlePages([currentPage - 1, currentPage, currentPage + 1]);
      setEndPages([totalPages]);
    } else {
      setStartPages([1]);
      setMiddlePages([]);
      setEndPages([totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
    }
    setFocusCallback(true);
  }, [currentPage, itemsPerPage, totalItems]);

  useEffect(() => {
    if (focusCallback) {
      if (focusItem && ref?.current?.children) {
        const itemsArray = Array.from(
          ref.current?.children
        ) as HTMLButtonElement[];

        if (itemsArray.find((e) => e.value === `${focusItem}`)) {
          itemsArray?.find((e) => e.value === `${focusItem}`)?.focus();
        } else {
          const divElement = itemsArray?.find(
            (e) => e.tagName.toLowerCase() === 'div'
          );
          if (divElement) {
            const divElementArray = Array.from(
              divElement.children
            ) as HTMLButtonElement[];
            if (divElementArray) {
              divElementArray.find((e) => e.value === `${focusItem}`)?.focus();
            }
          }
        }
      }
    }
    setFocusItem(null);
    setFocusCallback(false);
  }, [focusCallback]);
  const restoreFocus = (index: number) => {
    setFocusItem(index);
  };

  return (
    <div
      className={cn('flex flex-row items-center gap-3xl w-full', {
        'justify-end': !showItemsPerPage,
      })}
    >
      {showItemsPerPage && (
        <div className="flex flex-row items-center flex-1 gap-lg text-icon-default bodyMd">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={itemsPerPageId}>Item per page</label>
          <select
            name="itemperpage"
            id={itemsPerPageId}
            disabled={itemPerPageDisabled}
            value={itemsPerPageValue}
            onChange={(e) => {
              setItemsPerPageValue(Number(e.target.value));
            }}
            className={cn(
              'py-md pl-lg pr-5xl text-text-default border-border-default bg-surface-basic-input transition-all rounded border flex flex-row items-center relative outline-none disabled:bg-surface-basic-input disabled:text-text-disabled ring-offset-1 focus-within:ring-2 focus-within:ring-border-focus appearance-none',
              {
                'text-text-disabled border-border-disabled bg-surface-basic-input':
                  disabled,
              }
            )}
          >
            {ITEMS_PER_PAGE.map((ipp) => (
              <option value={ipp} key={ipp}>
                {ipp}
              </option>
            ))}
          </select>

          {showNumbers ? (
            <span>
              {currentPage * itemsPerPage - itemsPerPage + 1} -{' '}
              {currentPage * itemsPerPage} of {totalItems} items
            </span>
          ) : (
            <span> total {totalItems} items</span>
          )}
        </div>
      )}
      <RovingFocusGroup.Root loop>
        <div className="flex flex-row items-center gap-xl">
          <RovingFocusGroup.Item asChild focusable>
            <Button
              content="Previous"
              prefix={<ChevronLeft />}
              variant="plain"
              onClick={() => {
                if (onPageChanged) {
                  onPageChanged(currentPage - 1);
                }
                onClickPrev();
              }}
              disabled={
                (showNumbers && currentPage < 2) || disabled || isPrevDisabled
              }
            />
          </RovingFocusGroup.Item>
          {showNumbers && (
            <div className="flex flex-row items-center gap-lg" ref={ref}>
              {startPages.map((sP) => (
                <RovingFocusGroup.Item asChild focusable key={sP}>
                  <Button
                    content={sP.toString().padStart(2, '0')}
                    variant="plain"
                    selected={sP === currentPage}
                    onClick={() => onPageChanged && onPageChanged(sP)}
                    disabled={disabled}
                    value={sP}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        restoreFocus(sP);
                      }
                    }}
                  />
                </RovingFocusGroup.Item>
              ))}
              <div className="flex flex-row items-center gap-lg">
                {middlePages.length > 0 && (
                  <span className="bodyMd text-text-default">.....</span>
                )}
                {middlePages.map((mP) => (
                  <RovingFocusGroup.Item asChild focusable key={mP}>
                    <Button
                      content={mP.toString().padStart(2, '0')}
                      variant="plain"
                      key={mP}
                      selected={mP === currentPage}
                      onClick={() => onPageChanged && onPageChanged(mP)}
                      disabled={disabled}
                      value={mP}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          restoreFocus(mP);
                        }
                      }}
                    />
                  </RovingFocusGroup.Item>
                ))}
                {totalPages >= 7 && (
                  <span className="bodyMd text-text-default">.....</span>
                )}
              </div>
              {endPages.map((eP) => (
                <RovingFocusGroup.Item asChild focusable key={eP}>
                  <Button
                    content={eP.toString().padStart(2, '0')}
                    variant="plain"
                    key={eP}
                    selected={eP === currentPage}
                    onClick={() => onPageChanged && onPageChanged(eP)}
                    disabled={disabled}
                    value={eP}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        restoreFocus(eP);
                      }
                    }}
                  />
                </RovingFocusGroup.Item>
              ))}
            </div>
          )}

          <RovingFocusGroup.Item asChild focusable>
            <Button
              content="Next"
              suffix={<ChevronRight />}
              variant="plain"
              onClick={() => {
                if (onPageChanged) {
                  onPageChanged(currentPage + 1);
                }
                onClickNext();
              }}
              disabled={
                (showNumbers && currentPage >= totalPages) ||
                disabled ||
                isNextDisabled
              }
            />
          </RovingFocusGroup.Item>
        </div>
      </RovingFocusGroup.Root>
    </div>
  );
};

export default Pagination;
