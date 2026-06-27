import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";

import LoadingSpinner from "../../components/ui/LoadingSpinner";

import useCartPage from "../../hooks/useCartPage";

const Cart = () => {
  const {
    loading,

    cartItems,

    subtotal,
    discount,
    deliveryCharge,

    increaseQuantity,
    decreaseQuantity,
    removeItem,
    moveToWishlist,
  } = useCartPage();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Cart..."
      />
    );
  }

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-2">
            Review your selected products before checkout.
          </p>

        </div>

        {/* Layout */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (

              <CartItem
                key={item.product._id}
                item={item}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeItem={removeItem}
                moveToWishlist={moveToWishlist}
              />

            ))}

          </div>

          {/* Summary */}

          <div>

            <CartSummary
              subtotal={subtotal}
              discount={discount}
              deliveryCharge={deliveryCharge}
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Cart;