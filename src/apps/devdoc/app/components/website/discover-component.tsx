import { ReactNode } from 'react';
import { cn } from '~/app/utils/commons';
import { GraphExtended, GraphItem } from '../graph';
import SectionWrapper from './section-wrapper';

interface IFeatureItem {
  icon: any;
  label: ReactNode;
}
const FeatureItem = ({ icon: Icon, label }: IFeatureItem) => {
  return (
    <div className="p-4xl flex flex-col justify-between gap-4xl bg-surface-basic-default min-h-[256px]">
      <span className="flex items-center justify-center rounded-full text-text-on-primary h-10xl w-10xl bg-icon-primary">
        <Icon size={48} />
      </span>
      <span className="headingLg text-text-default">{label}</span>
    </div>
  );
};

interface IDiscover {
  title: ReactNode;
  desc: ReactNode;
  features: {
    label: string;
    icon: any;
  }[];
  className?: string;
}
const Discover = ({ features, title, desc, className }: IDiscover) => {
  return (
    <SectionWrapper className="flex-col">
      <div className="flex flex-col gap-3xl text-center">
        <div className="flex flex-col gap-md">
          <p className="bodyXl lg:!bodyXXl text-text-disabled">
            Salient features
          </p>
          <h3 className="heading3xl-marketing md:!heading4xl-marketing lg:!heading5xl-marketing text-text-default">
            {title}
          </h3>
        </div>
        <p className="bodyXl lg:!bodyXXl text-text-soft">{desc}</p>
      </div>
      <GraphExtended>
        <div className={cn(className)}>
          {features.map((feature) => (
            <GraphItem key={feature.label}>
              <FeatureItem {...feature} />
            </GraphItem>
          ))}
        </div>
      </GraphExtended>
    </SectionWrapper>
  );
};

export default Discover;
