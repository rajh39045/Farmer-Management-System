const ProductSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
          <div className="aspect-square bg-gray-200" />
          <div className="p-4 sm:p-5 space-y-3">
            <div className="h-3 bg-gray-200 rounded w-1/4" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded" />
              <div className="h-5 bg-gray-200 rounded w-1/6" />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-baseline gap-2">
                <div className="h-7 bg-gray-200 rounded w-1/5" />
                <div className="h-5 bg-gray-200 rounded w-1/6" />
              </div>
              <div className="h-11 w-11 bg-gray-200 rounded-xl" />
            </div>
            <div className="h-12 bg-gray-200 rounded-xl w-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
