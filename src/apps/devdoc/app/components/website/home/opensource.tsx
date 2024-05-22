import { GithubLogoFill, Star } from '~/app/icons/icons';
import { Button } from 'kl-design-system/atoms/button';
import { gitUrl } from '~/app/utils/config';
import Link from 'next/link';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import { GraphExtended, GraphItem } from '../../graph';

const OpenSource = () => {
  return (
    <GraphExtended>
      <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-2 lg:wb-grid-cols-[auto_384px] 2xl:wb-grid-cols-[auto_480px] 3xl:wb-grid-cols-[auto_576px] md:wb-gap-3xl lg:wb-gap-5xl lg:wb-grid-rows-[288px]">
        <GraphItem className="wb-bg-surface-basic-default dark:wb-bg-surface-darktheme-basic-default">
          <div className="wb-p-3xl md:wb-p-5xl wb-flex-col wb-flex wb-gap-5xl">
            <div className="wb-flex wb-flex-col wb-gap-3xl">
              <div className="wb-heading2xl-marketing md:wb-heading4xl-marketing wb-text-text-default dark:wb-text-text-darktheme-default">
                Open-source
              </div>

              <p className="wb-bodyLg md:wb-bodyXl wb-text-text-soft dark:wb-text-text-darktheme-soft">
                Avoid vendor lock-in Kloudlite is an open source project - for
                transparency, trust, and longevity. Drive by the community
              </p>
            </div>
            <div>
              <Button
                LinkComponent={Link}
                to={gitUrl}
                toLabel="href"
                prefix={<Star />}
                content="Star Kloudlite on GitHub"
              />
            </div>
          </div>
        </GraphItem>
        <GraphItem className="wb-h-full wb-bg-surface-primary-subdued dark:wb-bg-surface-darktheme-primary-subdued">
          <a
            href={gitUrl}
            className="wb-p-5xl wb-flex-col wb-flex wb-gap-5xl wb-h-full wb-cursor-pointer"
          >
            <div className="wb-flex wb-flex-col-reverse md:wb-flex-row wb-gap-2xl wb-flex-1">
              <div className="wb-flex-1 wb-heading2xl md:wb-heading4xl wb-text-text-default dark:wb-text-text-darktheme-default">
                <span className="wb-heading2xl-Re md:wb-heading4xl-md">
                  kloudlite/
                </span>
                <br className="wb-hidden md:wb-block" />
                <span>kloudlite</span>
              </div>
              <div className="wb-w-8xl wb-h-8xl md:wb-w-10xl md:wb-h-10xl wb-flex wb-items-center wb-justify-center wb-rounded wb-bg-surface-primary-pressed dark:wb-bg-surface-darktheme-primary-pressed">
                <BrandLogo size={48} detailed={false} darkBg />
              </div>
            </div>
            <div className="wb-flex wb-flex-col wb-gap-2xl md:wb-flex-row md:wb-items-center">
              <div className="wb-bodyLg md:wb-flex-1 wb-text-text-strong dark:wb-text-text-darktheme-strong">
                See why Kloudlite is the remote local environments of choice for
                modern
              </div>
              <div className="md:wb-w-10xl wb-text-icon-strong dark:wb-text-icon-darktheme-strong wb-flex wb-flex-row md:wb-justify-end">
                <GithubLogoFill className="wb-w-[24px] wb-h-[24px] md:wb-w-[40px] md:wb-h-[40px]" />
              </div>
            </div>
          </a>
        </GraphItem>
      </div>
    </GraphExtended>
  );
};

export default OpenSource;
