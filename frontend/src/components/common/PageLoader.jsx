const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <div className="w-16 h-16 rounded-full border-4 border-green-600 border-t-transparent animate-spin" />

        <h2 className="text-xl font-semibold text-green-600">
          Loading...
        </h2>
      </div>
    </div>
  );
};

export default PageLoader;