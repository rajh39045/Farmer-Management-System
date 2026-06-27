import ProductForm from "../../components/farmer/ProductForm";
import useProductForm from "../../hooks/useProductForm";

const AddProduct = () => {
  const {
    form,
    loading,
    handleChange,
    handleImages,
    submit,
  } = useProductForm();

  return (
    <section className="max-w-5xl mx-auto py-10 px-4">

      <h1 className="text-4xl font-bold mb-8">
        Add Product
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

export default AddProduct;