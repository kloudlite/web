import { UndoRedo, DiffSourceToggleWrapper } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

const _ToolbarContent = () => (
  <DiffSourceToggleWrapper>
    <UndoRedo />
  </DiffSourceToggleWrapper>
);

function getComputedData(element: Element) {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return {
    translateX: matrix.m41,
    translateY: matrix.m42,
    width: parseInt(style.width, 10) || 0,
  };
}

const Slider = ({ children }: { children?: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [childCount, setChildCount] = useState(0);
  const [dragging, setDragging] = useState(false);

  const [animRequestId, setAnimRequestId] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseMove = (e: any) => {
    if (!dragging || !ref.current) return;
    const computedData = getComputedData(ref.current);
    const x = e.movementX + computedData.translateX;
    if (x >= 0) {
      console.log('here');
      const node =
        ref.current.childNodes[ref.current.childElementCount - 1].cloneNode(
          true
        );
      ref.current?.prepend(node);
      ref.current?.removeChild(
        ref.current.childNodes[ref.current.childElementCount - 1]
      );
      ref.current.style.transform = `translate(${x - computedData.width}px)`;

      return;
    }

    ref.current.style.transform = `translate(${x}px)`;
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    const velocity = 2; // Change this value to adjust speed

    let pos = 0;

    // Define the animation function
    function animate() {
      if (!ref.current) {
        return;
      }
      if (!ref.current.firstElementChild) {
        return;
      }
      // Update the position
      // setPos((p) => p + velocity);
      const computedData = getComputedData(ref.current);
      const computedDataFirstChild = getComputedData(
        ref.current.firstElementChild
      );
      pos = computedData.translateX - velocity;

      // Apply the new position to the element
      ref.current.style.transform = `translate(${pos}px)`;
      // Request the next animation frame
      const id = requestAnimationFrame(animate);
      setAnimRequestId(id);
      if (pos < -computedDataFirstChild.width) {
        const node = ref.current.childNodes[0].cloneNode(true);
        ref.current?.appendChild(node);
        ref.current?.removeChild(ref.current.childNodes[0]);
        ref.current.style.transform = `translate(${
          pos + computedDataFirstChild.width
        }px)`;
      }
    }

    if (ref.current) {
      animate();
    }
  }, [ref, shouldAnimate]);

  useEffect(() => {
    if (ref.current && ref.current.parentElement) {
      const parentWidth = getComputedData(ref.current.parentElement).width;
      const myWidth = getComputedData(ref.current).width;
      const childCount = Math.ceil(parentWidth / myWidth);
      setChildCount(childCount);
    }
  }, [ref]);

  return (
    <div
      ref={ref}
      className="wb-flex wb-flex-row wb-cursor-pointer wb-w-fit"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        setShouldAnimate((prev) => !prev);
      }}
      onFocus={() => {}}
      onMouseOver={() => {
        cancelAnimationFrame(animRequestId);
      }}
    >
      {React.Children.map(children, (c) => {
        return <div className="wb-shrink-0">{c}</div>;
      })}
      {[...Array(childCount).keys()].map(() => {
        return (
          <>
            {React.Children.map(children, (c) => {
              return <div className="wb-shrink-0">{c}</div>;
            })}
          </>
        );
      })}
    </div>
  );
};

const Writer = () => {
  return (
    // <MDXEditor
    //   markdown="# Hello World"
    //   onChange={(e) => {
    //     console.log(e);
    //   }}
    //   plugins={[
    //     toolbarPlugin({
    //       toolbarContents: ToolbarContent,
    //     }),
    //     headingsPlugin(),
    //     diffSourcePlugin({
    //       viewMode: 'rich-text',
    //       diffMarkdown: 'boo',
    //     }),
    //   ]}
    // />
    <div className="wb-w-full wb-overflow-x-hidden">
      <Slider>
        <div className="dark:wb-text-text-darktheme-default">hello</div>
        <div className="dark:wb-text-text-darktheme-default">hello 1</div>
        <div className="dark:wb-text-text-darktheme-default">hello 2</div>
        <div className="dark:wb-text-text-darktheme-default">hello 3</div>
        <div className="dark:wb-text-text-darktheme-default">hello 4</div>
      </Slider>
    </div>
  );
};

export default Writer;
