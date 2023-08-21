import Container from '../atoms/container';
import { cn } from '../utils';

export const TopBar = ({ tabs, actions, logo, fixed, breadcrum = null }) => {
  return (
    <div
      className={cn(
        'border-b border-border-default bg-surface-basic-default z-40',
        {
          'sticky top-0 left-0 right-0': fixed,
        }
      )}
    >
      <Container>
        <div className="flex flex-row items-center gap-3xl py-xl">
          <div className="flex flex-row gap-lg items-center">
            {logo && logo}
            {breadcrum && breadcrum}
          </div>
          <div className="flex flex-row items-center justify-end flex-1">
            <div className="flex flex-row items-center justify-center">
              {actions && actions}
            </div>
          </div>
        </div>
        {!!tabs && tabs}
      </Container>
    </div>
  );
};
