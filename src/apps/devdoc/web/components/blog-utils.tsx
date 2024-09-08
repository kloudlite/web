import Profile from 'kl-design-system/molecule/profile';
import { ReactNode } from 'react';
import { Chip } from 'kl-design-system/atoms/chips';
import ShareMenu from './share-menu';

export const BlogHeader = ({
  frontMatter,
  timestamp,
  author = true,
}: {
  frontMatter: {
    [key: string]: any;
  };
  timestamp: string | ReactNode;
  author?: boolean;
}) => {
  return (
    <div className="wb-flex wb-flex-col wb-gap-5xl wb-pt-2xl wb-pb-xl">
      <div className="wb-flex wb-flex-col wb-gap-xl">
        <h1 className="wb-heading4xl wb-text-text-default">
          {frontMatter.title || frontMatter.companyName}
        </h1>
        <p className="wb-bodyLg wb-text-text-strong">
          {frontMatter.describe || frontMatter.companyDescription}
        </p>
      </div>
      <div className="wb-flex wb-flex-row wb-items-center">
        {author && (
          <Profile
            responsive={false}
            name={
              <span className="wb-bodyMd-semibold">{frontMatter.author}</span>
            }
            subtitle={timestamp}
            image={
              <img
                src={`https://gravatar.com/avatar/${frontMatter.gravatarHash}`}
                className="wb-rounded-full"
                alt="avatar"
              />
            }
          />
        )}
        <div className="wb-flex-1 wb-flex wb-justify-end">
          <ShareMenu frontmatter={frontMatter} />
        </div>
      </div>
    </div>
  );
};

export const BlogTags = ({ tags = [] }: { tags: string[] }) => {
  return (
    <div className="wb-flex wb-flex-row wb-flex-wrap wb-items-center wb-gap-lg">
      {tags.map((t) => (
        <Chip key={t} item={t} label={<span className="wb-bodyLg">{t}</span>} />
      ))}
    </div>
  );
};
