import Link from 'next/link';
import { MouseEvent, ReactNode, useRef } from 'react';

function convertToAngle(x: number, y: number, height: number, width: number) {
  // Calculate the difference between the mouse position and the center of the square

  const dx = x - width / 2;
  const dy = height / 2 - y;

  // Calculate the angle using atan2
  const angleRad = Math.atan2(dy, dx);

  // Convert the angle to degrees
  const angleDeg = ((angleRad * 180) / Math.PI + 360) % 360;

  return angleDeg;
}

const HoverItem = ({ children, to }: { children?: ReactNode; to?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    // Mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { height } = rect;
    const { width } = rect;
    if (ref.current) {
      ref.current.style.setProperty(
        '--deg',
        `${-convertToAngle(x, y, height, width)}deg`
      );
      // const vcenter = height / 2 - y;
      // const hcenter = width / 2 - x;
      // const offset = 50;
      // const isCenter =
      //  vcenter < offset &&
      //  vcenter > -offset &&
      //  hcenter < offset &&
      //  hcenter > -offset;
    }
  };

  const onMouseEnter = () => {
    if (ref.current) {
      ref.current.style.opacity = '1';
    }
  };

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.opacity = '0';
    }
  };

  return (
    <Link href={to || ''} className="block relative hover:bg-black h-full">
      <div
        ref={ref}
        className="absolute -inset-xs z-0 g transition-opacity duration-300"
      />
      <div className="relative z-[1] h-full">
        <div
          className="absolute inset-0 hover-container"
          onMouseMove={onMouseOver}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        {children}
      </div>
    </Link>
  );
};

export default HoverItem;
