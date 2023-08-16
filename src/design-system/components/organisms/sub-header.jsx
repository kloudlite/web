import { ArrowLeft } from '@jengaicons/react';
import { IconButton } from '../atoms/button';

export const SubHeader = ({
  title = '',
  actions = null,
  backUrl = '',
  LinkComponent = null,
}) => {
  return (
    <div className="flex flex-row items-center justify-between pb-3xl pt-6xl gap-xl">
      <div className="flex flex-row items-center gap-xl">
        {backUrl && (
          <IconButton
            icon={ArrowLeft}
            href={backUrl}
            LinkComponent={LinkComponent}
          />
        )}
        <div className="text-text-strong heading2xl">{title}</div>
      </div>
      <div className="flex flex-row items-center justify-center min-h-[38px]">
        {actions && actions}
      </div>
    </div>
  );
};
