import { Link } from "react-router-dom";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import PrimaryButton from "../../components/ui/PrimaryButton";
import ProductCard from "../../components/farmer/ProductCard";
import useMyProducts from "../../hooks/useMyProducts";

const MyProducts = () => {
  const { loading, products, error, removeProduct, refreshProducts } = useMyProducts();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Products..."
      />
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">My Products</h1>
            <p className="text-gray-500 mt-2">
              Manage your inventory, edit listings, and remove outdated items.
            </p>
          </div>

          <Link to="/farmer/products/add">
            <PrimaryButton>Add Product</PrimaryButton>
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md py-20 text-center">
            <h2 className="text-3xl font-bold">No Products Found</h2>
            <p className="text-gray-500 mt-3">
              Start selling by adding your first product.
            </p>
            <div className="mt-6 flex justify-center">
              <Link to="/farmer/products/add">
                <PrimaryButton>Create your first product</PrimaryButton>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={removeProduct}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProducts;