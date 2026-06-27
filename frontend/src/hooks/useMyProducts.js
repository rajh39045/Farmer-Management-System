import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getMyProducts,
  deleteProduct,
} from "../api/productApi";

const useMyProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getMyProducts();

      setProducts(response.products || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      toast.success("Product deleted successfully.");

      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete product."
      );
    }
  };

  return {
    loading,
    products,
    removeProduct,
    refreshProducts: fetchProducts,
  };
};

export default useMyProducts;