import { useCallback, useEffect, useState } from "react";

import { getAllProducts } from "../api/productApi";
import { getAllCategories } from "../api/categoryApi";

const initialFilters = {
  category: "",
  minPrice: "",
  maxPrice: "",
  rating: "",
  inStock: "",
};

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const [filters, setFilters] = useState(initialFilters);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getAllCategories();

      setCategories(response.categories || []);
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

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearch("");
    setSort("newest");
    setPage(1);
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