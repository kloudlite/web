import { ArrowLeft } from '@jengaicons/react';
import { ReactNode } from 'react';
import { IconButton } from '../atoms/button';

interface ISubHeader {
  title: ReactNode;
  actions: ReactNode;
  backUrl?: string;
  LinkComponent?: any;
}

export const SubHeader = ({
  title = '',
  actions = null,
  backUrl = '',
  LinkComponent = null,
}: ISubHeader) => {
  return (
    <div className="flex flex-row items-center justify-between py-6xl gap-xl">
      <div className="flex flex-row items-center gap-xl">
        {backUrl && (
          <IconButton
            variant="basic"
            icon={<ArrowLeft />}
            to={backUrl}
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
