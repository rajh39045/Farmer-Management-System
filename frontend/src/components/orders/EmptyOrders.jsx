import { Link } from "react-router-dom";

import PrimaryButton from "../ui/PrimaryButton";

const EmptyOrders = () => {
  return (
    <div className="py-24 text-center">

      <h1 className="text-4xl font-bold">
        No Orders Yet
      </h1>

      <p className="mt-4 text-gray-500">
        Start shopping fresh farm products.
      </p>

      <Link
        to="/products"
        className="inline-block mt-8"
      >
        <PrimaryButton>
          Browse Products
        </PrimaryButton>
      </Link>

    </div>
  );
};

export default EmptyOrders;