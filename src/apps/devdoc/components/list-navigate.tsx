/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { KeyboardEvent, ReactNode, useEffect, useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

const LIST_SELECT_CLASS = 'list-navigated-selected-item';

interface IListNavigate {
  children: ReactNode;
  className: string;
  childSelectorClass: string;
  keyPressEvent: KeyboardEvent<HTMLInputElement> | undefined;
  selectedClass: string;
}
const ListNavigate = ({
  children,
  className,
  selectedClass = '',
  childSelectorClass,
  keyPressEvent,
}: IListNavigate) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (keyPressEvent) {
      const key = keyPressEvent.code;

      if (key === 'Enter') {
        const selectedItem = ref.current?.querySelector(
          `.${LIST_SELECT_CLASS}`
        );
        if (selectedItem?.tagName.toLocaleLowerCase() === 'a') {
          (selectedItem as HTMLAnchorElement).click();
        } else {
          selectedItem?.querySelector('a')?.click();
        }
      }

      if (['ArrowDown', 'ArrowUp'].includes(key)) {
        const items = ref.current?.querySelectorAll(`.${childSelectorClass}`);
        const itemsArray = Array.from(items || []);
        if (items?.length === 0) {
          return;
        }
        if (items?.length === 1) {
          items[0].classList.add(selectedClass);
          return;
        }

        const currentItem = itemsArray.findIndex((item) =>
          item.classList.contains(LIST_SELECT_CLASS)
        );

        itemsArray[currentItem]?.classList.remove(
          selectedClass,
          LIST_SELECT_CLASS
        );
        if (key === 'ArrowDown') {
          let tempItem = itemsArray[0];
          if (currentItem !== -1 && itemsArray.length - 1 > currentItem) {
            tempItem = itemsArray[currentItem + 1];
          }
          tempItem.classList.add(selectedClass, LIST_SELECT_CLASS);
          scrollIntoView(tempItem, {
            scrollMode: 'if-needed',
            block: 'end',
            inline: 'nearest',
            behavior: 'instant',
          });
        } else {
          let tempItem = itemsArray[itemsArray.length - 1];

          if (currentItem !== -1 && currentItem > 0) {
            tempItem = itemsArray[currentItem - 1];
          }
          tempItem.classList.add(selectedClass, LIST_SELECT_CLASS);
          scrollIntoView(tempItem, {
            scrollMode: 'if-needed',
            block: 'end',
            inline: 'nearest',
            behavior: 'instant',
          });
        }
      } else {
        const firstEl = ref.current?.querySelector(`.${childSelectorClass}`);
        ref.current
          ?.querySelectorAll(`.${childSelectorClass}`)
          .forEach((child) =>
            child.classList.remove(selectedClass, LIST_SELECT_CLASS)
          );
        firstEl?.classList.add(selectedClass, LIST_SELECT_CLASS);
      }
    }
  }, [keyPressEvent]);

  return (
    <div
      ref={ref}
      className={className}
      onMouseOver={(e) => {
        const target = e.target as HTMLDivElement;
        const closest = target.closest(`.${childSelectorClass}`);
        const childs = ref.current?.querySelectorAll(`.${childSelectorClass}`);

        if (closest) {
          childs?.forEach((child) =>
            child.classList.remove(selectedClass, LIST_SELECT_CLASS)
          );
          closest?.classList.add(selectedClass, LIST_SELECT_CLASS);
        }
      }}
    >
      {children}
    </div>
  );
};

export default ListNavigate;
