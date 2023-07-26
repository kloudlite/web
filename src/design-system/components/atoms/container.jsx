const Container = ({ children }) => {
  return (
    <div className="w-full max-w-8xl mx-auto px-3xl md:px-6xl lg:px-9xl xl:px-11xl 2xl:px-lg">
      {children}
    </div>
  );
};

export default Container;
