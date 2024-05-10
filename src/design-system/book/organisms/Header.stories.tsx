import Header from '~/components/organisms/headerV2';

export default {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
};

const PopupHook = () => {
  return (
    <div className="flex flex-row">
      {/* @ts-ignore */}
      <Header />
    </div>
  );
};

export const DefaultPopup = {
  render: () => <PopupHook />,
};
