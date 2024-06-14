import { ReactNode, forwardRef } from 'react';
import { AvatarBase, IAvatar } from '../atoms/avatar';
import { BounceIt } from '../bounce-it';
import { cn } from '../utils';

interface IProfile extends IAvatar {
  name?: ReactNode;
  subtitle?: ReactNode;
  responsive?: boolean;
  noImage?: boolean;
}

const Profile = forwardRef<HTMLButtonElement, IProfile>(
  (
    { name, subtitle, color, responsive = true, size, noImage, ...props },
    ref
  ) => {
    return (
      <BounceIt className="w-fit">
        <button
          {...props}
          ref={ref}
          className={cn(
            'flex py-sm px-md gap-lg items-center ring-offset-1 dark:ring-offset-0 outline-none transition-all rounded focus-visible:ring-2 focus-visible:ring-border-focus dark:focus-visible:ring-border-darktheme-focus'
          )}
        >
          {!noImage && (
            <AvatarBase color={color} size={size} image={props.image} />
          )}
          {(name || subtitle) && (
            <div
              className={cn(
                'flex-col items-start',
                responsive ? 'hidden md:flex' : ' flex'
              )}
            >
              {name && (
                <div className="bodyMd-medium gap-y-md pulsable text-text-default dark:text-text-darktheme-default">
                  {name}
                </div>
              )}

              {subtitle && (
                <div className="text-start bodySm text-text-soft dark:text-text-darktheme-soft pulsable">
                  {subtitle}
                </div>
              )}
            </div>
          )}
        </button>
      </BounceIt>
    );
  }
);

export default Profile;
