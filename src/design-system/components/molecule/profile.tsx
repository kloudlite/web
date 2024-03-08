import { forwardRef } from 'react';
import { AvatarBase, IAvatar } from '../atoms/avatar';
import { BounceIt } from '../bounce-it';
import { cn } from '../utils';

interface IProfile extends IAvatar {
  name?: string;
  subtitle?: string;
}

const Profile = forwardRef<HTMLButtonElement, IProfile>(
  ({ name, subtitle, color, size, ...props }, ref) => {
    return (
      <BounceIt className="w-fit">
        <button
          {...props}
          ref={ref}
          className={cn(
            'flex py-sm px-md gap-lg items-center ring-offset-1 outline-none transition-all rounded focus-visible:ring-2 focus-visible:ring-border-focus'
          )}
        >
          <AvatarBase color={color} size={size} image={props.image} />
          {(name || subtitle) && (
            <div className=" flex-col items-start hidden md:flex">
              {name && (
                <div className="bodyMd-medium gap-y-md pulsable">{name}</div>
              )}

              {subtitle && (
                <div className="bodySm text-text-soft pulsable">{subtitle}</div>
              )}
            </div>
          )}
        </button>
      </BounceIt>
    );
  }
);

export default Profile;
