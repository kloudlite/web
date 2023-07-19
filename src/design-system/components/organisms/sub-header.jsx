export const SubHeader = ({ title, actions }) => {
  return (
    <div className="flex flex-row items-center justify-between pb-3xl pt-6xl">
      <div className="text-text-strong headingLg">{title}</div>
      <div className="flex flex-row items-center justify-center">
        {actions && actions}
      </div>
    </div>
  );
};
