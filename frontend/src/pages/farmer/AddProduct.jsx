import ProductForm from "../../components/farmer/ProductForm";
import useProductForm from "../../hooks/useProductForm";
import useFarmerCategories from "../../hooks/useFarmerCategories";

const AddProduct = () => {
  const {
    form,
    loading,
    error,
    handleChange,
    handleImages,
    submit,
    setForm,
  } = useProductForm();

  const {
    categories,
    handleCreateCategory,
    handleDeleteCategory,
  } = useFarmerCategories(setForm);

  return (
    <section className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Add Product</h1>

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

export default AddProduct;
