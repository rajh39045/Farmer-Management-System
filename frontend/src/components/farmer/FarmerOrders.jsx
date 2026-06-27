import LoadingSpinner from "../../components/ui/LoadingSpinner";
import FarmerOrderCard from "../../components/farmer/FarmerOrderCard";

import useFarmerOrders from "../../hooks/useFarmerOrders";

const FarmerOrders = () => {
  const {
    loading,
    orders,
    changeStatus,
  } = useFarmerOrders();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Orders..."
      />
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-10">
          Farmer Orders
        </h1>

        {orders.length === 0 ? (

          <div className="bg-white rounded-xl p-16 text-center shadow-md">

            <h2 className="text-3xl font-bold">
              No Orders Available
            </h2>

            <p className="mt-3 text-gray-500">
              Orders will appear here after customers purchase your products.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (
              <FarmerOrderCard
                key={order._id}
                order={order}
                onStatusChange={changeStatus}
              />
            ))}

          </div>

        )}

      </div>

    </section>
  );
};

export default FarmerOrders;