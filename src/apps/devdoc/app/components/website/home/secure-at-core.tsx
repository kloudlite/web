import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SecureAtCore1920 from '~/images/homeNew/svg-comp/secure-at-core-1920';
import SecureAtCore1440 from '~/images/homeNew/svg-comp/secure-at-core-1440';
import SecureAtCore1280 from '~/images/homeNew/svg-comp/secure-at-core-1280';
import SecureAtCore1024 from '~/images/homeNew/svg-comp/secure-at-core-1024';
import { Block } from '../../commons';

const SecureAtCore = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? 'none' : 'translateY(50px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
      }}
    >
      <Block
        title="Secure at the core"
        desc="Built using Kloudlite Global VPN Mesh with wireguard at it’s core"
        hasGraph={false}
      >
        <div className="wb-relative secure-graph wb-py-10xl wb-flex wb-flex-row wb-items-center wb-justify-center">
          <div className="wb-absolute wb-top-0 wb-left-0 wb-right-0 lg:wb-h-[150px] xl:wb-h-[200px] 2xl:wb-h-[200px] 3xl:wb-h-[150px] wb-bg-[linear-gradient(to_top,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_top,_transparent_0%,_#0F0F11_100%)]" />
          <div className="wb-absolute wb-bottom-0 wb-left-0 wb-right-0 lg:wb-h-[150px] xl:wb-h-[200px] 2xl:wb-h-[200px] 3xl:wb-h-[150px] wb-bg-[linear-gradient(to_bottom,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_bottom,_transparent_0%,_#0F0F11_100%)]" />
          <div className="wb-absolute wb-left-0 wb-top-0 wb-bottom-0 lg:wb-w-[150px] xl:wb-w-[200px] 2xl:wb-w-[200px] 3xl:wb-w-[350px] wb-bg-[linear-gradient(to_left,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_left,_transparent_0%,_#0F0F11_100%)]" />
          <div className="wb-absolute wb-right-0 wb-top-0 wb-bottom-0 lg:wb-w-[150px] xl:wb-w-[200px] 2xl:wb-w-[200px] 3xl:wb-w-[350px] wb-bg-[linear-gradient(to_right,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_right,_transparent_0%,_#0F0F11_100%)]" />
          <SecureAtCore1024 className="wb-hidden lg:wb-block xl:wb-hidden" />
          <SecureAtCore1280 className="wb-hidden xl:wb-block 2xl:wb-hidden" />
          <SecureAtCore1440 className="wb-hidden 2xl:wb-block 3xl:wb-hidden" />
          <SecureAtCore1920 className="wb-hidden 3xl:wb-block" />
        </div>
      </Block>
    </div>
  );
};

export default SecureAtCore;
