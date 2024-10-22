const LoadingComponent = () => (
  <div className="flex h-full w-full items-center justify-center gap-5">
    <img
      src="icccad.png"
      alt="ICCCAD Logo"
      className=""
    />
    <span className="animate-pulse">Loading ...</span>
  </div>
);

export default LoadingComponent;
