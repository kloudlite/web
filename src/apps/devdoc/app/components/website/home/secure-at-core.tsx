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
        desc="Built using Kloudlite Global VPN Mesh with wireguard at its core"
      >
        <div className="wb-relative -wb-top-sm">
          <DynamicImage
            light={SecureAtCoreImages.secureAtCoreMobile.src}
            dark={SecureAtCoreImages.secureAtCoreMobileDark.src}
            media="mobile"
            imageClassName="wb-w-full"
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
      </Block>
    </div>
  );
};

export default SecureAtCore;
