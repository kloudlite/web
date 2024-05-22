import { ChevronLeft, ChevronRight } from '@jengaicons/react';
import { Button, IconButton } from 'kl-design-system/atoms/button';
import { useEffect, useRef, useState } from 'react';

interface IPagination {
  currentPage?: number;
  totalItems: number;

  itemsPerPage?: number;
  onPageChanged?: (count: number) => void;
  disabled?: boolean;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  isNextDisabled?: boolean;
  isPrevDisabled?: boolean;
  showNumbers?: boolean;
}

const Pagination = ({
  currentPage = 1,
  totalItems = 90,
  onPageChanged = () => {},
  disabled = false,
  onClickNext = () => {},
  onClickPrev = () => {},
  isNextDisabled = false,
  isPrevDisabled = false,
  showNumbers = true,
  itemsPerPage = 10,
}: IPagination) => {
  const [focusItem, setFocusItem] = useState<null | number>(null);
  const [focusCallback, setFocusCallback] = useState(false);

  const [startPages, setStartPages] = useState<number[]>([]);
  const [middlePages, setMiddlePages] = useState<number[]>([]);
  const [endPages, setEndPages] = useState<number[]>([]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('totalpages', totalPages);
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
  }, [currentPage, totalItems]);

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
    <div className="flex flex-row items-center gap-lg">
      <IconButton
        size="sm"
        icon={<ChevronLeft />}
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
      {showNumbers && (
        <div className="flex flex-row items-center gap-lg" ref={ref}>
          {startPages.map((sP) => (
            <Button
              size="sm"
              key={sP}
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
          ))}
          <div className="flex flex-row items-center gap-lg">
            {middlePages.length > 0 && (
              <span className="bodyMd text-text-default">.....</span>
            )}
            {middlePages.map((mP) => (
              <Button
                content={mP.toString().padStart(2, '0')}
                size="sm"
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
            ))}
            {totalPages >= 7 && (
              <span className="bodyMd text-text-default">.....</span>
            )}
          </div>
          {endPages.map((eP) => (
            <Button
              content={eP.toString().padStart(2, '0')}
              variant="plain"
              key={eP}
              size="sm"
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
          ))}
        </div>
      )}

      <IconButton
        icon={<ChevronRight />}
        variant="plain"
        size="sm"
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
    </div>
  );
};

export default Pagination;
