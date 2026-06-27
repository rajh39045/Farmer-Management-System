import {
  FaMoneyBillWave,
  FaCreditCard,
  FaUniversity,
} from "../../utils/icons";

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  const methods = [
    {
      id: "COD",
      title: "Cash On Delivery",
      description: "Pay when your order is delivered.",
      icon: <FaMoneyBillWave className="text-3xl text-green-600" />,
      available: true,
    },
    {
      id: "ONLINE",
      title: "Online Payment",
      description: "Razorpay / UPI / Debit Card / Credit Card",
      icon: <FaCreditCard className="text-3xl text-blue-600" />,
      available: false,
    },
    {
      id: "BANK",
      title: "Bank Transfer",
      description: "Coming Soon",
      icon: <FaUniversity className="text-3xl text-purple-600" />,
      available: false,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Payment Method
      </h2>

      <div className="space-y-4">

        {methods.map((method) => (

          <label
            key={method.id}
            className={`
              flex
              items-center
              justify-between
              p-5
              rounded-xl
              border-2
              cursor-pointer
              transition-all

              ${
                paymentMethod === method.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }

              ${
                !method.available
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }
            `}
          >
            <div className="flex items-center gap-5">

              {method.icon}

              <div>

                <h3 className="font-semibold text-lg">
                  {method.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  {method.description}
                </p>

              </div>

            </div>

            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === method.id}
              disabled={!method.available}
              onChange={() =>
                setPaymentMethod(method.id)
              }
              className="w-5 h-5 accent-green-600"
            />

          </label>

        ))}

      </div>

      {/* Information */}

      {paymentMethod === "COD" && (
        <div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 p-4">
          <p className="text-yellow-700">
            Cash will be collected at the time of delivery.
          </p>
        </div>
      )}

      {paymentMethod === "ONLINE" && (
        <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-4">
          <p className="text-blue-700">
            Secure payment gateway integration will be enabled later.
          </p>
        </div>
      )}

    </div>
  );
};

export default PaymentMethod;