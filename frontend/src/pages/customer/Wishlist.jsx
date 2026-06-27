import WishlistItem from "../../components/wishlist/WishlistItem";
import EmptyWishlist from "../../components/wishlist/EmptyWishlist";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SectionHeading from "../../components/ui/SectionHeading";

import useWishlistPage from "../../hooks/useWishlistPage";

const Wishlist = () => {
  const {
    loading,

    wishlistItems,

    totalItems,

    removeItem,

    moveToCart,
  } = useWishlistPage();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Wishlist..."
      />
    );
  }

  if (!wishlistItems.length) {
    return <EmptyWishlist />;
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <SectionHeading
          badge="Favorites"
          title="My"
          highlight="Wishlist"
          subtitle={`${totalItems} saved ${
            totalItems === 1 ? "product" : "products"
          }`}
        />

        {/* Wishlist */}

        <div className="space-y-6">

          {wishlistItems.map((item) => (
            <WishlistItem
              key={item.product._id}
              item={item}
              removeItem={removeItem}
              moveToCart={moveToCart}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default Wishlist;