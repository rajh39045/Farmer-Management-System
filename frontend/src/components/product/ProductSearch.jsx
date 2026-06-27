import SearchInput from "../ui/SearchInput";

const ProductSearch = ({
  search,
  setSearch,
}) => {
  return (
    <div className="w-full">
      <SearchInput
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search fresh products..."
      />
    </div>
  );
};

export default ProductSearch;