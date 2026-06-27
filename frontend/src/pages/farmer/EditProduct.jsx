import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductForm from "../../components/farmer/ProductForm";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useProductForm from "../../hooks/useProductForm";
import useFarmerCategories from "../../hooks/useFarmerCategories";
import { getProductById } from "../../api/productApi";

const EditProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const { form, loading, error, handleChange, handleImages, submit, setForm } =
    useProductForm(product, id);

  const {
    categories,
    handleCreateCategory,
    handleDeleteCategory,
  } = useFarmerCategories(setForm);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await getProductById(id);
        setProduct(productResponse);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

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
      <h1 className="text-4xl font-bold mb-8">Edit Product</h1>

      <ProductForm
        form={form}
        loading={loading}
        error={error}
        categories={categories}
        handleChange={handleChange}
        handleImages={handleImages}
        onSubmit={submit}
        onCreateCategory={handleCreateCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </section>
  );
};

export default EditProduct;
