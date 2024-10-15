import { ComponentProps } from 'react';
import { cn } from '../utils/commons';
import Fullscreen from './fullscreen';

const Img = (props: ComponentProps<'img'>) => {
  return (
    <Fullscreen>
      {() => {
        return (
          <img
            {...props}
            className={cn('wb-rounded-lg wb-h-full wb-w-full wb-max-w-full')}
          />
        );
      }}
    </Fullscreen>
  );
};

export default Img;
