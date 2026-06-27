import PrimaryButton from "../ui/PrimaryButton";
import { FaCheckCircle } from "../../utils/icons";

const PlaceOrderButton = ({
  loading,
  disabled = false,
  onPlaceOrder,
}) => {
  return (
    <PrimaryButton
      type="button"
      fullWidth
      loading={loading}
      disabled={disabled || loading}
      icon={!loading && <FaCheckCircle />}
      onClick={onPlaceOrder}
      className="mt-6"
    >
      {loading ? "Placing Order..." : "Place Order"}
    </PrimaryButton>
  );
};

export default PlaceOrderButton;