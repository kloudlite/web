import { forwardRef } from 'react';
import { AvatarBase, IAvatar } from '../atoms/avatar.jsx';
import { BounceIt } from '../bounce-it.jsx';
import { cn } from '../utils.jsx';

interface IProfile extends IAvatar {
  name: string;
  subtitle?: string;
}

export const Profile = forwardRef<HTMLButtonElement, IProfile>(
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
          <AvatarBase color={color} size={size} />
          <div className=" flex-col items-start hidden md:flex">
            <div className="bodyMd-medium gap-y-md">{name}</div>
            {subtitle && (
              <div className="bodySm text-text-soft">{subtitle}</div>
            )}
          </div>
        </button>
      </BounceIt>
    );
  }
);
