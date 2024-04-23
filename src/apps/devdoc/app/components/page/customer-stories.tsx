import consts from '~/app/utils/const';
import Wrapper from '../wrapper';
import ReadyToOps from '../website/ready-to-ops';
import { Block, DetailCard, Head } from '../commons';
import { GraphItem } from '../graph';

const ClientCard = ({ icon }: { icon: string }) => {
  return (
    <GraphItem>
      <div className="flex items-center justify-center bg-surface-basic-default px-2xl py-3xl h-[128px]">
        <img src={icon} />
      </div>
    </GraphItem>
  );
};
const Clients = () => {
  return (
    <Block title="Our Clientele">
      <div className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 2xl:!grid-cols-3 3xl:!grid-cols-[352px_320px_320px_320px] gap-3xl lg:!gap-5xl">
        {consts.customerstories.clients.map((feature, index) => {
          const x = index;
          return <ClientCard key={x} {...feature} />;
        })}
      </div>
    </Block>
  );
};

const CaseStudies = () => {
  return (
    <Block title="Case studies">
      <div className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 2xl:!grid-cols-3 3xl:!grid-cols-3 gap-3xl lg:!gap-5xl">
        {consts.customerstories.casestudies.map((feature, index) => {
          const x = index;
          return <DetailCard key={x} {...feature} />;
        })}
      </div>
    </Block>
  );
};

const Industries = () => {
  return (
    <Block
      title="Industries"
      desc="Kloudlite suite is industry agnostic, empowering teams & businesses of all scales and sizes with our open-source, NoOps strategy."
    >
      <div className="grid grid-cols-1 md:!grid-cols-2 3xl:!grid-cols-[704px_auto] 3xl:!grid-rows-[256px_256px] gap-3xl lg:!gap-5xl">
        {consts.customerstories.casestudies.map((feature, index) => {
          const x = index;
          return <DetailCard key={x} {...feature} compact />;
        })}
      </div>
    </Block>
  );
};

const ReadyTo = () => {
  return <ReadyToOps />;
};
const CustomerStories = () => {
  return (
    <div>
      <Wrapper className="relative flex justify-center lg:justify-start py-6xl md:!py-8xl lg:!py-10xl">
        <Head
          tag="Success stories"
          heading="Clients we have championed"
          desc="Customized, cloud-agnostic, and cost-effective solutions crafted
                for businesses of all scales & sizes
"
        />
      </Wrapper>
      <Wrapper>
        <CaseStudies />
        <Industries />
        <Clients />
        <ReadyTo />
      </Wrapper>
    </div>
  );
};

export default CustomerStories;
