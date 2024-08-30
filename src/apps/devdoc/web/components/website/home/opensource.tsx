import Link from 'next/link';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import { GithubLogoFill, Star } from '~/app/icons/icons';
import { gitUrl } from '~/app/utils/config';
import { GraphExtended, GraphItem } from '../../graph';
import { Anchor } from '../../anchor';
import Button from '../../button';
import ResponsiveContainer from '../../responsive-container';

const OpenSource = () => {
  return (
    <div className="2xl:wb-py-8xl">
      <GraphExtended className="xl:[clip-path:inset(24px_1.5px_24px_1.5px)] 3xl:[clip-path:inset(1.5px)]">
        <ResponsiveContainer>
          <GraphItem className="wb-grid wb-grid-cols-1 md:wb-grid-cols-2 lg:wb-grid-cols-[auto_384px] xl:wb-grid-cols-[auto_416px] 2xl:wb-grid-cols-[auto_512px] 3xl:wb-grid-cols-[auto_576px] wb-bg-surface-primary-subdued">
            <div className="wb-h-full wb-bg-surface-basic-default xl:wb-max-h-[288px]">
              <div className="wb-p-3xl md:wb-p-5xl wb-flex-col wb-flex wb-gap-5xl">
                <div className="wb-flex wb-flex-col wb-gap-3xl">
                  <h2 className="wb-heading2xl-marketing md:wb-heading4xl-marketing wb-text-text-default">
                    Open-source
                  </h2>

                  <p className="wb-bodyLg md:wb-bodyXl wb-text-text-soft">
                    Avoid vendor lock-in Kloudlite is an open source project -
                    for transparency, trust, and longevity. Drive by the
                    community
                  </p>
                </div>
                <div>
                  <Button
                    linkComponent={Link}
                    to={gitUrl}
                    toLabel="href"
                    prefix={<Star />}
                    content="Star Kloudlite on GitHub"
                  />
                </div>
              </div>
            </div>
            <div className="wb-h-full wb-bg-surface-primary-subdued">
              <Anchor
                href={gitUrl}
                className="wb-p-5xl wb-flex-col wb-flex wb-gap-5xl wb-h-full wb-cursor-pointer "
              >
                <div className="wb-flex wb-flex-col-reverse md:wb-flex-row wb-gap-2xl wb-flex-1">
                  <div className="wb-flex-1 wb-heading2xl md:wb-heading4xl wb-text-text-default">
                    <span className="wb-heading2xl-Re md:wb-heading4xl-md">
                      kloudlite/
                    </span>
                    <br className="wb-hidden md:wb-block" />
                    <span>kloudlite</span>
                  </div>
                  <div className="wb-w-8xl wb-h-8xl md:wb-w-10xl md:wb-h-10xl wb-flex wb-items-center wb-justify-center wb-rounded wb-bg-surface-basic-default">
                    <BrandLogo size={48} detailed={false} />
                  </div>
                </div>
                <div className="wb-flex wb-flex-col wb-gap-2xl md:wb-flex-row md:wb-items-center">
                  <p className="wb-bodyLg md:wb-flex-1 wb-text-text-strong">
                    Remote Local Environments to build distributed applications.
                  </p>
                  <div className="md:wb-w-[87px] lg:wb-w-10xl wb-text-icon-strong wb-flex wb-flex-row md:wb-justify-end">
                    <GithubLogoFill className="wb-w-[24px] wb-h-[24px] md:wb-w-[40px] md:wb-h-[40px]" />
                  </div>
                </div>
              </Anchor>
            </div>
          </GraphItem>
        </ResponsiveContainer>
      </GraphExtended>
    </div>
  );
};

export default OpenSource;
