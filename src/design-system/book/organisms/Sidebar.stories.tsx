import { useState } from 'react';
import { BrandLogo } from '~/components/branding/brand-logo';
import {
  BellSimple,
  Container,
  EnvelopeSimple,
  GearSix,
  InfraAsCode,
  Users,
} from '~/components/icons';
import Sidebar from '~/components/organisms/side-bar';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar.Root,
  tags: ['autodocs'],
  argTypes: {},
};

const PopupHook = () => {
  const [_show, setShow] = useState(false);
  return (
    <div className="flex flex-row">
      {/* @ts-ignore */}
      <Sidebar.Root onCollapseChange={setShow}>
        <Sidebar.Header>
          <BrandLogo size={24} />
        </Sidebar.Header>
        <Sidebar.Item active icon={<EnvelopeSimple />}>
          Environments
        </Sidebar.Item>
        <Sidebar.Item icon={<InfraAsCode />}>Clusters</Sidebar.Item>
        <Sidebar.Item icon={<Container />}>Packages</Sidebar.Item>
        <Sidebar.Separator />
        <div className="flex-1" />
        <Sidebar.Item icon={<GearSix />}>Settings</Sidebar.Item>
        <Sidebar.Item icon={<BellSimple />}>Notifications</Sidebar.Item>
        <Sidebar.Item icon={<Users />}>User</Sidebar.Item>
      </Sidebar.Root>
      <div className="flex-1 flex items-center justify-center">
        body content
      </div>
    </div>
  );
};

export const DefaultPopup = {
  render: () => <PopupHook />,
};
