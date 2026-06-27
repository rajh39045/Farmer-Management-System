import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getAllProducts } from "../api/productApi";
import { getAllCategories } from "../api/categoryApi";
import { normalizeCategories } from "../utils/categories";

const initialFilters = {
  category: "",
  minPrice: "",
  maxPrice: "",
  rating: "",
  inStock: "",
};

const useProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearchState] = useState(
    () => searchParams.get("search") || ""
  );
  const [sort, setSort] = useState("newest");

  const [filters, setFiltersState] = useState(() => ({
    ...initialFilters,
    category: searchParams.get("category") || "",
  }));

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getAllCategories();

      setCategories(normalizeCategories(response.categories || []));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllProducts({
        page,
        search,
        sort,
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        rating: filters.rating,
        inStock: filters.inStock,
      });

      setProducts(response.products || []);

      setTotalPages(
        response.totalPages || 1
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  }, [
    page,
    search,
    sort,
    filters,
  ]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "";
    const searchFromUrl = searchParams.get("search") || "";

    setFiltersState((prev) => {
      if (prev.category === categoryFromUrl) {
        return prev;
      }

      return {
        ...prev,
        category: categoryFromUrl,
      };
    });

    setSearchState((prev) =>
      prev === searchFromUrl ? prev : searchFromUrl
    );

    if (categoryFromUrl || searchFromUrl) {
      setPage(1);
    }
  }, [searchParams]);

  const updateSearchParams = (updates) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }
      });

      return next;
    }, { replace: true });
  };

  const setSearch = (value) => {
    setSearchState(value);
    updateSearchParams({ search: value });
    setPage(1);
  };

  const setFilters = (nextFilters) => {
    setFiltersState(nextFilters);
    updateSearchParams({ category: nextFilters.category });
    setPage(1);
  };

  const resetFilters = () => {
    setFiltersState(initialFilters);
    setSearchState("");
    setSort("newest");
    setPage(1);
    setSearchParams({}, { replace: true });
  };

  return {
    products,

    categories,

    loading,

    error,

    page,
    setPage,

    totalPages,

    search,
    setSearch,

    sort,
    setSort,

    filters,
    setFilters,

    fetchProducts,

    resetFilters,
  };
};

export default useProducts;
