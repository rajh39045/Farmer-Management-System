const CategorySkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="
            rounded-3xl
            overflow-hidden
            bg-white
            shadow-lg
            animate-pulse
          "
        >
          <div className="h-44 bg-gray-200" />

          <div className="p-5">
            <div className="h-5 bg-gray-200 rounded mb-3" />

            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;