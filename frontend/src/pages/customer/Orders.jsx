import LoadingSpinner from "../../components/ui/LoadingSpinner";

import EmptyOrders from "../../components/orders/EmptyOrders";
import OrderCard from "../../components/orders/OrderCard";

import useOrders from "../../hooks/useOrders";

const Orders = () => {
  const {
    loading,
    orders,
    handleCancelOrder,
  } = useOrders();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Orders..."
      />
    );
  }

  if (!orders.length) {
    return <EmptyOrders />;
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-6xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        <div className="space-y-6">

          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onCancel={handleCancelOrder}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default Orders;