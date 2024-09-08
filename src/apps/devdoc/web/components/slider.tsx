import React, { ReactNode, useEffect, useRef } from 'react';
import '@splidejs/react-splide/css/core';
import Radio from 'kl-design-system/atoms/radio';
import SlickSlider from 'react-slick';
import { GraphItem } from './graph';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { cn } from '../utils/commons';

export const SliderItem = ({ children }: { children?: ReactNode }) => {
  return children;
};

const Slider = ({
  children,
  graph = true,
  onMove,
  hasDots = true,
  className,
  active,
  autoPlay = false,
}: {
  children?: ReactNode;
  graph?: boolean;
  onMove?: (index: number) => void;
  hasDots?: boolean;
  className?: string;
  active?: string;
  autoPlay?: boolean;
}) => {
  const ref = useRef<SlickSlider>(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    adaptiveHeight: true,
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.slickGoTo(parseInt(active || '0', 10) || 0);
    }
  }, [active, ref]);

  if (!children) {
    return null;
  }

  return (
    <div className={cn('wb-flex wb-flex-col wb-gap-3xl wb-min-w-0', className)}>
      <GraphItem
        lines={{
          top: graph,
          bottom: graph,
          left: graph,
          right: graph,
        }}
      >
        <SlickSlider
          {...settings}
          beforeChange={(e, n) => {
            onMove?.(n);
          }}
          autoplay={autoPlay}
          ref={ref}
        >
          {children}
        </SlickSlider>
      </GraphItem>
      {hasDots && (
        <Radio.Root
          value={active || ''}
          onChange={(e) => {
            if (ref.current) {
              ref.current.slickGoTo(parseInt(e, 10) || 0);
            }
          }}
          className="!wb-flex-row wb-self-center"
        >
          {/* @ts-ignore */}
          {React.Children.map(children, (_, index) => {
            const i = index;
            // @ts-ignore
            return <Radio.Item key={i} value={`${i}`} />;
          })}
        </Radio.Root>
      )}
    </div>
  );
};

export default Slider;
