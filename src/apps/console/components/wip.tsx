import { Smiley } from '~/console/components/icons';
import { EmptyState } from '~/console/components/empty-state';

const Wip = ({ title = 'Coming soon' }: { title?: string }) => {
  return (
    <div className="py-4xl">
      <EmptyState heading={title} image={<Smiley size={48} />} />
    </div>
  );
};

export default Wip;
