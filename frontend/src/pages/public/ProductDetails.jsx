import useProductDetails from "../../hooks/useProductDetails";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";

import ProductGallery from "../../components/product/details/ProductGallery";
import ProductInfo from "../../components/product/details/ProductInfo";
import ProductActions from "../../components/product/details/ProductActions";
import ProductSpecification from "../../components/product/details/ProductSpecification";
import FarmerInfo from "../../components/product/details/FarmerInfo";
import ProductReviews from "../../components/product/details/ProductReviews";
import RelatedProducts from "../../components/product/details/RelatedProducts";

const ProductDetails = () => {
  const {
    product,
    farmer,

    reviews,

    relatedProducts,

    loading,
    relatedLoading,

    error,
  } = useProductDetails();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Product..."
      />
    );
  }

  if (error || !product) {
    return (
      <EmptyState
        title="Product Not Found"
        description={
          error ||
          "The requested product could not be found."
        }
        buttonText="Back To Products"
        buttonLink="/products"
      />
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-4">

        {/* Top Section */}

        <div
          className="
            grid
            lg:grid-cols-2
            gap-12
            items-start
          "
        >

          {/* Gallery */}

          <ProductGallery
            images={product.images}
          />

          {/* Product Info */}

          <div className="space-y-8">

            <ProductInfo
              product={product}
            />

            <ProductActions
              product={product}
            />

          </div>

        </div>

        {/* Specification */}

        <ProductSpecification
          product={product}
        />

        {/* Farmer */}

        <FarmerInfo
          farmer={farmer}
        />

        {/* Reviews */}

        <ProductReviews
          product={product}
          reviews={reviews}
        />

        {/* Related Products */}

        <RelatedProducts
          products={relatedProducts}
          loading={relatedLoading}
        />

      </div>

    </section>
  );
};

export default ProductDetails;