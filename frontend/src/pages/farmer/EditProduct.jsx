import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductForm from "../../components/farmer/ProductForm";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

import useProductForm from "../../hooks/useProductForm";
import { getProductById } from "../../api/productApi";

const EditProduct = () => {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [loadingProduct, setLoadingProduct] =
    useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response =
          await getProductById(id);

        setProduct(response.product);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

  const {
    form,
    loading,
    handleChange,
    handleImages,
    submit,
  } = useProductForm(product, id);

  if (loadingProduct) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Product..."
      />
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-10 px-4">

      <h1 className="text-4xl font-bold mb-8">
        Edit Product
      </h1>

      <ProductForm
        form={form}
        loading={loading}
        handleChange={handleChange}
        handleImages={handleImages}
        onSubmit={submit}
      />

    </section>
  );
};

export default EditProduct;