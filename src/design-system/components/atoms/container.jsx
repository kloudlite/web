const Container = ({ children }) => {
  return (
    <>
      <div className="flex justify-center px-3xl">
        <div className="flex-1 w-full max-w-8xl min-w-[320px]">{children}</div>
      </div>

      {/* <div className="w-full max-w-8xl mx-auto px-3xl md:px-6xl lg:px-9xl xl:px-11xl 2xl:px-lg"> */}
      {/*   {children} */}
      {/* </div> */}
    </>
  );
};

export default Container;
