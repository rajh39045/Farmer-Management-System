import CategoryFilter from "./filters/CategoryFilter";
import PriceFilter from "./filters/PriceFilter";
import RatingFilter from "./filters/RatingFilter";
import AvailabilityFilter from "./filters/AvailabilityFilter";
import ResetFilters from "./filters/ResetFilters";

const ProductFilters = ({
  categories,

  selectedCategory,
  setSelectedCategory,

  priceRange,
  setPriceRange,

  rating,
  setRating,

  inStock,
  setInStock,

  resetFilters,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-8">

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <PriceFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      <RatingFilter
        rating={rating}
        setRating={setRating}
      />

      <AvailabilityFilter
        inStock={inStock}
        setInStock={setInStock}
      />

      <ResetFilters
        resetFilters={resetFilters}
      />

    </div>
  );
};

export default ProductFilters;