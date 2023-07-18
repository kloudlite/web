import { ChevronLeft, ChevronRight } from '@jengaicons/react';
import { useEffect, useId, useRef, useState } from 'react';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { Button } from '../atoms/button';
import { cn } from '../utils';

const ITEMS_PER_PAGE = [
  1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100,
];
// currentPage must be greater than 0

const Pagination = (props) => {
  const {
    currentPage = 3,
    totalItems = 90,
    itemsPerPage = 15,
    onPageChanged,
    onItemsPerPageChanged,
    disabled = false,
    itemPerPageDisabled = false,
  } = props;

  const [focusItem, setFocusItem] = useState(null);
  const [focusCallback, setFocusCallback] = useState(false);

  const [itemsPerPageValue, setItemsPerPageValue] = useState(itemsPerPage);

  const [startPages, setStartPages] = useState([1, 2, 3, 4]);
  const [middlePages, setMiddlePages] = useState([]);
  const [endPages, setEndPages] = useState([10]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const itemsPerPageId = useId();

  const ref = useRef(null);

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
      if (focusItem) {
        const itemsArray = Array.from(ref.current?.children);
        if (itemsArray.find((e) => e.value === `${focusItem}`)) {
          itemsArray?.find((e) => e.value === `${focusItem}`)?.focus();
        } else {
          const divElement = itemsArray?.find(
            (e) => e.tagName.toLowerCase() === 'div'
          );
          if (divElement) {
            const divElementArray = Array.from(divElement.children);
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
  const restoreFocus = (index) => {
    setFocusItem(index);
  };

  return (
    <div className="flex flex-row items-center gap-3xl">
      <div className="flex flex-row items-center flex-1 gap-lg text-icon-default bodyMd">
        <label htmlFor={itemsPerPageId}>Item per page</label>
        <select
          name="itemperpage"
          id={itemsPerPageId}
          disabled={itemPerPageDisabled}
          value={itemsPerPageValue}
          onChange={(e) => {
            setItemsPerPageValue(e.target.value);
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

        <span>
          {currentPage * itemsPerPage - itemsPerPage + 1} -{' '}
          {currentPage * itemsPerPage} of {totalItems} items
        </span>
      </div>
      <RovingFocusGroup.Root loop>
        <div className="flex flex-row items-center gap-xl">
          <RovingFocusGroup.Item asChild focusable>
            <Button
              content="Previous"
              prefix={ChevronLeft}
              variant="plain"
              onClick={() => onPageChanged && onPageChanged(currentPage - 1)}
              disabled={currentPage < 2 || disabled}
            />
          </RovingFocusGroup.Item>
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
          <RovingFocusGroup.Item asChild focusable>
            <Button
              content="Next"
              suffix={ChevronRight}
              variant="plain"
              onClick={() => onPageChanged && onPageChanged(currentPage + 1)}
              disabled={currentPage >= totalPages || disabled}
            />
          </RovingFocusGroup.Item>
        </div>
      </RovingFocusGroup.Root>
    </div>
  );
};

export default Pagination;
