const ProductSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="
            bg-white
            rounded-3xl
            shadow-lg
            overflow-hidden
            animate-pulse
          "
        >
          {/* Image */}
          <div className="h-52 bg-gray-200" />

          {/* Content */}
          <div className="p-5 space-y-4">
            <div className="h-5 w-3/4 bg-gray-200 rounded" />

            <div className="h-4 w-full bg-gray-200 rounded" />

            <div className="h-4 w-2/3 bg-gray-200 rounded" />

            <div className="flex justify-between items-center pt-2">
              <div className="h-6 w-20 bg-gray-200 rounded" />

              <div className="h-10 w-10 rounded-full bg-gray-200" />
            </div>

            <div className="h-11 bg-gray-200 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;