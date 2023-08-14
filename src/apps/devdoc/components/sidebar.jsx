import { Link } from '@remix-run/react';
import { TextInput } from '~/components/atoms/input.jsx';
import { Search } from '@jengaicons/react';
import * as Chips from '~/components/atoms/chips.jsx';

const BaseSidebar = ({ items }) => {
  return (
    <div className="overflow-scroll fixed bottom-0 top-docHeaderHeight w-docSidebarWidth left-[max(0px,calc(50%-40rem))] p-4">
      <div className="sticky top-0">
        <TextInput
          value=""
          placeholder="Search"
          prefixIcon={Search}
          suffix={
            <Chips.ChipGroup>
              <Chips.Chip label="C+K" item="hi" />
            </Chips.ChipGroup>
          }
        />
      </div>
      <div className="flex flex-col gap-6">
        {items.map((item) => {
          return (
            <div key={item.label}>
              <span className="uppercase text-sm">{item.label}</span>
              <div>
                {(item.items || []).map((subitem) => {
                  return (
                    <div key={subitem.href} className="pl-4">
                      <Link to={subitem.href} className="text-sm">
                        {subitem.label}
                      </Link>
                      <div>
                        {(subitem.items || []).map((subsubitem) => {
                          return (
                            <div key={subsubitem.href} className="pl-4">
                              <Link to={subsubitem.href} className="text-sm">
                                {subsubitem.label}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <BaseSidebar
      items={[
        {
          label: 'Introduction',
          href: '/introduction',
          items: [
            {
              label: 'What is Kloudlite?',
              href: '/introduction/what-is-kloudlite',
            },
            {
              label: 'How Kloudlite Works?',
              href: '/how-kloudlite-works',
            },
            {
              label: 'Basic Concepts',
              href: '/basic-concepts',
            },
            {
              label: 'Getting Started',
              href: '/getting-started',
              items: [
                {
                  label: 'Create Cluster',
                  href: '/getting-started/create-cluster',
                },
                {
                  label: 'Setup Project',
                  href: '/getting-started/setup-project',
                },
                {
                  label: 'Create Database',
                  href: '/getting-started/create-database',
                },
                {
                  label: 'Setup Application',
                  href: '/getting-started/setup-application',
                },
                {
                  label: 'Configs & Secrets',
                  href: '/getting-started/configs-and-secrets',
                },
              ],
            },
            {
              label: 'What next?',
              href: '/what-next',
            },
          ],
        },
        {
          label: 'Usage',
          items: [
            {
              label: 'Interfaces',
              items: [
                {
                  label: 'Web',
                  href: '/interfaces/web',
                },
                {
                  label: 'GitOps',
                  href: '/interfaces/gitops',
                },
                {
                  label: 'CLI',
                  href: '/interfaces/cli',
                },
              ],
            },
            {
              label: 'For Developers',
              href: '/for-developers',
              items: [
                {
                  label: 'New Remote Local',
                  href: '/for-developers/new-remote-local',
                },
                {
                  label: 'Local Environment Setup',
                  href: '/for-developers/local-environment-setup',
                },
              ],
            },
            {
              label: 'For Platform Engineers',
              href: '/for-platform-engineers',
              items: [
                {
                  label: 'Clusters',
                  href: '/for-platform-engineers/clusters',
                },
                {
                  label: 'Autoscaling',
                  href: '/for-platform-engineers/autoscaling',
                },
                {
                  label: 'Cost Optimization',
                  href: '/for-platform-engineers/cost-optimization',
                },
                {
                  label: 'Multi-Cloud',
                  href: '/for-platform-engineers/multi-cloud',
                },
                {
                  label: 'Self Managed Services',
                  href: '/for-platform-engineers/self-managed-services',
                },
                {
                  label: 'Domain Management',
                  href: '/for-platform-engineers/domain-management',
                },
              ],
            },
          ],
        },
        {
          label: 'Security & Compliance',
          href: '/security-and-compliance',
          items: [
            {
              label: 'Backup & Restore',
              href: '/security-and-compliance/backup-and-restore',
            },
            {
              label: 'SOC2',
              href: '/security-and-compliance/soc2',
            },
            {
              label: 'GDPR',
              href: '/security-and-compliance/gdpr',
            },
            {
              label: 'Encryption',
              href: '/security-and-compliance/encryption',
            },
          ],
        },
        {
          label: 'Resources',
          href: '/resources',
          items: [
            {
              label: 'API Reference',
              href: '/api-reference',
            },
            {
              label: 'FAQ',
              href: '/faq',
            },
            {
              label: 'Roadmap',
              href: '/roadmap',
            },
            {
              label: 'Github',
              href: '/github',
            },
            {
              label: 'Help & Support',
              href: '/help-and-support',
            },
          ],
        },
      ]}
    />
  );
};
