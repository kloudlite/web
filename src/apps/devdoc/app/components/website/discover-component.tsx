import { ReactNode } from 'react';
import { Graph, GraphItem } from '../graph';

interface IFeatureItem {
  icon: any;
  label: ReactNode;
}
const FeatureItem = ({ icon: Icon, label }: IFeatureItem) => {
  return (
    <div className="p-4xl flex flex-col justify-between gap-4xl bg-surface-basic-default min-h-[256px]">
      <span
        className="flex items-center justify-center rounded-full text-text-on-primary h-10xl w-10xl"
        style={{
          background: 'linear-gradient(170deg, #3B82F6 6.19%, #1E3A8A 95.65%)',
        }}
      >
        <Icon icon={48} />
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
}
const Discover = ({ features, title, desc }: IDiscover) => {
  return (
    <>
      <div className="flex flex-col gap-3xl text-center">
        <div className="flex flex-col gap-md">
          <p className="bodyXl-medium text-text-disabled">Salient features</p>
          <h3 className="heading5xl-marketing text-text-default">{title}</h3>
        </div>
        <p className="bodyXl-medium text-text-soft">{desc}</p>
      </div>
      <Graph className="-mx-10xl">
        <div className="grid grid-cols-4 gap-5xl px-10xl py-10xl">
          {features.map((feature) => (
            <GraphItem key={feature.label}>
              <FeatureItem {...feature} />
            </GraphItem>
          ))}
        </div>
      </Graph>
    </>
  );
};

export default Discover;
