import { MouseEvent, useRef } from 'react';

const resizeBorderWidth = 4;

const isValidArea = (
  e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  rect: DOMRect,
) => {
  const left = e.clientX - rect.x;
  const right = e.clientX - rect.x - rect.width;
  const bottom = e.clientY - rect.y - rect.height;
  const top = e.clientY - rect.y;

  if (left < resizeBorderWidth) {
    return 0;
  } else if (top < resizeBorderWidth) {
    return 1;
  } else if (right > -resizeBorderWidth) {
    return 2;
  } else if (bottom > -resizeBorderWidth) {
    return 3;
  } else {
    return -1;
  }
};
const DragResize = () => {
  const isMouseDown = useRef(false);
  return (
    <div
      className="wb-bg-surface-basic-active wb-mx-4xl"
      onMouseMove={(e) => {
        let t = e.target as HTMLDivElement;
        let s = t.style;
        const rect = t.getBoundingClientRect();
        let a = isValidArea(e, rect);
        console.log(e.clientX);
        switch (a) {
          case 0:
          case 2:
            // s.cursor = 'ew-resize';
            if (isMouseDown.current) {
              s.width = `${e.pageX - rect.left}px`;
            }
            break;
          case 1:
          case 3:
            // s.cursor = 'ns-resize';
            break;
          default:
          // s.cursor = 'default';
        }
      }}
      onMouseDown={() => {
        isMouseDown.current = true;
      }}
      onMouseUp={() => {
        isMouseDown.current = false;
      }}
    >
      hello
    </div>
  );
};
export default DragResize;
