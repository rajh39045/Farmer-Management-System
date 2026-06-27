import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import EmptyState from "../ui/EmptyState";

const ProductGrid = ({
  products = [],
  loading = false,
  skeletonCount = 8,
}) => {
  // Loading State
  if (loading) {
    return <ProductSkeleton count={skeletonCount} />;
  }

  // Empty State
  if (!products.length) {
    return (
      <EmptyState
        image="https://illustrations.popsy.co/gray/searching.svg"
        title="No Products Found"
        description="Try changing your search or filters."
        buttonText="Clear Filters"
        buttonLink="/products"
      />
    );
  }

  // Products Grid
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-8
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;