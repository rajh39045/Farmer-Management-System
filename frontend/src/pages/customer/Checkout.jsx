import LoadingSpinner from "../../components/ui/LoadingSpinner";

import ShippingForm from "../../components/checkout/ShippingForm";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import OrderSummary from "../../components/checkout/OrderSummary";
import PlaceOrderButton from "../../components/checkout/PlaceOrderButton";

import useCheckout from "../../hooks/useCheckout";

const Checkout = () => {
  const {
    loading,

    cartItems,

    address,
    updateAddress,

    paymentMethod,
    setPaymentMethod,

    subtotal,
    deliveryCharge,
    discount,
    total,

    placingOrder,

    submitOrder,
  } = useCheckout();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Checkout..."
      />
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your order securely.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side */}

          <div className="lg:col-span-2 space-y-8">

            <ShippingForm
              address={address}
              updateAddress={updateAddress}
            />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

          </div>

          {/* Right Side */}

          <div className="space-y-6 lg:sticky lg:top-24 self-start z-10">

            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              deliveryCharge={deliveryCharge}
              discount={discount}
              total={total}
            />

            <PlaceOrderButton
              loading={placingOrder}
              onPlaceOrder={submitOrder}
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default Checkout;