import { Button } from 'kl-design-system/atoms/button';

const CompanyElement = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="flex flex-col gap-lg">
      <div className="headingMd text-surface-tertiary-default">{name}</div>
      <div className="bodyMd text-surface-tertiary-default">{value}</div>
    </div>
  );
};

export const CompanyPanel = ({
  frontMatter,
}: {
  frontMatter: {
    [key: string]: any;
  };
}) => {
  return (
    <div className="flex flex-col gap-3xl rounded-lg border border-border-default bg-surface-basic-subdued px-3xl pt-3xl pb-5xl">
      <CompanyElement name="Company name" value={frontMatter?.companyName} />
      <CompanyElement name="About" value={frontMatter?.companyAbout} />
      <CompanyElement name="Industry" value={frontMatter?.companyIndustry} />
      <CompanyElement name="Solutions" value={frontMatter?.companySolutions} />
      <div className="h-xs bg-border-default w-full" />
      <div className="flex flex-col gap-xl">
        <div className="headingMd text-surface-tertiary-default">
          Ready to get started?
        </div>
        <div>
          <Button variant="tertiary" content="Contact sales" />
        </div>
      </div>
    </div>
  );
};
