import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SecureAtCoreImages from '~/images/homeNew/secure-at-core';
import { Block } from '../../commons';
import DynamicImage from '../../dynamic-image';

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
        <div className="wb-relative secure-graph wb-py-6xl md:wb-py-10xl wb-flex wb-flex-row wb-items-center wb-justify-center [background-position:bottom] 3xl:[background-position:unset]">
          <div className="wb-absolute wb-top-0 wb-left-0 wb-right-0 lg:wb-h-[150px] xl:wb-h-[200px] 2xl:wb-h-[200px] 3xl:wb-h-[150px] wb-bg-[linear-gradient(to_top,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_top,_transparent_0%,_#0F0F11_100%)]" />
          <div className="wb-absolute wb-bottom-0 wb-left-0 wb-right-0 lg:wb-h-[150px] xl:wb-h-[200px] 2xl:wb-h-[200px] 3xl:wb-h-[150px] wb-bg-[linear-gradient(to_bottom,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_bottom,_transparent_0%,_#0F0F11_100%)]" />
          <div className="wb-absolute wb-left-0 wb-top-0 wb-bottom-0 lg:wb-w-[150px] xl:wb-w-[200px] 2xl:wb-w-[200px] 3xl:wb-w-[350px] wb-bg-[linear-gradient(to_left,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_left,_transparent_0%,_#0F0F11_100%)]" />
          <div className="wb-absolute wb-right-0 wb-top-0 wb-bottom-0 lg:wb-w-[150px] xl:wb-w-[200px] 2xl:wb-w-[200px] 3xl:wb-w-[350px] wb-bg-[linear-gradient(to_right,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_right,_transparent_0%,_#0F0F11_100%)]" />
          <div className="wb-relative wb-w-full 3xl:wb-top-[-14px] 3xl:wb-left-[12px]">
            <DynamicImage
              light={SecureAtCoreImages.secureAtCoreMobile.src}
              dark={SecureAtCoreImages.secureAtCoreMobileDark.src}
              media="mobile"
              imageClassName="wb-w-full wb-aspect-square"
            />
            <DynamicImage
              light={SecureAtCoreImages.secureAtCore768.src}
              dark={SecureAtCoreImages.secureAtCore768Dark.src}
              media="768"
            />
            <DynamicImage
              light={SecureAtCoreImages.secureAtCore1440.src}
              dark={SecureAtCoreImages.secureAtCore1440Dark.src}
              media="1440"
            />
            <DynamicImage
              light={SecureAtCoreImages.secureAtCore1280.src}
              dark={SecureAtCoreImages.secureAtCore1280Dark.src}
              media="1280"
            />
            <DynamicImage
              light={SecureAtCoreImages.secureAtCore1024.src}
              dark={SecureAtCoreImages.secureAtCore1024Dark.src}
              media="1024"
            />
            <DynamicImage
              light={SecureAtCoreImages.secureAtCore1920.src}
              dark={SecureAtCoreImages.secureAtCore1920Dark.src}
              media="1920"
            />
          </div>
        </div>
      </Block>
    </div>
  );
};

export default SecureAtCore;
