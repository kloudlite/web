import { ComponentProps, useEffect, useState } from 'react';
import { cn } from '../utils/commons';
import Fullscreen from './fullscreen';

const Img = (props: ComponentProps<'img'>) => {
  return (
    <Fullscreen>
      {({ fullscreen }) => {
        return (
          <img
            {...props}
            className={cn(
              'wb-rounded-lg wb-h-full wb-w-full wb-max-w-full',
              fullscreen ? 'wb-cursor-zoom-out' : 'wb-cursor-zoom-in wb-mt-3xl',
            )}
          />
        );
      }}
    </Fullscreen>
  );
};

export default Img;
