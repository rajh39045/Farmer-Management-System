import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getProductById,
  getRelatedProducts,
} from "../api/productApi";

import { getProductReviews } from "../api/reviewApi";

const useProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [farmer, setFarmer] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProductById(id);

      const productData = response.product;

      setProduct(productData);

      setFarmer(productData.farmer || null);

      if (productData.category?._id) {
        fetchRelatedProducts(
          productData.category._id,
          productData._id
        );
      }

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to load product."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const response =
        await getProductReviews(id);

      setReviews(response.reviews || []);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  const fetchRelatedProducts = async (
    categoryId,
    productId
  ) => {
    try {
      setRelatedLoading(true);

      const response =
        await getRelatedProducts({
          category: categoryId,
          exclude: productId,
          limit: 4,
        });

      setRelatedProducts(
        response.products || []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setRelatedLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [
    fetchProduct,
    fetchReviews,
  ]);

  return {
    product,
    farmer,

    reviews,

    relatedProducts,

    loading,
    relatedLoading,

    error,

    refreshProduct: fetchProduct,
  };
};

export default useProductDetails;