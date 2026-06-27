import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getMyProducts, deleteProduct } from "../api/productApi";

const useMyProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyProducts();
      setProducts(response.products || []);
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to load products.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    const handleRefresh = () => {
      fetchProducts();
    };

    window.addEventListener("farmer-dashboard-refresh", handleRefresh);

    return () => {
      window.removeEventListener("farmer-dashboard-refresh", handleRefresh);
    };
  }, [fetchProducts]);

  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully.");
      window.dispatchEvent(new Event("farmer-dashboard-refresh"));
      await fetchProducts();
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to delete product.";
      toast.error(message);
    }
  };

  return {
    loading,
    products,
    error,
    removeProduct,
    refreshProducts: fetchProducts,
  };
};

export default useMyProducts;