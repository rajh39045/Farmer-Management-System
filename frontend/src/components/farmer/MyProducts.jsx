import { Link } from "react-router-dom";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import PrimaryButton from "../../components/ui/PrimaryButton";

import ProductCard from "../../components/farmer/ProductCard";

import useMyProducts from "../../hooks/useMyProducts";

const MyProducts = () => {
  const {
    loading,
    products,
    removeProduct,
  } = useMyProducts();

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

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              My Products
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your products.
            </p>

          </div>

          <Link to="/farmer/products/add">

            <PrimaryButton>
              Add Product
            </PrimaryButton>

          </Link>

        </div>

        {products.length === 0 ? (

          <div className="bg-white rounded-xl shadow-md py-20 text-center">

            <h2 className="text-3xl font-bold">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-3">
              Start selling by adding your first product.
            </p>

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