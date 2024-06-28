import consts, {
  githubPrefix,
  linkedInPrefix,
  twitterPrefix,
} from '~/app/utils/const';
import { IconButton } from 'kl-design-system/atoms/button';
import { GithubLogo, LinkedinLogo, TwitterNewLogo } from '@jengaicons/react';
import Link from 'next/link';
import { Block } from '../../commons';
import { GraphItem } from '../../graph';
import SectionWrapper from '../section-wrapper';

const AboutTeam = () => {
  return (
    <SectionWrapper className="wb-flex wb-flex-col wb-w-full">
      <Block
        title="United, we innovate!"
        desc="Crafted by a team of 10 tech enthusiasts with a deep love and passion for open-source tech, and led 
by a dedicated and visionary leadership focused on pushing the boundaries of innovation."
      >
        <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-3 2xl:wb-grid-cols-4 3xl:wb-grid-cols-5 wb-gap-3xl md:wb-gap-5xl">
          {consts.aboutus.team.map((t) => (
            <GraphItem
              key={t.name}
              className="wb-h-[256px] wb-bg-surface-basic-subdued"
            >
              <div className="wb-flex wb-flex-col wb-gap-3xl wb-p-3xl">
                <div className="wb-w-[100px]  wb-h-[100px] wb-bg-surface-basic-pressed wb-rounded-full wb-overflow-hidden">
                  {t.image && (
                    <img
                      src={t.image}
                      alt={t.name}
                      className="wb-h-full wb-w-full wb-object-cover"
                    />
                  )}
                </div>
                <div className="wb-flex wb-flex-col wb-gap-2xl">
                  <div className="wb-flex wb-flex-col wb-gap-md">
                    <span className="wb-text-text-default wb-headingLg">
                      {t.name}
                    </span>
                    <span className="wb-text-text-soft wb-bodyLg">
                      {t.role}
                    </span>
                  </div>
                  <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
                    {t.linkedin && (
                      <IconButton
                        icon={<LinkedinLogo />}
                        variant="plain"
                        linkComponent={Link}
                        toLabel="href"
                        to={linkedInPrefix + t.linkedin}
                        size="xs"
                      />
                    )}
                    {t.x && (
                      <IconButton
                        icon={<TwitterNewLogo />}
                        variant="plain"
                        linkComponent={Link}
                        toLabel="href"
                        to={twitterPrefix + t.x}
                        size="xs"
                      />
                    )}
                    {t.github && (
                      <IconButton
                        icon={<GithubLogo />}
                        variant="plain"
                        linkComponent={Link}
                        toLabel="href"
                        to={githubPrefix + t.github}
                        size="xs"
                      />
                    )}
                  </div>
                </div>
              </div>
            </GraphItem>
          ))}
        </div>
      </Block>
    </SectionWrapper>
  );
};

export default AboutTeam;
